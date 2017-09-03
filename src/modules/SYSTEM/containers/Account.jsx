// 系统设置 - 账号管理
import React from 'react'
import {Table, Popconfirm, notification, Icon, Input, Form, Button, Select} from 'antd'
import { apiPost } from '../../../api'
import UserAddUpComponent from '../components/UserAddUp'
const FormItem = Form.Item
const Option = Select.Option
class Account extends React.Component {
    constructor (props) {
        super(props)
        let delectDepartment = this.delectDepartment
        let edit = this.edit
        let reset = this.reset
        let close = this.close
        this.state = {
            loading: false,
            open: false,
            department: [],
            columns:
                [
                    {
                        title: '所属部门',
                        width: 150,
                        dataIndex: 'departmentName'
                    },
                    {
                        title: '工号',
                        width: 100,
                        dataIndex: 'jobNum'
                    },
                    {
                        title: '用户名',
                        width: 150,
                        dataIndex: 'loginName'
                    },
                    {
                        title: '所属角色',
                        width: 200,
                        dataIndex: 'roleName'
                    },
                    {
                        title: '手机',
                        width: 200,
                        dataIndex: 'phone'
                    },
                    {
                        title: '创建时间',
                        width: 200,
                        dataIndex: 'loginDate'
                    },
                    {
                        title: '备注',
                        width: 200,
                        dataIndex: 'remark'
                    },
                    {
                        title: '操作',
                        width: 300,
                        dataIndex: 'opt',
                        render: function (text, record, index) {
                            return (
                                <div>
                                    <a onClick={() => edit(record.id)}>编辑</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popconfirm title="此操作将重置密码为abc123456，是否继续?" onConfirm={() => reset(record.id)}>
                                        <a>重置密码</a>
                                    </Popconfirm>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popconfirm title="是否确认关闭该账号？" onConfirm={() => close(record.id)}>
                                        <a>关闭账号</a>
                                    </Popconfirm>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popconfirm title="确定删除吗?" onConfirm={() => delectDepartment(record.id)}>
                                        <a>删除</a>
                                    </Popconfirm>
                                </div>
                            )
                        }
                    }
                ],
            dataSource: [],
            id: 0
        }
    }
    close = async (id) => {
        await apiPost(
            'system/updateUser',
            {id: id,
                loginFlag: 2}
        )
        notification.open({
            message: '关闭成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.query()
    }
    reset = async (id) => {
        await apiPost(
            'system/updateUser',
            {id: id,
                passWord: 'cj123456'}
        )
        notification.open({
            message: '重置成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
    }
    edit = async (id) => {
        this.setState({
            open: true,
            id: id
        })
    }
    delectDepartment = async (id) => {
        let data = await apiPost(
            'system/delectSysUser',
            {id: id}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    refresh = async (json) => {
        this.setState({loading: true,
            open: false,
            id: 0})
        let departmentlist = await apiPost(
            'system/sysUserList',
            json
        )
        this.setState({
            dataSource: departmentlist.data,
            loading: false
        })
    }
    initialization = async () => {
        let departmentlist = await apiPost(
            'system/departmentlist'
        )
        this.setState({
            department: departmentlist.data
        })
    }
    componentDidMount () {
        this.refresh()
        this.initialization()
    }
    add = () => {
        this.props.form.resetFields()
        this.setState({
            open: true,
            id: 0
        })
    }
    query = (value) => {
        if (value === 'cancel') {
            this.setState({
                open: false,
                id: 0
            })
        } else {
            let json = this.props.form.getFieldsValue()
            this.refresh(json)
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form layout="inline">
                    <FormItem label="所属部门">
                        {getFieldDecorator('departmentName')(
                            <Select
                                size="normal"
                                showSearch
                                placeholder="请选择所属部门"
                                style={{width: '200px'}}
                                optionFilterProp="children"
                            >
                                {this.state.department.map(d => {
                                    return <Option key={d.departmentName}>{d.departmentName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="工号">
                        {getFieldDecorator('jobNum')(
                            <Input size="normal" style={{width: '100px'}} />
                        )}
                    </FormItem>
                    <FormItem label="登录用户名">
                        {getFieldDecorator('loginName')(
                            <Input size="normal" style={{width: '100px'}} />
                        )}
                    </FormItem>
                    <FormItem label="账号状态">
                        {getFieldDecorator('delFlag')(
                            <Select
                                size="normal"
                                showSearch
                                style={{width: '200px'}}
                                placeholder="请选择账号状态"
                                optionFilterProp="children"
                            >
                                <Option key={0}>正常</Option>
                                <Option key={1}>关闭</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button size="normal" type="primary" onClick={this.query}>查询</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button size="normal" type="primary" onClick={this.add}>添加账号</Button>
                    </FormItem>
                </Form>
                <Table
                    style={{marginTop: '15px'}}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
                <UserAddUpComponent
                    refresh={this.query}
                    id={this.state.id}
                    department={this.state.department}
                    visible={this.state.open}
                />
            </div>
        )
    }
}
let AccountComponent = Form.create()(Account)

export default AccountComponent
