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
        ctx.body=res
    }catch(e){
        console.log(e)
    }
}
async function addCount(ctx){
    try{
        var {id}=ctx.request.id;
        var rules=`where id=${id}`
        var count=await spanner.query({
            tableName:"article",
            fields:['readCount'],
            rules:rules
        })
        var params=[count]
        var res=await spanner.update({
            tableName:'article',
            fields:['readCount'],
            values:params,
            rules:`where id=${id}`
        })
        ctx.body=res
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
}]