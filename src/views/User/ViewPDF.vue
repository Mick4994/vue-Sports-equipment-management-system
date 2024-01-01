<template>
  <div>
    <el-dialog
        title="合同内容"
        :visible.sync="dialogVisible"
        width="50%">
         
        <!-- 使用pdf -->
        <!-- 属性：
            page：显示的页码
            rorate：选择 90度的倍数
            pageCount：总页数
            currentPage：当前在第几页
         -->
         <!-- 把PDF文件放到public下，因为组件最终都会渲染到index.html里,所以最后是从index.html上找，使用相对路径  -->
        <!-- 第一种：单页加载 -->
        <hr>
        <el-button type="primary" @click="changepage(0)">上一页</el-button>
        <el-button type="primary" @click="changepage(1)">下一页</el-button>
        <el-button type="primary" @click="$refs.myPDF.print()">打印合同</el-button>
        {{currentPage}} / {{pageCount}}
        
        <pdf 
            ref="myPDF"
            src="./sxt.pdf" 
            :page="num" 
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
        >
        </pdf>

        <!-- 第二种：预览效果 -->
        <!-- <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 25%"
        ></pdf> -->

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
// var loadingTask = pdf.createLoadingTask('./sxt.pdf');
export default {
    components:{
        pdf
    },
    data(){
        return{
            dialogVisible: false,
            currentPage: 0,
            pageCount: 0,
            num: 1,  //页码

            // src: loadingTask,
            // numPages: undefined,  //总页码
        }
    },
    // mounted() {
    //     this.src.promise.then(pdf => {
    //         this.numPages = pdf.numPages;
    //     });
    // },
    methods:{
        changepage(flag){
            //上一页
            if(flag === 0 && this.currentPage > 1){
                this.num--;
            }
            //下一页
            if(flag === 1 && this.currentPage < this.pageCount){
                this.num++;
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>