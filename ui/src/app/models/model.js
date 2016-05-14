/**
 * Created by apple on 16/5/3.
 */
//自动进行全局的ES6 Promise的Polyfill
require('es6-promise').polyfill();
require('isomorphic-fetch');


/**
 * @function 基础的模型类,包含了基本的URL定义
 */
export default class Model {

    constructor() {

    }


    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    parseJSON(response) {
        return response.json()
    }

    /**
     * @function 利用get方法发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param action 请求的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    get({path="", requestData={}, action="GET"}) {

        //将requestData序列化为JSON
        const requestDataString = JSON.stringify(requestData);

        //将字符串链接
        const packagedRequestURL = `${Model.BASE_URL}${path}?requestData=${requestDataString}&action=${action}`;

        return fetch(packagedRequestURL)
            .then(checkStatus)
            .then(parseJSON);
    }

    post({path="/", requestData={}, action="POST"}) {

    }

    put({path="/", requestData={}, action="put"}) {

    }


    delete({path="/", requestData={}, action="DELETE"}) {

    }

}


//基础的URL
Model.BASE_URL = "http://localhost/";

Model.testData = {};

Model.testData.error = {};