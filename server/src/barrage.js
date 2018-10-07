const MonggoClient = require("mongodb").MongoClient;
const formidable = require("formidable")
const url = "mongodb://localhost:27017";
function getBarrage(req,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("barrage")
            userInfo.find().toArray(function (err, doc) {
                if(err){
                    console.log(err);
                }else{
                    res.send(doc)
                }
            })

            client.close()
        }
    })
}
function newBarrage(fields,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("barrage")
             userInfo.insertOne({
                content:fields.content,
            },function(err){
                if(err){
                    console.log(err);
                }else{
                    res.send('success')
                }
            }) 
            client.close()
        }
    })
}
function newBarrageMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        newBarrage(fields,res)
    })
}
module.exports={
    getBarrage,
    newBarrageMiddleware
}