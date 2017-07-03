/**
 * Created by apple on 16/5/9.
 */
import React, {Component, PropTypes} from "react";
var FontAwesome = require('react-fontawesome');
require("./single_api_doc.scss");

export class SingleApiDocComponent extends Component {

    render() {
        return (
            <div>
                <h2>基本信息</h2>
                <div className="basicInfo">
                    <div className="row">
                        <div className="col-6">接口功能</div>
                        <div className="col-6">用户注册时，如果用户手机号码允许注册，发送验证码</div>
                    </div>
                    <div className="row">
                        <div className="col-6">接口协议</div>
                        <div className="col-6">HTTP</div>
                    </div>
                    <div className="row">
                        <div className="col-6">请求类型</div>
                        <div className="col-6">GET/POST</div>
                    </div>
                    <div className="row">
                        <div className="col-6">请求地址</div>
                        <div className="col-6">http://api.liveforest.com/User/Register/doVerificationCodeSend</div>
                    </div>
                    <div className="row">
                        <div className="col-6">测试地址</div>
                        <div className="col-6">http://121.41.104.156:10086/User/Register/doVerificationCodeSend?requestData=</div>
                    </div>
                </div>
                <h2>请求参数</h2>
                <div className="row">
                    <div className="col-6">username</div>
                    <div className="col-6">用户名</div>
                </div>
                <div className="row">
                    <div className="col-6">password</div>
                    <div className="col-6">密码</div>
                </div>
                <h2>响应数据</h2>
                <div className="row">
                    <div className="col-6">成功返回</div>
                    <div className="col-6">
                            "code": -1005,
                            "desc": "请求的ChallengeAttend资源不存在"
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">错误返回</div>
                    <div className="col-6">
                        "code": -1005,
                        "desc": "请求的ChallengeAttend资源不存在"
                    </div>
                </div>
            </div>)
    }

}