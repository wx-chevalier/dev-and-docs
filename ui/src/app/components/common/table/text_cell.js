/**
 * Created by apple on 16/5/4.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";

/**
 * @function 默认的显示文本的Cell
 */
export default class TextCell extends React.Component {
    render() {

        //获取传入的Props
        const {
            rowIndex, //传入的当前行编号
            field, //传入的需要获取的域,支持层叠
            data, //传入到数据源
            value, //直接传入的值,不需要再从data中取值
            ...props //其他属性,直接传入到Cell中即可
        } = this.props;

        var columnData;

        let finalValue = "";

        if (value !== undefined) {
            finalValue = value
        }
        else {
            //判断是否已经直接传入了值

            //判断是否为嵌入式取值
            if (field.indexOf(".") > -1) {

                let cascadingFields = field.split(".");

                cascadingFields.forEach((v)=> {
                    if (columnData === undefined) {
                        columnData = data[rowIndex][v];
                    } else {
                        columnData = columnData[v];
                    }
                });

            } else {

                columnData = data[rowIndex][field];
            }

            //判断是否为Array
            if (columnData instanceof Array) {
                columnData.forEach((v)=> {

                    if (value === "") {

                        finalValue = v;

                    } else {
                        finalValue = value + "," + v;
                    }

                })
            } else {
                finalValue = columnData;
            }

        }

        return (
            <Cell {...props}>
                {finalValue}
            </Cell>
        );
    }
}
