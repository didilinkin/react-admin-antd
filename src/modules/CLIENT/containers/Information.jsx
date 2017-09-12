// 客户列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm} from 'antd'
import { apiPost, verification } from '../../../api'
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
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 30,
            sort: 'id',
            order: 'desc',
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
            '/customer/customerList',
            {delFlag: 0,
                page: this.state.page,
                order: this.state.order,
                sort: this.state.sort}
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
        this.setState({loading: false,
            total: result.data.total,
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
                title: '提示单名称',
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
                            <a href="#" onClick={() => handleUpdate(record.id)} > 编辑 &nbsp;&nbsp;</a>
                            {verification('deleteCustomer') &&
                            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                <a href="#"> 删除 </a>
                            </Popconfirm>
                            }
                        </div>
                    )
                }
            }],
            dataSource: result.data.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    json = {}
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        if (pagination === null) {
            this.json = filters
        }
        for (let p in this.json) {
            filters[p] = this.json[p]
        }
        filters['delFlag'] = 0
        filters['sort'] = this.state.sort
        filters['order'] = this.state.order
        filters['clientName'] = this.clientName
        filters['phoneAdmin'] = this.phoneAdmin
        if (pagination !== null && typeof (pagination) !== 'undefined') {
            filters['rows'] = pagination.pageSize
            filters['page'] = pagination.current
            this.setState({
                page: pagination.current
            })
        } else {
            this.setState({
                page: 1
            })
        }
        // 刷新表格
        let result = await apiPost(
            '/customer/customerList',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data.rows,
            total: result.data.total,
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
    close = async () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false
        })
    }
    query = () => {
        this.refresh()
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    render () {
        return (
            <div>
                <AddCustomer
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                    close={this.close}
                    title={this.state.title}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span style={{margin: '0 10px'}}>客户名称:</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span style={{margin: '0 10px'}}>联系方式:</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryPhoneOnChange}
                    />
                    <Button type="primary" style={{margin: '0 10px'}} onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加客户</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        rowSelection={{
                            onChange: this.onSelectChange
                        }}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['15', '30', '45'],
                            current: this.state.page,
                            defaultPageSize: this.state.rows}}
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


