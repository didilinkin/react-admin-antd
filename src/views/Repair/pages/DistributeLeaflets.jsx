import {Modal, Form, notification, Icon, Select  } from 'antd'
import React from 'react'
import { apiPost } from '../../../api'
const FormItem = Form.Item
const Option = Select.Option

class DistributeLeaflets extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false
                })
            }
        }
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        if (this.props.id > 0) {
            let json = this.props.form.getFieldsValue()
            json['id'] = this.props.id
            await apiPost(
                'http://192.168.1.108:18082/upkeep/updateRepair',
                json
            )
            notification.open({
                message: '派单成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>
            })
            this.props.refreshTable()
        }
        this.setState({visible: false,
            isFirst: true})
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    handleChange = (value) => {
        alert(value)
    }
    render () {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <Modal
                    title="派单"
                    style={{top: 20}}
                    width="400"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="姓名" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Select
                                {...getFieldProps('repairedId')}
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                                <Option value="3">Tom</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="手机" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <span>122121212</span>
                        </FormItem>
                        <FormItem label="电话" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <span>122121212</span>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let DistributeLeafletsComponent = Form.create()(DistributeLeaflets)

export default DistributeLeafletsComponent
