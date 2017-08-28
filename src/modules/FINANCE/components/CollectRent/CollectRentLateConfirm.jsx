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
            refresh: false,
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
                visible: nextProps.visible,
                data: resulData.data
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        if (json.receiptDate !== null || json.receiptDate !== 'undefined') {
            json['receiptDate'] = json.receiptDate.format('YYYY-MM-DD')
        }
        json['feeType'] = 1
        await apiPost(
            '/collectRent/updateCollectRentVoByLate',
            json
        )
        notification.open({
            message: '违约金收费成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        // if (json.unpaidLateMoney !== '0.0') {
        //     // this.props.pro.history.push('/home/finance/collectRentDetails/RentFinishAndLate/' + json.id)
        //     location.href = '/home/finance/collectRentDetails/RentFinishAndLate/' + json.id
        // } else if (json.unpaidLateMoney === '0.0') {
        //     this.props.pro.history.push('/home/finance/collectRentDetails/RentReviewDetail/' + json.id)
        //     // location.href = '/financial/RentReviewDetail/' + json.id
        // }
        this.setState({visible: false,
            isFirst: true })
        this.props.close()
        this.props.form.resetFields()
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
        this.props.form.setFieldsValue({
            paidMoney: parseFloat(thisPaidMoney).toFixed(1)
        })
        let unpaidMoney1 = this.state.data.unpaidLateMoney
        if (typeof (unpaidMoney1) === 'undefined') {
            unpaidMoney1 = 0
        }
        let discountMoney = this.props.form.getFieldValue('discountMoney')
        if (typeof (discountMoney) === 'undefined') {
            discountMoney = 0
        }
        let unpaidMoney2 = 0
        if (discountMoney === 0) {
            unpaidMoney2 = parseFloat(parseFloat(unpaidMoney1 - thisPaidMoney).toFixed(1))
        } else {
            unpaidMoney2 = parseFloat(parseFloat(unpaidMoney1 - thisPaidMoney - discountMoney).toFixed(1))
        }
        console.log(thisPaidMoney)
        if (unpaidMoney2 < 0) {
            this.props.form.setFieldsValue({
                unpaidLateMoney: parseFloat(unpaidMoney1 - discountMoney).toFixed(1),
                unpaidMoney: parseFloat(unpaidMoney1 - discountMoney).toFixed(1),
                thisLateMoney: 0
            })
            notification.open({
                message: '输入金额不能大于未收金额！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
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
        let thisActualLateMoney = this.state.data.unpaidLateMoney
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
            notification.open({
                message: '优惠金额不能大于未收金额！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
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
                    title="确认收违约金"
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
                                            message: '请输入'
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
                                        <Input onKeyUp={this.sumMoney2} />
                                    )}
                                </FormItem>
                                <FormItem label="本次实收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('thisLateMoney', {
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
