const MonggoClient = require("mongodb").MongoClient;
const formidable = require("formidable")
const url = "mongodb://localhost:27017";
function getDaily(req,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("dailyRecord")
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
function newDaily(fields,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("dailyRecord")
            var path=fields.path.split(' ')
             userInfo.insertOne({
                content:fields.content,
                writeTime:fields.writeTime,
                path:path
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
function newDailyMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        newDaily(fields,res)
    })
}
module.exports={
    getDaily,
    newDailyMiddleware
}