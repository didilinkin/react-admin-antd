// 财务管理 - 水费审核
import React from 'react'
import {Table, Spin, Popconfirm, Tabs, notification, Icon } from 'antd'
import WaterBillHeadComponent from '../components/WaterFee/WaterBillHead'
import WaterInfomation from '../components/WaterFee/WaterInfomation'
import { apiPost } from '../../../api'


const TabPane = Tabs.TabPane
class WaterFee extends React.Component {
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
            order: 1,
            RowKeys: [],
            openInfo: false,
            id: 0
        }
    }
    info = (id) => {
        this.setState({
            openInfo: true,
            id: id
        })
    }
    activeKey = 2
    refreshTwo = async (activeKey) => {
        this.activeKey = activeKey ? activeKey : 2
        this.refresh({}, {}, {})
    }
    refresh = async (pagination, filters, sorter) => {
        this.setState({loading: true,
            openInfo: false})
        if (filters === null || typeof (filters) === 'undefined') {
            filters = []
        }
        filters['examineState'] = this.activeKey.toString() === '1' ? 0 :
            this.activeKey.toString() === '2' ? 1 :
                this.activeKey.toString() === '4' ? 2 : 3
        if (pagination === null || typeof (pagination) === 'undefined') {
            filters['page'] = 1
            filters['rows'] = 30
        } else {
            filters['page'] = pagination.current
            filters['rows'] = pagination.pageSize
        }
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
    withdraw = async (id) => {
        let result = await apiPost(
            '/WaterBill/withdraw',
            {id: id}
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    infoTwo = (url) => {
        this.props.history.push(url)
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/WaterBill/WaterBillList',
            {examineState: 1}
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
        let withdraw = this.withdraw
        let info = this.info
        let infoTwo = this.infoTwo
        this.setState({
            ListBuildingInfo: ListBuildingInfo.data,
            loading: false,
            total: result.data.total,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            dataSource4: dataSource4,
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
                width: 100,
                fixed: 'right',
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>审核</a>
                        </span>
                    )
                }
            }],
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
                fixed: 'right',
                width: 100,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }],
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
                width: 200,
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/finance/waterFeeDetails/waterFeeDetails/' + record.id
                    return (
                        <span>
                            <a onClick={() => infoTwo(url)}>明细</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Popconfirm title="确定撤回吗?" onConfirm={() => withdraw(record.id)}>
                                <a>撤回</a>
                            </Popconfirm>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a>打印单据</a>
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
                <Tabs defaultActiveKey="2" onChange={this.refreshTwo}>
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
                            // onChange={this.refresh}
                            bordered
                            scroll={{ x: 1450 }}
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
                            scroll={{ x: 1600 }}
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
                            scroll={{ x: 1800 }}
                            bordered
                            dataSource={this.state.dataSource4}
                            columns={this.state.columns4}
                        />
                    </TabPane>
                </Tabs>
                <WaterInfomation
                    id={this.state.id}
                    visible={this.state.openInfo}
                    Finance={1}
                    refresh={this.refreshTwo}
                />
            </Spin>
        )
    }
}

export default WaterFee


