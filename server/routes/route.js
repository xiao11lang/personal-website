const user=require('./user')
const commer=require('./commer')
const article=require('./article')
const message=require('./message')
const barrage=require('./barrage')
const daily=require('./daily')
const Router=require('koa-router')
const cors=require('koa2-cors')
var router=new Router();
router.use(cors())
var routeConfig=[].concat(user,commer,barrage,article,message,daily)
routeConfig.forEach((conf)=>{
    router[conf.method](conf.path,conf.handler)
})
module.exports=router