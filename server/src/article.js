const MonggoClient = require("mongodb").MongoClient;
const formidable = require("formidable")
const url = "mongodb://localhost:27017";
function getArticle(req,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("article")
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
function newArticle(fields,res){
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            let isOriginal=fields.isOriginal==='true'?true:false
            var userInfo = db.collection("article")
             userInfo.insertOne({
                title:fields.title,
                content:fields.content,
                type:fields.type,
                writeTime:fields.writeTime,
                isOriginal:isOriginal,
                readCount:0,
                thumpUp:0,
                path:fields.path
            },function(err){
                if(err){
                    console.log(err);
                }else{
                    res.send('success')
                }
            }) 
            console.log(fields)
            client.close()
        }
    })
}
function newArticleMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        console.log(fields)
        newArticle(fields,res)
    })
}
module.exports={
    getArticle,
    newArticleMiddleware
}