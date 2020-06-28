const koa = require('koa');
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const router = new Router()
const app = new koa();
const cors = require('koa2-cors')
app.use(cors());
// app.use(async (ctx, next) => {
//     ctx.set('Assess-Control-Allow-Origin', '*');
//     next()
// })
app.use(bodyParser())

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