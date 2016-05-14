/**
 * Created by apple on 16/5/4.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {Button, Icon, Modal, Steps, Select} from "antd";
import {bindActionCreators} from "redux";
import TextCell from "../../common/table/text_cell";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";
import * as KeyActionCreators from "./key.action";

require("./key.scss");
/**
 * 展示API列表
 */

const Step = Steps.Step;
const Option = Select.Option;

export class KeyComponent extends React.Component {

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

    render() {
        let {keyList, fetchData, create_button_visible} = this.props;

        //如果没有传入data属性,则先设置为空,然后触发数据抓取
        if (keyList === undefined) {
            keyList = [];
            fetchData();
        }

        if (create_button_visible === undefined) {
            create_button_visible = "block";
        } else {
            create_button_visible = "none";
        }

        return (
            <div className="api_content_container">
                <div className="grid">
                    <Table
                        rowsCount={keyList.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={2000} //这个值设置的比较大,从而来使得数据表撑满整个容器
                        height={500}>
                        <Column
                            header={<Cell>密钥编号</Cell>}
                            cell={
                            <TextCell
                              data={keyList}
                              field="id"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>加密方法</Cell>}
                            cell={
                            <TextCell
                              data={keyList}
                              field="enc_method"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>加密密钥</Cell>}
                            cell={
                            <TextCell
                              data={keyList}
                              field="enc_passwd"
                            />
                          }
                            width={100}
                        />
                    </Table>
                </div>
                <div className="button" style={{display:create_button_visible}}>
                    <Button type="primary" shape="circle" size="large"
                            onClick={()=>{this.setState({modal_visible:true})}}>
                        <Icon type="plus"/>
                    </Button>
                </div>

                <Modal
                    className="key_modal"
                    width="400"
                    title="创建新的密钥"
                    visible={this.state.modal_visible}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    maskClosable={false}
                    onCancel={()=>{
                    this.setState(
                        {
                            modal_visible:false
                        }
                      )
                    }
                    }>

                    <div className="key_creator">
                        <input type="text" placeholder="输入加密密钥" name="" id=""/>
                    </div>


                </Modal>

            </div>
        )

    }
}

const connector = connect(
    //mapStateToProps
    (state)=> {

        return {
            keyList: state.auth.key.keyList

        }

    },
    //mapDispatchToProps
    (dispatch)=> {

        return {
            fetchData: ()=> {
                dispatch(KeyActionCreators.fetchData())
            }
        }


    });

/**
 * @function
 */
export const KeyContainer = connector(KeyComponent);

export function KeyContainerFactory(customKeyComponent) {

    return connector(customKeyComponent);

}