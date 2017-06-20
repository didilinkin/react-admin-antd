// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm, Input, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件
import CancelRepairComponent from './common/CancelRepair'
import DistributeLeafletsComponent from './common/DistributeLeaflets'
import TableAddUpComponent from './common/TableAddUp'
const { RangePicker } = DatePicker
// React component
class RepairList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openinvalid: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            id: 0
        }
    }
    distributeLeaflets = (id) => {
        this.setState({
            opendispatch: true,
            openinvalid: false,
            openTableAddUp: false,
            openUpdate: false,
            id: id
        })
    }
    handleUpdate = (id) => {
        this.setState({
            openinvalid: true,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            id: id
        })
    }
    handleUpdateRepair = (id) => {
        this.setState({
            openinvalid: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            'upkeep/repairList'
        )
        let repairList = result.data
        const distributeLeaflets = this.distributeLeaflets
        const handleUpdate = this.handleUpdate
        const handleUpdateRepair = this.handleUpdateRepair
        this.setState({loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '报修日期',
                width: 150,
                dataIndex: 'repairDate',
                key: 'repairDate'
            }, {
                title: '公司名称',
                width: 150,
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '报修内容',
                width: 150,
                dataIndex: 'repairContent',
                key: 'repairContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    let url = '/upkeep/repai/' + record.id
                    return (
                        <a href={url}>{text}</a>
                    )
                }
            }, {
                title: '来源',
                width: 100,
                dataIndex: 'fromType',
                key: 'fromType',
                render: function (text, record, index) {
                    let fromType = '客服'
                    if (text === '1') {
                        fromType = '微信'
                    }
                    return (
                        <span>{fromType}</span>
                    )
                }
            }, {
                title: '派工状态',
                width: 100,
                dataIndex: 'pieStatus',
                key: 'pieStatus',
                render: function (text, record, index) {
                    let pieStatus = '未派单'
                    if (record.pieStatus === 1) {
                        pieStatus = '已派单'
                    }
                    return (
                        <span>{pieStatus}</span>
                    )
                }
            }, {
                title: '维修人',
                width: 100,
                dataIndex: 'repairedMan',
                key: 'repairedMan'
            }, {
                title: '维修状态',
                width: 100,
                dataIndex: 'repairStatus',
                key: 'repairStatus',
                render: function (text, record, index) {
                    let repairStatus = '未完成'
                    if (record.repairStatus === 1) {
                        repairStatus = '已完成'
                    }
                    return (
                        <span>{repairStatus}</span>
                    )
                }
            }, {
                title: '维修项目',
                width: 100,
                dataIndex: 'maintenanceProject',
                key: 'maintenanceProject',
                render: function (text, record, index) {
                    let url = '/upkeep/maintenanceProject/' + record.id
                    return (
                        <a href={url}>查看明细</a>
                    )
                }
            }, {
                title: '维修明细',
                width: 100,
                dataIndex: 'MaintenanceDetails',
                key: 'MaintenanceDetails',
                render: function (text, record, index) {
                    let url = '/upkeep/maintenance/' + record.id
                    return (
                        <a href={url}>查看明细</a>
                    )
                }
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <Popconfirm title="确定派单吗?" onConfirm={() => distributeLeaflets(record.id)}>
                                <Button >派单</Button>
                            </Popconfirm>
                            <Popconfirm title="确定作废吗?" onConfirm={() => handleUpdate(record.id)}>
                                <Button >作废</Button>
                            </Popconfirm>
                            <Popconfirm title="确定修改吗?" onConfirm={() => handleUpdateRepair(record.id)}>
                                <Button >修改</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }],
            dataSource: repairList
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'upkeep/repairList',
            {'startDate': this.startDate,
                'endDate': this.endDate,
                'clientName': this.clientName
            }
        )
        this.setState({
            openinvalid: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            opendispatch: false,
            openinvalid: false,
            openUpdate: false,
            openTableAddUp: true
        })
    }
    clientName = ''
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    query = () => {
        this.refresh()
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        this.endDate = dateString[1]
    }
    render () {
        return (
            <div>

                <CancelRepairComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openinvalid}
                />
                <DistributeLeafletsComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.opendispatch}
                />
                <TableAddUpComponent
                    refreshTable={this.refresh}
                    visible={this.state.openTableAddUp}
                />
                <TableAddUpComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <span>
                    <span>报修日期:</span>
                    <RangePicker onChange={this.getDate} />
                    <span>公司名称:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加保单</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1300 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default RepairList

