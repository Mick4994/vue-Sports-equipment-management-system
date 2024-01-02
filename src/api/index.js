// 所有的请求函数
import ajax from "./ajax"
import base from "./base"
//node.js
import qs from 'qs'

/* 
    查询商品列表
    params: {page:xxx}
*/
export const getGoodsList = (params)=>ajax.get(base.goodsList, {params})

/* 
    查询搜索列表
    get传参方式：
        1、字符串拼接  ?search=xxx&name=123
        2、params   axios.get(url,{params:{search:xxx}})  //当xxx为params时，params:{search:xxx}可以简写params
    params: {search:xxx}
*/
export const getSearchList = (params)=>ajax.get(base.searchList, {params})

/* 
    请求类目选择
    参数: {id:cid}
    selectCategory
*/
export const getCategory = (params)=>ajax.get(base.selectCategory, {params})

/* 
    添加商品
    参数： title cid  category sellPoint price num desc paramsInfo image
*/
export const addGoods = (params)=>ajax.get(base.addGoods, {params})

/* 
    删除商品
    参数： id
*/
export const delGoods = (params)=>ajax.get(base.delGoods, {params})

/* 
    商品编辑
    参数：id title cid  category sellPoint price num desc paramsInfo image
*/
export const updateGoods = (params)=>ajax.get(base.updateGoods, {params})

/* 
    登录
    参数：username、password
    post请求，在前端node环境下需要引入const qs = require("querystring") ，后端不能解析json数据时，也需要前端引入
*/
export const toLogin = (params)=>{
    console.log(params, qs.stringify(params));
    return ajax.post(base.login, qs.stringify(params))
}

//修改密码
export const toModifyPwd = (params)=>{
    console.log(params, qs.stringify(params));
    return ajax.post(base.modifyPwd, qs.stringify(params))
}

/* 
    规格参数列表  参数： page
    @param {*} params
    @returns {page:1}
*/
export const getParamsList = (params)=>ajax.get(base.paramsUrl, {params})

/* 
    规格参数添加  
    参数：itemCatId,content,specsName
*/
export const addParams = (params)=>ajax.get(base.insertItemParam, {params})

/* 
    规格参数类目结构数据获取 cid 
    参数：{cid:''}
*/
export const getCategoryData = (params)=>ajax.get(base.categoryData, {params})

/* 
    规格参数删除
    参数：id
*/
export const delParams = (params)=>ajax.get(base.delParams, {params})

/* 
    规格参数查询
    参数：search
*/
export const getSearchParams = (params)=>ajax.get(base.searchParams, {params})

/* 
    规格参数修改
    参数：cid content id  specsName
*/
export const updateParams = (params)=>ajax.get(base.updateParams, {params})

/* 
    内容分类管理 查询
    参数： id
*/
export const contentList = (params)=>ajax.get(base.contentList, {params})

/* 
    内容分类管理 添加
*/
export const contentAdd = (params)=>ajax.get(base.contentAdd, {params})

/* 
    内容分类管理 修改
*/
export const contentUpdate = (params)=>ajax.get(base.contentUpdate, {params})

/* 
    内容分类管理 删除
*/
export const contentDel = (params)=>ajax.get(base.contentDel, {params})

/* 
    内容分类管理 内容查询
*/
export const contentInfoList = (params)=>ajax.get(base.contentInfoList, {params})

/* 
    内容分类管理 内容添加
*/
export const contentInfoAdd = (params)=>ajax.get(base.contentInfoAdd, {params}) 

/* 
    内容分类管理 内容删除
    {params} 是{params:params} 的简写（对象的属性名和属性值名称一样时，都可以简写）
*/
export const contentInfoDel = (params)=>ajax.get(base.contentInfoDel, {params})

/*
    获取用户列表
*/
export const usersList = (params)=>ajax.get(base.usersList, {params})

/*
    获取用户列表
*/
export const maintenancePersonnel = (params)=>ajax.get(base.maintenancePersonnel, {params})

// 获取客户表
export const getCustomerList = (params)=>ajax.get(base.customerList, {params})

// 获取业务负责人表
export const getBusinessPersonnel = (params)=>ajax.get(base.businessPersonnel, {params})

// 获取器材表
export const getApparatusList = (params)=>ajax.get(base.apparatusList, {params})

// 删除用户
export const delUser = (params)=>ajax.get(base.delUser, {params})

// 删除用户
export const addUser = (params)=>ajax.get(base.addUser, {params})

// 删除用户
export const editUser = (params)=>ajax.get(base.editUser, {params})

