/**
 * Created by apple on 16/4/24.
 */

import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, Link, hashHistory} from "react-router";
import configureStore from "../store/configureStore";
import {Provider} from "react-redux";
import {HeaderComponent} from "../../../app/components/header/header";
import {UserProfileComponent} from "../../../app/components/user/profile/user_profile";
import {SideBarComponent} from "../components/sidebar/sidebar";
import {ApiDataGridContainer} from "../../../app/components/api/api_datagrid/api_datagrid";
import {ApiGroupContainer} from "../../../app/components/api/api_group/api_group";
import {KeyContainer} from "../../../app/components/auth/key/key";
import {DataBaseContainer} from "../../../app/components/database/database";

require("./app.scss");
require('font-awesome/css/font-awesome.css');

const store = configureStore(); //初始化Store

export class AppComponent extends Component {

    constructor(props) {

        super(props);


    }

    _getHeaderConfiguration() {
        //设置HeaderComponent
        /**
         * {
                key: "key_3",
                title: "数据表管理",
                iconType: "bars",
                path: "/api"
            }
         *
         */
        return [
            {
                key: "key_key",
                title: "密钥管理",
                iconType: "bars",
                path: "/key"
            },
            {
                key: "key_api_group",
                title: "API组管理",
                iconType: "bars",
                path: "/api_group"
            },
            {
                key: "key_database",
                title: "数据库管理",
                iconType: "bars",
                path: "/database"
            }

        ];
    }

    render() {
        return <div className="container">
            <div className="header">
                <HeaderComponent config={this._getHeaderConfiguration()} username="李小四" role="密钥管理员"></HeaderComponent>
            </div>
            <div className="middle">
                <div className="main_container">
                    <div className="menu">
                        <SideBarComponent></SideBarComponent>
                    </div>
                    {/*操作面板*/}
                    <div className="panel">
                        {this.props.children}
                    </div>
                </div>
            </div>
            {/*底部标识*/}
            <div className="footer">

            </div>
        </div>
    }
}

/**
 * @function 整个应用的容器
 */
export class AppContainer extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={AppComponent}>
                        <IndexRoute component={KeyContainer}/>
                        <Route path="user_profile" component={UserProfileComponent}/>
                        <Route path="database" component={DataBaseContainer}/>
                        <Route path="api_group" component={ApiGroupContainer}/>
                        <Route path="key" component={KeyContainer}/>
                    </Route>
                </Router>
            </Provider>
        )
    }

}

