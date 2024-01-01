import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/reset.css'
import i18n from '@/lang/index.js'
import '@/router/permission'
// echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  // 第一种方法：el: '#xxx',
  // el: "#app",
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
//第二种方法：.$mount('#xxx')