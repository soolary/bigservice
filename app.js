const koa = require('koa');
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const path = require('path')
const fs = require('fs')
const util = require('util')
const koaJWT = require('koa-jwt')
const errorHandler = require('./routers/error')
const Router = require('koa-router')
const router = new Router()
const app = new koa();
// errorHandler(app)//错误处理
const cors = require('koa2-cors');
app.use(cors({
    // origin: '*',
    // maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    // credentials: true, //是否允许发送Cookie
    // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    // allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with'], //设置服务器支持的所有头信息字段
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}));

app.use(koaJWT({ secret: 'bigevent' }).unless({ path: /^\/api/ }))

// app.use(async (ctx, next) => {
//     ctx.set('Assess-Control-Allow-Origin', '*');
//     next()
// })
// app.use(bodyparse())
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小，缺省2M
        onFileBegin: (name, file) => { // 文件上传前的设置
            const fp = path.join(__dirname, 'public/upload/');
            if (!fs.existsSync(fp)) { // 检查是否有“public/upload/”文件夹
                fs.mkdirSync(fp); // 没有就创建
            }
            console.log(`bodyparse: name:${name}; file:${util.inspect(file)}`);
        }
    }
}))
app.use(ctx => {
    console.log(`files:${util.inspect(ctx.request.body.fields)}; body:${util.inspect(ctx.request.body.files)}`);
    ctx.body = ctx.request.body;
});

let loginRouter = require('./routers/login')
let cetegroyRouter = require('./routers/cetegory');
let articleyRouter = require('./routers/article');
let userRouter = require('./routers/user');

router.use('/api', loginRouter.routes())
router.use('/my/article', cetegroyRouter.routes());
router.use('/my/article', articleyRouter.routes());
router.use('/my', userRouter.routes());
app.use(router.routes())
    .use(router.allowedMethods);
app.listen(3007, () => {
    console.log('big event running```````');
});