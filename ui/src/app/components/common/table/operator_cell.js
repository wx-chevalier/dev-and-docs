/**
 * Created by apple on 16/5/4.
 */
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";
const {Table, Column, Cell} = require('fixed-data-table');

/**
 * @function 默认的显示超链接的Cell
 */
export class OperatorCell extends React.Component {
    render() {
        //输入行号、行数据变化、数据
        const {rowIndex, id_field, data, operation, ...props} = this.props;

        //获取数据行的编号
        const id = data[rowIndex][id_field];

        var operators = [];

        //从operation中获取数据
        if (operation !== undefined && operation instanceof Array) {

            operation.forEach((o)=> {

                let operator = <span onClick={(id)=>{o.onClick(id)}}><a href="javascript:void(0)">{o.title}</a></span>

                //将操作符依次添加到列表中
                operators.push(operator);

                //判断当前操作列表是否是最后一个
                if (operators.length < operation.length) {
                    operators.push(<span>|</span>);
                }

            });
        }

        return (
            <Cell {...props}>
                {operators}
            </Cell>
        );
    }
}

OperatorCell.propTypes = {
    operation: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,//操作的命名
        onClick: PropTypes.function //操作的响应
    }))
}