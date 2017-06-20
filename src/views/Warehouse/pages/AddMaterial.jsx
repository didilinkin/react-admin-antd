import {Modal, Input, Form, notification, Icon } from 'antd'
import React from 'react'
import { apiPost } from '../../../api'
const FormItem = Form.Item


class addUpkeep extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst) {
                let resulData = await apiPost(
                    'http://127.0.0.1:18082/warehouse/getMaterial',
                    { 'id': nextProps.id }
                )
                this.props.form.setFields({
                    standard: {
                        value: resulData.data.standard,
                        errors: ''
                    },
                    name: {
                        value: resulData.data.name,
                        errors: ''
                    },
                    unit: {
                        value: resulData.data.unit,
                        errors: ''
                    },
                    unitPrice: {
                        value: resulData.data.unitPrice,
                        errors: ''
                    },
                    storagePlace: {
                        value: resulData.data.storagePlace,
                        errors: ''
                    }
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
                'http://127.0.0.1:18082/warehouse/updateMaterial',
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
                'http://127.0.0.1:18082/warehouse/addMaterial',
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
        const { getFieldProps } = this.props.form
        return (
            <div>
                <Modal
                    title={this.props.title}
                    style={{top: 20}}
                    width="400"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="材料名称" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <Input type="text" {...getFieldProps('name')} />
                        </FormItem>
                        <FormItem label="规格" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <Input type="text" {...getFieldProps('standard')} />
                        </FormItem>
                        <FormItem label="单位" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <Input type="text" {...getFieldProps('unit')} />
                        </FormItem>
                        <FormItem label="单价" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <Input onBlur={this.onBlur} type="text" {...getFieldProps('unitPrice')} />
                        </FormItem>
                        <FormItem label="存放位置" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <Input onBlur={this.onBlur} type="text" {...getFieldProps('storagePlace')} />
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        )
    }
}

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
