const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getCommer(ctx) {
    try{
        var commer=await spanner.query({
            tableName:"commer"
        })
        ctx.body=commer
    }catch(e){
        console.log(e)
    }
}
async function addCommer(ctx){
    try{
        var res=await spanner.insert({
            tableName:'commer',
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
    path:'/api/getCommer',
    handler:getCommer
},{
    method:'post',
    path:'/api/addCommer',
    handler:addCommer
}]