// 财务管理 - 电费审核
import React from 'react'
import {Table, Spin, Popconfirm, Tabs, notification, Icon} from 'antd'
import PowerBillHead from '../components/ElectricInfo/PowerBillHead'
import { apiPost, baseURL, verification } from '../../../api'
import PowerInfomation from '../../PROPERTY/components/ElectricCharge/PowerInfomation'

const TabPane = Tabs.TabPane
class Electricity extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            total: 0,
            current: 1,
            columns1: [],
            columns2: [],
            columns3: [],
            dataSource1: [],
            dataSource2: [],
            dataSource3: [],
            ListBuildingInfo: [],
            order: 1,
            RowKeys: [],
            openInfo: false,
            id: 0
        }
    }
    activeKey = 1
    refreshTwo = async (activeKey) => {
        this.activeKey = activeKey ? activeKey : this.activeKey
        this.refresh({}, {}, {})
    }
    refresh = async (pagination, filters, sorter) => {
        this.setState({loading: true,
            openInfo: false})
        if (filters === null || typeof (filters) === 'undefined') {
            filters = []
        }
        console.log(this.activeKey)
        filters['examineState'] = this.activeKey.toString() === '1' ? 1 :
            this.activeKey.toString() === '3' ? 2 : 3
        if (pagination === null) {
            filters['page'] = 1
            filters['rows'] = 30
        } else {
            filters['page'] = pagination.current
            filters['rows'] = pagination.pageSize
        }
        filters['sort'] = 'a.id'
        filters['order'] = 'desc'
        let result = await apiPost(
            '/ElectricityFees/list',
            filters
        )
        let PowerBillList = result.data.rows
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '1') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource3.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource2.push(PowerBill)
            }
            return ''
        })
        this.setState({
            loading: false,
            current: pagination ? pagination.current : 1,
            total: result.data.total,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            order: this.activeKey
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/ElectricityFees/list',
            {examineState: 1,
                sort: 'a.id',
                order: 'desc'
            }
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo',
        )
        let PowerBillList = result.data.rows
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '1') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource3.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource2.push(PowerBill)
            }
            return ''
        })

        const arr = [
            {
                title: '序号',
                width: 100,
                dataIndex: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '所属楼宇',
                dataIndex: 'buildName'
            }, {
                title: '房间编号',
                width: 200,
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                dataIndex: 'clientName'
            }, {
                title: '收费类型',
                dataIndex: 'wattHourType',
                render: function (text, record, index) {
                    let dataIndex = '固定单价'
                    if (record.wattHourType === 1) {
                        dataIndex = '差额单价'
                    } else if (record.wattHourType === 2) {
                        dataIndex = '功峰平谷'
                    }
                    return (
                        <p>{dataIndex}</p>
                    )
                }
            }, {
                title: '本期电费周期',
                dataIndex: 'cycle'
            }, {
                title: '本次用电量',
                dataIndex: 'sumElectricity'
            }, {
                title: '本次应收',
                dataIndex: 'thisReceivable'
            }, {
                title: ' 交费期限',
                dataIndex: 'overdueDate'

            }]
        let info = this.info
        let infoTwo = this.infoTwo
        let withdraw = this.withdraw
        this.setState({
            ListBuildingInfo: ListBuildingInfo.data,
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            columns1: arr.slice().concat([{
                title: ' 操作',
                fixed: 'right',
                width: 100,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            {verification('censorElectric') &&
                            <a onClick={() => info(record.id)}>审核</a>
                            }
                        </span>
                    )
                }
            }]),
            columns2: arr.slice().concat([{
                title: '审核说明',
                dataIndex: 'auditExplain'
            }, {
                title: '审核时间',
                dataIndex: 'auditDate'
            }, {
                title: '审核人',
                dataIndex: 'auditName'
            }, {
                title: ' 操作',
                width: 100,
                fixed: 'right',
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }]),
            columns3: arr.slice().concat([{
                title: '实交日期',
                dataIndex: 'principalCollectionDate'
            }, {
                title: '逾期天数',
                dataIndex: 'overdueDays'
            }, {
                title: '延期下月电费',
                dataIndex: 'penaltyType',
                render: function (text, record, index) {
                    let penaltyType = '否'
                    if (record.penaltyType === 1) {
                        penaltyType = '是'
                    }
                    return (
                        <p>{penaltyType}</p>
                    )
                }
            }, {
                title: '打印状态',
                width: 100,
                dataIndex: 'printStatus',
                render: function (text, record, index) {
                    let printStatus = '否'
                    if (text === 1) {
                        printStatus = '是'
                    }
                    return (
                        <p>{printStatus}</p>
                    )
                }
            }, {
                title: '开票状态',
                width: 100,
                dataIndex: 'principalPrincipalBilling',
                render: function (text, record, index) {
                    text = text ? text : ''
                    let billingState = '未开票'
                    if (text === 1) {
                        billingState = '已开票'
                    }
                    return (
                        <p>{billingState}</p>
                    )
                }
            }, {
                title: '操作',
                width: 200,
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/finance/electricChargeDetails/' + record.id
                    return (
                        <span>
                            <a onClick={() => infoTwo(url)}>明细</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {verification('revokeElectric') &&
                            <Popconfirm title="确定撤回吗?" onConfirm={() => withdraw(record.id)}>
                                <a>撤回</a>
                            </Popconfirm>
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Popconfirm title="确定打印吗?" onConfirm={() => {
                                window.open(baseURL + '/ElectricityFees/print?ids=' + record.id)
                            }}
                            >
                                <a>打印单据</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }])
        })
    }
    withdraw = async (id) => {
        let result = await apiPost(
            '/ElectricityFees/withdraw',
            {id: id}
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refreshTwo()
    }
    info = (id) => {
        this.setState({
            openInfo: true,
            id: id
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    infoTwo = (url) => {
        this.props.history.push(url)
    }
    render () {
        return (
            <Spin spinning={this.state.loading}>
                <Tabs defaultActiveKey="1" onChange={this.refreshTwo}>

                    <TabPane tab="审核中" key="1">
                        <PowerBillHead
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={1}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            onChange={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 15}}
                            scroll={{ x: 1800 }}
                            bordered
                            dataSource={this.state.dataSource1}
                            columns={this.state.columns1}
                        />
                    </TabPane>
                    <TabPane tab="审核失败" key="2">
                        <PowerBillHead
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={2}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            onChange={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 15}}
                            scroll={{ x: 1800 }}
                            bordered
                            dataSource={this.state.dataSource2}
                            columns={this.state.columns2}
                        />
                    </TabPane>
                    <TabPane tab="审核成功" key="3">
                        <PowerBillHead
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={3}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            onChange={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 15}}
                            scroll={{ x: 2000 }}
                            bordered
                            dataSource={this.state.dataSource3}
                            columns={this.state.columns3}
                        />
                    </TabPane>
                </Tabs>
                <PowerInfomation
                    id={this.state.id}
                    Finance={1}
                    visible={this.state.openInfo}
                    refresh={this.refreshTwo}
                />
            </Spin>

        )
    }
}

export default Electricity
