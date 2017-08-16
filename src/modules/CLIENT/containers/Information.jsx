// 客户列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm} from 'antd'
import { apiPost } from '../../../api'
import AddCustomer from '../components/Customer/CustomerAdd'
// 引入组件
// React component
class Information extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            title: '',
            id: null,
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            title: '修改客户',
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/customer/deleteCustomer',
            {id: id,
                delFlag: 1}
        )
        notification.open({
            message: '删除成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    add = () => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            title: '添加客户',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/customer/customerList'
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
        this.setState({loading: false,
            columns: [{
                title: '序号',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '公司编号',
                width: 250,
                dataIndex: 'clientNum'
            }, {
                title: '物业客户名',
                width: 350,
                dataIndex: 'clientName'
            }, {
                title: '租赁客户名',
                width: 350,
                dataIndex: 'rentClientName'

            }, {
                title: '物业费提示单名称',
                width: 350,
                dataIndex: 'printClientName'
            }, {
                title: '联系人',
                width: 250,
                dataIndex: 'contactPerson'
            }, {
                title: '行政电话',
                width: 350,
                dataIndex: 'phoneAdmin'
            }, {
                title: '经理电话',
                width: 350,
                dataIndex: 'phoneManager'
            }, {
                title: '财务电话',
                width: 350,
                dataIndex: 'phoneFinance'
            }, {
                title: '邮箱',
                width: 350,
                dataIndex: 'email'
            }, {
                title: '备注',
                width: 350,
                dataIndex: 'remark'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a href="#" onClick={() => handleUpdate(record.id)} > 编辑 </a>
                            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                <a href="#" > 删除 </a>
                            </Popconfirm>
                        </div>
                    )
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            '/customer/customerList',
            {'clientName': this.clientName,
                'phoneAdmin': this.phoneAdmin
            }
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    clientName = null
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    phoneAdmin = null
    entryPhoneOnChange = (e) => {
        this.phoneAdmin = e.target.value
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <AddCustomer
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                    title={this.state.title}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;联系方式:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryPhoneOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加客户</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2700 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default Information


