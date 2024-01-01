import { toLogin } from '@/api/index'
import jwt from 'jwt-decode'
import { Message } from 'element-ui';

export default {
    namespaced:true,  //开启命名空间
    // 状态，数据
    state:{
        userinfo:{
            username: (localStorage.getItem('userinfo')&&JSON.parse(localStorage.getItem('userinfo')).username) || '',
            token: (localStorage.getItem('userinfo')&&JSON.parse(localStorage.getItem('userinfo')).token) || ''
        }
    },
    // 修改state里数据的唯一方式
    mutations:{
        //设置用户信息
        setUserInfo(state, payload){
            state.userinfo = payload;
        },
        //清空
        clearUser(state){
            state.userinfo = {
                username: '',
                token: ''
            }
            // 清空持久化
            localStorage.removeItem('userinfo');
        }
    },
    // 异步
    actions:{
        // 去登录，获取登录信息并触发mutation
        async toLogin({commit}, params){ 
            try {
                const res = await toLogin(params);
                if(res.status == 200){
                    // 解析token
                    console.log(jwt(res.data));
                    let userinfo = {
                        username: jwt(res.data).username,
                        token: res.data
                    }
                    // 存数据
                    commit('setUserInfo', userinfo);
                    // 数据持久化
                    localStorage.setItem('userinfo', JSON.stringify(userinfo));
                    Message.success("登录成功！");
                }else{
                    Message.error("登录失败，请检查账号或密码！")  //发送请求后的验证（错误提示：可在vuex例用elementUI来提示，也可在ajax二次封装时进行响应拦截时用elementUI来做错误提示）
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    // 包装数据，不修改
    getters:{

    }
}