// 物业管理 - 电费管理
import React from 'react'
import {Table, Spin, Popconfirm, Tabs, notification, Icon} from 'antd'
import PowerBillHeadComponent from '../components/ElectricCharge/PowerBillHead'
import PowerAddUpComponent from '../components/ElectricCharge/PowerAddUp'
import { apiPost, baseURL } from '../../../api'
import PowerInfomation from '../components/ElectricCharge/PowerInfomation'
const TabPane = Tabs.TabPane
class ElectricCharge extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            total: 0,
            current: 1,
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
    startLoading = () => {
        this.setState({loading: true})
    }
    activeKey = 1
    refreshTwo = async (activeKey) => {
        this.json = {}
        this.activeKey = activeKey ? activeKey : this.activeKey
        this.refresh({}, {}, {})
    }
    json = {}
    refresh = async (pagination, filters, sorter) => {
        this.setState({loading: true,
            openWaterAddUpComponent: false,
            openInfo: false})
        if (filters === null || typeof (filters) === 'undefined') {
            filters = []
        }
        if (pagination === null && sorter === null) {
            this.json = filters
        }
        for (let p in this.json) {
            filters[p] = this.json[p]
        }
        filters['examineState'] = this.activeKey.toString() === '1' ? 0 :
            this.activeKey.toString() === '2' ? 1 :
                this.activeKey.toString() === '4' ? 2 : 3
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
        let dataSource4 = []

        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '0') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '1') {
                dataSource2.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource4.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource3.push(PowerBill)
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
            dataSource4: dataSource4,
            order: this.activeKey
        })
    }
    openWaterAddUpComponent = (id) => {
        this.startLoading()
        this.setState({
            openWaterAddUpComponent: true,
            openInfo: false,
            id: id
        })
    }
    // 发起审核
    examine = async (id) => {
        this.startLoading()
        let data = await apiPost(
            '/ElectricityFees/updateAudit',
            {id: id,
                examineState: 1}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh({}, {}, {})
    }
    info = (id) => {
        this.startLoading()
        this.setState({
            openInfo: true,
            openWaterAddUpComponent: false,
            id: id
        })
    }
    // 删除记录
    deleteRecord = async (id) => {
        this.startLoading()
        let data = await apiPost(
            '/ElectricityFees/deleteElectricityFees',
            {id: id}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh({}, {}, {})
    }
    // 初始化
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/ElectricityFees/list',
            {examineState: 0,
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
        let dataSource4 = []
        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '0') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '1') {
                dataSource2.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource4.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource3.push(PowerBill)
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
                    if (text) {
                        return (index + 1)
                    }
                }
            }, {
                title: '所属楼宇',
                dataIndex: 'buildName'
            }, {
                title: '房间编号',
                dataIndex: 'roomNumber',
                width: 200
            }, {
                title: '客户名称',
                dataIndex: 'clientName'
            }, {
                title: '收费类型',
                dataIndex: 'wattHourType',
                render: function (text) {
                    if (text) {
                        let dataIndex = '固定单价'
                        if (text === 1) {
                            dataIndex = '差额单价'
                        } else if (text === 2) {
                            dataIndex = '功峰平谷'
                        }
                        return (
                            <p>{dataIndex}</p>
                        )
                    }
                }
            }, {
                title: '本期电费周期',
                dataIndex: 'cycle'
            }, {
                title: '本次用电量',
                dataIndex: 'sumElectricity'
            }, {
                title: '本期应收',
                dataIndex: 'actualReceivable'
            }, {
                title: ' 交费期限',
                dataIndex: 'overdueDate'

            }]
        let info = this.info
        let examine = this.examine
        let deleteRecord = this.deleteRecord
        this.setState({
            ListBuildingInfo: ListBuildingInfo.data,
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            dataSource4: dataSource4,
            columns1: arr.slice().concat([{
                title: ' 操作',
                fixed: 'right',
                dataIndex: 'opt',
                render: function (text, record) {
                    if (record) {
                        return (
                            <span>
                                <a style={{margin: '0 10px'}} onClick={() => info(record.id)}>明细</a>
                                <a onClick={() => openWaterAddUpComponent(record.id)}>修改</a>
                                <Popconfirm title="确定提交吗?" onConfirm={() => examine(record.id)}>
                                    <a style={{marginLeft: '10px'}}>提交</a>
                                </Popconfirm>
                                <Popconfirm title="确定删除吗?" onConfirm={() => deleteRecord(record.id)}>
                                    <a style={{margin: '0 10px'}}>删除</a>
                                </Popconfirm>
                            </span>
                        )
                    }
                }
            }]),
            columns2: arr.slice().concat([{
                title: ' 操作',
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a style={{margin: '0 10px'}} onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }]),
            columns3: arr.slice().concat([{
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
                fixed: 'right',
                dataIndex: 'opt',
                render: function (text, record) {
                    console.log(record)
                    return (
                        <span>
                            <Popconfirm key="1" title="确定重新收费吗?" onConfirm={() => openWaterAddUpComponent(record.id)}>
                                <a style={{margin: '0 10px'}}>重新收费</a>
                            </Popconfirm>
                            <a style={{marginRight: '10px'}} onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }]),
            columns4: arr.slice().concat([{
                title: '实交日期',
                dataIndex: 'principalCollectionDate'
            }, {
                title: '逾期天数',
                dataIndex: 'overdueDays'
            }, {
                title: '延期下月电费',
                dataIndex: 'penaltyType',
                render: function (text) {
                    let penaltyType = '否'
                    if (text === 1) {
                        penaltyType = '是'
                    }
                    return (
                        <p>{penaltyType}</p>
                    )
                }
            }, {
                title: '打印状态',
                dataIndex: 'printStatus',
                render: function (text) {
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
                dataIndex: 'principalPrincipalBilling',
                render: function (text) {
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
                fixed: 'right',
                render: function (text, record) {
                    return (
                        <span>
                            <a style={{margin: '0 10px'}} onClick={() => info(record.id)}>明细</a>
                            <Popconfirm title="确定打印吗?" onConfirm={() => {
                                window.open(baseURL + '/ElectricityFees/print?ids=' + record.id)
                            }}
                            >
                                <a style={{marginRight: '10px'}}>打印单据</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }])
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
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            onChange={this.refresh}
                            bordered
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 15}}
                            scroll={{ x: 1800 }}
                            dataSource={this.state.dataSource1}
                            columns={this.state.columns1}
                        />
                        <PowerAddUpComponent
                            title="修改电费"
                            id={this.state.id}
                            refreshTable={this.refresh}
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
                            onChange={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 15}}
                            // onChange={this.refresh}
                            scroll={{ x: 1800 }}
                            bordered
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
                            onChange={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 15}}
                            scroll={{ x: 1800 }}
                            RowKeys={this.state.RowKeys}
                            bordered
                            dataSource={this.state.dataSource4}
                            columns={this.state.columns4}
                        />
                    </TabPane>
                </Tabs>
                <PowerInfomation
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openInfo}
                />
            </Spin>

        )
    }
}

export default ElectricCharge
