/**
 * Created by apple on 16/5/9.
 */
import Model from "../model";
var Promise = require('es6-promise').Promise;

export default class KeyModel extends Model {

    /**
     * @function 默认构造函数
     */
    constructor() {
        super();

        this.dev = true;
    }

    /**
     * @function 获取当前的密钥列表
     */
    getKeyList() {

        return new Promise((resolve, reject)=> {
            resolve(KeyModel.testData.getKeyList.success);
        });

    }

}

KeyModel.testData.getKeyList = {

    success: [
        {
            id: 1,
            enc_method: "加密方法1",
            enc_passwd: "加密密码1"
        },
        {
            id: 2,
            enc_method: "加密方法2",
            enc_passwd: "加密密码2"
        },
        {
            id: 3,
            enc_method: "加密方法3",
            enc_passwd: "加密密码3"
        }
    ]

};