// 引入所有公共的渲染部分组件
import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, Link, hashHistory} from "react-router";
import * as redux from "redux";
import * as antd from "antd";

//执行全局通用的polyfill
require('es6-promise').polyfill();

