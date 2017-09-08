// 物业管理- 水费管理
import React from 'react'
import {Table, Spin, Popconfirm, Tabs, notification, Icon } from 'antd'
import WaterBillHeadComponent from '../components/WaterCharge/WaterBillHead'
import WaterAddUpComponent from '../components/WaterCharge/WaterAddUp'
import { apiPost } from '../../../api'
import WaterInfomation from '../components/WaterCharge/WaterInfomation'
const TabPane = Tabs.TabPane
class ChargeWaterBill extends React.Component {
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
    activeKey = 1
    refreshTwo = async (activeKey) => {
        this.activeKey = activeKey ? activeKey : this.activeKey
        this.refresh({}, {}, {})
    }
    refresh = async (pagination, filters, sorter) => {
        this.setState({loading: true,
            openInfo: false,
            openWaterAddUpComponent: false})
        console.log(this.activeKey)
        if (filters === null || typeof (filters) === 'undefined') {
            filters = []
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
            '/WaterBill/WaterBillList',
            filters
        )
        let WaterBillList = result.data.rows
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
        this.setState({
            openWaterAddUpComponent: true,
            openInfo: false,
            id: id
        })
    }
    examine = async (id) => {
        let data = await apiPost(
            '/water/examineWaterBill',
            {id: id,
                examineState: 1}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refreshTwo(1)
    }
    info = (id) => {
        this.setState({
            openInfo: true,
            openWaterAddUpComponent: false,
            id: id
        })
    }
    deleteWater = async (id) => {
        let data = await apiPost(
            '/WaterBill/deleteWaterBill',
            {id: id}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refreshTwo(1)
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/WaterBill/WaterBillList',
            {examineState: 0,
                sort: 'a.id',
                order: 'desc'
            }
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo',
        )
        let WaterBillList = result.data.rows
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
        let examine = this.examine
        let info = this.info
        let deleteWater = this.deleteWater
        this.setState({
            ListBuildingInfo: ListBuildingInfo.data,
            total: result.data.total,
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            dataSource4: dataSource4,
            columns1: [{
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
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                dataIndex: 'clientSubletName'
            }, {
                title: '本期水费周期',
                dataIndex: 'cycle'
            }, {
                title: '本次总水量',
                dataIndex: 'totalWater'
            }, {
                title: ' 本次应收',
                dataIndex: 'receivableMoney'
            }, {
                title: ' 交费期限',
                dataIndex: 'overdueDate'
            }, {
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
                            <Popconfirm title="确定提交吗?" onConfirm={() => examine(record.id)}>
                                <a>提交</a>
                            </Popconfirm>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Popconfirm title="确定删除吗?" onConfirm={() => deleteWater(record.id)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
            ],
            columns2: [{
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
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                dataIndex: 'clientSubletName'
            }, {
                title: '本期水费周期',
                dataIndex: 'cycle'
            }, {
                title: '本次总水量',
                dataIndex: 'totalWater'
            }, {
                title: ' 本次应收',
                dataIndex: 'receivableMoney'
            }, {
                title: ' 交费期限',
                dataIndex: 'overdueDate'
            }, {
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
            }
            ],
            columns3: [{
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
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                dataIndex: 'clientSubletName'
            }, {
                title: '本期水费周期',
                dataIndex: 'cycle'
            }, {
                title: '本次总水量',
                dataIndex: 'totalWater'
            }, {
                title: '本次应收',
                dataIndex: 'receivableMoney'
            }, {
                title: '交费期限',
                dataIndex: 'overdueDate'
            }, {
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
                width: 200,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => openWaterAddUpComponent(record.id)}>重新收费</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }
            ],
            columns4: [{
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
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                dataIndex: 'clientSubletName'
            }, {
                title: '本期水费周期',
                dataIndex: 'cycle'
            }, {
                title: '本次总水量',
                dataIndex: 'totalWater'
            }, {
                title: '本次应收',
                dataIndex: 'receivableMoney'
            }, {
                title: '交费期限',
                dataIndex: 'overdueDate'
            }, {
                title: '实交日期',
                dataIndex: 'collectionDate'
            }, {
                title: '逾期天数',
                dataIndex: 'days'
            }, {
                title: '延期下月水费',
                width: 100,
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
                title: '开票状态',
                width: 100,
                dataIndex: 'billingState',
                render: function (text, record, index) {
                    let billingState = '未开票'
                    if (record.billingState === 1) {
                        billingState = '已开票'
                    }
                    return (
                        <p>{billingState}</p>
                    )
                }
            }, {
                title: ' 操作',
                width: 100,
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }]
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
                        <WaterBillHeadComponent
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
                            refresh={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 30}}
                            // onChange={this.refresh}
                            bordered
                            dataSource={this.state.dataSource1}
                            columns={this.state.columns1}
                        />
                        <WaterAddUpComponent
                            title="修改水费"
                            id={this.state.id}
                            refreshTable={this.refreshTwo}
                            visible={this.state.openWaterAddUpComponent}
                        />
                    </TabPane>
                    <TabPane tab="审核中" key="2">
                        <WaterBillHeadComponent
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
                                defaultPageSize: 30}}
                            bordered
                            // onChange={this.refresh}
                            dataSource={this.state.dataSource2}
                            columns={this.state.columns2}
                        />
                    </TabPane>
                    <TabPane tab="审核失败" key="3">
                        <WaterBillHeadComponent
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
                            onChange={this.refresh}
                            pagination={{total: this.state.total,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                current: this.state.current,
                                pageSizeOptions: ['15', '30', '45'],
                                defaultPageSize: 30}}
                            // onChange={this.refresh}
                            bordered
                            dataSource={this.state.dataSource3}
                            columns={this.state.columns3}
                        />
                    </TabPane>
                    <TabPane tab="审核成功" key="4">
                        <WaterBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={4}
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
                                defaultPageSize: 30}}
                            // onChange={this.refresh}
                            scroll={{ x: 1450 }}
                            bordered
                            dataSource={this.state.dataSource4}
                            columns={this.state.columns4}
                        />
                    </TabPane>
                </Tabs>
                <WaterInfomation
                    id={this.state.id}
                    visible={this.state.openInfo}
                />
            </Spin>
        )
    }
}

export default ChargeWaterBill

