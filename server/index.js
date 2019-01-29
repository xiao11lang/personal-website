const Koa=require('koa')
const koaBody = require('koa-body');
const router=require('./routes/route')
const session=require('koa-session')
var app=new Koa()
const logUtil = require('./log');
app.keys = ['personal_serect'];
 
const CONFIG = {
  key: 'sessionid', 
  maxAge: 86400000,
  autoCommit: true, 
  overwrite: true, 
  httpOnly: false, 
  signed: true, 
  rolling: false, 
  renew: false, 
};
 
app.use(session(CONFIG, app));
app.use(async (ctx, next) => {
  const start = new Date();
  var ms;
  try {
    await next();
    ms = new Date() - start;
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
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