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