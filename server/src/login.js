const formidable = require("formidable")
const MonggoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
function loginMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        login(fields,res)
    })
}
function registerMiddleware(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        register(fields,res)
    })
}
function login(fields, res) {
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("users")
            userInfo.find({
                userName: fields.userName
            }).toArray(function (err, doc) {
                if (doc.length == 0) {
                    res.send("not_exist")
                } else if (doc[0].password !== fields.password) {
                    res.send("pass_error")
                } else {
                    res.send('success')
                }
            })

            client.close()
        }
    })
}

function register(fields, res) {
    MonggoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            const db = client.db("userInfo")
            var userInfo = db.collection("users")
            userInfo.find({
                userName: fields.userName
            }).toArray(function (err, doc) {
                console.log(doc)
                if (doc.length !== 0) {
                    res.send("exist")
                    client.close() //回调中关闭连接
                } else {
                    userInfo.insertOne({
                        userName: fields.userName,
                        password: fields.password,
                        admin:false
                    }, function (err, res) {
                        if (err) {
                            console.log(err)
                        }
                    })
                    res.send("success")
                    client.close()
                }
            })

        }
    })
}
module.exports={
    login:loginMiddleware,
    register:registerMiddleware
}
