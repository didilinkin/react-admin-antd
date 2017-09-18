// 楼宇列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm} from 'antd'
import { apiPost } from '../../../api'
import AddNotice from '../components/PropertyNotice/PropertyNoticeAdd'
import PropertyNoticeDetail from '../components/PropertyNotice/PropertyNoticeDetail'
// 引入组件
// React component
class PropertyNotice extends Component {
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
            rows: 15,
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
            title: '编辑物业公告',
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/complaint/updateNotice',
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
            title: '新建物业公告',
            id: null
        })
    }
    handleDetail = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: true,
            openUpdate: false,
            title: '物业公告详情',
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/complaint/noticeList',
            {page: this.state.page,
                sort: this.state.sort,
                order: this.state.order}
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
        const handleDetail = this.handleDetail
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
                title: '标题',
                dataIndex: 'title'
            }, {
                title: '状态',
                dataIndex: 'status',
                render: function (text, record, index) {
                    let status = ''
                    if (record.status === 0) {
                        status = '未发布'
                    } else if (record.status === 1) {
                        status = '已发布'
                    }
                    return (
                        <span>{status}</span>
                    )
                }
            }, {
                title: '发布时间',
                dataIndex: 'createDate'
            }, {
                title: '发布人',
                dataIndex: 'createName'
            }, {
                title: '操作',
                width: 150,
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.status === 1) {
                        return (
                            <div>
                                <a onClick={() => handleDetail(record.id)} > 详情 &nbsp;&nbsp;</a>
                                <a onClick={() => handleDelete(record.id)} > 删除 &nbsp;&nbsp;</a>
                            </div>
                        )
                    } else if (record.status === 0) {
                        return (
                            <div>
                                <a onClick={() => handleDetail(record.id)} > 详情 &nbsp;&nbsp;</a>
                                <a onClick={() => handleUpdate(record.id)} > 编辑 &nbsp;&nbsp;</a>
                                <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                    <a> 删除 </a>
                                </Popconfirm>
                            </div>
                        )
                    }
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
        filters['title'] = this.title
        filters['order'] = this.state.order
        filters['sort'] = this.state.sort
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
            '/complaint/noticeList',
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
    title = ''
    entryNameOnChange = (e) => {
        this.buildName = e.target.value
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
                <AddNotice
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                    close={this.close}
                    title={this.state.title}
                />
                <PropertyNoticeDetail
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openTableAddUp}
                    close={this.close}
                    title={this.state.title}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;标题&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.add}>添加物业公告</Button>
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
                        scroll={{ x: 1300 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyNotice


