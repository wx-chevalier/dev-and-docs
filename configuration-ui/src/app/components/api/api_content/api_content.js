/**
 * Created by apple on 16/5/4.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {Button, Icon, Modal, Steps, Select} from "antd";
import {SingleApiDocModalComponent} from "./single_api_doc/single_api_doc_modal";
import {OperatorCell} from "../../common/table/operator_cell";
import {bindActionCreators} from "redux";
import TextCell from "../../common/table/text_cell";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";
import * as ApiContentActionCreators from "./api_content.action";

require("./api_content.scss");
/**
 * 展示API列表
 */

const Step = Steps.Step;
const Option = Select.Option;

export class ApiContentComponent extends React.Component {

    constructor(props) {
        super(props);


        const steps = [{
            title: '描述',
            description: '输入本API的描述'
        }, {
            title: '关联表',
            description: '选择关联的数据表'
        }, {
            title: '返回列',
            description: '选择本API需要返回的列'
        }, {
            title: '筛选条件',
            description: '设置字段的筛选条件(目前仅支持单字段)'
        }].map((s, i) => <Step key={i} title={s.title} description={s.description}/>);

        //设置默认的state
        this.state = {
            modal_visible: false, //控制是否显示模态窗口
            modal_visible_doc: false,
            steps: steps //步骤
        };

        //绑定创建API的点击事件
        this._handleClickCreateAPI = this._handleClickCreateAPI.bind(this);
    }

    /**
     * @function 响应创建新的API
     * @private
     */
    _handleClickCreateAPI() {

    }

    _renderOperator() {

        if (this.props.operator !== undefined) {

            return this.props.operator;

        } else {
            return (<div></div>)
        }

    }

    //判断是否含有子元素,存在则返回子元素,否则返回
    _renderChildren() {
        if (!!this.props.children) {
            return this.props.children;
        }
        else {
            var {create_button_visible} = this.props;

            create_button_visible = !!create_button_visible ? "none" : "block";

            return (<div>
                <div className="button" style={{display:create_button_visible}}>
                    <Button type="primary" shape="circle" size="large"
                            onClick={()=>{this.setState({modal_visible:true})}}>
                        <Icon type="plus"/>
                    </Button>
                </div>


                <Modal
                    className="api_content_modal"
                    width="800"
                    title="创建新的API"
                    visible={this.state.modal_visible}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    maskClosable={false}
                    onCancel={()=>{this.setState({modal_visible:false})}}>
                    <div className="api_content">
                        <div className="steps">
                            <Steps direction="vertical" current={1}>{this.state.steps}</Steps>
                        </div>
                        <div className="form">
                            <input type="text" className="desc" id="" placeholder="接口描述"/>
                            <Select showSearch
                                    className="tbl_name"
                                    placeholder="请选择关联表"
                                    optionFilterProp="children"
                                    notFoundContent="无法找到"
                                    searchPlaceholder="输入关键词"
                                    onChange={()=>{}}>
                                <Option value="jack">表一</Option>
                                <Option value="lucy">表二</Option>
                                <Option value="tom">表三</Option>
                            </Select>

                            <Select
                                className="result_columns"
                                placeholder="请选择关联列"
                                multiple
                                defaultValue={['jack', 'lucy']}
                                onChange={()=>{}}>
                                <Option value="1">列1</Option>
                                <Option value="2">列2</Option>
                                <Option value="3">列3</Option>
                            </Select>

                            <input type="text" className="query_column" placeholder="输入筛选条件"/>
                        </div>
                    </div>


                </Modal>
            </div>)
        }
    }

    render() {
        let {apiList, fetchData} = this.props;

        //如果没有传入data属性,则先设置为空,然后触发数据抓取
        if (apiList === undefined) {
            apiList = [];
            fetchData();
        }


        return (
            <div className="api_content_container">
                <div className="grid">
                    <Table
                        rowsCount={apiList.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={2000} //这个值设置的比较大,从而来使得数据表撑满整个容器
                        height={500}>
                        <Column
                            header={<Cell>接口编号</Cell>}
                            cell={
                            <TextCell
                              data={apiList}
                              field="id"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口描述</Cell>}
                            cell={
                            <TextCell
                              data={apiList}
                              field="desc"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>接口动作</Cell>}
                            cell={
                            <TextCell
                              value="GET"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>所属接口组</Cell>}
                            cell={
                            <TextCell
                              data={apiList}
                              field="dc_api_group_id"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>关联表名</Cell>}
                            cell={
                            <TextCell
                              data={apiList}
                              field="dc_manageddb_tbl.tbl_name"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>返回字段</Cell>}
                            cell={
                            <TextCell
                              data={apiList}
                              field="result_columns"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>查询字段</Cell>}
                            cell={
                            <TextCell
                              data={apiList}
                              field="query_column"
                            />
                          }
                            width={100}
                        />

                        <Column
                            header={<Cell>使用说明</Cell>}
                            cell={<OperatorCell
                                    data={apiList}
                                    id_field="id"
                                    operation={
                                                [
                                                    {
                                                        title:"查看",
                                                        onClick:()=>{this.setState({modal_visible_doc:true})}

                                                    }
                                                ]
                                              }

                                    />}
                            width={100}
                        />

                    </Table>
                </div>
                <SingleApiDocModalComponent modal_visible={this.state.modal_visible_doc}/>
                {this._renderChildren()}
            </div>
        )

    }
}

ApiContentComponent.propTypes = {
    operator: React.PropTypes.array //传入的Operator列表
};

const connector = connect(
    //mapStateToProps
    (state)=> {

        return {
            apiList: state.api.api_content.apiList

        }

    },
    //mapDispatchToProps
    (dispatch)=> {

        return {
            fetchData: ()=> {
                dispatch(ApiContentActionCreators.fetchData())
            }
        }


    });

/**
 * @function
 */
export const ApiContentContainer = connector(ApiContentComponent);

export function ApiContentContainerFactory(customApiContentComponent) {

    return connector(customApiContentComponent);

}