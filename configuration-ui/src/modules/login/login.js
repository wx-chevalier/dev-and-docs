/**
 * Created by apple on 16/4/27.
 */
import React, {Component, PropTypes} from "react";
import {Select, message, Button} from "antd";
import "antd/lib/index.css";
const Option = Select.Option;
require("./login.scss");


export default class LoginComponent extends Component {

    constructor(props) {

        super(props);

        //将Props
        this.state = {...props};

        //初始化内部状态
        this.state.username = "";

        this.state.password = "";

        this.state.role = "ContentManager";

        this.handleClickLoginButton = this.handleClickLoginButton.bind(this);
    }

    /**
     * @function 处理登录按钮的点击事件
     * @param e 传入的参数
     */
    handleClickLoginButton(e) {

        console.log(e);

        //判断是否为空,基本的判断
        if (this.state.username === "" || this.state.password === "") {
            message.error("用户名或者密码缺失");
        }

        //调用传入的处理方法
        this.props.doLogin(this.state.username, this.state.password, this.state.role)
            .then((result)=> {

                console.log(result);

                //登录成功
                message.success("登录成功");

                //跳转到对应页面
                switch (result.role) {

                    //内容管理员
                    case "ContentManager":

                        //跳转到对应的内容管理界面
                        window.location.href = "./api.html";

                        return;

                    //权限管理员
                    case "APIManager":

                        //跳转到对应的内容管理界面
                        window.location.href = "./auth.html";

                        return;

                    //密钥管理员
                    case "KeyManager":

                        //跳转到对应的内容管理界面
                        window.location.href = "./key.html";

                        return;

                    //超级管理员
                    case "Admin":

                        //跳转到对应的内容管理界面
                        window.location.href = "./admin.html";

                        return;


                    default:

                        return;
                }

            }, (error)=> {
                //登录失败

                //跳转到对应页面
            });
    }

    //返回构造的界面
    render() {

        return (<div className="login_container">
            <div className="login">
                <div className="login-header">
                    <h1>登录</h1>
                </div>
                <div className="login-form">
                    <h3>用户名:</h3>
                    <input type="text" placeholder="Username" onChange={(event)=>{
                        this.setState({username:event.target.value})
                    }}/><br/>
                    <h3>密码:</h3>
                    <input type="password" placeholder="Password"
                           onChange={(event)=>{
                                this.setState({password:event.target.value})
                    }}
                    />
                    <h3>角色:</h3>
                    <Select defaultValue="ContentManager" onChange={(value)=>{
                            this.setState({
                                role:value
                            });
                    }}>
                        <Option value="ContentManager">内容管理员</Option>
                        <Option value="APIManager">权限管理员</Option>
                        <Option value="KeyManager">密钥管理员</Option>
                        <Option value="Admin">超级管理员</Option>
                    </Select>
                    <br/>
                    <br/>
                    <input type="button" value="登录" className="login-button" onClick={this.handleClickLoginButton}/>
                    <br/>
                    <a className="sign-up">注册!</a>
                    <br/>
                    <h6 className="no-access">忘记密码?</h6>
                </div>
            </div>
        </div>);

    }

}

//定义登录界面的输入的属性
LoginComponent.propTypes = {
    //Promise doLogin(username,password)
    doLogin: React.PropTypes.func, //执行登录操作的方法
};

