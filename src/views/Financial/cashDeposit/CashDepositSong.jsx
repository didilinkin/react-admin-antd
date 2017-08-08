// 租赁保证金
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select } from 'antd'
import { apiPost } from '../../../api'
import CashDepositChargeComponent from './detail/CashdepsitCharge'
import CashDepositRefundComponent from './detail/CashdepsitRefund'
import CashDepositReceiptComponent from './detail/CashdepsitReceipt'
// 引入组件
const Option = Select.Option
// React component
class CashDepositSong extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
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
            {chargeItem: 3}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleUpdate2 = this.handleUpdate2
        const handleUpdate3 = this.handleUpdate3
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
                    }
                    if (record.revenueType === 1) {
                        whType = '扣款'
                    }
                    if (record.revenueType === 2) {
                        whType = '退款'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '扣/退款金额',
                width: 100,
                dataIndex: 'operateMoney',
                key: 'operateMoney'
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
            }, {
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
                                    <a href="javascript:" onClick={() => handleUpdate(record.id)} > 审核 </a>
                                </div>
                            )
                        } else if (record.revenueType === 2) {
                            return (
                                <div>
                                    <a href="javascript:" onClick={() => handleUpdate2(record.id)} > 审核 </a>
                                </div>
                            )
                        } else if (record.revenueType === 0) {
                            return (
                                <div>
                                    <a href="javascript:" onClick={() => handleUpdate3(record.id)} > 审核 </a>
                                </div>
                            )
                        }
                    } else {
                        return ('')
                    }
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
            '/cashDeposit/cashDepositDetailList',
            {'sublietName': this.sublietName,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'revenueType': this.revenueType,
                'chargeItem': 3
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
    sublietName = null
    entryNameOnChange = (e) => {
        this.sublietName = e.target.value
    }
    roomNum = null
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    buildId = null
    selectBuild = (e) => {
        this.buildId = e
    }
    revenueType = null
    selectRevenueType = (e) => {
        this.revenueType = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <div>
                <CashDepositChargeComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="扣款审核"
                    visible={this.state.openUpdate}
                />
                <CashDepositRefundComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="退款审核"
                    visible={this.state.openAdd}
                />
                <CashDepositReceiptComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="收款审核"
                    visible={this.state.openTableAddUp}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>所属楼宇:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 120,
                            marginRight: '5px'}}
                        placeholder="请选择所属楼宇"
                        optionFilterProp="children"
                        onChange={this.selectBuild}
                    >
                        {ListBuildingInfo.map(BuildingInfo => {
                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                        })}
                    </Select>
                    <span>房间编号:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span>收支类型:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 120,
                            marginRight: '5px'}}
                        placeholder="请选择收支类型"
                        optionFilterProp="children"
                        onChange={this.selectRevenueType}
                    >
                        <Option key={0}>收款</Option>
                        <Option key={1}>扣款</Option>
                        <Option key={2}>退款</Option>
                    </Select>
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1900 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CashDepositSong


