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
import {ApiContentContainer} from "../../../app/components/api/api_content/api_content";

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
                key: "key_datagrid",
                title: "数据表管理",
                iconType: "bars",
                path: "/datagrid"
            },
            {
                key: "key_api_group",
                title: "API组管理",
                iconType: "bars",
                path: "/api_group"
            },
            {
                key: "key_api",
                title: "API管理",
                iconType: "bars",
                path: "/api"
            }
        ];
    }

    render() {
        return <div className="container">
            <div className="header">
                <HeaderComponent config={this._getHeaderConfiguration()}></HeaderComponent>
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

export class AppContainer extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={AppComponent}>
                        <Route path="user_profile" component={UserProfileComponent}/>
                        <Route path="datagrid" component={ApiDataGridContainer}/>
                        <Route path="api_group" component={ApiGroupContainer}/>
                        <Route path="api" component={ApiContentContainer}/>
                    </Route>
                </Router>
            </Provider>
        )
    }

}

