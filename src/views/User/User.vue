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
        <el-button type="primary" @click="addDialog">添加客户</el-button>
      </div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="customer_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="contact_number" label="电话" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加弹窗 -->
    <UserDialog ref="dialog" 
    :title="title" :rowData="rowData" />

  </div>
</template>

<script>
import ViewPDF from './ViewPDF.vue'
import UserDialog from './UserDialog.vue'
import { export2Excel } from '@/common/js/util'
import { usersList, delUser } from '@/api/index'
export default {
  components:{
    ViewPDF,
    UserDialog
  },
  mounted() {
    this.getUser();
  },
  data(){
    return{
      //表头
      title:'添加客户',   //弹窗标题
      tableData: [],
      rowData:{},  // 整行数据
      columns:[
        {title: '姓名', key: 'customer_name'},
        {title: '电话', key: 'contact_number'},
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
    addDialog(){
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加客户";
    },
    ViewPDF(){
      this.$refs.pdf.dialogVisible = true;
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.dialog.dialogVisible = true; //显示弹窗
      this.title = "客户资料编辑";
      // 给子组件传值
      this.rowData = {...row}; //{...row}：对象解构，用来每次都创建一个新对象
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('你确定要删除客户吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {  // eslint-disable-line no-unused-vars
        // 删除商品，请求后台
        try {
          const res = await delUser({customer_id:row.customer_id})
          console.log(res);
          if(res.status == 200){
            this.getUser();  //更新列表，并展示第一页数据
            this.currentPage = 1;  //让页码在在第一页高亮
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          }
        } catch (error) {
          console.log(error);
        }
      }).catch(() => {
        console.log('取消删除');
        this.$message({
          message: '已取消删除！',
          type: 'info'
        })
      })
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
          margin: 10px;
        }
      }
      
    }
  }
  
</style>