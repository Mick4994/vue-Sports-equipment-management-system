<template>
  <div>
    <!-- 
      1、router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 
      2、default-active需要传进去的值就是子导航的index值（也就是其路由值），达到点击路由就可以引起高亮,
      而在跳转时使用$router.path来实现更改默认路由。
    -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#608d5e"
      text-color="#fff"
      router
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      >
      <el-menu-item index="">
        <span slot="title">{{ $t("menu.title") }}</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-location"></i>
        <!-- <span slot="title">数据统计</span> -->
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">租赁管理</span> -->
        <span slot="title">{{ $t("menu.goods") }}</span>
      </el-menu-item>
      <el-menu-item index="/store">
          <i class="el-icon-document"></i>
          <!-- <span>规格参数</span> -->
          <span slot="title">{{ $t("menu.store") }}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-view"></i>
        <span slot="title">{{ $t("menu.contact") }}</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("menu.setting") }}</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  props:["isCollapse"],
  data(){
    return{
      
    }
  }
}
</script>

<style lang="less" scoped>
  .el-menu{
    border-right: 0;
    .el-menu-item.is-active{
      background-color: #17350f !important;
    }
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>