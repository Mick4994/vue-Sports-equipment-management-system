<template>
  <div>
    <el-dialog
        :title="title"
        :trueButton="trueButton"
        :options="options"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="resetForm"
        >
        
        <!-- TreeView -->
        <!-- <TreeView @sendTreeData="getTreeData"/> -->

        <div class="myform">
            <el-form
                :model="apparatusForm" 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm"
            >
            <el-form-item label="器材名称" prop="apparatus_name">
                    <el-input v-model="apparatusForm.apparatus_name"></el-input>
            </el-form-item>
            
            <el-form-item label="价格/日" prop="price">
                <el-input v-model="apparatusForm.price"></el-input>
            </el-form-item>

            <el-form-item label="数量" prop="count">
                <el-input v-model="apparatusForm.count"></el-input>
            </el-form-item>

            <el-form-item label="维护负责人" prop="maintenance_personnel_name">
                <el-select v-model="apparatusForm.maintenance_personnel_name" 
                filterable placeholder="请选择"
                style="width: 100%;"
                >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
                <!-- <el-input v-model="apparatusForm.name"></el-input> -->
            </el-form-item>

            <el-form-item label="保质期" prop="expiration_date">
                <el-date-picker 
                type="date" 
                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="选择日期" 
                v-model="apparatusForm.expiration_date"
                style="width: 100%;"
                >
                </el-date-picker>
            </el-form-item>

            </el-form>
        </div>


        <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm();dialogVisible = false" >取 消</el-button>
            <el-button type="primary" :disabled="isDisable" @click="submitForm" @changePage="changePage">{{ trueButton }}</el-button>
        </span>

        <!-- 内层弹窗 -->
        <!-- <el-dialog width="45%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body :before-close="closeInner">
            <div class="title">当前选中的商品为：{{treeData.name}}</div>
            <el-button type="primary" @click="addDomain">新增规格列表</el-button>

            <hr> -->

            <!-- domains: [{title:'',value:'',children:[{title:',value:''},{}]}] -->
            <!-- <el-form :model="dyForm" ref="dynForm" label-width="120px" class="demo-dynamic">
                <el-form-item
                    v-for="(domain, index) in dyForm.domains"
                    :label="domain.title"
                    :key="index"
                    :prop="domain.title"
                    :rules="{
                    required: true, message: '规格不能为空', trigger: 'blur'
                    }"
                >
                    <div class="buttons">
                        <el-input v-model="domain.title"></el-input>
                        <el-button @click.prevent="addChildDomain(index)">添加子项</el-button>
                        <el-button @click.prevent="removeDomain(index)">删除</el-button>
                    </div> -->

                    <!-- 内层表单项 -->
                    <!-- <el-form-item
                        v-for="(item, i) in domain.children"
                        :label="item.title"
                        :key="i"
                        :prop="item.title"
                    >
                        <div class="buttons">
                            <el-input v-model="item.title"></el-input>
                            <el-button @click.prevent="removeChildDomain(index, i)">删除子项</el-button>
                        </div>
                    </el-form-item>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="closeInner">取 消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </span>
        </el-dialog> -->
    </el-dialog>
  </div>
</template>

<script>
// import TreeView from '@/views/Goods/TreeView.vue'
import { addParams, updateParams } from '@/api';
export default {
    props:{
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
        trueButton: {
            type: String,
            default: function(){
                return "确认";
            }
        },
        options: {
            type:Array,
            default:function(){
                return [];
            }
        },
        
    },
    // components:{
    //     TreeView
    // },
    mounted() {
        console.log('options',this.options);

        // console.log(this.rowData);
        // this.lastForm = this.rowData;
        // console.log(this.lastForm);
        // this.apparatusForm.apparatus_name = this.rowData.apparatus_name;
        // this.apparatusForm.price = this.rowData.price;
        // this.apparatusForm.expiration_date = this.rowData.expiration_date;
        // this.apparatusForm.name = this.rowData.maintenance_personnel_name;
    },
    data(){
        return{
            dialogVisible: false, //外弹窗
            innerVisible: false, //内弹窗
            isDisable: false, //默认不可点击状态，点过节点后，才能点击
            // title: 'get',
            
            treeData:{},  //节点对象
            apparatusForm: {
                apparatus_name: '',
                price: '',
                expiration_date: '',
                maintenance_personnel_name: '',
                count: 0
            },
            lastForm: {},
            rules: {
                apparatus_name: [
                    { required: true, message: '请输入器材名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                price: [
                    {required: true, message: '请输入单日租价', trigger: 'blur' },
                    {pattern: /^\d+(\.\d+)?$/ , message: '请输入正数', trigger: 'blur' }
                ],
                expiration_date: [
                    { required: true, message: '请输入保质期', trigger: 'blur' }
                ],
                maintenance_personnel_name: [
                    { required: true, message: '请输入维护负责人姓名', trigger: 'blur' }
                ],
                count: [
                    { required: true, message: '请输入数量', trigger: 'blur' }
                ],
            },
            value : ''
        }
    },
    //监听器
    watch:{
        rowData(val){
            this.lastForm = JSON.parse(JSON.stringify(val));
            // console.log('rowData', val);
            this.apparatusForm = val;
            // this.apparatusForm.name = val.maintenance_personnel_name;
            // this.treeData = val;
        }
    },
    methods:{
        //监听 TreeView 点击的节点，并且获取数据
        getTreeData(data){
            console.log(data);
            this.isDisable = false;  //[确定并获取分组] 变成可点击
            this.treeData = data; //保存
            console.log(this.treeData);
        },
        // 提交表单
        submitForm() {
            console.log(this.title);
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    //判断是添加还是编辑
                    if(this.title === "添加器材"){
                        try {
                            const res = await addParams({
                                apparatus_name: this.apparatusForm.apparatus_name,
                                price: this.apparatusForm.price,
                                expiration_date: this.apparatusForm.expiration_date,
                                maintenance_personnel_name: this.apparatusForm.maintenance_personnel_name,
                                count: this.apparatusForm.count
                            });
                            console.log(res);
                            if(res.status === 200){
                                // 1、友好提醒
                                this.$message.success("添加成功！！！");
                                // 2、关闭内外弹窗
                                this.dialogVisible = false;
                                this.innerVisible = false;
                                // 3、清空
                                // this.dyForm.domains = [];
                                // 4、刷新规格参数列表数据
                                this.$parent.getParamsByPage(1);
                            }else{
                                this.$message.error("添加失败！！！");
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }else{
                        // console.log("编辑", this.lastForm, this.apparatusForm);
                        // try{
                        //     if(this.lastForm.apparatus_name != this.apparatusForm.apparatus_name
                        //     || this.lastForm.expiration_date != this.apparatusForm.expiration_date
                        //     || this.lastForm.maintenance_personnel_name != this.apparatusForm.maintenance_personnel_name
                        //     || this.lastForm.price != this.apparatusForm.price) {
                        //         console.log('change!')
                        //     }
                        // } catch(error) {
                        //     console.log(error)
                        // }
                        // 参数 cid content id  specsName
                        try {
                            if(this.lastForm.apparatus_name != this.apparatusForm.apparatus_name
                            || this.lastForm.expiration_date != this.apparatusForm.expiration_date
                            || this.lastForm.maintenance_personnel_name != this.apparatusForm.maintenance_personnel_name
                            || this.lastForm.price != this.apparatusForm.price
                            || this.lastForm.count != this.apparatusForm.count) {
                                const res = await updateParams(
                                    this.apparatusForm
                                )
                                console.log(res);
                                if(res.status === 200){
                                    this.$message({
                                        message: '编辑成功！',
                                        type: 'success'
                                    });
                                    //关闭内外弹窗
                                    this.dialogVisible = false;
                                    this.innerVisible = false;
                                    this.resetForm();
                                    //清空
                                    // this.dyForm.domains = [];
                                    this.$parent.getParamsByPage(1); //更新父组件数据列表
                                }else{
                                    this.$message.error("编辑失败！！");
                                }
                            } else {
                                this.$message.error("与原值相同！！");
                            }
                            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } else {
                    console.log('数据有误，请重新填写！！!');
                    this.$message.error("数据有误，请重新填写！！!");
                    return false;
                }
            });
        },
        changePage(page){ 
        this.$emit("changePage", page);  // 自定义事件（子传父）
      },
        // 取消表单提交
        closeInner(){
            this.innerVisible = false;
            console.log('cancel');
            // this.apparatusForm = [];
            this.$refs.apparatusForm.resetFields();
        },
        // 重置
        resetForm() {
            console.log('reset');
            this.dialogVisible = false;
            this.apparatusForm = {};
        },
        // 添加子项
        addChildDomain(index){
            this.dyForm.domains[index].children.push({title:'',value:''})
        },
        // 删除子项
        removeChildDomain(index, i){
            this.dyForm.domains[index].children.splice(i, 1)
        },
        // 删除
        removeDomain(index) {
            this.dyForm.domains.splice(index, 1)
        },
        // 新增
        addDomain() {
            this.dyForm.domains.push({
                title: '',
                value: '',
                children:[]
            });
        }
    }
}
</script>

<style lang="less" scoped>
    hr{
        margin: 10px 0;
    }
    .buttons{
        display: flex;
        input{
            flex: 1;
        }
        button{
            margin-left: 7px;
        }
    }
</style>