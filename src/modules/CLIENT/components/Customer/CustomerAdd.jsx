// 客户添加
import {Modal, Input, Form, Row, Col, Icon, notification} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import '../../style/test.less'
const FormItem = Form.Item
class CustomerAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        title: '',
        data: {}
    }

    async initialRemarks (nextProps) {
        this.setState({
            view: false,
            title: nextProps.title
        })
        if (nextProps.id !== null) {
            if (this.state.isFirst && nextProps.visible) {
                let customer = await apiPost(
                    '/customer/getCustomerById',
                    {id: nextProps.id}
                )
                this.props.form.setFieldsValue({
                    clientName: customer.data.clientName,
                    rentClientName: customer.data.rentClientName,
                    contactPerson: customer.data.contactPerson,
                    phoneAdmin: customer.data.phoneAdmin,
                    phoneManager: customer.data.phoneManager,
                    phoneFinance: customer.data.phoneFinance,
                    email: customer.data.email,
                    remark: customer.data.remark
                })
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        } else {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
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
            let json = this.props.form.getFieldsValue()
            if (this.props.id > 0) {
                json['id'] = this.props.id
                await apiPost(
                    'customer/updateCustomer',
                    json
                )
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.close()
                this.props.refreshTable()
                this.setState({
                    visible: false,
                    isFirst: true
                })
            } else {
                await apiPost(
                    'customer/saveCustomer',
                    json
                )
                notification.open({
                    message: '添加成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.close()
                this.props.refreshTable()
                this.setState({
                    visible: false,
                    isFirst: true
                })
            }
        }
    }
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title={this.state.title}
                style={{top: 20}}
                width={500}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <Row>
                        <Col span={18}>
                            <FormItem label="物业客户名" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('clientName', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入物业客户名'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="租赁客户名" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('rentClientName', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入租赁客户名'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="联系人" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('contactPerson')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="行政电话" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('phoneAdmin')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="经理电话" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('phoneManager')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="财务电话" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('phoneFinance')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="邮箱" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('email')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <FormItem label="备注" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('remark')(<Input type={'textarea'} />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

let CustomerAddUpComponent = Form.create()(CustomerAddUp)

export default CustomerAddUpComponent
