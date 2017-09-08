// 客户管理 - 房间绑定-修改备注
import React from 'react'
import {Form, Modal} from 'antd'
// import {apiPost} from '../../../../api/api.dev'
class RoomBindingRemarks extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    render () {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}
const RoomBindingRemarksCom = Form.create()(RoomBindingRemarks)
export default RoomBindingRemarksCom
