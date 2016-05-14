/**
 * Created by apple on 16/5/9.
 */
import React, {Component, PropTypes} from "react";
import {Button, Icon, Modal, Steps, Select} from "antd";
import {SingleApiDocComponent} from "./single_api_doc";

export class SingleApiDocModalComponent extends Component {

    constructor(props) {
        super(props);

        if(props.modal_visible !== undefined){
            this.state = {
                modal_visible: props.modal_visible
            };
        }else {
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

    render() {
        return (<Modal
            className="api_content_modal"
            width="800"
            title="API文档"
            visible={this.state.modal_visible}
            confirmLoading={false}
            maskClosable={false}
            onCancel={()=>{this.setState({modal_visible:false})}}>
            <SingleApiDocComponent></SingleApiDocComponent>

        </Modal>)
    }

}