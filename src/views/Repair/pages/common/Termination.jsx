import {Modal, Input, Form, notification, Icon } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item


class Termination extends React.Component {
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
        let adopt = false
        this.props.form.validateFields(
            (err) => {
                if (err) {
                    adopt = false
                } else {
                    adopt = true
                }
            },
        )
        if (adopt) {
            if (this.props.id > 0) {
                let json = this.props.form.getFieldsValue()
                json['id'] = this.props.id
                console.log(json)
                if (typeof (this.props.type) !== 'undefined' && this.props.type !== null && this.props.type.toString() === '2') {
                    await apiPost(
                        '/contract/terminationRentContractInfo',
                        json
                    )
                } else {
                    await apiPost(
                        '/contract/terminationPm',
                        json
                    )
                }
                notification.open({
                    message: '终止成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refreshTable()
            }
            this.setState({
                visible: false,
                isFirst: true
            })
        }
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title="终止合同"
                    style={{top: 20}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="终止原因" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('remark', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 终止原因!'
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

let TerminationComponent = Form.create()(Termination)

export default TerminationComponent
