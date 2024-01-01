<template>
  <div class="goods">
    <!-- 1、搜索区域 -->
    <div class="header">
      <!-- change	仅在输入框失去焦点或用户按下回车时触发	(value: string | number) -->
      <el-input v-model="keyword" placeholder="请输入要查找的器材名称，或客户名。或业务负责人，或备注" @change="toSearch"></el-input>
      <el-button type="primary">搜索</el-button>
      <!-- <el-button type="primary" @click="toAdd">页面添加</el-button> -->
      <el-button type="primary" @click="addDialog">添加记录</el-button>
    </div>

    <!-- 2、表格区域展示视图数据 -->
    <div class="wrapper">
      <el-table
        :data="tableData"
        border
        ref="multipleTable"
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
        stripe
        style="width: 100%">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column prop="order_id" label="订单号" width="100"></el-table-column>
        <el-table-column prop="apparatus_name" label="器材名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_name" label="客户名" width="100"></el-table-column>
        <el-table-column prop="count" label="租赁数量" width="100"></el-table-column>
        <el-table-column prop="summy" label="租赁总价" width="100"></el-table-column>
        <el-table-column prop="lease_date" label="租赁日期" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="return_date" label="归还日期" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="business_personnel_name" label="业务负责人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="notes" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(tableData)">全选</el-button>
        <el-button @click="toggleSelection()">反选</el-button>
      </div>
    </div>

    <!-- 3、分页 -->
    <MyPagination 
      :total="total" 
      :pageSize="pageSize"
      :currentPage="currentPage" 
      @changePageNum="getPageNum" 
    />

    <!-- 添加弹窗 -->
    <GoodsDialog ref="dialog" 
    :title="title" :rowData="rowData" 
    :customerOptions="customerOptions" 
    :businessPersonOptions="businessPersonOptions"
    :apparatusOptions="apparatusOptions"
     @changePage="getPage(1)"/>
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination.vue'
import GoodsDialog from './GoodsDialog.vue'
import { getGoodsList, getSearchList, delGoods, 
  getCustomerList, getBusinessPersonnel,getApparatusList } from '@/api/index.js'

const moment = require('moment');

