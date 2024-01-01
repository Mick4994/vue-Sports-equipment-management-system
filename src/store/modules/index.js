/** 
 * modules：所有的模块
 * 引用模块有两种方法：
 * 一：所有模块可以直接在store/index.js里通过import导入，在export里的module使用
 * 二：在modules下创建index.js，将所有模块，在这里面导入和使用；最后将index.js在store/index.js里导入，并使用
*/ 

// import LoginModule from "./LoginModule";

// export default{
//     LoginModule,
// }