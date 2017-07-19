import {Modal, Input, Form, Select, notification, Icon, Col, Row, DatePicker} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option


class addUpkeep extends React.Component {
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
                '/collectRent/getCollectRentById',
                { 'id': nextProps.id }
            )
            if (resulData.data.receiptDate !== null) {
                this.props.form.setFieldsValue({
                    lastReceiptDate: resulData.data.receiptDate
                })
            }
            this.props.form.setFieldsValue({
                lateMoney: resulData.data.lateMoney,
                thisActualLateMoney: resulData.data.unpaidLateMoney,
                unpaidLateMoney: resulData.data.unpaidLateMoney,
                periodRent: resulData.data.periodRent,
                feeId: resulData.data.id,
                id: resulData.data.id,
                rentClientName: resulData.data.rentClientName,
                payDeadline: resulData.data.payDeadline
            })
            this.setState({
                isFirst: false,
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
        console.log(json)
        json['receiptDate'] = json.receiptDate.format('YYYY-MM-DD')
        await apiPost(
            '/collectRent/updateCollectRentVoByLate',
            json
        )
        notification.open({
            message: '违约金收费成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    sumMoney = (e) => {
        let thisPaidMoney = e.target.value
        if (typeof (thisPaidMoney) === 'undefined') {
            thisPaidMoney = 0
        }
        this.props.form.setFieldsValue({
            paidMoney: parseFloat(thisPaidMoney).toFixed(1)
        })
        let unpaidMoney1 = this.props.form.getFieldValue('unpaidLateMoney')
        if (typeof (unpaidMoney1) === 'undefined') {
            unpaidMoney1 = 0
        }
        let unpaidMoney2 = unpaidMoney1 - thisPaidMoney
        if (unpaidMoney2 < 0) {
            this.props.form.setFieldsValue({
                unpaidLateMoney: parseFloat(unpaidMoney1).toFixed(1),
                unpaidMoney: parseFloat(unpaidMoney1).toFixed(1)
            })
        } else {
            this.props.form.setFieldsValue({
                unpaidLateMoney: parseFloat(unpaidMoney2).toFixed(1),
                unpaidMoney: parseFloat(unpaidMoney2).toFixed(1)
            })
        }
    }
    sumMoney2 = (e) => {
        let discountMoney = e.target.value
        if (typeof (discountMoney) === 'undefined') {
            discountMoney = 0
        }
        let thisActualLateMoney = this.props.form.getFieldValue('thisActualLateMoney')
        if (typeof (thisActualLateMoney) === 'undefined') {
            thisActualLateMoney = 0
        }
        let unpaidMoney2 = thisActualLateMoney - discountMoney
        if (unpaidMoney2 < 0) {
            this.props.form.setFieldsValue({
                thisActualLateMoney: parseFloat(thisActualLateMoney).toFixed(1),
                discountMoney: 0,
                unpaidLateMoney: parseFloat(unpaidMoney2).toFixed(1)
            })
        } else {
            this.props.form.setFieldsValue({
                thisActualLateMoney: parseFloat(unpaidMoney2).toFixed(1),
                unpaidLateMoney: parseFloat(unpaidMoney2).toFixed(1)
            })
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title={this.props.title}
                    style={{top: 20}}
                    width={700}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={12}>
                                <FormItem label="交费日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('receiptDate', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                                <FormItem label="本期应收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('lateMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="本次应收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('thisActualLateMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="优惠金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('discountMoney')(
                                        <Input onBlur={this.sumMoney2} />
                                    )}
                                </FormItem>
                                <FormItem label="本次实收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('thisLateMoney')(
                                        <Input onBlur={this.sumMoney} />
                                    )}
                                </FormItem>
                                <FormItem label="未收金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('unpaidLateMoney')(
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
                                {getFieldDecorator('feeId')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('feeType')(
                                    <Input value={1} type="hidden" />
                                )}
                                {getFieldDecorator('id')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('periodRent')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('rentClientName')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('paidMoney')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('unpaidMoney')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('lateMoney')(
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

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
