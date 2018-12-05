const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getBarrage(ctx) {
    try{
        var barrage=await spanner.query({
            tableName:"barrage"
        })
        ctx.body=barrage
    }catch(e){
        console.log(e)
    }
}
async function addBarrage(ctx){
    try{
        var res=await spanner.insert({
            tableName:'barrage',
            fields:['content'],
            values:[ctx.request.body.content]
        })
        ctx.body='success'
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'get',
    path:'/api/getBarrage',
    handler:getBarrage
},{
    method:'post',
    path:'/api/addBarrage',
    handler:addBarrage
}]