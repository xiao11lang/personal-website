const express=require('express')
const {login,register}=require('./login')
const {getMessage,publish}=require('./message')
const app=express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    next();
});
app.post('/login',login)
app.post('/register',register)
app.get('/message',getMessage)
app.post('/message',publish)
app.listen(3000)