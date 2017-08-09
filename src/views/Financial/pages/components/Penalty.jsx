import {Modal, Input, Form, Select, Col, Row, DatePicker, notification, Icon} from 'antd'
import React from 'react'
import moment from 'moment'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option


class Penalty extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            isFirst: true,
            WaterBill: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let WaterBill = await apiPost(
                '/propertyFee/getWaterBill',
                { 'id': nextProps.id }
            )
            this.setState({
                isFirst: false,
                visible: nextProps.visible,
                WaterBill: WaterBill.data.waterBill
            })
            this.props.form.setFieldsValue({
                penaltyCollectionDate: moment(),
                penaltyTotalMoney: WaterBill.data.waterBill.penaltyTotalMoney,
                penaltyUnpaidMoneyTwo: WaterBill.data.waterBill.penaltyUnpaidMoney,
                penaltyUnpaidMoney: WaterBill.data.waterBill.penaltyUnpaidMoney
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        let data = await apiPost(
            '/WaterBill/DefaultCollection',
            { 'id': this.props.id,
                penaltyCollectionDate: json.penaltyCollectionDate.format('YYYY-MM-DD'),
                penaltyAmountReceivable: json.penaltyAmountReceivable ? json.penaltyAmountReceivable : 0,
                money: json.money,
                penaltyUnpaidMoney: json.penaltyUnpaidMoney,
                penaltyMethod: json.penaltyMethod
            }
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({visible: false,
            isFirst: true })
        this.props.refresh()
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    Calculation = () => {
        let penaltyUnpaidMoneyTwo = this.props.form.getFieldValue('penaltyUnpaidMoneyTwo') ? this.props.form.getFieldValue('penaltyUnpaidMoneyTwo') : 0
        let penaltyAmountReceivable = this.props.form.getFieldValue('penaltyAmountReceivable') ? this.props.form.getFieldValue('penaltyAmountReceivable') : 0
        let money = this.props.form.getFieldValue('money') ? this.props.form.getFieldValue('money') : 0
        let penaltyUnpaidMoney = (penaltyUnpaidMoneyTwo - penaltyAmountReceivable - money).toFixed(2)
        if (penaltyUnpaidMoney < 0) {
            notification.open({
                message: '实收和优惠金额的和不能大于应收金额',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
        } else {
            this.props.form.setFieldsValue({
                penaltyUnpaidMoney: penaltyUnpaidMoney
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
                                    {getFieldDecorator('penaltyCollectionDate', {
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
                                    {getFieldDecorator('penaltyTotalMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="本次应收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('penaltyUnpaidMoneyTwo')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="优惠金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('penaltyAmountReceivable')(
                                        <Input onBlur={this.Calculation} />
                                    )}
                                </FormItem>
                                <FormItem label="本次实收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('money')(
                                        <Input onBlur={this.Calculation} />
                                    )}
                                </FormItem>
                                <FormItem label="未收金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('penaltyUnpaidMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="交费方式" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('penaltyMethod')(
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
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let PenaltyCom = Form.create()(Penalty)

export default PenaltyCom
