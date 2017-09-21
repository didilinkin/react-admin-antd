// 楼宇列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm} from 'antd'
import { apiPost, verification } from '../../../../api'
import AddBuilding from '../../components/BuidAdd'
// 引入组件
// React component
class EditBuilding extends Component {
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
            title: '修改楼宇',
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/build/deleteBuild',
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
            title: '添加楼宇',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/build/buildList',
            {delFlag: 0,
                page: this.state.page,
                sort: this.state.sort,
                order: this.state.order}
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
                title: '楼宇名称',
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '楼层数量',
                dataIndex: 'floorNum',
                key: 'floorNum'
            }, {
                title: '客梯数量',
                dataIndex: 'passengerElevatorNum',
                key: 'passengerElevatorNum'
            }, {
                title: '货梯数量',
                dataIndex: 'goodsElevatorNum',
                key: 'goodsElevatorNum'
            }, {
                title: '操作',
                width: 150,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a href="#" onClick={() => handleUpdate(record.id)} > 编辑&nbsp;&nbsp; </a>
                            { verification('deleteBuilding') &&
                            <Popconfirm title="删除该楼宇将会删除楼宇下的所有房间，确定继续删除吗?" onConfirm={() => handleDelete(record.id)}>
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
        filters['order'] = this.state.order
        filters['sort'] = this.state.sort
        filters['buildName'] = this.buildName
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
            '/build/buildList',
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
    buildName = null
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
    enterKey = (event) => {
        if (event.keyCode === 13) { // enter 键
            this.refresh()
        }
    }
    render () {
        return (
            <div onKeyDown={this.enterKey}>
                <AddBuilding
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
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;楼宇名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.add}>添加楼宇</Button>
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
export default EditBuilding


