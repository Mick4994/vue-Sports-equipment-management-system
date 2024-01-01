const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {  //配置代理（解决跨域）
        '/api': {//http://192.168.xx.xx/api/xx/  后台接口：相对路径 
            target: 'http://localhost:8989',//目的地址路径 本地研发环境
            changeOrigin: true,//允许跨域
            pathRewrite: {//重定向
                "^/api": ""
            }
        },
        //.... 
    }
  }
})
