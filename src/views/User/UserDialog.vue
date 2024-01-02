<template>
    <div>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="resetForm"
        >
            <!-- 2、表单 -->
            <div class="myform">
                <el-form 
                    :model="customerForm" 
                    :rules="rules" 
                    ref="ruleForm" 
                    label-width="100px" 
                    class="demo-ruleForm"
                >

                    <el-form-item label="姓名" prop="customer_name">
                        <el-input v-model="customerForm.customer_name"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="电话" prop="contact_number">
                        <el-input v-model="customerForm.contact_number"></el-input>
                    </el-form-item>

                    <el-form-item label="地址" prop="address">
                        <el-input v-model="customerForm.address"></el-input>
                    </el-form-item>

                </el-form>
            </div>

            <!-- 弹窗底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
import { addUser, editUser } from "@/api/index.js"

export default {
    props: {
        title:{
        type:String,
        default:function(){
          return "";
        }
      },
      rowData:{
        type:Object,
        default:function(){
          return {};
        }
      },
    },
    data() {
        return {
            dialogVisible: false,  //控制显示隐藏
            innerVisible: false,  //控制内弹框显示隐藏（默认是隐藏）
            customerForm: {
                customer_id: 0,
                customer_name: '',
                contact_number: '',
                address: ''
            },
            rules: {
                customer_name: [
                    { required: true, message: '请输入客户姓名', trigger: 'blur' }
                ],
                contact_number: [
                    { required: true, message: '请输入客户电话', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入客户地址', trigger: 'blur' }
                ],
            }
        }
    },
    watch: {
        rowData(val) {
            this.customerForm = val;
        }
    },
    methods: {
        submitForm(formName) {  // eslint-disable-line no-unused-vars
        this.$refs.ruleForm.validate(async (valid) => {
            if (valid) {
                console.log(this.customerForm);
                
                //对象合并  let obj1 = Object.assign(obj1,obj2);  //将obj2合并到obj1上变成一个新的obj1
                Object.assign(this.customerForm, {
                paramsInfo:JSON.stringify(this.paramInfo)
                })
                
                if(this.title === "添加客户"){
                try {
                    const res = await addUser(this.customerForm);
                    console.log(res);
                    if(res.status == 200){  //成功

                        this.$parent.getUser();  // 更新父组件列表数据
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        // 清空表单
                        this.resetForm();
                    }else{
                        this.$message.error('添加失败.....');
                    }
                } catch (error) {
                    console.log(error);
                    this.$message.error('填写错误，请检查数据!!!');
                }
                }else{
                console.log('编辑', this.customerForm);
                // 参数：id title cid  category sellPoint price num desc paramsInfo image
                try {
                    const res = await editUser(this.customerForm);
                    console.log(res);
                    if(res.status == 200){  //成功

                        this.$parent.getUser();  // 更新父组件列表数据
                        this.$message({
                            message: '修改记录成功！',
                            type: 'success'
                        });
                        // 清空表单
                        this.resetForm();
                    }else{
                        this.$message.error('修改记录失败.....');
                    }
                } catch (error) {
                    console.log(error);
                    this.$message.error('填写错误，请检查数据.....');
                }
                }
            } else {
                console.log('error submit!!');
                this.$message.error('填写错误，请检查数据。。。。。');
                return false;
            }
            });
        },
        // 重置表单
        resetForm(formName) { // eslint-disable-line no-unused-vars
            // this.$refs[formName].resetFields();

            // 1、隐藏弹窗
            this.dialogVisible = false;
            // 2、清空表单
            // 表单数据对象
            this.customerForm = {
                customer_id: 0,
                customer_name: '',
                contact_number: '',
                address: ''
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .myform{
        padding: 20px;
        .line{
            text-align: center;
        }
    }
</style>