/**
 * Created by apple on 16/5/3.
 */

import Model from "../model";
var Promise = require('es6-promise').Promise;

export default class TableModel extends Model {

    constructor() {
        super();
        //设置当前为调试状态
        this.dev = true;
    }

    /**
     * @function 获取当前指定数据库的数据表列表和栏目列表
     */
    getTablesAndColumns() {

        //判断是否为调试
        if (this.dev) {

            return new Promise((resolve, reject)=> {
                //调用返回数据
                resolve(TableModel.testData.getTablesAndColumns.success);
            });

        } else {

        }

    }

}

//设置本Model的测试数据
TableModel.testData.getTablesAndColumns = {

    //成功的返回数据
    success: [
        {
            table_id: 1,
            tbl_name: "表一",
            col_name: "列一",
            col_desc: "列一描述",
            col_datatype: "列一数据类型",
            col_ispk: "是",
            col_isunique: "是"
        },
        {
            table_id: 2,
            tbl_name: "表2",
            col_name: "列2",
            col_desc: "列2描述",
            col_datatype: "列2数据类型",
            col_ispk: "是",
            col_isunique: "否"
        },
        {
            table_id: 3,
            tbl_name: "表3",
            col_name: "列3",
            col_desc: "列3描述",
            col_datatype: "列3数据类型",
            col_ispk: "否",
            col_isunique: "是"
        },
        {
            table_id: 4,
            tbl_name: "表4",
            col_name: "列4",
            col_desc: "列4描述",
            col_datatype: "列4数据类型",
            col_ispk: "否",
            col_isunique: "否"
        }
    ]
}