export default {
  components:{
    MyPagination,
    GoodsDialog
  },
  data(){
    return {
      multipleSelection: [],  //被勾选的数据
      keyword:"",
      tableData: [],
      total:10,
      pageSize:1,  // 一般默认值设为1
      currentPage:1,  //当前页，让哪一页高亮
      searchList:[],  // 搜索列表
      type:1,  //1：查询所有商品列表的分页   2：查询搜索列表的分页
      title:'添加记录',   //弹窗标题
      rowData:{},  // 整行数据
      customerOptions: [],
      businessPersonOptions: [],
      apparatusOptions: []
    }
  },
  // 生命周期函数
  created(){
    this.getGoodsList(1) //调用
    this.getCustomer();
    this.getBusinessPersonnelList();
    this.getApparatus();
  },
  methods: {
    //切换分页后，还保持全选状态
    getRowKey(row){
      return row.id;
    },
    // 根据页码查询商品列表
    async getGoodsList(pageNum){
      try {
        const res = await getGoodsList({ page:pageNum })
        // console.log(res);
        this.tableData = res.data;
        for (var i = 0 ; i < this.tableData.length; i++) {
          this.tableData[i].lease_date = 
          moment(this.tableData[i].lease_date).format('YYYY-MM-DD');
          this.tableData[i].return_date = 
          moment(this.tableData[i].return_date).format('YYYY-MM-DD');
        }
        this.total = res.total;
        this.pageSize = res.pageSize;
      } catch (error) {
        // console.log(error)
      }
    },
    // 搜索商品
    async toSearch(val){
      console.log(val);
      //不输入值，搜索
      if(!val){  
        //加载列表的第一页数据
        this.getGoodsList(1);
        this.type = 1;  // 按列表分页
        return;
      }

      try {
        const res = await getSearchList({search:val});
        // this.tableData = res.result;  //可能上千条数据，一次性请求增加服务器压力和前端渲染效率
        // 有1000条数据，实现分页：[]的方法
        // {status: 500, msg: '暂无数据'}
        if(res.status == 200 && res.result.length != 0){
          // 前端模拟分页 ==> 数组分割
          this.searchList = res.result;
          this.tableData = this.searchList.slice(0,3);

          this.total = res.result.length;  //总条数
          this.pageSize = 3;  //假设每页3条数据
          this.type = 2;  // 按搜索分页
          this.currentPage = 1;
        }else{
          // 无数据处理
          this.tableData = [],
          this.total = 0;  //总条数
          this.pageSize = 1; 
          this.type = 1;  //所有数据分页
        }
      } catch (error) {
        // 无数据处理（这里是说有可能在发送过程中，断网了，接收不到数据的处理）
        this.tableData = [],
        this.total = 0;  //总条数
        this.pageSize = 1; 
        this.type = 1;  //所有数据分页

        console.log(error);
      }
    },
    // 父组件接收 分页子组件传过来的页码
    getPageNum(page){
      this.currentPage = page;  //点击页码，让当前页码高亮
      console.log(page);
      if(this.type == 1){
        this.getGoodsList(page);  // 查询所有商品分页
      }else{
        // 搜索分页 ，切割数据  0,1,2  3,4,5  6,7,8   slice(,)  0,3  3,6  6,9
        // ((page-1)*3,page*3)
        this.tableData = this.searchList.slice((page-1)*3,page*3);  //搜索完记得让type标记变为为2
      }
    },
    // 跳转到新页面去添加
    toAdd(){
      this.$router.push('/add-goods');
    },
    // 弹窗 添加商品页面
    addDialog(){
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加记录";
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.dialog.dialogVisible = true; //显示弹窗
      this.title = "记录编辑";
      // 给子组件传值
      this.rowData = {...row}; //{...row}：对象解构，用来每次都创建一个新对象
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('你确定要删除记录吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {  // eslint-disable-line no-unused-vars
        // 删除商品，请求后台
        try {
          const res = await delGoods({order_id:row.order_id})
          console.log(res);
          if(res.status == 200){
            this.getGoodsList(1);  //更新列表，并展示第一页数据
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //全选和反选（对当前页数据）
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleAllSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //为了让商品在添加或编辑后，刷新数据，并展示第一页数据时，让页码在在第一页高亮
    getPage(page){
      this.currentPage = page; 
    },
    async getBusinessPersonnelList() {
        try {
          const res = await getBusinessPersonnel(null);
          if(res.status == 200) {
            // this.options = res.result;
            for(var i=0; i < res.result.length; i++) {
              this.businessPersonOptions.push({
                  value: res.result[i].business_personnel_name,
                  label: res.result[i].business_personnel_name
                })
            }
          }
          console.log('res', this.options);
        } catch (error) {
          console.log(error);
        }
    },
    async getCustomer() {
        try {
          const res = await getCustomerList(null);
          if(res.status == 200) {
            // this.options = res.result;
            for(var i=0; i < res.result.length; i++) {
              this.customerOptions.push({
                  value: res.result[i].customer_name,
                  label: res.result[i].customer_name
                })
            }
          }
          console.log('res', this.options);
        } catch (error) {
          console.log(error);
        }
    },
    async getApparatus() {
        try {
          const res = await getApparatusList(null);
          if(res.status == 200) {
            // this.options = res.result;
            for(var i=0; i < res.result.length; i++) {
              this.apparatusOptions.push({
                  value: res.result[i].apparatus_name,
                  label: res.result[i].apparatus_name
                })
            }
          }
          console.log('res', this.options);
        } catch (error) {
          console.log(error);
        }
    },
}
}
</script>

<style lang="less" scoped>
  .goods{
    padding: 20px;
    .header{
      display: flex;  //弹性布局
      button{
        margin-left: 20px;
      }
    }
    .wrapper{
      padding: 20px 0;
    }
  }
</style>