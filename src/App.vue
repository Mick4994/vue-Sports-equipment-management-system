<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- project/inject (这里让DOM发生了变化，就会自动刷新) -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      isRouterAlive: true
    }
  },
  components:{},
  //挂载
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(() =>{
        // DOM更新
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>

</style>
