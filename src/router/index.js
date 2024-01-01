//路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Login from '@/views/Login/Login'  //要在vue.config.js里配置@等同于/src目录，才能用@
import Home from '@/views/Home/Home.vue'

// 异步组件（实现路由懒加载）
// const Home = () => import('@/views/Home')
const Goods = () => import('@/views/Goods/Goods')
const AddGoods = () => import('@/views/Goods/AddGoods')
const Store = () => import('@/views/Store/Store')
// const Rule = () => import('@/views/Params/Rule')
const Setting = () => import('@/views/Setting/Setting')
const User = () => import('@/views/User/User')
// const Order = () => import('@/views/Order/Order')
// const OrderList = () => import('@/views/Order/OrderList')
// const OrderBack = () => import('@/views/Order/OrderBack')

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
    // 所有路由
    routes: [
        {
            path: '/',
            component: Layout,
            // 路由元信息，配置给父组件，就会拦截下面所有的子组件
            meta:{
                isLogin: true
            },
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: Home
                },
                {
                    path: '/goods',
                    name: 'Goods',
                    component: Goods
                },
                {
                    path: '/add-goods',
                    name: 'AddGoods',
                    component: AddGoods
                },
                {
                    path: '/store',
                    name: 'Store', 
                    component: Store,
                    // redirect: '/params/rule',  // 路由重定向
                    // children: [
                    //     {
                    //         path: 'rule',  // 当父级路径添加了/，子级路径就不需要加了
                    //         name: 'Rule',
                    //         component: Rule
                    //     }
                    // ]
                },
                {
                    path: '/setting',
                    name: 'Setting',
                    component: Setting
                },
                {
                    path: '/user',
                    name: 'User',
                    component: User
                },
                // {
                //     path: '/order',
                //     component: Order,
                //     children:[
                //         {
                //             path: 'order-list',
                //             name: 'OrderList',
                //             component: OrderList
                //         },
                //         {
                //             path: 'order-back',
                //             name: 'OrderBack',
                //             component: OrderBack
                //         }
                //     ]
                // }
            ]
        },
        {
            path: '/login',
            name: 'Login',  //当该路由还存在子路由，则name不用写
            component: Login
        }
    ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject){
    if(onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

// 或者可以分开写
// const routes = []
// const router = new VueRouter({
//     routes
// })
// export default router