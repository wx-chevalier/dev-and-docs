/**
 * Created by apple on 16/5/3.
 */
import React, {Component, PropTypes} from "react";
import {Menu, Icon} from "antd";
import {Link} from "react-router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class SideBarComponent extends Component {

    constructor(props) {
        super(props);

        let {initial_key} = this.props;

        if (initial_key === undefined) {
            //如果没有设置initial_key的值,则从href中获取
            var path = location.href;

            if (path.includes("/#/")) {
                initial_key = (path.substr(path.indexOf("#/") + 2, path.indexOf("?_k") - path.indexOf("#/") - 2));
            } else {
                initial_key = "1";
            }
        }

        this.state = {
            current: initial_key
        }

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * @function 处理点击事件
     * @param e
     */
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }

    render() {

        return (
            <Menu onClick={this.handleClick}
                  defaultOpenKeys={['sub1',"sub2","sub3","user"]}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>密钥</span></span>}>
                    <Menu.Item key="key"><Link to="/key">密钥列表</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>API组</span></span>}>
                    <Menu.Item key="api_group"><Link to="/api_group">API组列表</Link></Menu.Item>
                    <Menu.Item key="6">API组创建</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="setting" /><span>数据库</span></span>}>
                    <Menu.Item key="database"><Link to="/database">数据库列表</Link></Menu.Item>
                    <Menu.Item key="8">数据库创建</Menu.Item>
                </SubMenu>
                <SubMenu key="user" title={<span><Icon type="setting" /><span>用户中心</span></span>}>
                    <Menu.Item key="user_profile"><Link to="/user_profile">个人信息</Link></Menu.Item>
                    <Menu.Item key="10">账户安全</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }

}

SideBarComponent.propTypes = {
    initial_key: PropTypes.string
};