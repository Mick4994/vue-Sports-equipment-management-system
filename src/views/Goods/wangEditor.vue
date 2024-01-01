<template>
  <div id="div1">
  </div>
</template>

<script>
    import E from "wangeditor"
    export default {
        data(){
            return{
                editor: ''
            }
        },
        mounted(){  //生命周期钩子函数一般不会写太多逻辑，会将代码进行封装,再去调用
            this.loadEditor();
        },
        methods:{
            //加载富文本编辑器
            loadEditor(){
                this.editor = new E("#div1")

                //配置 onchange 函数
                // 获取输入的值内容
                this.editor.config.onchange = (newHtml)=>{
                    // 向父组件传值
                    this.$emit('sendEditor', newHtml);
                };
                //配置触发 onchange 的时间频率，默认为200ms
                this.editor.config.onchangeTimeout = 500;  //修改为 500ms

                // 菜单配置，删减菜单，调整顺序
                this.editor.config.menus = [
                    "head",
                    "bold",
                    "fontSize",
                    "fontName",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "indent",
                    "lineHeight",
                    "foreColor",
                    "backColor",
                    "link",
                    "list",
                    "todo",
                    "justify",
                    "quote",
                    "emoticon",
                    "image",
                    "video",
                    "table",
                    "code",
                    "splitLine",
                    "undo",
                    "redo",
                ];

                this.editor.create()

                // editor.txt.html('<p>xxxxx</p>')    //重新设置编辑器内容
                // editor.txt.clear()  //清空编辑器内容
            }
        }
    }
</script>

<style lang="less" scoped>

</style>