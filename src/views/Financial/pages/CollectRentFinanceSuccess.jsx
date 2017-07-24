// 收费管理 - 应收租金
import React, {Component} from 'react'
import {Table, Spin, Popconfirm, notification, Icon} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
import CollectRentHeadComponent from './components/CollectRentHead'
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
    handleUpdate = async (id) => {
        await apiPost(
            '/collectRent/updateCollectRentVoByRecall',
            {id: id}
        )
        notification.open({
            message: '撤回成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh1()
    }
    async initialRemarks () {
        this.setState({loading: true})
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
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
                title: '未收金额',
                width: 150,
                dataIndex: 'unpaidMoney',
                key: 'unpaidMoney'
            }, {
                title: '违约金',
                width: 150,
                dataIndex: 'actualLateMoney',
                key: 'actualLateMoney'
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
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.lateMoney === 0 && record.paidMoney === 0) {
                        let url = '/financial/RentReviewDetailNoPaid/' + record.id
                        return (
                            <div>
                                <a href={url}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a href="javascript:" > 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney === 0 && record.whetherRentPaid !== 1) {
                        let url = '/financial/RentReviewDetailNoLate/' + record.id
                        return (
                            <div>
                                <a href={url}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a href="javascript:" > 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney === 0 && record.whetherRentPaid === 1) {
                        let url = '/financial/NoLateAndRentFinish/' + record.id
                        return (
                            <div>
                                <a href={url}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a href="javascript:" >&nbsp; 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney !== 0 && record.whetherRentPaid === 1 && record.whetherLatePaid !== 1) {
                        let url = '/financial/RentFinishAndLate/' + record.id
                        return (
                            <div>
                                <a href={url}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a href="javascript:" >&nbsp; 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney !== 0 && record.whetherRentPaid === 1 && record.whetherLatePaid === 1) {
                        let url = '/financial/RentReviewDetail/' + record.id
                        return (
                            <div>
                                <a href={url}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a href="javascript:" >&nbsp; 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    }
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh1 = async () => {
        // 刷新表格
        let result = await apiPost(
            '/collectRent/collectRentList',
            {'auditStatus': 2
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
    refresh = async (pagination, filters, sorter) => {
        filters['auditStatus'] = 2
        // 刷新表格
        let result = await apiPost(
            '/collectRent/collectRentList',
            filters
        )
        this.setState({
            openAdd: false,
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


