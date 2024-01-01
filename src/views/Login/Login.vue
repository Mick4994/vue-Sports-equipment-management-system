<template>
  <div class="contaner">

    <div class="login">
      <div class="pack">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <el-form 
        :model="loginForm"
        status-icon 
        :rules="rules"  
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" 
          v-model="loginForm.username" 
          autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" 
          v-model="loginForm.password" 
          autocomplete="off"
          show-password></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapActions } from 'vuex'
  import router from '@/router';
  export default {
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions('LoginModule', ['toLogin']),
      sleep(time){
        return new Promise((resolve) => setTimeout(resolve, time));
      },
      async push2Home(){
        await this.sleep(100);
        router.push({path:"/"});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // console.log(valid)
          if (valid) {
            //第一种：触发action    username、password
            store.dispatch('LoginModule/toLogin', this.loginForm);
            console.log(store);
            // 第二种：
            // this.toLogin();
          
            // 跳转到首页            
            this.push2Home();

            console.log('login!')
          } else {
            this.$message.error("账号或密码不合法！")  // 在前端的验证
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName];
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .contaner{
    position: fixed;
    
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    
    // margin:0px;
    background: url(@/assets//bg.jpg) no-repeat;
    background-size:100% 100%;
    background-attachment:fixed;
    // background-color: #053809;
    .pack{
      width: 100px;
      height: 100px;
      background-color: #ffffffa2;
      position: absolute;
      left: 210-50px;
      top: -60px;
      border-radius: 50%;
      overflow: hidden;
      -webkit-box-shadow: 3px 3px 6px #666;
                -moz-box-shadow: 3px 3px 6px #666;
                box-shadow: 3px 3px 6px #666;
      border: 10px solid #21c452;
      img{
        width: 100px;
        height: 100px;
      }
    }
    .login{
      width: 400px;
      height: 260px;
      padding: 20px;
      box-shadow: 0 0 10px rgb(0,153,184) inset,0 0 30px rgb(0,153,184);
      background-color: #ffffff98;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -225px;
      margin-top: -155px;
      .demo-ruleForm{
        position: relative;
        margin-left: -60px;
        margin-top: 50px;
        .center{
          text-align: center;
          margin-left: -20px;
          button{
            margin: 10px;
          }
        }
      }
    }
  }
</style>