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
                principalReceived: elecInfo.principalReceived
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
                    defaultAmount: json.defaultAmount,
                    principalMethod: json.method,
                    money: json.liquidatedDamagesReceived,
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
        let liquidatedDamages = this.props.form.getFieldValue('liquidatedDamages')
        let defaultAmount = this.props.form.getFieldValue('defaultAmount')
        this.props.form.setFieldsValue({
            liquidatedDamagesReceived: (parseFloat(liquidatedDamages) - parseFloat(defaultAmount)).toFixed(1)
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title="确认违约金"
                    style={{top: 20}}
                    width={380}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="客户交费日期" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('liquidatedDamagesDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择客户交费日期!'
                                }]
                            })(
                                <DatePicker style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="本期违约金" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('liquidatedDamages', {
                            })(
                                <Input disabled type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="优惠金额" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('defaultAmount', {
                                rules: [ {
                                    required: true,
                                    message: '请输入优惠金额!'
                                }]
                            })(
                                <Input onKeyUp={this.onBlur} type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="实际应收" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('liquidatedDamagesReceived', {
                            })(
                                <Input disabled type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="客户交费方式" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
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
