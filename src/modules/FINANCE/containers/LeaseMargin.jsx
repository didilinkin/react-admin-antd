// 租赁保证金
import React, {Component} from 'react'
import {Table, Spin} from 'antd'
import { apiPost } from '../../../api'
import CashDepositChargeComponent from '../components/CashDeposit/CashdepsitCharge'
import CashDepositRefundComponent from '../components/CashDeposit/CashdepsitRefund'
import CashDepositReceiptComponent from '../components/CashDeposit/CashdepsitReceipt'
import CashDepositHeadComponent from '../components/CashDeposit/CashDepositHead'
// 引入组件
// React component
class LeaseMargin extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 30,
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    handleUpdate2 = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            id: id
        })
    }
    handleUpdate3 = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: true,
            openUpdate: false,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/cashDeposit/cashDepositDetailList',
            {chargeItem: 0,
                page: this.state.page}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleUpdate2 = this.handleUpdate2
        const handleUpdate3 = this.handleUpdate3
        this.setState({loading: false,
            ListBuildingInfo: ListBuildingInfo.data,
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
                width: 300,
                dataIndex: 'sublietName',
                key: 'sublietName'
            }, {
                title: '当前结余',
                width: 100,
                dataIndex: 'currentBalance',
                key: 'currentBalance'
            }, {
                title: '收支类型',
                width: 100,
                dataIndex: 'revenueType',
                key: 'revenueType',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.revenueType === 0) {
                        whType = '收款'
                        return (
                            <span>{whType}</span>
                        )
                    }
                    if (record.revenueType === 1) {
                        whType = '扣款'
                        return (
                            <span>{whType}</span>
                        )
                    }
                    if (record.revenueType === 2) {
                        whType = '退款'
                        return (
                            <span><p style={{color: 'red'}}>{whType}</p></span>
                        )
                    }
                }
            }, {
                title: '金额',
                width: 100,
                dataIndex: 'operateMoney',
                key: 'operateMoney',
                render: function (text, record, index) {
                    if (record.revenueType === 0) {
                        return (
                            <span><p style={{color: 'green'}}>+{record.operateMoney}</p></span>
                        )
                    }
                    if (record.revenueType === 1) {
                        return (
                            <span><p style={{color: 'green'}}>+{record.operateMoney}</p></span>
                        )
                    }
                    if (record.revenueType === 2) {
                        return (
                            <span><p style={{color: 'red'}}>-{record.operateMoney}</p></span>
                        )
                    }
                }
            }, {
                title: '事由',
                width: 100,
                dataIndex: 'reason',
                key: 'reason'
            }, {
                title: '收据号',
                width: 150,
                dataIndex: 'voucherNo',
                key: 'voucherNo'
            }, /* {
                title: '收款方式',
                width: 100,
                dataIndex: 'receiptType',
                key: 'receiptType',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.revenueType === 0) {
                        whType = '现金'
                    }
                    if (record.revenueType === 1) {
                        whType = '支票'
                    }
                    if (record.revenueType === 2) {
                        whType = '银行代收'
                    }
                    if (record.revenueType === 3) {
                        whType = 'POST机刷卡'
                    }
                    if (record.revenueType === 4) {
                        whType = '转账'
                    }
                    if (record.revenueType === 5) {
                        whType = '支付宝'
                    }
                    if (record.revenueType === 5) {
                        whType = '其他'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            },*/ {
                title: '审核状态',
                width: 90,
                dataIndex: 'auditStatus',
                key: 'auditStatus',
                render: function (text, record, index) {
                    let auditStatus = ''
                    if (record.auditStatus === 0) {
                        auditStatus = '待审核'
                    }
                    if (record.auditStatus === 1) {
                        auditStatus = '审核通过'
                    }
                    if (record.auditStatus === 2) {
                        auditStatus = '审核不通过'
                    }
                    return (
                        <span>{auditStatus}</span>
                    )
                }
            }, {
                title: '审核说明',
                width: 90,
                dataIndex: 'remark',
                key: 'remark'
            }, {
                title: '审核人',
                width: 90,
                dataIndex: 'auditName',
                key: 'auditName'
            }, {
                title: '审核日期',
                width: 100,
                dataIndex: 'auditDate',
                key: 'auditDate'
            }, {
                title: '申请人',
                width: 90,
                dataIndex: 'createName',
                key: 'createName'
            }, {
                title: '申请时间',
                width: 100,
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.auditStatus === 0) {
                        if (record.revenueType === 1) {
                            return (
                                <div>
                                    <a onClick={() => handleUpdate(record.id)} > 审核 </a>
                                </div>
                            )
                        } else if (record.revenueType === 2) {
                            return (
                                <div>
                                    <a onClick={() => handleUpdate2(record.id)} > 审核 </a>
                                </div>
                            )
                        } else if (record.revenueType === 0) {
                            return (
                                <div>
                                    <a onClick={() => handleUpdate3(record.id)} > 审核 </a>
                                </div>
                            )
                        }
                    } else {
                        return ('')
                    }
                }
            }],
            dataSource: result.data.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        filters['chargeItem'] = 0
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
            '/cashDeposit/cashDepositDetailList',
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
    query = () => {
        this.refresh()
    }
    close = () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false
        })
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    render () {
        return (
            <div>
                <CashDepositChargeComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    close={this.close}
                    title="扣款审核"
                    visible={this.state.openUpdate}
                />
                <CashDepositRefundComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    close={this.close}
                    title="退款审核"
                    visible={this.state.openAdd}
                />
                <CashDepositReceiptComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    close={this.close}
                    title="收款审核"
                    visible={this.state.openTableAddUp}
                />
                <CashDepositHeadComponent
                    RowKeys={this.state.RowKeys}
                    refresh={this.refresh}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
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
                        scroll={{ x: 2300 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default LeaseMargin


