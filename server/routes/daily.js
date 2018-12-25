const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
const fs=require('fs')
const path=require('path')
async function getDaily(ctx) {
    try{
        var daily=await spanner.query({
            tableName:"daily"
        })
        ctx.body=daily
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
    method:'get',
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