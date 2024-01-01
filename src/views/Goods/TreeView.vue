<template>
  <div>
    <!-- 
        props	配置选项，具体看下表
        label	指定节点标签为节点对象的某个属性值
        children	指定子树为节点对象的某个属性值
        isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
        lazy	是否懒加载子节点，需与 load 方法结合使用	boolean

        accordion	是否每次只打开一个同级树节点展开	boolean
        node-click	节点被点击时的回调
     -->
    <el-tree
        :props="props"
        :load="loadNode"
        lazy
        accordion
        @node-click="nodeClick">
    </el-tree>
    
  </div>
</template>

<script>
  import { getCategory } from '@/api/index'  //按需引入
  export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
      async loadNode(node, resolve) {
        if (node.level === 0) {
            //页面一加载，获取第一层数据
            try {
                const res = await getCategory();
                // console.log(res);
                return resolve(res.result);
            } catch (error) {
                console.log(error);
            }
        }
        if (node.level >= 1) {
            // 再去请求当前节点下的数据
            try {
                const res = await getCategory({id:node.data.cid});
                console.log(res);

                // {status: 500, msg: '暂无数据'}
                if(res.status === 200){
                    return resolve(res.result);
                }else{
                    return resolve([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
      },
      nodeClick(data, node){   // eslint-disable-line no-unused-vars
        // console.log(data, node);  //测试一下
        //给父组件传递数据
        this.$emit("sendTreeData", data);
      },
    }
  };
</script>

<style lang="less" scoped>

</style>