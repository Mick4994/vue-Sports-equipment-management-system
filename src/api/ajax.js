import axios from "axios";
// import base from "./base"


// ajax二次封装(分为四步)

const service = axios.create({
    baseURL:'/api',  //这里走proxy代理的地址，也可以写baseURL:base.baseUrl
    timeout:1000  //请求超时时间
})
// 请求拦截
service.interceptors.request.use(config => {

    return config
})
// 响应拦截
service.interceptors.response.use(res => {
    // console.log(res);
    // if(res.status == 200 && res.data.code == 200 && res.data.msg == "success"){
    //     return res.data;
    // }else if(res.status == 200 && res.data.msg == ''){
    //     return Promise.reject(res.data.msg);
    // }

    return res.data;  // 成功
}, err => {
    return Promise.reject(err);  // 失败
})
// 导出
export default service;