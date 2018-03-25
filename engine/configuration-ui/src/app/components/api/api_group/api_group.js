/**
 * Created by apple on 16/5/4.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {Button, Icon, Modal, Steps, Select, Transfer} from "antd";
import {OperatorCell} from "../../common/table/operator_cell";
import {bindActionCreators} from "redux";
import TextCell from "../../common/table/text_cell";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";
import * as ApiGroupActionCreators from "./api_group.action";

require("./api_group.scss");
/**
 * 展示API列表
 */

const Step = Steps.Step;
const Option = Select.Option;

export class ApiGroupComponent extends React.Component {

    constructor(props) {
        super(props);

        //设置默认的state
        this.state = {
            modal_visible: {
                api_group_modal: false,
                api_group_modal_auth: false,
                api_group_modal_key: false
            },
            mockData: [],
            targetKeys: [],
        }

        //绑定创建API的点击事件
        this._handleClickCreateAPI = this._handleClickCreateAPI.bind(this);

        this.getMock = this.getMock.bind(this);
    }

    componentDidMount() {
        this.getMock();
    }

    getMock() {
        let targetKeys = [];
        let mockData = [];
        for (let i = 0; i < 100; i++) {
            const data = {
                key: i,
                title: `内容${i + 1}`,
                description: `内容${i + 1}的描述`,
                chosen: Math.random() * 2 > 1
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({mockData, targetKeys});
    }

    handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.setState({targetKeys});
    }

    /**
     * @function 响应创建新的API
     * @private
     */
    _handleClickCreateAPI() {

    }

    render() {
        //从Props中
        let {apiGroupList, fetchData, config} = this.props;

        //如果没有传入data属性,则先设置为空,然后触发数据抓取
        if (apiGroupList === undefined) {
            apiGroupList = [];
            fetchData();
        }

        return (
            <div className="api_content_container">
                <div className="grid">
                    <Table
                        rowsCount={apiGroupList.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={2000} //这个值设置的比较大,从而来使得数据表撑满整个容器
                        height={500}>
                        <Column
                            header={<Cell>接口组编号</Cell>}
                            cell={
                            <TextCell
                              data={apiGroupList}
                              field="id"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口组描述</Cell>}
                            cell={
                            <TextCell
                              data={apiGroupList}
                              field="desc"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口组创建者</Cell>}
                            cell={
                            <TextCell
                              data={apiGroupList}
                              field="dc_user.name"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口组授权公司</Cell>}
                            cell={
                            <TextCell
                              data={apiGroupList}
                              field="companys"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口组授权key编号</Cell>}
                            cell={
                            <TextCell
                              data={apiGroupList}
                              field="dc_api_group_key.dc_key_id"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口组创建时间</Cell>}
                            cell={
                            <TextCell
                              data={apiGroupList}
                              field="create_time"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>操作</Cell>}
                            cell={
                                <OperatorCell
                                data={apiGroupList}
                                id_field="id"
                                 operation={
                                    [
                                        {
                                            title:"授权",
                                            onClick:(id)=>{
                                                this.setState({
                                                    modal_visible:{
                                                        api_group_modal_auth:true
                                                    }
                                                });
                                            }
                                        },
                                        {
                                            title:"密钥",
                                            onClick:(id)=>{
                                                this.setState({
                                                    modal_visible:{
                                                        api_group_modal_key:true
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                 }
                                 />
                            }
                            width={100}
                        />
                    </Table>
                </div>
                <div className="button">
                    <Button type="primary" shape="circle" size="large"
                            onClick={()=>{this.setState({modal_visible:{
                                api_group_modal:true
                            }})}}>
                        <Icon type="plus"/>
                    </Button>
                </div>

                <Modal
                    className="api_group_modal"
                    width="400"
                    title="创建新的API Group"
                    visible={this.state.modal_visible.api_group_modal}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    maskClosable={false}
                    onCancel={()=>{
                    this.setState(
                        {
                            modal_visible:{
                                api_group_modal:false
                               }
                        }
                      )
                    }
                    }>

                    <div className="api_group_creator">
                        <input type="text" placeholder="输入API组描述" name="" id=""/>
                    </div>


                </Modal>

                <Modal
                    className="api_group_modal_auth"
                    width="500"
                    title="选择需要授权的公司"
                    visible={this.state.modal_visible.api_group_modal_auth}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    maskClosable={false}
                    onCancel={()=>{this.setState({modal_visible:false})}}>

                    <div className="api_group_auth">
                        <Transfer
                            dataSource={this.state.mockData}
                            targetKeys={this.state.targetKeys}
                            onChange={this.handleChange}
                            render={item => item.title}
                            operations={['授权', '取消']}
                            titles={["未授权公司","已授权公司"]}

                        />
                    </div>


                </Modal>

                <Modal
                    className="api_group_modal_key"
                    width="400"
                    title="选择授权的密钥"
                    visible={this.state.modal_visible.api_group_modal_key}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    maskClosable={false}
                    onCancel={()=>{this.setState({modal_visible:false})}}>

                    <div className="api_group_key">
                        <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择要使用的密钥"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                searchPlaceholder="输入关键词"
                                onChange={()=>{}}>
                            <Option value="jack">密钥一</Option>
                            <Option value="lucy">密钥二</Option>
                            <Option value="tom">密钥三</Option>
                        </Select>
                    </div>

                </Modal>

            </div>
        )

    }
}

/**
 * @function 设置Api原型
 * @type {{config: *}}
 */
ApiGroupComponent.propTypes = {
    config: React.PropTypes.object
};

const connector = connect(
    //mapStateToProps
    (state)=> {

        return {
            apiGroupList: state.api.api_group.apiGroupList

        }

    },
    //mapDispatchToProps
    (dispatch)=> {

        return {
            fetchData: ()=> {
                dispatch(ApiGroupActionCreators.fetchData())
            }
        }


    });

/**
 * @function
 */
export const ApiGroupContainer = connector(ApiGroupComponent);

/**
 * @function
 * @param customApiGroupComponent
 * @returns {*}
 * @constructor
 */
export function ApiGroupContainerFactory(config) {

    class CustomComponent extends React.Component {
        render() {
           return (
               <ApiGroupComponent {...this.props} {...config}/>
           )
        }
    }

    return connector(CustomComponent);
}