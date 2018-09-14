const MonggoClient = require("mongodb").MongoClient;
const formidable = require("formidable")
const url = "mongodb://localhost:27017";
function getMessage(req,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("message")
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
function publishMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        console.log(fields)
        publish(fields,res)
    })
}
function publish(fields,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("message")
            userInfo.insertOne({
                userName:fields.userName,
                content:fields.content,
                time:fields.time
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
module.exports={
    getMessage:getMessage,
    publish:publishMiddleware
}