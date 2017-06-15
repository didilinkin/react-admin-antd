import {Modal, Form, notification, Icon, Select  } from 'antd'
import React from 'react'
import { apiGet, apiPost } from '../../../api'
const FormItem = Form.Item
const Option = Select.Option

class DistributeLeaflets extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            data: {userArr: []},
            id: '',
            value: '',
            phone: '',
            userTelephone: '',
            isFirst: true
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            visible: false,
            data: {userArr: []},
            id: '',
            value: '',
            phone: '',
            userTelephone: '',
            isFirst: true
        })
        if (nextProps.id > 0) {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                let resulData = await apiGet('http://192.168.1.108:18082/upkeep/getUser')
                this.setState({
                    visible: nextProps.visible,
                    data: {userArr: resulData.data},
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
            await apiPost(
                'http://192.168.1.108:18082/upkeep/distribute',
                {
                    'id': this.props.id,
                    'repairedId': this.state.id,
                    'repairedMan': this.state.value
                }
            )
            notification.open({
                message: '派单成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
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
        this.state.data.userArr.map(d => {
            if (d.id.toString() === value) {
                this.setState({
                    phone: d.phone,
                    userTelephone: d.userTelephone,
                    value: d.loginName,
                    id: value
                })
            }
            return ''
        })
    }
    render () {
        const { getFieldProps } = this.props.form
        return (
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
                                value={this.state.value}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.data.userArr.map(d => <Option key={d.id}>{d.loginName}</Option>)}
                            </Select>
                        </FormItem>
                        <FormItem label="手机" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <span>{this.state.phone}</span>
                        </FormItem>
                        <FormItem label="电话" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <span>{this.state.userTelephone}</span>
                        </FormItem>
                    </Form>
                </Modal>
        )
    }
}

let DistributeLeafletsComponent = Form.create()(DistributeLeaflets)

export default DistributeLeafletsComponent
