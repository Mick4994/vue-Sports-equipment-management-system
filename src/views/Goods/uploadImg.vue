<template>
  <div>
    <!-- 
        action	必选参数，上传的地址
        on-preview	点击文件列表中已上传的文件时的钩子	function(file)
        on-remove	文件列表移除文件时的钩子	function(file, fileList)
        file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
        auto-upload	是否在选取文件后立即进行上传	boolean

        on-success	文件上传成功时的钩子	function(response, file, fileList)	
     -->
    <el-upload
        class="upload-demo"
        ref="upload"
        :action="url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-success="onSuccess"
    >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  import base from '@/api/base.js'
  export default {
    data() {
      return {
        url: base.uploadUrl,  //存放图片的服务器地址
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //上传成功
      onSuccess(response, file, fileList){
        console.log("上传成功：", response, file, fileList);
        this.$message({
          showClose: true,
          message: '恭喜你，图片上传成功！',
          type: 'success'
        });
        // http://localhost:8989/1645580028699-1.png  //图片网络地址
        // upload\\1645580028699-1.png  //上传成功后返的地址，需要拼接成上面的网络地址
        let imgUrl = base.baseUrl + '/' + response.url.slice(7);
        console.log(imgUrl);
        // 向父组件传值
        this.$emit('sendImg', imgUrl);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>