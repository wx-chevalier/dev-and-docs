/**
 * Created by apple on 16/5/4.
 */
import Model from "../model";
var Promise = require('es6-promise').Promise;

export default class ApiContentModel extends Model {

    /**
     * @function 构造函数
     */
    constructor() {
        super();
        this.dev = true;
    }

    /**
     * @function 获取API列表
     */
    getApiList() {
        return new Promise((resolve, reject)=> {
            resolve(ApiContentModel.testData.getApiList.success);
        });
    }

    /**
     * @function 创建一个新的API
     */
    postApi() {

    }

    /**
     * @function 更新某个API的信息
     */
    updateApi() {

    }

    /**
     * @function 删除某个API
     */
    deleteApi() {

    }

}

//定义API内容的测试数据
ApiContentModel.testData.getApiList = {
    success: [
        {
            id: "1",
            desc: "接口1",
            dc_api_group_id: "所属接口组的编号",
            dc_manageddb_tbl_id: "关联的数据库表的编号",
            dc_manageddb_tbl: {
                tbl_name: "关联的表名",
                tbl_desc: "关联的表的描述"
            },
            result_columns: ["column1", "column2"],
            query_column: "columnName > 1"
        },
        {
            id: "2",
            desc: "接口2",
            dc_api_group_id: "所属接口组的编号",
            dc_manageddb_tbl_id: "关联的数据库表的编号",
            dc_manageddb_tbl: {
                tbl_name: "关联的表名",
                tbl_desc: "关联的表的描述"
            },
            result_columns: ["column1", "column2"],
            query_column: "columnName > 1"
        },
        {
            id: "3",
            desc: "接口3",
            dc_api_group_id: "所属接口组的编号",
            dc_manageddb_tbl_id: "关联的数据库表的编号",
            dc_manageddb_tbl: {
                tbl_name: "关联的表名",
                tbl_desc: "关联的表的描述"
            },
            result_columns: ["column1", "column2"],
            query_column: "columnName > 1"
        }
    ]
};