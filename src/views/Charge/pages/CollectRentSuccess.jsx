// 收费管理 - 应收租金
import React, {Component} from 'react'
import {Table, Button, Spin } from 'antd'
import { apiPost } from '../../../api'
import CollectRentHeadComponent from './components/CollectRentHead'
// 引入组件
// React component
class CollectRentConduct extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openinvalid: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let ListBuildingInfo = await apiPost(
            '/contract/ListBuildingInfo'
        )
        let result = await apiPost(
            '/collectRent/collectRentList',
            {auditStatus: 2}
        )
        const handleUpdate = this.handleUpdate
        this.setState({loading: false,
            ListBuildingInfo: ListBuildingInfo.data,
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
                title: '所属楼宇',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '房间编号',
                width: 250,
                dataIndex: 'roomNum',
                key: 'roomNum'
            }, {
                title: '客户名称',
                width: 320,
                dataIndex: 'rentClientName',
                key: 'rentClientName'
            }, {
                title: '交费周期',
                width: 150,
                dataIndex: 'periodStatus',
                key: 'periodStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.periodStatus === 3) {
                        whType = '季付'
                    }
                    if (record.periodStatus === 6) {
                        whType = '半年付'
                    }
                    if (record.periodStatus === 12) {
                        whType = '年付'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '本期租金周期',
                width: 280,
                dataIndex: 'periodRent',
                key: 'periodRent'
            }, {
                title: '本期租金',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                width: 150,
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收租金日期',
                width: 150,
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '逾期天数',
                width: 150,
                dataIndex: 'overdueDay',
                key: 'overdueDay'
            }, {
                title: '租金开票状态',
                width: 150,
                dataIndex: 'invoiceRentStatus',
                key: 'invoiceRentStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.invoiceRentStatus === 0) {
                        whType = '未开票'
                    }
                    if (record.invoiceRentStatus === 1) {
                        whType = '已开票'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '打印状态',
                width: 150,
                dataIndex: 'whetherPrinted',
                key: 'whetherPrinted',
                render: function (text, record, index) {
                    let whetherPrinted = ''
                    if (record.whetherPrinted === 0) {
                        whetherPrinted = '未打印'
                    }
                    if (record.whetherPrinted === 1) {
                        whetherPrinted = '已打印'
                    }
                    return (
                        <span>{whetherPrinted}</span>
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
                            <Button type="primary" onClick={() => handleUpdate(record.id)} >明细</Button>
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
    refresh = async (pagination, filters, sorter) => {
        filters['auditStatus'] = 2
        // 刷新表格
        let result = await apiPost(
            '/collectRent/collectRentList',
            filters
        )
        this.setState({
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    rentClientName = ''
    entryNameOnChange = (e) => {
        this.rentClientName = e.target.value
    }
    roomNum = ''
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    periodStatus = ''
    selectOnChange = (e) => {
        this.periodStatus = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <CollectRentHeadComponent
                    refresh={this.refresh}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2000 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CollectRentConduct


