import {Modal, Form, notification, Icon, Select, Input  } from 'antd'
import React from 'react'
import { apiGet, apiPost } from '../../../../api/index'
const Option = Select.Option
const FormItem = Form.Item


class DistributeLeaflets extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            data: {userArr: []},
            id: '',
            value: '',
            phone1: '',
            userTelephone: '',
            isFirst: true
        }
    }
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                let resulData = await apiGet('upkeep/getUser')
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
            if (this.props.id > 0) {
                let json = this.props.form.getFieldsValue()
                json['id'] = this.props.id
                await apiPost(
                    'upkeep/distribute',
                    json
                )
                notification.open({
                    message: '派单成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refreshTable()
            }
            this.setState({
                visible: false,
                isFirst: true
            })
        }
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    getUser = (value) => {
        this.state.data.userArr.map(d => {
            if (d.id.toString() === value) {
                this.props.form.setFieldsValue({
                    repairedId: d.id,
                    repairedMan: d.loginName,
                    phone1: d.phone,
                    roleName: d.roleName
                })
            }
            return ''
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title="派单"
                style={{top: 20}}
                width={400}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <FormItem label="姓名" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('repairedIdOne', {
                            rules: [ {
                                required: true,
                                message: '请输入'
                            }]
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={this.getUser}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.data.userArr.map(d => <Option key={d.id}>{d.loginName}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="手机" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('phone1')(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem label="职位" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('roleName')(
                            <Input disabled />
                        )}
                    </FormItem>
                    {getFieldDecorator('repairedId')(
                        <Input type="hidden" />
                    )}
                    {getFieldDecorator('repairedMan')(
                        <Input type="hidden" />
                    )}
                </Form>
            </Modal>
        )
    }
}

let DistributeLeafletsComponent = Form.create()(DistributeLeaflets)

export default DistributeLeafletsComponent
