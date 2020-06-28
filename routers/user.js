const Router = require('koa-router');
const db = require('../db');
const router = new Router()
//更新用户信息——————————————————
router.get('/userinfo', async (ctx, next) => {
    // console.log(ctx.state.user);
    let sql = 'select * from user where id=?';
    let r = await db(sql, ctx.state.user.id)
    // console.log(r);
    if (r && r.length > 0) {
        ctx.body = ({ status: 0, message: '获取用户信息成功', data: r[0] })
    } else {
        ctx.body = ({ status: 1, message: '获取用户信息失败' })
    }
})
router.post('/userinfo', async ctx => {
    let sql = 'update user set ? where id =?';

    let r = await db(sql, [ctx.request.body, ctx.request.body.id]);
    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '更新用户信息成功' }
    } else {
        ctx.body = { status: 1, message: '更新用户信息失败' }
    }
})


//重置密码——————————————————————
//更换头像——————————————————————
module.exports = router