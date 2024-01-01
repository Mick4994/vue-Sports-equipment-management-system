<template>
  <div class="content">
    <div class="header">
      <i v-if="!isCollapse" class="iconfont icon-zhedie" @click="changeMenu"></i>
      <i v-else class="iconfont icon-zhankai" @click="changeMenu"></i>
      <div class="header-right">
        <el-dropdown @command="changeLang">
          <span class="el-dropdown-link">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 欢迎 -->
        <div class="user">
          <!-- <span>欢迎，{{userinfo.username}}</span> -->
          <span>欢迎，{{userinfo.username}}</span>
          <i class="el-icon-circle-close" @click="logout"></i>
        </div>
      </div>
    </div>
    <!-- 路由出口（相当于一个舞台，到谁表演，谁就出场） -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props:["isCollapse"],
  computed:{
    ...mapState('LoginModule', ['userinfo']),
  },
  methods:{
    ...mapMutations('LoginModule', ['clearUser']),
    // 自定义事件，触发父组件的事件
    changeMenu(){
      this.$emit("changeMenu");
    },
        print_logs(){
      console.log(this.userinfo);
    },
    // 切换语言
    changeLang(command){
      console.log(command);
      this.$i18n.locale = command;
    },
    // 退出登录
    logout(){
      // 第一种
      this.$store.commit('LoginModule/clearUser')
      // 第二种  触发清空
      // this.clearUser();
      // 跳转到登录页
      // this.$router.push('/login')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
  .content{
    .header{
      height: 50px;
      line-height: 50px;
      background: #31751d;
      color: #fff;
      .iconfont{
        margin-left: 10px;
        font-size: 25px;
      }
    }
    .header-right{
      float: right;
      margin-right: 20px;
      .user{
        float: right;
        margin-left: 20px;
        i{
          margin-left: 10px;
          font-size: 20px;
        }
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>