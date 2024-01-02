<template>
  <div>
    <!-- 
        title: 标题
        visible: 控制显示隐藏（默认隐藏）
     -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :customerOptions="customerOptions"
        :businessPersonOptions="businessPersonOptions"
        :apparatusOptions="apparatusOptions"
        width="70%"
        :before-close="resetForm"
    >
        
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
                <el-button type="primary" @click="innerVisible = true">类名选择</el-button>
                <span>{{ goodsForm.category }}</span>
            </el-form-item> -->

            <el-form-item label="器材名称" prop="apparatus_name">
                <!-- <el-input v-model="goodsForm.apparatus_name"></el-input> -->
                <el-select v-model="goodsForm.apparatus_name" 
                :disabled = "this.title === '添加记录'?false:true"
                filterable placeholder="请选择"
                style="width: 100%;"
                >
                    <el-option
                    v-for="item in apparatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="客户名" prop="customer_name">
                <!-- <el-input v-model="goodsForm.customer_name"></el-input> -->
                <el-select v-model="goodsForm.customer_name" 
                filterable placeholder="请选择"
                style="width: 100%;"
                >
                    <el-option
                    v-for="item in customerOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="业务负责人" prop="business_personnel_name">
                <!-- <el-input v-model="goodsForm.business_personnel_name"></el-input> -->
                <el-select v-model="goodsForm.business_personnel_name" 
                filterable placeholder="请选择"
                style="width: 100%;"
                >
                    <el-option
                    v-for="item in businessPersonOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
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

          
          </el-form>
        </div>

        <!-- 弹窗底部按钮 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm">取 消</el-button>
            <el-button type="primary" @click="submitForm" @changePage="changePage">确 定</el-button>
        </span>

        <!-- 1、内弹框 类目选择 -->
        <el-dialog
            width="30%"
            title="类目选择"
            :visible.sync="innerVisible"
            append-to-body>

            <!-- 树型结构 -->
            <TreeView @sendTreeData="sendTreeData"/>

            <!-- 弹窗底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="showTreeData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 2、内弹框 图片上传 -->
        <el-dialog
            width="30%"
            title="图片上传"
            :visible.sync="innerVisibleImg"
            append-to-body>

            <!-- 图片上传 -->
            <uploadImg @sendImg="getImgUrl"/>

            <!-- 弹窗底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisibleImg = false">取 消</el-button>
                <el-button type="primary" @click="showImgURL">确 定</el-button>
            </span>
        </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import TreeView from "./TreeView.vue"
  import uploadImg from "./uploadImg.vue"
  // import wangEditor from "./wangEditor.vue"
  import { addGoods, updateGoods, getCategoryData } from "@/api/index.js"
  export default {
    // ["title","rowData"]
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
      customerOptions:{
        type:Array,
        default:function(){
          return [];
        }
      },
      businessPersonOptions:{
        type:Array,
        default:function(){
          return [];
        }
      },
      apparatusOptions:{
        type:Array,
        default:function(){
          return [];
        }
      }
    },
    components:{
      TreeView,
      uploadImg,
    },
    data() {
      return {
        dialogVisible: false,  //控制显示隐藏
        innerVisible: false,  //控制内弹框显示隐藏（默认是隐藏）
        innerVisibleImg: false,  //图片上传内弹窗显示隐藏
        treeData: {}, // tree
        isShowParams: false,  //是否显示规格参数，默认隐藏
        paramInfo: [],  //规格参数数组
        imgURL: '', // 图片路径
        // 表单数据对象
        goodsForm: {
          apparatus_id: 0,
          customer_id: 0,
          business_personnel_id: 0,
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
          business_personnel_name: [
            {required: true, message: '请输入业务负责人', trigger: 'blur' }
          ]
        }
      };
    },
    mounted(){
      // console.log(this.rowData);
      // this.goodsForm = this.rowData;
    },
    //侦听器：侦听到属性的变化之后
    watch:{
      rowData(val){
        console.log('watch:',val);
        this.goodsForm = val;
        // this.goodsForm.customer_name = val.customer_name;
        // editor.txt.html('<p>xxxxx</p>')    //重新设置编辑器内容
        // data、computed、props、watch、method 在created的时候已经初始化完成了,所以找不到DOM元素
        // 延时操作DOM
        // this.$nextTick(() => {  //获取到DOM元素才执行
        //   this.$refs.myEditor.editor.txt.html(val.descs);
        // })

        //两次点击同一条数据，修改商品表单，第二次没数据==》原因：侦听器没有侦听到rowData值的滨化

        //是否显示规格参数
        if(val.paramsInfo){
          //显示
          this.isShowParams = true;
          this.paramInfo = JSON.parse(val.paramsInfo);
        }
      }
    },
    methods: {
      // 接收tree子组件传递过来的数据，选择的是哪个节点
      sendTreeData(val){
        this.treeData = val;
      },
      // 接收上传图片子组件传递过来的图片路径
      getImgUrl(url){
        this.imgURL = url;
      },
      // 展示图片
      showImgURL(){
        // 图片上传弹窗隐藏
        this.innerVisibleImg = false;
        // 再将图片路径复制给goodsFor显示
        this.goodsForm.image = this.imgURL;
      },
      // 展示点击的tre节点
      async showTreeData(){
        // 隐藏内弹窗
        this.innerVisible = false;
        // 展示类目 {id:'',cid:'',name:''}
        this.goodsForm.category = this.treeData.name;
        this.goodsForm.cid = this.treeData.cid;

        // 是否显示规格参数，请求后台
        try {
          const res = await getCategoryData({cid:this.treeData.cid});
          console.log(res);
          if(res.status === 200){
            // 显示规格参数
            this.isShowParams = true;
            let info = res.result[res.result.length-1];
            // console.log(info);
            this.paramInfo = JSON.parse(info.paramData);
            console.log(this.paramInfo);
          }else{
            // 没有参数配置，隐藏
            this.isShowParams = false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 获取editor数据
      getEditor(val){
        this.goodsForm.descs = val;
      },
      // 提交表单
      // 参数： title cid  category sellPoint price num desc paramsInfo image
      submitForm(formName) {  // eslint-disable-line no-unused-vars
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            console.log(this.goodsForm);
            
            //对象合并  let obj1 = Object.assign(obj1,obj2);  //将obj2合并到obj1上变成一个新的obj1
            Object.assign(this.goodsForm, {
              paramsInfo:JSON.stringify(this.paramInfo)
            })
            
            if(this.title === "添加记录"){
              try {
                const res = await addGoods(this.goodsForm);
                console.log(res);
                if(res.status == 200){  //成功

                    this.$parent.getGoodsList(1);  // 更新父组件列表数据
                    this.changePage()  //让页码在在第一页高亮
                    this.$message({
                        message: '恭喜你，添加成功！',
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
              console.log('编辑', this.goodsForm);
              // 参数：id title cid  category sellPoint price num desc paramsInfo image
              try {
                const res = await updateGoods(this.goodsForm);
                console.log(res);
                if(res.status == 200){  //成功

                    this.$parent.getGoodsList(1);  // 更新父组件列表数据
                    this.changePage()  //让页码在在第一页高亮
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
      // 添加或编辑商品子组件触发页码改变事件
      changePage(page){ 
        this.$emit("changePage", page);  // 自定义事件（子传父）
      },
      // 重置表单
      resetForm(formName) { // eslint-disable-line no-unused-vars
        // this.$refs[formName].resetFields();

        // 1、隐藏弹窗
        this.dialogVisible = false;
        // 2、清空表单
        // 表单数据对象
        this.goodsForm = {
          order_id: 0,
          apparatus_name: '',   //器材名称
          customer_name: '',   //客户名
          count: '',   //数量
          lease_date: '',
          return_date: '',
          notes: '',  //备注
        }
      }
    }
  };
</script>

<style lang="less" scoped>
    .myform{
        padding: 20px;
        .line{
            text-align: center;
        }
    }
</style>