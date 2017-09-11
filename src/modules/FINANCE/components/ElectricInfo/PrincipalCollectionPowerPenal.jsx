import {Modal, Input, Form, notification, Icon, DatePicker, Select } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option

class PrincipalCollectionPowerPenal extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        elecInfo: {}
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            let elecInfo = await apiPost(
                '/ElectricityFees/ElectricityFeeInfo',
                {id: nextProps.id}
            )
            elecInfo = elecInfo.data.electricityFees
            this.setState({
                elecInfo: elecInfo,
                visible: nextProps.visible,
                isFirst: false
            })
            this.props.form.setFieldsValue({
                liquidatedDamages: elecInfo.liquidatedDamages,
                shouldPay: (elecInfo.liquidatedDamages - elecInfo.liquidatedDamagesReceived - elecInfo.defaultAmount).toFixed(1)
            })
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
            let json = this.props.form.getFieldsValue()
            json['id'] = this.props.id
            let data = await apiPost(
                '/ElectricityFees/DefaultCollection',
                {liquidatedDamagesDate: json.liquidatedDamagesDate.format('YYYY-MM-DD'),
                    defaultAmount: json.defaultAmount ? json.defaultAmount : 0,
                    principalMethod: json.method,
                    money: json.liquidatedDamagesReceived ? json.liquidatedDamagesReceived : 0,
                    id: json.id}
            )
            notification.open({
                message: data.data,
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.setState({
                visible: false,
                isFirst: true
            })
            this.props.refresh()
        }
    }
    handleCancel = () => {
        this.setState({ visible: false,
            isFirst: true})
    }
    onBlur = () => {
        let shouldPay = this.props.form.getFieldValue('shouldPay')
        let liquidatedDamagesReceived = this.props.form.getFieldValue('liquidatedDamagesReceived')
        let defaultAmount = this.props.form.getFieldValue('defaultAmount')
        let unpaid = parseFloat(shouldPay ? shouldPay : 0) - parseFloat(liquidatedDamagesReceived ? liquidatedDamagesReceived : 0) - parseFloat(defaultAmount ? defaultAmount : 0)
        this.props.form.setFieldsValue({
            unpaid: (unpaid).toFixed(1)
        })

        // 未收金额
        if (unpaid < 0) {
            this.props.form.setFieldsValue({
                unpaid: parseFloat(shouldPay ? shouldPay : 0) - parseFloat(defaultAmount ? defaultAmount : 0),
                liquidatedDamagesReceived: '',
                defaultAmount: ''
            })
            notification.open({
                message: '输入金额不能大于未收金额！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
        } else {
            this.props.form.setFieldsValue({
                unpaid: unpaid.toFixed(1)
            })
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title="确认收违约金"
                    style={{top: 20}}
                    width={380}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="交费日期" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('liquidatedDamagesDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择客户交费日期!'
                                }]
                            })(
                                <DatePicker style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="本期应收" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('liquidatedDamages', {
                            })(
                                <Input disabled style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="本次应收" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('shouldPay', {
                            })(
                                <Input disabled style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="优惠金额" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('defaultAmount')(
                                <Input onKeyUp={this.onBlur} style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="本次实收" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('liquidatedDamagesReceived', {
                                rules: [ {
                                    required: true,
                                    message: '请输入本次实收金额!'
                                }]
                            })(
                                <Input onKeyUp={this.onBlur} style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="未收金额" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('unpaid', {
                            })(
                                <Input disabled style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="交费方式" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('damagesMethod', {
                                rules: [ {
                                    required: true,
                                    message: '请选择客户交费方式!'
                                }]
                            })(
                                <Select
                                    showSearch
                                    style={{width: '200px'}}
                                    placeholder="请选择交费方式"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">银行转账</Option>
                                    <Option key="1">支付宝</Option>
                                    <Option key="2">微信</Option>
                                    <Option key="3">支票</Option>
                                    <Option key="4">现金</Option>
                                    <Option key="5">其他</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let PrincipalCollectionPowerPenalCom = Form.create()(PrincipalCollectionPowerPenal)

export default PrincipalCollectionPowerPenalCom
