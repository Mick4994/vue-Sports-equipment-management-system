const express = require('express')
const router = express.Router()
//token
const jwt = require('jsonwebtoken')
//秘钥
const config = require('./secert')
//连接数据库   sqlFn('sql',[],res=>{})
const sqlFn = require('./mysql')
//图片上传支持的模块
const multer= require('multer')
const fs = require('fs')

const moment = require('moment')

// 导入mockjs(用来模拟数据)
const Mock = require("mockjs")


//测试接口
router.get('/', (req, res) => {
    res.send('hello')
})

//登录接口
/**
 * 语法：
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 *  jwt.sign({},'秘钥','过期时间,{expiresIn:20*1,'1day''1h'}')
 */

/**
 * 登录 login
 * 接受字段：username、password
 * 测试：postman
 */
router.post('/login', (req, res) => {
    let {
        username,
        password
    } = req.body
    //请求数据库
    console.log(req.body);
    let sql = "select * from userinfo where username=? and password=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }

    })
})

/**
 * 注册接口 /register
 */
router.post("/register", (req, res) => {
    const {
        username,
        password
    } = req.body;
    const sql = "insert into userinfo values(null,?,?)";
    const arr = [username, password];
    sqlFn(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                msg: "注册成功",
                status: 200
            })
        } else {
            res.status(401).json({
                errors: "用户名密码错误"
            })
        }
    })
})

/**
 * 租赁列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get('/historyList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "SELECT L.order_id, A.apparatus_name, C.customer_name, \
    L.count, L.count * A.price AS summy, \
     L.lease_date, L.return_date, B.business_personnel_name, L.notes, \
     L.apparatus_id, L.customer_id, B.business_personnel_id \
     FROM lease_record L \
     JOIN customer C on L.customer_id=C.customer_id \
     JOIN apparatus A on L.apparatus_id=A.apparatus_id \
     JOIN business_personnel B on L.business_personnel_id=B.business_personnel_id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "SELECT L.order_id, A.apparatus_name, C.customer_name, \
        L.count, L.count * A.price AS summy, \
         L.lease_date, L.return_date, B.business_personnel_name, L.notes, \
         L.apparatus_id, L.customer_id, B.business_personnel_id \
         FROM lease_record L \
         JOIN customer C on L.customer_id=C.customer_id \
         JOIN apparatus A on L.apparatus_id=A.apparatus_id \
         JOIN business_personnel B on L.business_personnel_id=B.business_personnel_id \
         order by order_id asc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
                // console.log(result)
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })


})



/**
 * 商品查询接口 search
 * 参数：search
 */
