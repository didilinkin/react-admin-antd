import {Modal, Input, Form, notification, Icon, DatePicker, Select } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option

class PrincipalCollection extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        WaterBill: {}
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            let WaterBill = await apiPost(
                '/propertyFee/getWaterBill',
                {id: nextProps.id}
            )
            WaterBill = WaterBill.data.waterBill
            this.setState({
                WaterBill: WaterBill,
                visible: nextProps.visible,
                isFirst: false
            })
            this.props.form.setFieldsValue({
                receivableMoney: WaterBill.receivableMoney,
                paidMoney: WaterBill.paidMoney,
                money: 0
            })
            this.onBlur()
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
                '/WaterBill/chargeBill',
                {collectionDate: json.collectionDate.format('YYYY-MM-DD'),
                    method: json.method,
                    paidMoney: json.money,
                    uncollected: json.unpaidMoney,
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
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    onBlur = () => {
        let purchasePrice = this.props.form.getFieldValue('receivableMoney')
        let serviceCharge = this.props.form.getFieldValue('paidMoney')
        let money = this.props.form.getFieldValue('money')
        if (typeof (purchasePrice) === 'undefined') {
            purchasePrice = 0
        }
        if (typeof (serviceCharge) === 'undefined') {
            serviceCharge = 0
        }
        if (typeof (money) === 'undefined') {
            money = 0
        }
        this.props.form.setFieldsValue({
            unpaidMoney: (parseFloat(purchasePrice) - parseFloat(serviceCharge) - parseFloat(money)).toFixed(2)
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title="确认收款"
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
                            {getFieldDecorator('collectionDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择客户交费日期!'
                                }]
                            })(
                                <DatePicker style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="本期应收" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('receivableMoney', {
                                rules: [ {
                                    required: true,
                                    message: '请输入本期应收!'
                                }]
                            })(
                                <Input disabled type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="已收金额" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('paidMoney', {
                                rules: [ {
                                    required: true,
                                    message: '请输入已收金额!'
                                }]
                            })(
                                <Input disabled onBlur={this.onBlur} type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="本次实收" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('money', {
                                rules: [ {
                                    required: true,
                                    message: '请输入本次实收!'
                                }]
                            })(
                                <Input onBlur={this.onBlur} type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="未收金额" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('unpaidMoney', {
                                rules: [ {
                                    required: true,
                                    message: '请输入未收金额!'
                                }]
                            })(
                                <Input disabled type="text" style={{width: '200px'}} />
                            )}
                        </FormItem>
                        <FormItem label="客户交费方式" labelCol={{ span: 7 }}
                            wrapperCol={{ span: 13 }}
                        >
                            {getFieldDecorator('method', {
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

let PrincipalCollectionCom = Form.create()(PrincipalCollection)

export default PrincipalCollectionCom
