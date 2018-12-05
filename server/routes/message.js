const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getMessage(ctx) {
    try{
        var commer=await spanner.query({
            tableName:"message"
        })
        ctx.body=commer
    }catch(e){
        console.log(e)
    }
}
async function addMessage(ctx){
    try{
        var {userName,content,time}=ctx.request.body;
        var params=[userName,content,time]
        var res=await spanner.insert({
            tableName:'message',
            fields:['userName','content','time'],
            values:params
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'get',
    path:'/api/getMessage',
    handler:getMessage
},{
    method:'post',
    path:'/api/addMessage',
    handler:addMessage
}]