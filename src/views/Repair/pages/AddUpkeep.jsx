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
                    'http://192.168.1.108:18082/upkeep/getUpkeep',
                    { 'id': nextProps.id }
                )
                this.props.form.setFields({
                    tollAmount: {
                        value: resulData.data.tollAmount,
                        errors: ''
                    },
                    entryName: {
                        value: resulData.data.entryName,
                        errors: ''
                    },
                    company: {
                        value: resulData.data.company,
                        errors: ''
                    },
                    purchasePrice: {
                        value: resulData.data.purchasePrice,
                        errors: ''
                    },
                    serviceCharge: {
                        value: resulData.data.serviceCharge,
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
                'http://192.168.1.108:18082/upkeep/updateUpkeep',
                json
            )
            notification.open({
                message: '修改成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>
            })
            this.props.refreshTable()
        } else {
            console.log(this.props.form.getFieldsValue())
            await apiPost(
                'http://192.168.1.108:18082/upkeep/addupkeep',
                this.props.form.getFieldsValue()
            )
            notification.open({
                message: '添加成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>
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
        let purchasePrice = this.props.form.getFieldValue('purchasePrice')
        let serviceCharge = this.props.form.getFieldValue('serviceCharge')
        if (typeof (purchasePrice) === 'undefined') {
            purchasePrice = 0
        }
        if (typeof (serviceCharge) === 'undefined') {
            serviceCharge = 0
        }
        this.props.form.setFieldsValue({
            tollAmount: (parseFloat(purchasePrice) + parseFloat(serviceCharge)).toFixed(0)
        })
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
                        <FormItem label="物品名称" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input type="text" {...getFieldProps('entryName')} />
                        </FormItem>
                        <FormItem label="单位" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input type="text" {...getFieldProps('company')} />
                        </FormItem>
                        <FormItem label="进货价格" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input onBlur={this.onBlur} type="text" {...getFieldProps('purchasePrice')} />
                        </FormItem>
                        <FormItem label="服务费" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input onBlur={this.onBlur} type="text" {...getFieldProps('serviceCharge')} />
                        </FormItem>
                        <FormItem label="收费金额" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input type="text" {...getFieldProps('tollAmount')} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
