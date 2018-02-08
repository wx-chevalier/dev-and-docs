/**
 * Created by apple on 16/5/4.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {Button, Icon, Modal, Steps, Select} from "antd";
import TextCell from "../common/table/text_cell";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";
import {DataBaseCreatorComponent} from "./creator/database_creator";
import * as DataBaseActionCreators from "./database.action";
require("./database.scss");


/**
 * @function 展示数据库列表
 */
export class DataBaseComponent extends React.Component {

    constructor(props) {
        super(props);


        //设置默认的state
        this.state = {
            database_creator_modal_visible: false, //控制是否显示创建新的数据库配置的窗口
        };
    }

    render() {
        let {dataBaseList, fetchData, create_button_visible} = this.props;

        //如果没有传入data属性,则先设置为空,然后触发数据抓取
        if (dataBaseList === undefined) {
            dataBaseList = [];
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
                        rowsCount={dataBaseList.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={2000} //这个值设置的比较大,从而来使得数据表撑满整个容器
                        height={500}>
                        <Column
                            header={<Cell>受管数据库ID</Cell>}
                            cell={
                            <TextCell
                              data={dataBaseList}
                              field="id"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>数据库地址</Cell>}
                            cell={
                            <TextCell
                              data={dataBaseList}
                              field="serv_addr"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>数据库端口</Cell>}
                            cell={
                            <TextCell
                              data={dataBaseList}
                              field="serv_port"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>数据库描述</Cell>}
                            cell={
                            <TextCell
                              data={dataBaseList}
                              field="serv_desc"
                            />
                          }
                            width={100}
                        />
                        <Column
                            header={<Cell>数据库配置</Cell>}
                            cell={
                            <TextCell
                              data={dataBaseList}
                              field="serv_cfg"
                            />
                          }
                            width={100}
                        />

                    </Table>
                </div>
                <div className="button" style={{display:create_button_visible}}>
                    <Button type="primary" shape="circle" size="large"
                            onClick={()=>{this.setState({database_creator_modal_visible:true})}}>
                        <Icon type="plus"/>
                    </Button>
                </div>

                <DataBaseCreatorComponent modal_visible={this.state.database_creator_modal_visible}/>

            </div>
        )

    }
}

const connector = connect(
    //mapStateToProps
    (state)=> {

        return {
            dataBaseList: state.database.dataBaseList

        }

    },
    //mapDispatchToProps
    (dispatch)=> {

        return {
            fetchData: ()=> {
                dispatch(DataBaseActionCreators.fetchData())
            }
        }


    });

/**
 * @function
 */
export const DataBaseContainer = connector(DataBaseComponent);

export function DataBaseContainerFactory(customDataBaseComponent) {

    return connector(customDataBaseComponent);

}