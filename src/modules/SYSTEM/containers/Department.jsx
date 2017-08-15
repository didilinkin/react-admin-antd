// 系统设置 - 部门管理
import React from 'react'
import {Table, Popconfirm, notification, Icon, Modal, Input, Form, Button} from 'antd'
import { apiPost } from '../../../api'
const FormItem = Form.Item
class Department extends React.Component {
    constructor (props) {
        super(props)
        let delectDepartment = this.delectDepartment
        let edit = this.edit
        this.state = {
            loading: false,
            open: false,
            columns:
                [
                    {
                        title: '部门编号',
                        width: 200,
                        dataIndex: 'departmentNumber'
                    },
                    {
                        title: '部门名称',
                        width: 200,
                        dataIndex: 'departmentName'
                    },
                    {
                        title: '备注',
                        width: 400,
                        dataIndex: 'remarks'
                    },
                    {
                        title: '操作',
                        width: 200,
                        dataIndex: 'opt',
                        render: function (text, record, index) {
                            return (
                                <div>
                                    <a onClick={() => edit(record.id)}>编辑</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popconfirm key="2" title="确定删除吗?" onConfirm={() => delectDepartment(record.id)}>
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
        let Department = await apiPost(
            'system/getDepartment',
            {id: id}
        )
        this.props.form.setFieldsValue({
            departmentNumber: Department.data.departmentNumber,
            departmentName: Department.data.departmentName,
            remarks: Department.data.remarks
        })
        this.setState({
            open: true,
            id: id
        })
    }
    delectDepartment = async (id) => {
        let data = await apiPost(
            'system/delectDepartment',
            {id: id}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    refresh = async () => {
        this.setState({loading: true,
            open: false,
            id: 0})
        let departmentlist = await apiPost(
            'system/departmentlist'
        )
        this.setState({
            dataSource: departmentlist.data,
            loading: false
        })
    }
    componentDidMount () {
        this.refresh()
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
            if (this.state.id > 0) {
                json['id'] = this.state.id
                let data = await apiPost(
                    'system/updateDepartment',
                    json
                )
                notification.open({
                    message: data.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                let data = await apiPost(
                    'system/insertDepartment',
                    json
                )
                notification.open({
                    message: data.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            }
            this.refresh()
        }
    }
    handleCancel = () => {
        this.setState({
            open: false,
            id: 0
        })
    }
    add = () => {
        this.props.form.resetFields()
        this.setState({
            open: true,
            id: 0
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Button type="primary" onClick={this.add}>添加部门</Button>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
                <Modal
                    title={this.state.id > 0 ? '修改部门' : '添加部门'}
                    style={{top: 20}}
                    width={400}
                    visible={this.state.open}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="部门编号" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('departmentNumber', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 部门编号!'
                                }]
                            })(

                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="部门名称" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('departmentName', {
                                rules: [ {
                                    required: true,
                                    message: '请输入 部门名称!'
                                }]
                            })(

                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="备注" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('remarks')(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
let DepartmentComponent = Form.create()(Department)

export default DepartmentComponent
