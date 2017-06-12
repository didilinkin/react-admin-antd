import { Input, Form, notification, Icon, Button } from 'antd'
import { Provider, connect } from 'react-redux'
import React from 'react'
import axios from 'axios'
const FormItem = Form.Item

class addUpkeep extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    componentDidMount () {
        this.setState({ loading: true })
        axios({
            method: 'post',
            url: 'http://192.168.1.108:18082/upkeep/getUpkeep',
            params: {id: 1}
        }).then(response => {
            let resulData = response.data
            this.props.form.setFieldsValue({
                tollAmount: resulData.tollAmount,
                entryName: resulData.entryName,
                company: resulData.company,
                purchasePrice: resulData.purchasePrice,
                serviceCharge: resulData.serviceCharge
            })
        }).catch(error => {
        })
    }
    // 单击确定按钮提交表单
    handleSubmit = () => {
        console.log(this.props.form.getFieldsValue())
        axios({
            method: 'post',
            url: 'http://192.168.1.108:18082/upkeep/getUpkeep',
            params: {id: 1}
        }).then(response => {
            notification.open({
                message: '修改成功',
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
            })
        }).catch(error => {
        })
    }
    handleReset = (e) => {
        e.preventDefault()
        this.props.form.resetFields()
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
                        <FormItem wrapperCol={{ span: 30,
                            offset: 11 }} >
                            <Button type="primary" onClick={this.handleSubmit}>确定</Button>&nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    </Form>
            </div>
        )
    }
}

function mapStateToProps (state) {
    debugger
}

let addUpkeeP = connect(mapStateToProps)(addUpkeep)

let Addupkeep = Form.create()(addUpkeeP)

export default Addupkeep
