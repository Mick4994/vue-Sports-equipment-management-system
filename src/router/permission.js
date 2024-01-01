import router from './index'
import store from '@/store/index'

// 路由拦截
router.beforeEach((to, from, next) => {

    // matched 包含父路由和当前路由
    // console.log(to.matched);
    let isLogin = to.matched.some(item => item.meta.isLogin)
    if(isLogin){  // 需要登录
        let token = store.state.LoginModule.userinfo.token;  // 取token值
        if(token){
            next();
        }else{
            next('/login');
        }
    }else{
        next();  // 放行
    }
})