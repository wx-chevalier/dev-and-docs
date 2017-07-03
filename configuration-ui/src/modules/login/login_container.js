/**
 * Created by apple on 16/5/9.
 */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import UserLoginModel from "../../app/models/user/user_login";
import LoginComponent from "./login";


const userLoginModel = new UserLoginModel();

//这里没有使用Redux,直接引入LoginComponent即可

class LoginContainer extends Component {

    render() {
        return (
            <LoginComponent doLogin={userLoginModel.login}/>
        )
    }

}

render(<LoginContainer/>, document.getElementById('root'));
