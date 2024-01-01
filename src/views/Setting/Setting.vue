<template>
  <div class="content">
    <el-page-header id="header" @back="goBack" content="修改密码">
    </el-page-header>
    <!-- <div class="demo-type">

    </div> -->
    
    <!-- <div class="content-left">
        <AdvertNav v-if="isRouterAlive"/>
        <AdvertNav />
    </div>
    <div class="content-right">
        <AdvertContent />
    </div> -->
    <div class="myform">
      <el-form 
        :model="userForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm"
      >
        <el-form-item label="头像">
          <el-avatar :size="60" src="../../assets/logo.png" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </el-form-item>

        <el-form-item label="原密码" prop="old_password">
          <el-input type="password" 
          v-model="userForm.old_password" 
          autocomplete="off"
          show-password
          >
          </el-input>
        </el-form-item>
        
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" 
          v-model="userForm.new_password" 
          autocomplete="off"
          show-password
          >
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { toModifyPwd } from '@/api/index'

export default {

  data(){
      var validatePwd = (rule, value, callback) => {
        if (value === '') {
          // if(this.userForm.old_password != this.userForm.new_password) {
          //   callback(new Error('新密码与原密码相同'));
          // } else {
            callback(new Error('请输入密码'));
          // }
        } else {
          callback();
        }
      };
    return{
      userForm: {
          username:  (localStorage.getItem('userinfo')
          &&JSON.parse(localStorage.getItem('userinfo')).username) || '',
          old_password: '',
          new_password: ''
        },
        rules: {
          old_password: [
            { validator: validatePwd, trigger: 'blur' }
          ],
          new_password: [
            { validator: validatePwd, trigger: 'blur' }
          ]

        }
      // isRouterAlive: true
    }
  },
  methods:{
    async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // console.log(valid)
          if (valid) {
            if (this.userForm.old_password != this.userForm.new_password) {
              console.log('modify!')
              const res = toModifyPwd(this.userForm)
              res.then(val => {
                console.log(val)
                if(val.status == 404) {
                  this.$message.error('原密码错误！')
                } else {
                  this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                }
              })
            } else {
              // console.log('same!')
              this.$message.error('与原密码相同！')
            }
          } else {
            this.$message.error("密码不合法！")  // 在前端的验证
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack() {
        console.log('None')
      },
      errorHandler() {
        console.log('picture not found')
      }
  }
}
</script>

<style lang="less" scoped>
  .demo-type{
    margin: 40px;
    padding-left: 80px;
  }
  .content {
    height: 200px;
    margin: 0 auto;
    padding: 20px;
    // margin-top: 10px;
  }

  .content-left {
    float: left;
    width: 35%;
    height: 100%;
  }

  .content-right {
    float: right;
    width: 65%;
    height: 100%;
  }

  #header {
    padding: 10px;
    margin-bottom: 20px;
  }
  // .custom-tree-node {
  //   display: inline-block;
  //   text-align: right;
  //   width: 100%;
  // }
  // .upload img {
  //   width: 200px;
  // }
</style>