/**
 * Created by apple on 16/5/11.
 */
/**
 * Created by apple on 16/5/9.
 */
import React, {Component, PropTypes} from "react";
import {Button, Icon, Modal, Steps, Select} from "antd";

/**
 * @function 对Modal的一层封装,支持自处理关闭事件
 */
export class SelfClosedModal extends Component {

    constructor(props) {
        super(props);

        if (props.modal_visible !== undefined) {
            this.state = {
                modal_visible: props.modal_visible
            };
        } else {
            this.state = {
                modal_visible: false
            };
        }


    }

    /**
     * @function 接收Props的变化
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {

        this.setState({
            modal_visible: nextProps.modal_visible
        });
    }

    /**
     * @function 默认渲染函数
     * @returns {XML}
     */
    render() {
        return (<Modal
            className={this.props.className || "modal"}
            width={this.props.width || "800"}
            title={this.props.title || "模态窗口"}
            visible={this.state.modal_visible}
            confirmLoading={false}
            maskClosable={false}
            onOK={this.props.onOK || (()=>{})}
            onCancel={()=>{
                this.setState({modal_visible:false}); //设置当前状态为关闭
                (this.props.onCancel || (()=>{}))();//调用外部传入的函数
                }}>
            {this.props.children}

        </Modal>)
    }

}

SelfClosedModal.propTypes = {
    modal_visible: PropTypes.bool, //判断窗口是否可见,
    className: PropTypes.string,//窗口样式类
    width: PropTypes.string,//窗口宽度
    title: PropTypes.string,//窗口标题
    onOK: PropTypes.func,//点击确定按钮响应
    onCancel: PropTypes.func,//点击关闭按钮响应
    confirmLoading: PropTypes.bool//判断是否显示加载条
};