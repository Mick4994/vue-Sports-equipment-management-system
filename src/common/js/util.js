/**
 * export2Excel(columns,list)  导出excel表格
 * columns : Array=[{},{}] 表头 = [{title:'',key:''}]
 * list = []  table的数据 [{},{}]
 */
// export function export2Excel(columns,list){ 
export function export2Excel(columns,list,name){ 
    require.ensure([], () => {
        const { export_json_to_excel } = require('../../excel/Export2Excel');
        let tHeader = []
        let filterVal = []
        console.log(columns);
        if(!columns){
            return;
        }
        columns.forEach(item => {
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v => filterVal.map(j => v[j]))
        // export_json_to_excel(tHeader, data, '数据列表');  //表名已经写死，只能叫数据列表
        export_json_to_excel(tHeader, data, name);  //加name参数可以取不同的表名
    })
}