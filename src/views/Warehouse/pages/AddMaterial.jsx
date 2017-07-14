import {Modal, Input, Form, Select, notification, Icon } from 'antd'
import React from 'react'
import { apiPost } from '../../../api'
const FormItem = Form.Item
const Option = Select.Option


class addUpkeep extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst) {
                let resulData = await apiPost(
                    '/warehouse/getMaterial',
                    { 'id': nextProps.id }
                )
                this.props.form.setFieldsValue({
                    standard: resulData.data.standard,
                    name: resulData.data.name,
                    unit: resulData.data.unit,
                    unitPrice: resulData.data.unitPrice,
                    storagePlace: resulData.data.storagePlace,
                    whType: resulData.data.whType,
                    whType1: resulData.data.whType
                })
                this.setState({
                    isFirst: false,
                    visible: nextProps.visible
                })
            }
        } else if (nextProps.id === 'add') {
            if (this.state.isFirst) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        if (this.props.id > 0) {
            let json = this.props.form.getFieldsValue()
            json['id'] = this.props.id
            await apiPost(
                '/warehouse/updateMaterial',
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
                '/warehouse/addMaterial',
                this.props.form.getFieldsValue()
            )
            notification.open({
                message: '添加成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.refreshTable()
        }
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    onBlur = (e) => {
        e.preventDefault()
        let unitPrice = this.props.form.getFieldValue('unitPrice')
        if (typeof (unitPrice) === 'undefined') {
            unitPrice = 0
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title={this.props.title}
                    style={{top: 20}}
                    width="400"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="材料名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('name', {
                                rules: [ {
                                    required: true,
                                    message: '请输入材料名称'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="规格" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('standard', {
                                rules: [ {
                                    required: true,
                                    message: '请输入规格!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="单位" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('unit', {
                                rules: [ {
                                    required: true,
                                    message: '请输入单位!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="单价" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('unitPrice', {
                                rules: [ {
                                    required: true,
                                    message: '请输入单价!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="存放位置" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('storagePlace', {
                                rules: [ {
                                    required: true,
                                    message: '请输入存放位置!'
                                }]
                            })(
                                <Input onBlur={this.onBlur}/>
                            )}
                        </FormItem>
                        <FormItem label="仓库类型" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('whType1', {
                                rules: [ {
                                    required: true,
                                    message: '请输入存放位置!'
                                }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择仓库类型"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option key="0">工程库</Option>
                                    <Option key="1">保洁用品库</Option>
                                    <Option key="2">行政库</Option>
                                </Select>
                            )}
                        </FormItem>
                        {getFieldDecorator('whType')(
                            <Input type="hidden" />
                        )}
                    </Form>
                </Modal>
            </div>
        )
    }
}

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
