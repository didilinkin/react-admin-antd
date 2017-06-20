import {Modal, Input, Form, notification, Icon } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item


class CancelRepair extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false
                })
            }
        }
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        if (this.props.id > 0) {
            let json = this.props.form.getFieldsValue()
            json['id'] = this.props.id
            await apiPost(
                'upkeep/deleteRepair',
                json
            )
            notification.open({
                message: '作废成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.refreshTable()
        }
        this.setState({visible: false,
            isFirst: true})
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal
                    title="作废报修记录"
                    style={{top: 20}}
                    width="400"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="作废原因" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('invalidContent', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input your 作废原因!'
                                }]
                            })(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let CancelRepairComponent = Form.create()(CancelRepair)

export default CancelRepairComponent
