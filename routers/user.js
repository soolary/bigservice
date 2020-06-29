const Router = require('koa-router');
const db = require('../db');
const router = new Router()
const utility = require('utility')
//更新用户信息——————————————————
router.get('/userinfo', async (ctx, next) => {
    // console.log(ctx.state.user);
    let sql = 'select * from user where id=?';
    let r = await db(sql, ctx.state.user.id)
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
router.post('/updatepwd', async (ctx) => {


    let oldPwd = utility.md5(ctx.request.body.oldPwd)
    let newPwd = utility.md5(ctx.request.body.newPwd)


    let r1 = await db('select * from user where password=?and id =?', [oldPwd, ctx.state.user.id])
    if (r1 && r1.length > 0) {
        let r2 = await db('update user set password=?where id=?', [newPwd, ctx.state.user.id]);
        if (r2 && r2.affectedRows > 0) {
            ctx.body = { status: 0, message: '更新密码成功' }
        } else {
            ctx.body = { status: 1, message: '更新密码失败' }
        }
    } else {
        ctx.body = { status: 1, message: '原密码错误' }
    }

})
//更换头像——————————————————————
router.post('/update/avatar', async ctx => {
    let sql = 'update user set user_pic =? where id=?';
    let r = await db(sql, [ctx.request.body.avatar, ctx.state.user.id]);


    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '更新头像成功' };
    } else {
        ctx.body = { status: 1, message: '更新头像失败' }
    }
})
module.exports = router