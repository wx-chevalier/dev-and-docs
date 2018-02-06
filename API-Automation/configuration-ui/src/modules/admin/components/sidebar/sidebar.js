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

        let {initial_key_index} = this.props;

        if (initial_key_index === undefined) {
            initial_key_index = "1";
        }

        this.state = {
            current: initial_key_index
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

        //根据当前的URL判断当前地址

        return (
            <Menu onClick={this.handleClick}
                  defaultOpenKeys={['sub1',"sub2","sub3","user"]}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据表</span></span>}>
                    <Menu.Item key="1"><Link to="/datagrid">数据表列表</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>API组</span></span>}>
                    <Menu.Item key="5"><Link to="/api_group">API组列表</Link></Menu.Item>
                    <Menu.Item key="6">API组创建</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="setting" /><span>API</span></span>}>
                    <Menu.Item key="7"><Link to="/api">API列表</Link></Menu.Item>
                    <Menu.Item key="8">API创建</Menu.Item>
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
    initial_key_index: PropTypes.string
};