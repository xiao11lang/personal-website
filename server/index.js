const Koa=require('koa')
const koaBody = require('koa-body');
const router=require('./routes/route')
var app=new Koa()
//log工具
const logUtil = require('./log');


// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);

  } catch (error) {

    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:"/data",
        keepExtensions:true
    }
}))
app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)