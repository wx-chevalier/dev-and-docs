import Model from "../model";
var Promise = require('es6-promise').Promise;
/**
 * Created by apple on 16/5/9.
 */

export default class UserLoginModel extends Model {

    constructor() {

        super();

        this.dev = true;

        this.login = this.login.bind(this);
    }

    /**
     * @function 执行登录操作
     * @param username 用户名
     * @param password 密码
     * @returns {*} 返回一个Promise对象
     */
    login(username, password, role) {

        console.log(username + " " + password + " " + role);

        return new Promise((resolve, reject)=> {

            if (this.dev == true) {
                //将登录时候的role设置为当前role
                UserLoginModel.testData.login.success.role = role;

                //返回测试数据
                resolve(UserLoginModel.testData.login.success);

            }


        });
    }

    /**
     * @function 执行登出操作
     * @returns Promise
     */
    logout() {

    }


}

/**
 * @function 登录的Mock数据
 * @type {{success: {code: number, desc: string, token: string}, error: {code: number, desc: string}}}
 */
UserLoginModel.testData = {};

UserLoginModel.testData.login = {
    success: {
        code: 200,
        desc: "登录成功",
        role: "ContentManager",//用户角色 Admin(1), KeyManager(2), APIManager(4), ContentManager(8);
        token: "123456789"
    },
    error: {
        code: 401,
        desc: "登录失败"
    }
};

/**
 * @function 登出时候的Mock数据
 * @type {{success: {}}}
 */
UserLoginModel.testData.logout = {
    success: {}
};