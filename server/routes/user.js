const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function login(ctx) {
    try{
        var res=await spanner.query({tableName:'user',rules:`where userName='${ctx.request.body.userName}'`})
        if(res.length==0){
            ctx.body='not_exist'
        }else if(res[0].password!=ctx.request.body.password){
            ctx.body='pass_error'
        }else{
            var {userName,admin,avatar}=res[0]
            ctx.session.userName=userName
            ctx.body={
                userName,admin,avatar
            }
        }
    }catch(e){
        console.log(e)
    }
}
async function register(ctx){
    try{
        var user=await spanner.query({
            tableName:'user',
            rules:`where userName='${ctx.request.body.userName}'`
        })
        if(user.length>0){
            ctx.body='exist'
        }else{
            var body=ctx.request.body
            var res=await spanner.insert({
                tableName:'user',
                fields:['userName','password'],
                values:[body.userName,body.password]
            })
            ctx.body=res
        }
    }catch(e){
        console.log(e)
    }
}
async function modifyAvatar(ctx){
    try{
        var res=await spanner.update({
            tableName:'user',
            fields:['avatar'],
            values:[ctx.request.body.avatar],
            rules:`where userName='${ctx.request.body.userName}'`
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'post',
    path:'/api/login',
    handler:login
},{
    method:'post',
    path:'/api/register',
    handler:register
},{
    method:'post',
    path:'/api/modifyAvatar',
    handler:modifyAvatar
}]