// 材料添加
import {Modal, Input, Form, Row, Col, Icon, notification, Select} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import '../../style/test.less'
const FormItem = Form.Item
const Option = Select.Option
class MaterialAdd extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        whType: null,
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
                let material = await apiPost(
                    '/warehouse/getMaterial',
                    {id: nextProps.id}
                )
                if (material.data.whType === 0) {
                    this.props.form.setFieldsValue({
                        whType1: '工程库'
                    })
                } else if (material.data.whType === 1) {
                    this.props.form.setFieldsValue({
                        whType1: '保洁用品库'
                    })
                } else if (material.data.whType === 2) {
                    this.props.form.setFieldsValue({
                        whType1: '行政库'
                    })
                }
                this.props.form.setFieldsValue({
                    name: material.data.name,
                    standard: material.data.standard,
                    unit: material.data.unit,
                    unitPrice: material.data.unitPrice,
                    storagePlace: material.data.storagePlace
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
        let json = this.props.form.getFieldsValue()
        json['whType'] = this.state.whType
        if (this.props.id > 0) {
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
            this.setState({visible: false,
                isFirst: true })
        } else {
            await apiPost(
                '/warehouse/addMaterial',
                json
            )
            notification.open({
                message: '添加成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.refreshTable()
            this.setState({visible: false,
                isFirst: true })
        }
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    onSelect = (e) => {
        this.setState({
            whType: e
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title={this.state.title}
                style={{top: 20}}
                width={400}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <Row>
                        <Col span={20}>
                            <FormItem label="材料名称" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('name', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入材料名称!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem label="规格" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('standard', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入规格!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem label="单位" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('unit', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入单位!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem label="单价" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('unitPrice', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入单价!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem label="存放位置" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('storagePlace', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入存放位置!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem label="仓库类型" labelCol={{ span: 8 }} wrapperCol={{ span: 15 }}>
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
                                        onSelect={this.onSelect}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option key="0">工程库</Option>
                                        <Option key="1">保洁用品库</Option>
                                        <Option key="2">行政库</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

let MaterialAddComponent = Form.create()(MaterialAdd)

export default MaterialAddComponent
