import { contentInfoList } from '@/api/index'

export default {
    namespaced:true,  //开启命名空间
    // 状态，数据
    state:{
        //要明确存储的数据类型
        contentInfo: [], 
        contentData: {  //注意：对象原有的key一定要初始化好
            id: 0,
            name: '',
            pid: 0
        }
    },
    // 修改state里数据的唯一方式
    mutations:{
        setContentInfo(state, data){
            state.contentInfo = data;
        },
        setContentData(state, data){
            state.contentData = data;
        }
    },
    // 异步
    actions:{
        async asyncSetContentInfo({ commit }, data){  //异步函数(上下文, 对象)
            commit("setContentData", data);
            try {
                const res = await contentInfoList({pid:data.pid})
                if(res.status === 200){
                    commit("setContentInfo", res.result)
                }else{
                    commit("setContentInfo", [])
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    // 包装数据，不修改
    getters:{

    }
}