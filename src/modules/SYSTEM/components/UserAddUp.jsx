// 添加用户 修改用户
import React from 'react'
import {Select, Radio, notification, Icon, Modal, Input, Form } from 'antd'
import { apiPost } from '../../../api'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
class UserAddUp extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            roles: [],
            visible: false,
            isFirst: true
        }
    }

    initialization = async (nextProps) => {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            if (nextProps.id > 0) {
                let user = await apiPost(
                    'system/getUser',
                    {id: nextProps.id}
                )
                user = user.data
                let RoleList = await apiPost(
                    'system/RoleListDepartmentId',
                    {departmentId: user.departmentId}
                )
                this.setState({
                    roles: RoleList.data,
                    visible: nextProps.visible,
                    isFirst: false
                })
                this.props.form.setFieldsValue({
                    departmentId: user.departmentName,
                    jobNum: user.jobNum,
                    loginName: user.loginName,
                    phone: user.phone,
                    roleId: user.roleId,
                    loginFlag: user.loginFlag,
                    remark: user.remark
                })
            } else {
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialization(nextProps)
    }
    departmentId = async (value) => {
        let RoleList = await apiPost(
            'system/RoleListDepartmentId',
            {departmentId: value}
        )
        this.setState({
            roles: RoleList.data
        })
    }
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
            let json = this.props.form.getFieldsValue()
            if (!(json.departmentId > 0)) {
                json['departmentId'] = null
            }
            if (this.props.id > 0) {
                json['id'] = this.props.id
                let data = await apiPost(
                    'system/updateUser',
                    json
                )
                notification.open({
                    message: data.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                if (json.password === json.passwordTwo) {
                    let data = await apiPost(
                        'system/insertUser',
                        json
                    )
                    notification.open({
                        message: data.data,
                        icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                    })
                } else {
                    alert('两次密码输入不一致')
                }
            }
            this.setState({
                visible: false,
                isFirst: true
            })
            this.props.refresh()
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            isFirst: true
        })
        this.props.refresh('cancel')
    }
    confirm = () => {
        let passWord = this.props.form.getFieldValue('passWord')
        let passWordTwo = this.props.form.getFieldValue('passWordTwo')
        if (passWord !== passWordTwo) {
            alert('两次密码输入不一致')
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { department } = this.props
        return (
            <Modal
                title={this.props.id > 0 ? '编辑账户' : '添加账户'}
                style={{top: 20}}
                width={500}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <FormItem label="所属部门" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('departmentId', {
                            rules: [ {
                                required: true,
                                message: '请选择所属部门!'
                            }]
                        })(
                            <Select
                                showSearch
                                placeholder="请选择所属部门"
                                optionFilterProp="children"
                                onChange={this.departmentId}
                            >
                                {department.map(d => {
                                    return <Option key={d.id}>{d.departmentName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="工号" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('jobNum', {
                            rules: [ {
                                required: true,
                                message: '请输入工号!'
                            }]
                        })(

                            <Input placeholder="请输入工号" />
                        )}
                    </FormItem>
                    <FormItem label="用户名" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('loginName', {
                            rules: [ {
                                required: true,
                                message: '请输入用户名!'
                            }]
                        })(

                            <Input placeholder="请请输入用户名" />
                        )}
                    </FormItem>
                    <FormItem label="手机" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('phone', {
                            rules: [ {
                                required: true,
                                message: '请输入手机!'
                            }]
                        })(

                            <Input placeholder="请输入手机" />
                        )}
                    </FormItem>
                    {!this.props.id > 0 &&
                    <FormItem label="初始密码" labelCol={{span: 5}}
                        wrapperCol={{span: 15}}
                    >
                        {getFieldDecorator('passWord')(
                            <Input placeholder="请输入初始密码" />
                        )}
                    </FormItem>
                    }
                    {!this.props.id > 0 &&
                    <FormItem label="确认密码" labelCol={{span: 5}}
                        wrapperCol={{span: 15}}
                    >
                        {getFieldDecorator('passWordTwo')(
                            <Input onBlur={this.confirm} placeholder="请输入确认密码" />
                        )}

                    </FormItem>
                    }
                    <FormItem label="所属角色" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('roleId', {
                            rules: [ {
                                required: true,
                                message: '请选择所属角色!'
                            }]
                        })(
                            <RadioGroup>
                                {
                                    this.state.roles.map((role, i) => {
                                        return <RadioButton key={i} value={role.id}>{role.roleName}</RadioButton>
                                    })
                                }
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="账号状态" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('loginFlag', {
                            rules: [ {
                                required: true,
                                message: '请选择账号状态!'
                            }]
                        })(

                            <RadioGroup>
                                <RadioButton value={1}>正常</RadioButton>
                                <RadioButton value={2}>关闭</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="备注" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('remark')(
                            <Input type="textarea" rows={4} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

let UserAddUpComponent = Form.create()(UserAddUp)


export default UserAddUpComponent
