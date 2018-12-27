const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getArticle(ctx) {
    try{
        var article=await spanner.query({
            tableName:"article"
        })
        ctx.body=article
    }catch(e){
        console.log(e)
    }
}
async function addArticle(ctx){
    try{
        var {title,type,writeTime,isOriginal,path}=ctx.request.body;
        var params=[title,type,writeTime,isOriginal,path]
        var res=await spanner.insert({
            tableName:'article',
            fields:['title','type','writeTime','isOriginal','path'],
            values:params
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
async function addCount(ctx){
    try{
        var {id}=ctx.request.body;
        var rules=`where id=${id}`
        var count=await spanner.query({
            tableName:"article",
            fields:['readCount'],
            rules:rules
        })
        var params=[count[0].readCount+1]
        var res=await spanner.update({
            tableName:'article',
            fields:['readCount'],
            values:params,
            rules:`where id=${id}`
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
async function addThump(ctx){
    try{
        var {id}=ctx.request.body;
        var rules=`where id=${id}`
        var count=await spanner.query({
            tableName:"article",
            fields:['thumpUp'],
            rules:rules
        })
        var params=[count[0].thumpUp+1]
        var res=await spanner.update({
            tableName:'article',
            fields:['thumpUp'],
            values:params,
            rules:`where id=${id}`
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
async function deleteArticle(ctx){
    try{
        var {id}=ctx.request.body
        
        var res=await spanner.delete({
            tableName:'article',
            rules:`where id=${id}`
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'get',
    path:'/api/getArticle',
    handler:getArticle
},{
    method:'post',
    path:'/api/addArticle',
    handler:addArticle
},{
    method:'post',
    path:'/api/addCount',
    handler:addCount
},{
    method:'post',
    path:'/api/addThump',
    handler:addThump
},{
    method:'post',
    path:'/api/deleteArticle',
    handler:deleteArticle
}]