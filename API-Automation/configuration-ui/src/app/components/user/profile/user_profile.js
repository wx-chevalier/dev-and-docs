/**
 * Created by apple on 16/5/3.
 */
import React, {Component, PropTypes} from "react";
var FontAwesome = require('react-fontawesome');
require("./user_profile.scss");

export class UserProfileComponent extends Component {
    constructor() {
        super();
    }

    _defaultProps() {

    }

    render() {

        return (<div className="user_profile_container">

            {/*操作面板*/}
            <div className="panel">

                <div className="basicInfo">
                    <FontAwesome className="logo" name="user"/>
                    <div className="username">Chevalier</div>
                </div>

                <div className="roleInfo">
                    <h1>角色信息</h1>
                    <div className="row">
                        <div className="col-6">超级管理员</div>
                        <div className="col-6">管理用户、系统配置、用户权限</div>
                    </div>
                    <hr/>

                    <div className="row">
                        <div className="col-6">密钥管理员</div>
                        <div className="col-6">管理所有下属(权限管理员)的加密方式及对应密钥的查看和修改权限</div>
                    </div>
                    <hr/>

                    <div className="row">
                        <div className="col-6">接口权限管理员</div>
                        <div className="col-6">创建新的加密方式、查看和修改自己加密方式及密钥的权限，给下属(内容管理员)员编辑的接口指派加密方式的权限，接口的授权</div>
                    </div>
                    <hr/>

                    <div className="row">
                        <div className="col-6">内容管理员</div>
                        <div className="col-6">编辑接口的权限</div>
                    </div>
                </div>

                <div className="departmentInfo">
                    <h1>单位信息</h1>
                </div>

            </div>

        </div>);
    }
}