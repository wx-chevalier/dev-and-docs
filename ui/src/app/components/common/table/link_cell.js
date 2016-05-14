/**
 * Created by apple on 16/5/4.
 */
const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "fixed-data-table/dist/fixed-data-table.min.css";

/**
 * @function 默认的显示超链接的Cell
 */
export class LinkCell extends React.Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        const link = data[rowIndex][field];
        return (
            <Cell {...props}>
                <a href={link}>{link}</a>
            </Cell>
        );
    }
}