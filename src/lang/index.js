import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'  //elementUIU 英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'  //elementUIU 中文包
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)


// 2、准备翻译的语言环境信息
const messages = {
    // 英文
    en:{ 
        //页面
        menu:{
            title: 'Equipment Management',
            home: 'Data Statistics',
            goods: 'Equipment Rental',
            store: 'Warehouse',
            contact: 'Customer Contact',
            setting: 'setting'
        },
        ...enLocale,
        content:{

        }
    },
    // 中文
    zh:{
        menu:{
            title: '运动器材租赁管理系统',
            home: '数据统计',
            goods: '器材租赁历史表',
            store: '仓库管理',
            contact: '客户联系表',
            setting: '系统设置'
        },
        ...zhLocale
    }
}


// 3、通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

// 4、导出 i18h
export default i18n;
