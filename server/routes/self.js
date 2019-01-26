const Spanner=require('../until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getSelfInfo(ctx) {
    try{
        var selfInfo=await spanner.query({
            tableName:"selfInfo"
        })
        var itemList=await spanner.query({
            tableName:"itemList"
        })
        var info={}
        selfInfo.forEach(function(v){
            v.itemLists=itemList.filter(function(item){
                return item.type==v.subject
            })
            if(info[v.infoType]){
                info[v.infoType].push(v)
            }else{
                info[v.infoType]=[v]
            }
        })

        ctx.body=info
    }catch(e){
        console.log(e)
    }
}
module.exports=[{
    method:'get',
    path:'/api/getSelfInfo',
    handler:getSelfInfo
}]