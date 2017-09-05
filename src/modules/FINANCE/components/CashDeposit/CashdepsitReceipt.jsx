import {Modal, Form, notification, Icon, Col, Row, Input} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item


class propertyPaidConfirm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            auditStatus: 1,
            fileList: [],
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
                '/cashDeposit/getCashDepositDetailById',
                { 'id': nextProps.id }
            )
            this.props.form.setFieldsValue({
                buildName: resulData.data.buildName,
                roomNum: resulData.data.roomNum,
                sublietName: resulData.data.sublietName,
                operateMoney: resulData.data.operateMoney,
                reason: resulData.data.reason,
                auditStatus: 1
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
        json['id'] = this.state.data.id
        json['cashDepositId'] = this.state.data.cashDepositId
        json['auditStatus'] = 1
        await apiPost(
            '/cashDeposit/updateCashDepositByConfirm',
            json
        )
        notification.open({
            message: '收款成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.close()
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.props.close()
        this.setState({ visible: false,
            isFirst: true})
    }
    onChange = (e) => {
        this.setState({
            auditStatus: e.target.value
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title={this.props.title}
                    style={{top: 20}}
                    width={500}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={24}>
                                <FormItem label="楼宇" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('buildName')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="房间编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('roomNum')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="客户名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('sublietName')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="收款金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('operateMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="凭证号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('voucherNo')(
                                        <Input />
                                    )}
                                </FormItem>
                                {/* <FormItem label="收款方式" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('receiptType')(
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="请选择收款方式"
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
                                </FormItem>*/}
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
