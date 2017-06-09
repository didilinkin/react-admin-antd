import {Modal, Input, Button, Form, notification, Icon } from 'antd'
import React from 'react'
import axios from 'axios'
const FormItem = Form.Item


class addUpkeep extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    // 单击确定按钮提交表单
    handleSubmit = () => {
        console.log(this.props.form.getFieldsValue())
        axios({
            method: 'post',
            url: 'http://192.168.1.108:18082/upkeep/addupkeep',
            params: this.props.form.getFieldsValue()
        }).then(response => {
            notification.open({
                message: '添加成功',
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
            })
            this.props.refreshTable()
        }).catch(error => {
            this.props.refreshTable()
        })
        this.setState({ visible: false })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({ visible: true })
    }
    handleCancel = (e) => {
        this.setState({ visible: false })
    }
    onBlur = () => {
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
                    title="增加收费项"
                    style={{ top: 20,
                        width: 350}}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="物品名称" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('entryName')} />
                        </FormItem>
                        <FormItem label="单位" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('company')} />
                        </FormItem>
                        <FormItem label="进货价格" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input onBlur={this.onBlur} type="text" {...getFieldProps('purchasePrice')} />
                        </FormItem>
                        <FormItem label="服务费" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input onBlur={this.onBlur} type="text" {...getFieldProps('serviceCharge')} />
                        </FormItem>
                        <FormItem label="收费金额" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('tollAmount')} />
                        </FormItem>
                    </Form>
                </Modal>
                <Button type="primary" onClick={this.showModal}>增加收费项</Button>
            </div>
        )
    }
}

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
