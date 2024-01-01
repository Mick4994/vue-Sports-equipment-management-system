<template>
  <div class="params">

    <!-- 2、搜索 -->
    <div class="search">
      <el-input v-model="keyword" placeholder="请输入要查找的器材名称" @change="toSearch"></el-input>
      <!-- <el-input placeholder="请输入内容" @change="toSearch"></el-input> -->
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="showDialog">添加器材</el-button>
    </div>

    <!-- 3、表格 -->
    <div class="table">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column prop="apparatus_id" label="器材编号" width="100"></el-table-column>
          <el-table-column prop="apparatus_name" label="名称" width="200"></el-table-column>
          <el-table-column prop="price" label="价格/日" width="100"></el-table-column>
          <el-table-column prop="count" label="剩余数" width="100"></el-table-column>
          <el-table-column prop="maintenance_personnel_name" label="维护负责人" width="100"></el-table-column>
          <!-- <el-table-column prop="expiration_date" label="保质期" show-overflow-tooltip></el-table-column> -->
          <el-table-column label="操作" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 4、分页 -->
    <MyPagination :total="total" :pageSize="pageSize" @changePageNum="getParamsByPage" :currentPage="currentPage"/>

    <!-- 5、弹窗 -->
    <ParamsDialog ref="dialog"
     :title="title" :rowData="rowData" :trueButton="trueButton" :options="options"/>
  </div>
</template>

<script>
import { getParamsList, delParams, getSearchParams, maintenancePersonnel } from '@/api/index'
import MyPagination from '@/components/MyPagination.vue'
import ParamsDialog from './ParamsDialog.vue'
const moment = require('moment');
export default {
  components:{
    MyPagination,
    ParamsDialog
  },
  data() {
    return {
      tableData: [],
      keyword:"",
      total: 10,  // 总条目数
      pageSize: 1,  // 一页显示大小
      currentPage: 1,  //当前页，让那一页高亮
      searchList: [], //搜索列表
      type: 1,  //1：查询所有规格参数列表的分页   2：查询搜索列表的分页
      title: '',  //弹窗标题
      trueButton:'',
      rowData: {},  //整行数据
      options: []
    }
  },
  created(){
    this.getParamsByPage(1);
    this.getMaintenancePersonnel();
  },
  methods:{
    // 规格参数列表  参数：page
    async getParamsByPage(pageNum){
      // 点击页码时，触发哪个搜索
      if(this.type == 1){
        try {
          const res = await getParamsList({page: pageNum});
          // console.log(res);
          this.currentPage = pageNum;  //让当前页码高亮
          if(res.status == 200){
            this.tableData = res.data;
            // console.log(res.data[0].expiration_date)
            // console.log('tableData',this.tableData);
            for (var i = 0 ; i < this.tableData.length; i++) {
              this.tableData[i].expiration_date = 
              moment(this.tableData[i].expiration_date).format('YYYY-MM-DD');
              // this.options.push(
              //   {
              //     value:this.tableData[i].maintenance_personnel_name,
              //     label:this.tableData[i].maintenance_personnel_name
              //   });
            }
            this.total = res.total;
            this.pageSize = res.pageSize;
          }else{
            // 无数据处理
            this.tableData = [];
            this.total = 1;
            this.pageSize = 1;
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        this.tableData = this.searchList.slice((pageNum-1)*4,pageNum*4);  //搜索分页
      }
    },
    async getMaintenancePersonnel() {
        try {
          const res = await maintenancePersonnel(null);
          if(res.status == 200) {
            // this.options = res.result;
            for(var i=0; i < res.result.length; i++) {
              this.options.push({
                  value: res.result[i].maintenance_personnel_name,
                  label: res.result[i].maintenance_personnel_name
                })
            }
          }
          console.log('res', this.options);
        } catch (error) {
          console.log(error);
        }
    },
    // getPage(page){
    //   // 点击页码时，触发哪个搜索
    //   if(this.type == 1){
    //     this.getParamsByPage(page); //搜索所有规格参数
    //   }else{
    //     this.tableData = this.searchList.slice((page-1)*4,page*4);  //搜索分页
    //   }},
    // 搜索规格参数  参数：search
    async toSearch(val){
      console.log(val);

      if(!val){
        this.getParamsByPage(1);
        this.type = 1;  //所有规格参数列表分页
        return;
      }

      try {
        const res = await getSearchParams({search: val});
        console.log(res);
        if(res.status == 200 && res.result.length != 0){
          //前端模拟分页（数组分割）
          this.searchList = res.result;
          this.tableData = this.searchList.slice(0,4);
          this.total = res.result.length;
          this.pageSize = 4;
          this.type = 2; //搜索列表分页
          this.currentPage = 1;
        }else{
          //无数据处理
          this.tableData = [];
          this.total = 0;
          this.pageSize = 1;
          this.type = 1;   //所有规格参数列表分页
        }
      } catch (error) {
        // 无数据处理（这里是说有可能在发送过程中，断网了，接收不到数据的处理）
        this.tableData = [];
        this.total = 0;
        this.pageSize = 1; 
        this.type = 1; //所有规格参数列表分页

        console.log(error);
      }
    },
    // 弹窗 添加规格参数页面
    showDialog(){
      this.$refs.dialog.dialogVisible = true; // 显示
      this.title = "添加器材";
      this.trueButton = "确认添加";
    },
    //编辑（还未实现）
    handleEdit(index, row) {
      console.log(index, row);
      // 给子组件传值
      this.rowData = {...row}; //{...row}：对象解构，用来每次都创建一个新对象
      this.$refs.dialog.dialogVisible = true;  //显示弹窗
      this.title = '编辑器材';
      this.trueButton = "确认编辑";
      // console.log(row);
      // console.log('f',row);

      // this.$refs.dialog.treeDate = row;
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("你确定要删除该器材吗？", '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () =>{ // eslint-disable-line no-unused-vars
        //删除规格参数，请求后台
        try {
          const res = await delParams({id:row.apparatus_id});
          console.log(res);
          if(res.status === 200){
            this.getParamsByPage(1);  //更新列表
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        } catch (error) {
          console.log(error);
        }
      }).catch(() =>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .params{
    padding: 10px;
    .nav{
      padding: 7px;
      background-color: #fff;
      margin: 10px 0;
    }
    .search{
      display: flex;
      input{
        flex: 1;
      }
      button{
        margin-left: 10px;
      }
    }
    .table{
      padding: 20px 0;
    }
  }
</style>