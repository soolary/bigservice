const Router = require('koa-router')
const router = new Router();
const db = require('../db')
const utility = require('utility')

router.post('/reguser', async(ctx, next) => {
    ctx.request.query.password = utility.md5(ctx.request.query.password);
    // console.log(ctx.request.query);
    // return;

    let r = await db('insert into user set ?', ctx.request.query);
    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '注册成功' }
    } else {
        ctx.body = { status: 1, message: '注册失败' };
    }
})



module.exports = router