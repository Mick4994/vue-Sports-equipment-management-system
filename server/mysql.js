//连接数据库  1.安装mysql 2.创建连接
const mysql = require('mysql')

//创建数据库连接
const client = mysql.createConnection({
    host: '', //数据域名 地址
    user: '', //数据名称
    password: '', //数据库密码 xampp集成
    database: '',
    // port: '3306'  //默认端口号是3306，可以不写，但是如果修改了，就要写上修改的端口号
})

//封装数据库操作语句 sql语句 参数数组arr  callback成功函数结果
function sqlFn(sql, arr,callback) {
    console.log(sql, arr);  //输出
    client.query(sql,arr, function (error, result) {
        if (error) {
            console.log(error);
            console.log('数据库语句错误');
            return;
        }
        callback(result)
    })

}

module.exports=sqlFn