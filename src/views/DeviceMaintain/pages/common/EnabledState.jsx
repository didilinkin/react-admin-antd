import {Modal, Input, Form, Select, notification, Icon, DatePicker, Radio  } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group


class EnabledState extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }

    isFirst = true
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
                isFirst: false
            })
            this.props.form.resetFields()
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
            json['applyDate'] = json.applyDate.format('YYYY-MM-DD')
            json['approvalDate'] = json.approvalDate.format('YYYY-MM-DD')
            json['equipmentId'] = this.props.id
            let result = await apiPost(
                'equipment/insertEquipmentSs',
                json
            )
            notification.open({
                message: result.data,
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })


            this.isFirst = true
            this.setState({
                visible: false,
                isFirst: true
            })
            this.props.refreshTable()
        }
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal
                    title={this.props.title}
                    style={{top: 20}}
                    width={450}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">

                        <FormItem label="申请类型" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('typeSs')(
                                <RadioGroup>
                                    <Radio value="0">启用</Radio>
                                    <Radio value="1">报废</Radio>
                                    <Radio value="2">闲置</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <FormItem label="申请部门" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('departmentName', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={this.equipmentStatus}
                                >
                                    <Option key="工程与维修部">工程与维修部</Option>
                                    <Option key="设备与运行部">设备与运行部</Option>
                                    <Option key="消防与监控部">消防与监控部</Option>
                                    <Option key="交通与安全部">交通与安全部</Option>
                                    <Option key="卫生与环保部">卫生与环保部</Option>
                                    <Option key="综合管理部">综合管理部</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="申请人" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('applicant', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="申请日期" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('applyDate', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem label="申请原因" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('applyReason', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                        <FormItem label="设备去向" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('whereabouts', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="审批人" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('approver', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="审批日期" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('approvalDate', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem label="备注" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('remarks', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let EnabledStateComponent = Form.create()(EnabledState)

export default EnabledStateComponent
