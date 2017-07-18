// 转租添加修改
import {Modal, Input, Form, notification, Icon, DatePicker, Checkbox, Row, Col } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item


class SubletAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    async initialRemarks (nextProps) {
        if (this.isFirst && nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
                isFirst: false
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
            if (this.props.id > 0) {
                this.props.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values)
                    }
                })
                let json = this.props.form.getFieldsValue()
                json['id'] = this.props.id
                await apiPost(
                    'upkeep/updateUpkeep',
                    json
                )
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refreshTable()
            } else {
                console.log(this.props.form.getFieldsValue())
                await apiPost(
                    'upkeep/addupkeep',
                    this.props.form.getFieldsValue()
                )
                notification.open({
                    message: '添加成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refreshTable()
            }
            this.setState({
                visible: false,
                isFirst: true
            })
        }
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title={this.props.title}
                    style={{top: 20}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="租户名称" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('tenant', {
                                rules: [ {
                                    required: true,
                                    message: '请输入!'
                                }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="联系人" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('contactPerson', {
                                rules: [ {
                                    required: true,
                                    message: '请输入!'
                                }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="行政电话" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('phoneAdmin', {
                                rules: [ {
                                    required: true,
                                    message: '请输入!'
                                }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="财务电话" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('phoneFinance')(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="经理电话" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('phoneManager')(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="E-mail" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('email')(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="起租日期" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('subletStartDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择!'
                                }]
                            })(
                                <DatePicker style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="结束日期" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('subletEndDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择!'
                                }]
                            })(
                                <DatePicker style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="租赁房间" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('subletEndDate')(
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        <Col key={1} offset="1" span={4}><Checkbox value={1}>1</Checkbox></Col>
                                    </Row>
                                </Checkbox.Group>
                            )}
                        </FormItem>
                        <FormItem label="能源管理押金" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('energy')(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let SubletAddUpCom = Form.create()(SubletAddUp)

export default SubletAddUpCom
