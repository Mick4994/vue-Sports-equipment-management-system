<template>
  <div class="wrap">
    <el-page-header id="header" @back="goBack" content="详情页面">
      <!-- <h2 id="first_page">首页</h2> -->
    </el-page-header>


    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="main"></div>
  </div>
</template>

<script>
import { getParamsList } from '@/api/index'

export default {
  created() {
    this.x_data = [];
    this.value_data = [];
    // this.getData();
  },
  mounted(){
    this.getData();
    
  },
  methods:{
    bar(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '器材总库存'
        },
        tooltip: {},
        legend: {
          data: ['剩余']
        },
        xAxis: {
          // data: ['引体单杆', 'BMI测量仪', '跳远测量仪', '实心球', '跑步手环', '肺活量仪']
          data: this.x_data
        },
        yAxis: {},
        series: [
          {
            name: '剩余',
            type: 'bar',
            data: this.value_data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    line(){},
    goBack() {
        console.log('go back');
      },
    async getData() {
      // 点击页码时，触发哪个搜索
      try {
        const res = await getParamsList(1);
        // console.log(res);
        if(res.status == 200){
          // console.log(res.data);
          for(var i=0; i < res.data.length; i++) {
            this.x_data.push(res.data[i].apparatus_name);
            this.value_data.push(res.data[i].count);
          }
          console.log(this.x_data);
          console.log(this.value_data);
          this.bar();
          // this.tableData = res.data;
          // console.log(res.data)
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    padding: 20px;
  }
  
  #header {
    padding: 10px;
    margin-bottom: 20px;
  }

  #main {
    padding: 10px;
    width: 1000px;
    height:400px;
    background: #fff;
  }
</style>