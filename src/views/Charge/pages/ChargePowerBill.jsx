// 物业管理 - 电费审核
import React from 'react'
import {Table, Spin, Popconfirm, Tabs } from 'antd'
import PowerBillHeadComponent from './components/PowerBillHead'
import PowerAddUpComponent from './components/PowerAddUp'
import { apiPost } from '../../../api'
import PowerInfomation from './components/PowerInfomation'


const TabPane = Tabs.TabPane
class ChargeWaterBill extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            columns1: [],
            columns2: [],
            columns3: [],
            columns4: [],
            dataSource1: [],
            dataSource2: [],
            dataSource3: [],
            dataSource4: [],
            ListBuildingInfo: [],
            openWaterAddUpComponent: false,
            order: 1,
            RowKeys: [],
            openInfo: false,
            id: 0
        }
    }
    refreshTwo = async (activeKey) => {
        this.setState({loading: true,
            openWaterAddUpComponent: false,
            openInfo: false})
        let result = await apiPost(
            '/ElectricityFees/list'
        )
        console.log(result)
        console.log(result.data)
        let WaterBillList = result.data
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        let dataSource4 = []
        WaterBillList.map(WaterBill => {
            if (WaterBill.examineState.toString() === '0') {
                dataSource1.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '1') {
                dataSource2.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '2') {
                dataSource4.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '3') {
                dataSource3.push(WaterBill)
            }
            return ''
        })
        this.setState({
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            dataSource4: dataSource4,
            openWaterAddUpComponent: false,
            order: activeKey ? activeKey : 1
        })
    }
    refresh = async (pagination, filters, sorter) => {
        this.setState({loading: true,
            openWaterAddUpComponent: false,
            openInfo: false})
        let result = await apiPost(
            '/ElectricityFees/list',
            filters
        )
        let WaterBillList = result.data
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        let dataSource4 = []
        WaterBillList.map(WaterBill => {
            if (WaterBill.examineState.toString() === '0') {
                dataSource1.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '1') {
                dataSource2.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '2') {
                dataSource4.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '3') {
                dataSource3.push(WaterBill)
            }
            return ''
        })
        this.setState({
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            dataSource4: dataSource4
        })
    }
    openWaterAddUpComponent = (id) => {
        console.log(id)
        this.setState({
            openWaterAddUpComponent: true,
            openInfo: false,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/ElectricityFees/list',
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo',
        )
        let WaterBillList = result.data
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        let dataSource4 = []
        WaterBillList.map(WaterBill => {
            if (WaterBill.examineState.toString() === '0') {
                dataSource1.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '1') {
                dataSource2.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '2') {
                dataSource4.push(WaterBill)
            } else if (WaterBill.examineState.toString() === '3') {
                dataSource3.push(WaterBill)
            }
            return ''
        })

        let openWaterAddUpComponent = this.openWaterAddUpComponent

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
                width: 100,
                dataIndex: 'buildName'
            }, {
                title: '房间编号',
                width: 100,
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                width: 100,
                dataIndex: 'clientName'
            }, {
                title: '收费类型',
                width: 200,
                dataIndex: 'wattHourType',
                render: function (text, record, index) {
                    let dataIndex = '固定单价'
                    if (text.toString() === '1') {
                        dataIndex = '差额单价'
                    } else if (text.toString() === '2') {
                        dataIndex = '功峰平谷'
                    }
                    return (
                        <p>{dataIndex}</p>
                    )
                }
            }, {
                title: '本期电费周期',
                width: 200,
                dataIndex: 'cycle'
            }, {
                title: '本次用电量',
                width: 100,
                dataIndex: 'sumElectricity'
            }, {
                title: '本次应收',
                width: 100,
                dataIndex: 'thisReceivable'
            }, {
                title: ' 交费期限',
                width: 100,
                dataIndex: 'overdueDate'

            }]
        let info = this.info
        this.setState({
            ListBuildingInfo: ListBuildingInfo.data,
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            dataSource4: dataSource4,
            columns1: arr.slice().concat([{
                title: ' 操作',
                width: 200,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>明细</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a onClick={() => openWaterAddUpComponent(record.id)}>修改</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Popconfirm title="确定提交吗?">
                                <a>提交</a>
                            </Popconfirm>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Popconfirm title="确定删除吗?">
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }]),
            columns2: arr.slice().concat([{
                title: ' 操作',
                width: 200,
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
                title: '审核说明',
                width: 100,
                dataIndex: 'auditExplain'
            }, {
                title: '审核时间',
                width: 100,
                dataIndex: 'auditDate'
            }, {
                title: '审核人',
                width: 100,
                dataIndex: 'auditName'
            }, {
                title: ' 操作',
                width: 200,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <Popconfirm key="1" title="确定重新收费吗?">
                                <a>重新收费</a>
                            </Popconfirm>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    )
                }
            }]),
            columns4: arr.slice().concat([{
                title: '实交日期',
                width: 100,
                dataIndex: 'principalCollectionDate'
            }, {
                title: '逾期天数',
                width: 100,
                dataIndex: 'overdueDays'
            }, {
                title: '延期下月电费',
                width: 100,
                dataIndex: 'penaltyType',
                render: function (text, record, index) {
                    let penaltyType = '否'
                    if (text.toString() === '1') {
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
                    if (text.toString() === '1') {
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
                    if (text.toString() === '1') {
                        billingState = '已开票'
                    }
                    return (
                        <p>{billingState}</p>
                    )
                }
            }, {
                title: '操作',
                width: 200,
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }])
        })
    }
    info = (id) => {
        this.setState({
            openInfo: true,
            openWaterAddUpComponent: false,
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
    render () {
        return (
            <Spin spinning={this.state.loading}>
                <Tabs defaultActiveKey="1" onChange={this.refreshTwo}>
                    <TabPane tab="待发起" key="1">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={1}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            // pagination = <Pagination showSizeChanger total={500}/>
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            // onChange={this.refresh}
                            dataSource={this.state.dataSource1}
                            columns={this.state.columns1}
                        />
                        <PowerAddUpComponent
                            title="添加水费"
                            id={this.state.id}
                            refreshTable={this.refreshTwo}
                            visible={this.state.openWaterAddUpComponent}
                        />
                    </TabPane>
                    <TabPane tab="审核中" key="2">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={2}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            // pagination = <Pagination showSizeChanger total={500}/>
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            // onChange={this.refresh}
                            dataSource={this.state.dataSource2}
                            columns={this.state.columns2}
                        />
                    </TabPane>
                    <TabPane tab="审核失败" key="3">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={3}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            // pagination = <Pagination showSizeChanger total={500}/>
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            // onChange={this.refresh}
                            dataSource={this.state.dataSource3}
                            columns={this.state.columns3}
                        />
                    </TabPane>
                    <TabPane tab="审核成功" key="4">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={4}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            scroll={{ x: 1450 }}
                            dataSource={this.state.dataSource4}
                            columns={this.state.columns4}
                        />
                    </TabPane>
                </Tabs>
                <PowerInfomation
                    id={this.state.id}
                    visible={this.state.openInfo}
                />
            </Spin>

        )
    }
}

export default ChargeWaterBill
