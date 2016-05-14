/**
 * Created by apple on 16/5/11.
 */
import React, {PropTypes, Component} from "react";
import {SelfClosedModal} from "../../../common/dialog/modal/SelfClosedModal";

//载入样式文件
require("./api_content_detail.scss");

export class ApiContentDetailComponent extends Component {


    render() {

        return (<div className="api_content_detail_container">
            <SelfClosedModal
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
            </SelfClosedModal>
        </div>)

    }

}

ApiContentDetailComponent.propTypes = {

    //传入的默认的属性值
    /**
     * {
            id: "1",
            desc: "接口1",
            dc_api_group_id: "所属接口组的编号",
            dc_manageddb_tbl_id: "关联的数据库表的编号",
            dc_manageddb_tbl: {
                tbl_name: "关联的表名",
                tbl_desc: "关联的表的描述"
            },
            result_columns: ["column1", "column2"],
            query_column: "columnName > 1"
        }
     */
    fields: PropTypes.shape({
        id: PropTypes.string,
        desc: PropTypes.string,
        dc_api_group_id: PropTypes.string,
        dc_manageddb_tbl_id: PropTypes.string,
        dc_manageddb_tbl: PropTypes.shape({
            tbl_name: PropTypes.string,
            tbl_desc: PropTypes.string
        }),
        result_columns: PropTypes.array,
        query_column: PropTypes.string
    }),

    postApi: PropTypes.func,//构造新的API的函数
    updateApi: PropTypes.func //修正当前的api

};