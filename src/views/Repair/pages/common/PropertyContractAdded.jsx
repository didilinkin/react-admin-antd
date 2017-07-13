import {Modal, Input, Form, notification, Icon, Steps, Button, message  } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Step = Steps.Step

class PropertyContractAdded extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            current: 0,
            isFirst: true,
            ListBuildingInfo: []
        }
    }
    handleSubmit = () => {
        this.props.refreshTable()
        notification.open({
            message: '添加成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({
            visible: false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    initialRemarks2 (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.setState({
                isFirst: false,
                visible: nextProps.visible
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks2(nextProps)
    }
    async initialRemarks () {
        let ListBuildingInfo = await apiPost(
            '/contract/ListBuildingInfo'
        )
        ListBuildingInfo = ListBuildingInfo.data
        this.setState({
            ListBuildingInfo: ListBuildingInfo
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    next = () => {
        const current = this.state.current + 1
        this.setState({
            current: current
        })
    }
    prev= () => {
        const current = this.state.current - 1
        this.setState({
            current: current
        })
    }
    render () {
        const {getFieldDecorator} = this.props.form
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width={400}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Steps current={this.state.current}>
                    <Step key="合同信息" title="合同信息" />
                    <Step key="设置物业费" title="设置物业费" />
                    <Step key="完成" title="完成" />
                </Steps>
                <Form layout="horizontal">
                    <FormItem label="物品名称" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('entryName', {
                            rules: [ {
                                required: true,
                                message: 'Please input your 物品名称!'
                            }]
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                </Form>
                <div className="steps-action">
                    {
                        this.state.current < 3 - 1 &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === 3 - 1 &&
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        this.state.current > 0 &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </Modal>
        )
    }
}
let PropertyContractAddedCom = Form.create()(PropertyContractAdded)

export default PropertyContractAddedCom
