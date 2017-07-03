/**
 * Created by apple on 16/5/4.
 */
import Model from "../model";
var Promise = require('es6-promise').Promise;

export default class ApiGroupModel extends Model {


    /**
     * @function 默认构造函数
     */
    constructor() {
        super();
        this.dev = true;
    }

    /**
     * @function 获取API组列表
     */
    getApiGroupList() {
        return new Promise((resolve, reject)=> {
            resolve(ApiGroupModel.testData.getApiGroupList.success)
        });
    }

}

//获取API组列表的测试数据
ApiGroupModel.testData.getApiGroupList = {
    success: [
        {
            id: 1,//接口组编号
            dc_user_id: 1,//接口组创建者的用户编号
            dc_user: { //接口组创建者的信息
                name: "username" //创建者名
            },
            desc: "接口组1描述", //接口组描述
            companys: ["公司一", "公司二"], //接口组分配到的公司名
            dc_api_group_key: { //该接口组关联的密钥信息
                dc_key_id: "key编号",
                set_time: "2014-10-1 10:9:8"
            },
            create_time:"2014-10-1 10:9:8"

        },
        {
            id: 2,//接口组编号
            dc_user_id: 2,//接口组创建者的用户编号
            dc_user: { //接口组创建者的信息
                name: "username" //创建者名
            },
            desc: "接口组1描述", //接口组描述
            companys: ["公司一", "公司二"], //接口组分配到的公司名
            dc_api_group_key: { //该接口组关联的密钥信息
                dc_key_id: "key编号",
                set_time: "2014-10-1 10:9:8"
            },
            create_time:"2014-10-1 10:9:8"
        },
        {
            id: 3,//接口组编号
            dc_user_id: 3,//接口组创建者的用户编号
            dc_user: { //接口组创建者的信息
                name: "username" //创建者名
            },
            desc: "接口组1描述", //接口组描述
            companys: ["公司一", "公司二"], //接口组分配到的公司名
            dc_api_group_key: { //该接口组关联的密钥信息
                dc_key_id: "key编号",
                set_time: "2014-10-1 10:9:8"
            },
            create_time:"2014-10-1 10:9:8"

        }
    ]
};