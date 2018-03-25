/**
 * Created by apple on 16/4/25.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {bindActionCreators} from "redux";
import TextCell from "../../common/table/text_cell";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";
import * as apiDataGridActionCreators from "./api_datagrid.action";
/**
 * 展示API列表
 */
export class ApiDataGridComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {tableList, fetchData} = this.props;

        //如果没有传入data属性,则先设置为空,然后触发数据抓取
        if (tableList === undefined) {
            tableList = [];
            fetchData();
        }

        return (
            <Table
                rowsCount={tableList.length}
                rowHeight={50}
                headerHeight={50}
                width={2000} //这个值设置的比较大,从而来使得数据表撑满整个容器
                height={500}>
                <Column
                    header={<Cell>表编号</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="table_id"
                            />
                          }
                    width={100}
                />
                <Column
                    header={<Cell>表名</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="tbl_name"
                            />
                          }
                    width={100}
                />
                <Column
                    header={<Cell>列名</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="col_name"
                            />
                          }
                    width={100}
                />
                <Column
                    header={<Cell>列描述</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="col_desc"
                            />
                          }
                    width={100}
                />
                <Column
                    header={<Cell>列数据类型</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="col_datatype"
                            />
                          }
                    width={100}
                />
                <Column
                    header={<Cell>是否为主键</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="col_ispk"
                            />
                          }
                    width={100}
                />
                <Column
                    header={<Cell>是否唯一</Cell>}
                    cell={
                            <TextCell
                              data={tableList}
                              field="col_isunique"
                            />
                          }
                    width={100}
                />
            </Table>
        )

    }
}

//链接Component与Container,映射State与Dispatch
const connector = connect(
    //mapStateToProps
    (state)=> {

        return {
            tableList: state.api.api_datagrid.tableList

        }

    },
    //mapDispatchToProps
    (dispatch)=> {

        return {

            fetchData: ()=> {
                dispatch(apiDataGridActionCreators.fetchData({}))
            }
        }


    });

/**
 * @function 静态的API DataGrid
 */
export const ApiDataGridContainer = connector(ApiDataGridComponent);

/**
 * @function 根据输入的ApiDataGridComponent控件自定义Container
 * @param customApiDataGridComponent
 * @constructor
 */
function ApiDataGridContainerFactory(customApiDataGridComponent) {

    return connector(customApiDataGridComponent);

}