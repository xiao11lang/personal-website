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
        var typeDes=await spanner.query({
            tableName:"typeDes"
        })
        var info={}
        typeDes.forEach(function(des){
            info[des.infoType]={}
            info[des.infoType].title=des.title;
            info[des.infoType].subTitle=des.subTitle;
            info[des.infoType].class=des.class;
            info[des.infoType].details=[];
        })
        selfInfo.forEach(function(v){
            v.itemLists=itemList.filter(function(item){
                return item.type==v.subject
            })
            info[v.infoType].details.push(v)
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