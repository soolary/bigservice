const Router = require('koa-router')
const router = new Router();
const db = require('../db')
router.get('/cates', async (ctx, next) => {
    let r = await db('select * from category');
    // let result2 = await db('none', null, 'select count(*) total from student');
    if (r) {
        ctx.body = { status: 0, message: '获取文章分类列表成功', data: r }
    } else {
        ctx.body = { status: 1, message: '获取分类信息失败' };
    }
})
router.post('/addcates', async (ctx, next) => {
    // ctx.set('Content-Type', 'application/json')
    let r = await db('insert into category set ?', ctx.request.body);
    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '添加类别成功' }
    } else {
        ctx.body = { status: 1, message: '添加类别失败' };
    }
});
router.delete('/deletecate/:id', async (ctx, next) => {
    let id = ctx.params.id
    let r = await db('delete from category where id = ?', id)
    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '删除分类成功' }
    } else {
        ctx.body = { status: 1, message: '删除分类失败' };
    }
});
router.post('/updatecate', async (ctx, next) => {
    // let id = ctx.params.id
    let r = await db('update category set ? where id = ?', [ctx.request.body, ctx.request.body.Id])

    if (r && r.affectedRows > 0) {
        ctx.body = { status: 0, message: '修改分类成功' }
    } else {
        ctx.body = { status: 1, message: '修改分类失败' };
    }
})
module.exports = router