<template>
  <div class="user">
    <!-- 1、合同查看 -->
    <el-button type="primary" @click="ViewPDF">查看合同</el-button>
    <ViewPDF ref="pdf"/>

    <!-- 2、导出表格 -->
    <div class="table">
      <div class="header">
        <h2>客户列表</h2>
        <el-button @click="exportTable">导出表格</el-button>
      </div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="customer_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="contact_number" label="电话" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import ViewPDF from './ViewPDF.vue'
import { export2Excel } from '@/common/js/util'
import { usersList } from '@/api/index'
export default {
  components:{
    ViewPDF
  },
  mounted() {
    this.getUser();
  },
  data(){
    return{
      // tableData: [{
      //   name: '张三',
      //   phone: '13145657541',
      //   address: '深圳技术大学大数据与互联网学院'
      // }, {
      //   name: '李四',
      //   phone: '14345657552',
      //   address: '深圳技术大学大数据与互联网学院'
      // }, {
      //   name: '王五',
      //   phone: '18945655647',
      //   address: '深圳技术大学大数据与互联网学院'
      // }, {
      //   name: '老六',
      //   phone: '16815657579',
      //   address: '深圳技术大学大数据与互联网学院'
      // }],
      //表头
      tableData: [],
      columns:[
        {title: '姓名', key: 'name'},
        {title: '电话', key: 'date'},
        {title: '地址', key: 'address'}
      ],
    }
  },
  methods:{
    async getUser(){
      try {
        const res = await usersList();
        this.tableData = res.data;
        // console.log(res);
      } catch(error) {
        console.log(error);
      }
    },
    ViewPDF(){
      this.$refs.pdf.dialogVisible = true;
    },

    //导出
    exportTable(){
      // export2Excel('表头', '需要导出的数据')
      export2Excel(this.columns, this.tableData, '用户列表')
    }
  }
}
</script>

<style lang="less" scoped>
  .user{
    button{
      margin: 20px 0 0 10px;
    }
    .table{
      padding: 20px;
      .header{
        content: '';
        display: block;
        clear: both;
        h2{
          font-size: 18px;
          font-weight: 600;
          text-align: center;
        }
        button{
          float: right;
          right: 20px;
          margin: -10px 0 10px;
        }
      }
      
    }
  }
  
</style>