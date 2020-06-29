const Router = require('koa-router');
const db = require('../db');
const router = new Router()
router.get('/list', async (ctx) => {
    let { pagenum, pagesize, cate_id, state } = ctx.query
    let w = '';
    if (cate_id) {
        w += `and cate_id=${cate_id} `
    }
    if (state) {
        w += `and state='${state}'`
    };
    let sql = `select a.Id,a.title,a.state,a.pub_date,c.name cate_name from article a join category c on a.cate_id=c.Id
    where author_id = ? and is_delete = ? ${w} 
    limit ${(pagenum - 1) * pagesize},${pagesize}`;
    // console.log(ctx.state.user.id);
    let sql2 = `select count(*) total from article a join category c on a.cate_id=c.Id
where author_id = ? and is_delete = ? ${w}`
    let r = await db(sql, [ctx.state.user.id, 1]);
    let r2 = await db(sql2, [ctx.state.user.id, 1])
    if (r) {
        ctx.body = {
            status: 0,
            message: '获取文章列表成功',
            data: r,
            total: r2[0].total
        };
    } else {
        ctx.body = {
            status: 1,
            message: '获取文章列表数据失败'
        }
    }
})
module.exports = router