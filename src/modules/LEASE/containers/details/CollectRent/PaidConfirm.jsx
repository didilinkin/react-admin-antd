import {Modal, Input, Form, Select, notification, Icon, Col, Row, DatePicker} from 'antd'
import React from 'react'
import { apiPost } from '../../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker


class addUpkeep extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            accountList: [],
            isFirst: true,
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        let accountList = await apiPost(
            '/collectRent/getAccountList'
        )
        this.setState({accountList: accountList.data})
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/collectRent/getCollectRentById',
                { 'id': nextProps.id }
            )
            this.props.form.setFieldsValue({
                repairDate: [moment(resulData.data.startDate), moment(resulData.data.endDate)],
                currentPeriodMoney: resulData.data.currentPeriodMoney,
                actualPaidMoney: resulData.data.actualPaidMoney,
                discountMoney: resulData.data.discountMoney,
                id: resulData.data.id
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
        await apiPost(
            '/collectRent/updateCollectRentVoByCommit',
            json
        )
        notification.open({
            message: '收租成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.props.close()
        this.setState({ visible: false,
            isFirst: true})
    }
    sumMoney = (e) => {
        let discountMoney = e.target.value
        if (typeof (discountMoney) === 'undefined') {
            discountMoney = 0
        }
        let currentPeriodMoney = this.state.data.currentPeriodMoney
        if (typeof (currentPeriodMoney) === 'undefined') {
            currentPeriodMoney = 0
        }
        let actualPaidMoney = currentPeriodMoney - discountMoney
        this.props.form.setFields({
            actualPaidMoney: {
                value: actualPaidMoney,
                errors: ''
            }
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let accountList = this.state.accountList
        return (
            <div>
                <Modal maskClosable={false}
                    title="发起收租"
                    style={{top: 20}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={24}>
                                <FormItem label="本期周期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('repairDate')(
                                        <RangePicker disabled />
                                    )}
                                </FormItem>
                                <FormItem label="本期租金" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('currentPeriodMoney', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="优惠金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('discountMoney')(
                                        <Input onKeyUp={this.sumMoney} />
                                    )}
                                </FormItem>
                                <FormItem label="实际应收" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('actualPaidMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="付款帐号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('accountId')(
                                        <Select
                                            showSearch
                                            style={{ width: 245 }}
                                            placeholder="请选择付款帐号"
                                            optionFilterProp="children"
                                        >
                                            {accountList.map(Account => {
                                                return <Option key={Account.accountId}>{Account.accountName}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                                {getFieldDecorator('id')(
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
