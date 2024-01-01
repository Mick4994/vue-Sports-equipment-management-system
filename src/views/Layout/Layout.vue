<template>
  <div class="layout">
    <!-- 左侧菜单栏 -->
    <MyMenu class="menu" :isCollapse="isCollapse"/>

    <!-- 右侧内容区 -->
    <Content class="content" @changeMenu="changeMenu" :isCollapse="isCollapse" :class="{isActive:isCollapse}"/>
  </div>
</template>

<script>
import MyMenu from './MyMenu.vue'
import Content from './Content.vue'

export default {
  components: {
      MyMenu,
      Content
  },
  data(){
    return{
      isCollapse: false  // 菜单栏折叠，默认是false
    }
  },
  methods: {
    // 父组件接收事件
    changeMenu(){
      this.isCollapse = !this.isCollapse;
    }
  },
}
</script>

<style lang="less" scoped>
.layout{
  // display: flex;
  position: relative;
  .menu{
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1;
    // width: 200px;  // 在折叠时，菜单栏宽度也会变，所以宽度不能写死
    // min-height: 500px;
    background: #608d5e;
  }
  .content{
    transition-duration: 0.3s;
    margin-left: 200px;
    height: 1200px;
  }
  .isActive{  // 在折叠时，内容宽度也会变，所以可以给组件添加一个class
    transition-duration: 0.3s;
    margin-left: 64px;
  }
}
</style>