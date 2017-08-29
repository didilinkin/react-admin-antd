// 系统设置 - 角色管理
import React from 'react'
import {Table, Popconfirm, notification, Icon, Input, Form, Button, Select} from 'antd'
import { apiPost } from '../../../api'
import RoleAddUpComponent from '../components/RoleAddUp'
const FormItem = Form.Item
const Option = Select.Option
class Role extends React.Component {
    constructor (props) {
        super(props)
        let delectRole = this.delectRole
        let edit = this.edit
        this.state = {
            loading: false,
            open: false,
            department: [],
            columns:
                [
                    {
                        title: '角色编号',
                        width: 100,
                        dataIndex: 'roleNumber'
                    },
                    {
                        title: '角色名称',
                        width: 100,
                        dataIndex: 'roleName'
                    },
                    {
                        title: '所属部门',
                        width: 150,
                        dataIndex: 'departmentName'
                    },
                    {
                        title: '权限',
                        width: 400,
                        dataIndex: 'menuNames'
                    },
                    {
                        title: '操作',
                        width: 100,
                        dataIndex: 'opt',
                        render: function (text, record, index) {
                            return (
                                <div>
                                    <a onClick={() => edit(record.id)}>编辑</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popconfirm title="确定删除吗?" onConfirm={() => delectRole(record.id)}>
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
    edit = async (id) => {
        this.setState({
            open: true,
            id: id
        })
    }
    delectRole = async (id) => {
        let data = await apiPost(
            'system/delectRole',
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
            '/system/RoleListDepartmentId',
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
                        {getFieldDecorator('departmentId')(
                            <Select
                                showSearch
                                placeholder="请选择所属部门"
                                style={{width: '200px'}}
                                optionFilterProp="children"
                                size="normal"
                            >
                                {this.state.department.map(d => {
                                    return <Option key={d.id}>{d.departmentName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="角色名称">
                        {getFieldDecorator('roleName')(
                            <Input size="normal" style={{width: '100px'}} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button size="normal" style={{marginRight: '15px'}} type="primary" onClick={this.query}>查询</Button>
                        <Button size="normal" type="primary" onClick={this.add}>添加角色</Button>
                    </FormItem>
                </Form>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    style={{marginTop: '20px'}}
                />
                <RoleAddUpComponent
                    refresh={this.query}
                    id={this.state.id}
                    department={this.state.department}
                    visible={this.state.open}
                    title={this.state.id > 0 ? '修改角色' : '添加角色'}
                />
            </div>
        )
    }
}
let RoleComponent = Form.create()(Role)

export default RoleComponent
