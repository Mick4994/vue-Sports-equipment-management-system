// 基础的接口地址
const base = {
    baseUrl:'http://localhost:8989',  //域名
    goodsList:'/api/historyList',  //租赁列表
    searchList:'/api/search',      //搜索记录
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',  //类目选择
    uploadUrl:'/api/api/upload',  //图片上传（没有使用ajax二次封装接口，所以需要加/api来使用代理）
    addGoods:'/api/backend/item/insertTbItem',  //添加
    delGoods: '/api/backend/item/deleteItemById',  //删除商品
    updateGoods: '/api/backend/item/updateTbItem',   //修改商品
    login: '/api/login',  //登录
    paramsUrl: '/api/backend/itemParam/selectItemParamAll',  //规格参数列表
    insertItemParam: '/api/backend/itemParam/insertItemParam',  //规格参数添加 
    categoryData: '/api/category/data', //规格参数类目结构数据获取 cid
    searchParams: '/api/params/search',   //搜索规格参数
    delParams: '/api/params/delete',  //规格参数删除
    updateParams: '/api/update/category', //修改规格参数 
    contentList: '/api/content/selectContentCategoryByParentId',  //内容分类管理的查询
    contentAdd: '/api/content/insertContentCategory', //内容分类管理添加子导航
    contentUpdate: '/api/content/updateContentCategory', //内容分类管理修改子导航
    contentDel: '/api/content/deleteContentCategoryById',  //内容分类管理删除子导航
    contentInfoList: '/api/content/selectTbContentAllByCategoryId', //内容分类管理  内容查询
    contentInfoAdd: '/api/content/insertTbContent',  //内容分类管理  内容添加
    contentInfoDel: '/api/content/deleteContentByIds',   //内容分类管理  内容删除

    usersList: '/api/usersList', //获取用户列表
    maintenancePersonnel: '/api/maintenancePersonnel', //获取维护人员表
    customerList: '/api/customerList', //获取客户表
    businessPersonnel: '/api/businessPersonnel', //获取业务负责人表
    apparatusList: '/api/apparatusList', //获取器材表
    modifyPwd: '/api/modifyPwd' //修改密码
}

export default base;