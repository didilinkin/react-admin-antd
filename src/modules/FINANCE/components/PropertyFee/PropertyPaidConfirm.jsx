import {Modal, Input, Form, Select, notification, Icon, Col, Row, DatePicker} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option


class propertyPaidConfirm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            isFirst: true,
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/propertyFee/getPropertyFeeById',
                { 'id': nextProps.id }
            )
            if (resulData.data.lateMoney !== null) {
                this.props.form.setFieldsValue({
                    lastLateMoney: resulData.data.lateMoney
                })
            } else {
                this.props.form.setFieldsValue({
                    lastLateMoney: 0
                })
            }
            if (resulData.data.receiptDate !== null) {
                this.props.form.setFieldsValue({
                    lastReceiptDate: resulData.data.receiptDate
                })
            }
            this.props.form.setFieldsValue({
                currentPeriodMoney: resulData.data.currentPeriodMoney,
                actualPaidMoney: resulData.data.actualPaidMoney,
                thisActualPaidMoney: resulData.data.unpaidMoney,
                id: resulData.data.id,
                lastUnpaidMoney: resulData.data.unpaidMoney,
                paidMoney: resulData.data.paidMoney,
                payDeadline: resulData.data.payDeadline,
                unpaidMoney: resulData.data.unpaidMoney
            })
            this.setState({
                isFirst: false,
                data: resulData.data,
                visible: nextProps.visible
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        if (json.receiptDate !== null) {
            json['receiptDate'] = json.receiptDate.format('YYYY-MM-DD')
        }
        await apiPost(
            '/propertyFee/updatePropertyFeeByPaid',
            json
        )
        notification.open({
            message: '收租成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        // if (json.unpaidMoney !== '0.0') {
        //     location.href = '/home/finance/propertyFeeDetails/PropertyFeeDetailNoLate/' + json.id
        // } else if (json.unpaidMoney === '0.0' && json.receiptDate <= this.state.data.payDeadline) {
        //     location.href = '/home/finance/propertyFeeDetails/NoLateAndPropertyFinish/' + json.id
        // } else if (json.unpaidMoney === '0.0' && json.receiptDate > this.state.data.payDeadline) {
        //     location.href = '/home/finance/propertyFeeDetails/PropertyFinishAndLate/' + json.id
        // }
        this.setState({visible: false,
            isFirst: true })
        this.props.close()
        this.props.refreshTable()
    }
    handleCancel = (e) => {
        this.props.close()
        this.setState({ visible: false,
            isFirst: true})
    }
    sumMoney = (e) => {
        let thisPaidMoney = e.target.value
        if (typeof (thisPaidMoney) === 'undefined') {
            thisPaidMoney = 0
        }
        let unpaidMoney1 = this.state.data.unpaidMoney
        if (typeof (unpaidMoney1) === 'undefined') {
            unpaidMoney1 = 0
        }
        let unpaidMoney2 = unpaidMoney1 - thisPaidMoney
        if (unpaidMoney2 < 0) {
            this.props.form.setFields({
                unpaidMoney: {
                    value: unpaidMoney1,
                    errors: ''
                },
                thisPaidMoney: {
                    value: 0,
                    errors: ''
                }
            })
            notification.open({
                message: '输入金额不能大于未收金额！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
        } else {
            this.props.form.setFields({
                unpaidMoney: {
                    value: parseFloat(unpaidMoney2).toFixed(1),
                    errors: ''
                }
            })
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title="确认收款"
                    style={{top: 20}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={24}>
                                <FormItem label="交费日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('receiptDate', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入交费日期'
                                        }]
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                                <FormItem label="本期应收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('actualPaidMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="本次应收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('thisActualPaidMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="本次实收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('thisPaidMoney', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入本次实收'
                                        }]
                                    })(
                                        <Input onKeyUp={this.sumMoney} />
                                    )}
                                </FormItem>
                                <FormItem label="未收金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('unpaidMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="交费方式" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('paidWay')(
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
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
                                {getFieldDecorator('id')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('lastUnpaidMoney')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('paidMoney')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('currentPeriodMoney')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('lastLateMoney')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('payDeadline')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('lastReceiptDate')(
                                    <Input type="hidden" />
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let PropertyPaidConfirm = Form.create()(propertyPaidConfirm)

export default PropertyPaidConfirm
