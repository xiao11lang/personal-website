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
        var {title,content,type,writeTime,isOriginal,path}=ctx.request.body;
        var params=[title,content,type,writeTime,isOriginal,path]
        var res=await spanner.insert({
            tableName:'article',
            fields:['title','content','type','writeTime','isOriginal','path'],
            values:params
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
}]