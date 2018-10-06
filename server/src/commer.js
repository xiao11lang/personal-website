const MonggoClient = require("mongodb").MongoClient;
const formidable = require("formidable")
const url = "mongodb://localhost:27017";
function getCommer(req,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("commer")
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
function addCommer(fields,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("commer")
             userInfo.insertOne({
                commerName:fields.commerName
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
function addCommerMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        addCommer(fields,res)
    })
}
module.exports={
    getCommer,addCommerMiddleware
}