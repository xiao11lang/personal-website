const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function addComments(ctx){
    try{
        const {dailyId,fromId,toId,commentTime,content}=ctx.request.body
        var res=await spanner.insert({
            tableName:'comments',
            fields:['dailyId','fromId','toId','commentTime','content'],
            values:[dailyId,fromId,toId,commentTime,content]
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'post',
    path:'/api/addComments',
    handler:addComments
}]