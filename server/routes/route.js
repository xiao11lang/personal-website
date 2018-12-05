const user=require('./user')
const Router=require('koa-router')
const cors=require('koa2-cors')
var router=new Router();
router.use(cors())
var routeConfig=[].concat(user)
routeConfig.forEach((conf)=>{
    router[conf.method](conf.path,conf.handler)
})
module.exports=router