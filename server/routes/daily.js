const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
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
        var res=await spanner.insert({
            tableName:'daily',
            fields:['commerName'],
            values:[ctx.request.body.commerName]
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
}]