router.get("/search", (req, res) => {
    var search = req.query.search;
    const sql = "SELECT L.order_id, A.apparatus_name, C.customer_name, \
    A.apparatus_id, C.customer_id, B.business_personnel_id, \
    L.count, L.count * A.price AS summy, \
     L.lease_date, L.return_date, B.business_personnel_name, L.notes \
     FROM lease_record L \
     JOIN customer C on L.customer_id=C.customer_id \
     JOIN apparatus A on L.apparatus_id=A.apparatus_id \
     JOIN business_personnel B on L.business_personnel_id=B.business_personnel_id \
      where concat(`apparatus_name`,`customer_name`,`business_personnel_name`,`notes`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})




/**
 * 类目选择
 * 接口说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：id  
 * {id: cid}
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    const id = req.query.id || 1;
    const sql = "select * from category where id=?"
    var arr = [id];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


/**
 * 商品添加
 * 参数： title cid  category sellPoint price num desc paramsInfo image
 */
 router.get("/backend/item/insertTbItem", (req, res) => {
    /**
     * 获取参数
     */
    var apparatus_name = req.query.apparatus_name || "";
    var customer_name = req.query.customer_name || "";
    var lease_date = moment(req.query.lease_date).format('YYYY-MM-DD') || "";
    var return_date = moment(req.query.return_date).format('YYYY-MM-DD') || "";
    var business_personnel_name = req.query.business_personnel_name || "";
    var count = req.query.count || "";
    var notes = req.query.notes || "";

    const sql = " INSERT INTO lease_record \
    (customer_id, apparatus_id, lease_date, return_date, business_personnel_id, `count`, notes) \
    SELECT C.customer_id, A.apparatus_id, ?, ?, B.business_personnel_id, ?, ? \
    FROM lease_record L \
    JOIN customer C \
    JOIN apparatus A on L.apparatus_id=A.apparatus_id \
    JOIN business_personnel B on L.business_personnel_id=B.business_personnel_id \
    WHERE C.customer_name=? \
    AND A.apparatus_name=? \
    AND B.business_personnel_name=?";
    var arr = [lease_date, return_date, count, notes, customer_name, apparatus_name, business_personnel_name];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
 * 商品删除接口 id
 */
 router.get("/backend/item/deleteItemById", (req, res) => {
    var id = req.query.order_id;
    console.log(req.query.order_id);
    const sql = "delete from lease_record where order_id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})


/**
 * 批量删除 batchDelete  idArr Array  id标识
 * sql = "delete from A where id in (1,2,3)"  
 */
 router.get("/batchDelete", (req, res) => {
    let arr=req.query.idArr;//[] 数组格式 需要传递数据是 离散的数字格式 
    // const sql =`delete from project where id in (?)`;
    let sql='';
    function fun(arr){//sql =`delete from project where id in (101,102,103)`;
        sql=`delete from project where id in (`
            for(let i=0;i<arr.length;i++){
                sql+= arr[i]+',' //101,102,
            }
            sql=sql.slice(0,-1) 
            sql=sql+')'
            // console.log(sql);
    }
    fun(arr)
    sqlFn(sql, null, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})




/**
 * 修改租赁记录
 */

 router.get("/backend/item/updateTbItem", (req, res) => {
    console.log(req.query);
    var order_id = req.query.order_id || 0;
    var apparatus_name = req.query.apparatus_name || "";
    var customer_name = req.query.customer_name || "";
    var lease_date = moment(req.query.lease_date).format('YYYY-MM-DD') || "";
    var return_date = moment(req.query.return_date).format('YYYY-MM-DD') || "";
    var business_personnel_name = req.query.business_personnel_name || "";
    var count = req.query.count || "";
    var notes = req.query.notes || "";
    var sql = "update lease_record set apparatus_id=(SELECT apparatus_id FROM apparatus WHERE apparatus_name=?), \
    customer_id=(SELECT customer_id FROM customer WHERE customer_name=?), \
    lease_date=?,return_date=?, \
    business_personnel_id=(SELECT business_personnel_id FROM business_personnel WHERE business_personnel_name=?), \
    count=?,notes=? where order_id=?";
    var arr = [apparatus_name, customer_name, lease_date, return_date, business_personnel_name, count, notes, order_id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


/*
    获取用户列表
*/
router.get("/usersList", (req, res) => {
    const sqlLen = "SELECT customer_name, contact_number, address FROM customer";
    sqlFn(sqlLen, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


/**
 * 获取器材表  参数 page
 */
 router.get("/backend/itemParam/selectItemParamAll", (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select A.*, M.maintenance_personnel_name \
    from apparatus A \
   JOIN maintenance_personnel M ON \
   M.maintenance_personnel_id=A.maintenance_personnel_id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select A.*, M.maintenance_personnel_name \
        from apparatus A \
       JOIN maintenance_personnel M ON \
       M.maintenance_personnel_id=A.maintenance_personnel_id \
        order by apparatus_id asc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                // const moment = require('moment');
                // result.expiration_date = moment(result.expiration_date).format('YYYY-MM-DD');
                console.log(result[0].expiration_date)
                res.send({
                    status: 200,
                    data: result,
                    pageSize:8,
                    total:len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 *  器材 模糊查询  参数：search
 */
router.get("/params/search", (req, res) => {
    var search =req.query.search;
    const sql = "select * from apparatus where concat(`apparatus_name`) like '%" + search + "%'";
    sqlFn(sql, [search], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 器材 添加 
 * 参数：itemCatId,content,specsName
 */
 router.get("/backend/itemParam/insertItemParam", (req, res) => {
    var apparatus_name = req.query.apparatus_name;
    var price = req.query.price;
    var count = req.query.count;
    var expiration_date = req.query.expiration_date;
    var maintenance_personnel_name = req.query.name;
    // console.log(itemCatId, paramsContent,specsName);
    var sql = "INSERT INTO apparatus \
        (apparatus_name, expiration_date, price, maintenance_personnel_id, count) \
        SELECT ?, ?, ?, M.maintenance_personnel_id, ? \
        FROM maintenance_personnel M \
        WHERE M.maintenance_personnel_name = ?";
    sqlFn(sql, [apparatus_name, expiration_date, price, count, maintenance_personnel_name], result => {
        // console.log('result:',result);
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
 * 修改器材
 */
router.get("/update/category", (req, res) => {
    console.log(req.query);
    var apparatus_id = req.query.apparatus_id;
    var apparatus_name = req.query.apparatus_name;
    var expiration_date = req.query.expiration_date;
    var price = req.query.price;
    var count = req.query.count;
    var maintenance_personnel_name = req.query.maintenance_personnel_name;
    var sql = "update apparatus set apparatus_name=?, expiration_date=?, \
    price=?, count=?, maintenance_personnel_id=\
    (SELECT maintenance_personnel_id FROM maintenance_personnel\
    WHERE maintenance_personnel_name=?)\
     where apparatus_id=?";
    // var sql = "update params set paramData=? where itemCatId=?";
    // sqlFn(sql, [content, cid], result => {
    sqlFn(sql, [apparatus_name, expiration_date, price, count, maintenance_personnel_name, apparatus_id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 删除器材
 */
router.get("/params/delete", (req, res) => {
    var id = req.query.id;
    const sql = "delete from apparatus where apparatus_id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

// 获取维护人员表
router.get("/maintenancePersonnel", (req, res) => {
    const sql = "select maintenance_personnel_name from maintenance_personnel"
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查找失败"
            })
        }
    })
})

// 获取客户表
router.get("/customerList", (req, res) => {
    const sql = "select customer_name from customer"
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查找失败"
            })
        }
    })
})

// 获取业务负责人表
router.get("/businessPersonnel", (req, res) => {
    const sql = "select business_personnel_name from business_personnel"
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查找失败"
            })
        }
    })
})

// 获取器材表
router.get("/apparatusList", (req, res) => {
    const sql = "select apparatus_name from apparatus"
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查找失败"
            })
        }
    })
})

//修改密码
router.post('/modifyPwd', (req, res) => {
    try {
        let {
            username,
            old_password,
            new_password
        } = req.body
        //请求数据库
        console.log(req.body);
        let sql = "select * from userinfo where username=? and password=?";
        let arr = [username, old_password]
        sqlFn(sql, arr, result => {
            if (result.length > 0) {
                // console.log()
                let sql = "UPDATE userinfo SET password=? WHERE username=?";
                // console.log(result.data[0])
                let arr = [new_password, username]
                sqlFn(sql, arr, result => {
                    if (result.affectedRows > 0) {
                        // console.log(result)
                        res.send({
                            status: 200,
                            msg: 'success!!'
                        })
                    } else {
                        res.send({
                            status: 404,
                            msg: '信息错误'
                        })
                    }
                })
            } else {
                res.send({
                    status: 404,
                    msg: '密码错误'
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 404,
            msg: '信息错误'
        })
    }

    
})
module.exports = router