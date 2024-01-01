<template>
  <div class="add-goods">
    <!-- 1、面包屑导航 -->
    <div class="title">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }">记录管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加记录</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <!-- 2、表单 -->
    <div class="myform">
      <el-form 
        :model="goodsForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="类名选择" prop="category"> 
          <el-button>类名选择</el-button>
        </el-form-item> -->

        <el-form-item label="器材名称" prop="apparatus_name">
          <el-input v-model="goodsForm.apparatus_name"></el-input>
        </el-form-item>
        
        <el-form-item label="客户姓名" prop="customer_name">
          <el-input v-model="goodsForm.customer_name"></el-input>
        </el-form-item>

        <el-form-item label="租赁数量" prop="count">
          <el-input v-model="goodsForm.count"></el-input>
        </el-form-item>
        
        <el-form-item label="租赁时间" prop="date">
          <el-col :span="11">
          <el-form-item prop="lease_date">
            <el-date-picker 
              type="date" 
              placeholder="选择起始日期" 
              v-model="goodsForm.lease_date"
              style="width: 100%;"
              
            >
            </el-date-picker>
          </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
          <el-form-item prop="return_date">
            <el-date-picker 
              type="date" 
              placeholder="选择归还日期" 
              v-model="goodsForm.return_date"
              style="width: 100%;"
              
            >
            </el-date-picker>
          </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="备注" prop="notes">
          <el-input v-model="goodsForm.notes"></el-input>
        </el-form-item>

        <!-- <el-form-item label="上传图片" prop="image">
          <el-button>上传图片</el-button>
        </el-form-item> -->
        
        <!-- <el-form-item label="备注" prop="descs">
          <el-input type="textarea" v-model="goodsForm.descs"></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 表单数据对象
        goodsForm: {
          apparatus_name: '',   //器材名称
          customer_name: '',   //客户名
          count: '',   //数量
          lease_date: '',
          return_date: '',
          notes: '',  //备注
        },
        rules: {
          apparatus_name: [
            { required: true, message: '请输入器材名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          customer_name: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '请输入租赁数量', trigger: 'blur' }
          ],
          lease_date: [
            {required: true, message: '请输入起始时间', trigger: 'blur' }
          ],
          return_date: [
            {required: true, message: '请输入归还时间', trigger: 'blur' }
          ],
          date: [
            {required: true}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
    .add-goods{
        padding: 20px;
        .title{
            background-color: #fff;
            padding: 10px;
            border: 1px solid #f7f7ff;
        }
        .myform{
            padding: 20px;
            .line{
                text-align: center;
            }
        }
    }
</style>