const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getMessage(ctx) {
    try{
        var {pageNum}=ctx.request.body;
        var mes=await spanner.query({
            fields:['m.*','u.avatar'],
            tableName:"user u,message m",
            rules:'where u.userName=m.userName',
            pageNum:pageNum,
            order:'order by time desc'
        })
        var total=await spanner.query({
            fields:['count(*) total'],
            tableName:"message",
        })
        ctx.body={
            mes,total:total[0].total
        }
    }catch(e){
        console.log(e)
    }
}
async function addMessage(ctx){
    try{
        if(ctx.session.userName){
            var {userName,content,time}=ctx.request.body;
            var params=[userName,content,time]
            await spanner.insert({
            tableName:'message',
            fields:['userName','content','time'],
            values:params
            })
            ctx.body='success'
        }else{
            ctx.body='fail'
        }
    }catch(e){
        console.log(e)
    }
}
async function deleteMessage(ctx){
    try{
        var {id}=ctx.request.body;
        var  res= await spanner.delete({
            tableName:'message',
            rules:`where id=${id}`
            })
            ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'post',
    path:'/api/addMessage',
    handler:addMessage
},{
    method:'post',
    path:'/api/getMessage',
    handler:getMessage
},{
    method:'post',
    path:'/api/deleteMessage',
    handler:deleteMessage
}]