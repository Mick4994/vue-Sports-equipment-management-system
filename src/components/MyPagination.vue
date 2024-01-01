<template>
  <!-- 
    current-change	currentPage 改变时会触发	当前页 
    current-page 让父组件去告诉我去高亮第几页
  -->
  <div class="pagination">
    <el-pagination 
      background 
      layout="total, prev, pager, next, jumper" 
      :total="total" 
      :pageSize="pageSize"
      :current-page="currentPage"
      @current-change="changePageNum"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:{ //父传子
    total:{
      type:Number,
      default:10
    },
    pageSize:{   //每页显示条目个数
      type:Number,
      default:1
    },
    currentPage:{  //当前是第几页
      type:Number,
      default:1
    }
  },
  methods:{
    // 分页子组件触发页码改变事件
    changePageNum(page){ 
      this.$emit("changePageNum", page);  // 自定义事件（子传父）
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination{
    text-align: center;
    margin: 20px;
  }
</style>