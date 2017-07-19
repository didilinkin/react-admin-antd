import {Modal, Input, Form, notification, Icon } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item


class addUpkeep extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst) {
                let resulData = await apiPost(
                    'upkeep/getUpkeep',
                    { 'id': nextProps.id }
                )
                this.props.form.setFields({
                    tollAmount: {
                        value: resulData.data.tollAmount,
                        errors: ''
                    },
                    entryName: {
                        value: resulData.data.entryName,
                        errors: ''
                    },
                    company: {
                        value: resulData.data.company,
                        errors: ''
                    },
                    purchasePrice: {
                        value: resulData.data.purchasePrice,
                        errors: ''
                    },
                    serviceCharge: {
                        value: resulData.data.serviceCharge,
                        errors: ''
                    }
                })
                this.setState({
                    isFirst: false,
                    visible: nextProps.visible
                })
            }
        } else if (nextProps.id === 'add') {
            if (this.state.isFirst) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
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
                this.props.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values)
                    }
                })
                let json = this.props.form.getFieldsValue()
                json['id'] = this.props.id
                await apiPost(
                    'upkeep/updateUpkeep',
                    json
                )
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refreshTable()
            } else {
                console.log(this.props.form.getFieldsValue())
                await apiPost(
                    'upkeep/addupkeep',
                    this.props.form.getFieldsValue()
                )
                notification.open({
                    message: '添加成功',
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
    onBlur = (e) => {
        e.preventDefault()
        let purchasePrice = this.props.form.getFieldValue('purchasePrice')
        let serviceCharge = this.props.form.getFieldValue('serviceCharge')
        if (typeof (purchasePrice) === 'undefined') {
            purchasePrice = 0
        }
        if (typeof (serviceCharge) === 'undefined') {
            serviceCharge = 0
        }
        this.props.form.setFieldsValue({
            tollAmount: (parseFloat(purchasePrice) + parseFloat(serviceCharge)).toFixed(0)
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title={this.props.title}
                    style={{top: 20}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="物品名称" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('entryName', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 物品名称!'
                                }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="单位" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('company', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 单位!'
                                }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="进货价格" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('purchasePrice', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 进货价格!'
                                }]
                            })(
                                <Input onBlur={this.onBlur} type="text" />
                            )}
                        </FormItem>
                        <FormItem label="服务费" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('serviceCharge', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 服务费!'
                                }]
                            })(
                                <Input onBlur={this.onBlur} type="text" />
                            )}
                        </FormItem>
                        <FormItem label="收费金额" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('tollAmount', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 收费金额!'
                                }]
                            })(
                                <Input disabled type="text" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
