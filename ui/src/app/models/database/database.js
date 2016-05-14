/**
 * Created by apple on 16/5/11.
 */
import Model from "../model";
var Promise = require('es6-promise').Promise;


export class DataBaseModel extends Model {

    /**
     * @function 获取受管数据库列表
     * @returns {*}
     */
    getDataBaseList() {
        return new Promise((resolve, reject)=> {
            resolve(DataBaseModel.testData.getDataBaseList.success);
        });
    }

}

//配置测试数据
DataBaseModel.testData.getDataBaseList = {
    success: [{
        id: 1,
        serv_addr: "数据库地址1",
        serv_port: 3306,
        serv_desc: "数据库描述1",
        serv_cfg: "数据库配置1"
    },
        {
            id: 2,
            serv_addr: "数据库地址2",
            serv_port: 3306,
            serv_desc: "数据库描述2",
            serv_cfg: "数据库配置2"
        }
    ]
};
