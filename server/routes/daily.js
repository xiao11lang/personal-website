const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
const fs=require('fs')
const path=require('path')
async function getDaily(ctx) {
    try{
        var {pageNum}=ctx.request.body;
        var daily=await spanner.query({
            tableName:"daily",
            pageNum:pageNum,
            order:'order by id desc'
        })
        var dailyIdList=daily.map(function(item){
            return item.id
        })
        var userInfo=await spanner.query({
            tableName:'user'
        })
        var userInfoMap={}
        userInfo.forEach(function(user){
            userInfoMap[user.id]={
                name:user.userName,
                id:user.id,
                avatar:user.avatar
            }
        })
        var comments=await spanner.query({
            tableName:'comments',
            rules:`where dailyId in (${dailyIdList.join(',')})`
        })
        var commentList=comments.map(function(comm,index,arr){
            return {
                fromName:userInfoMap[comm.fromId].name,
                fromAvatar:userInfoMap[comm.fromId].avatar,
                toName:userInfoMap[comm.toId].name,
                toAvatar:userInfoMap[comm.toId].avatar,
                childList:arr.filter(function(child){
                    return child.parentId==comm.commentId//筛选出子评论
                }).map(function(item){
                    return {
                        fromName:userInfoMap[item.fromId].name,
                        fromAvatar:userInfoMap[item.fromId].avatar,
                        toName:userInfoMap[item.toId].name,
                        toAvatar:userInfoMap[item.toId].avatar,
                        ...item
                    }
                }),
                ...comm
            }
        })
        daily=daily.map(function(item){
            return {
                commentList:commentList.filter(function(comm){
                    return comm.dailyId==item.id&&comm.parentId==0
                }),
                ...item
            }
        })
        var total=await spanner.query({
            fields:['count(*) total'],
            tableName:"daily",
        })
        ctx.body={
            daily:daily,
            total:total[0].total
        }
    }catch(e){
        console.log(e)
    }
}
async function addDaily(ctx){
    try{
        var {content,writeTime,paths}=ctx.request.body
        var files=Object.keys(ctx.request.files)
        files.forEach(function(file){
            fs.renameSync(ctx.request.files[file].path,path.resolve('/data/www/static/img',ctx.request.files[file].name))
        })
        var res=await spanner.insert({
            tableName:'daily',
            fields:['content','writeTime','path'],
            values:[content,writeTime,paths]
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
async function deleteDaily(ctx){
    try{
        var {id}=ctx.request.body
        
        var res=await spanner.delete({
            tableName:'daily',
            rules:`where id=${id}`
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'post',
    path:'/api/getDaily',
    handler:getDaily
},{
    method:'post',
    path:'/api/addDaily',
    handler:addDaily
},{
    method:'post',
    path:'/api/deleteDaily',
    handler:deleteDaily
}]