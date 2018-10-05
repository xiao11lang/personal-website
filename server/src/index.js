const express=require('express')
const {login,register}=require('./login')
const {getMessage,publish}=require('./message')
const {getArticle,newArticleMiddleware,countAddMiddleware,thumpAddMiddleware}=require('./article')
const {getDaily,newDailyMiddleware}=require('./daily')
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
app.get('/article',getArticle)
app.post('/newArticle',newArticleMiddleware)
app.post('/countAdd',countAddMiddleware)
app.post('/thumpAdd',thumpAddMiddleware)
app.get('/daily',getDaily)
app.post('/newDaily',newDailyMiddleware)
app.use(express.static('./static'))
app.listen(3000)