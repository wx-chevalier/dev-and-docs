/**
 * Created by apple on 16/5/11.
 */
import React, {PropTypes, Component} from "react";
import {SelfClosedModal} from "../../common/dialog/modal/SelfClosedModal";

export class DataBaseCreatorComponent extends Component {
    render() {

        const modal_visible = this.props.modal_visible || false;

        return (
            <SelfClosedModal
                className="database_creator_modal"
                width="800px"
                title="创建新的数据库配置"
                modal_visible={modal_visible}
                onOk={this.props.onOK || (()=>{})}
            >
                <div className="row">
                    <div className="col-6">
                        数据库地址
                    </div>
                    <div className="col-6">
                        <input type="text" defaultValue="localhost"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        数据库端口
                    </div>
                    <div className="col-6">
                        <input type="text" defaultValue="3306"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        数据库描述
                    </div>
                    <div className="col-6">
                        <input type="text" defaultValue="数据库描述"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        数据库配置
                    </div>
                    <div className="col-6">
                        <input type="text" defaultValue="数据库配置"/>
                    </div>
                </div>

            </SelfClosedModal>
        )
    }
}

DataBaseCreatorComponent.propTypes = {
    modal_visible: PropTypes.bool,//判断窗口是否可见
    onOK: PropTypes.func //执行点击确定之后的回调
};