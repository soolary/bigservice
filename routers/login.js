const Router = require('koa-router')
const router = new Router();
const db = require('../db')
const utility = require('utility')
const jwt = require('jsonwebtoken')

router.post('/reguser', async (ctx, next) => {
    ctx.request.body.password = utility.md5(ctx.request.body.password);
    // console.log(ctx.request.body);
    // return;

    let r = await db('insert into user set ?', ctx.request.body);
    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '注册成功' }
    } else {
        ctx.body = { status: 1, message: '注册失败' };
    }
})
router.post('/login', async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = utility.md5(ctx.request.body.password)
    // console.log(username, password);
    // return

    let sql = 'select * from user where username=? and password=?'
    let r = await db(sql, [username, password]);
    if (r && r.length > 0) {
        let token = 'Bearer ' + jwt.sign(
            { id: r[0].id },
            'bigevent',
            { expiresIn: '2 days' });
        ctx.body = { status: 0, message: '登录成功', token: token }
    } else {
        ctx.body = { status: 1, message: '登录失败,账号或密码错误' }
    }
})


module.exports = router