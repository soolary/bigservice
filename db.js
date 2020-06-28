const mysql = require('mysql')

module.exports = (sql, parms = null) => {
    return new Promise((resolve, reject) => {
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '770499571',
            database: 'node'
        });
        conn.connect();
        conn.query(sql, parms, (err, result) => {
            err ? reject(err) : resolve(result);
        })
        conn.end();
    }).catch(err => {
        // console.log(err); // 错误信息就是为了程序员排错的，所以这里输出错误信息就可以，或者把错误信息放到日志文件中。
        console.log('错误的SQL为：' + err.sql);
        console.log('错误的描述：' + err.sqlMessage);
    });

}

// database('create', 'student', [{ id: 10, username: 'wjj' }])
// database('update', 'student', [{ username: 'wj', sex: '男', age: 22 }, 'id= 7'])
// database('delete', 'student', ' id= 1')
// database('reseach', 'student', 'id< 10', (err, result) => {
//     if (err) return console.log(err);
//     console.log(result)
// })