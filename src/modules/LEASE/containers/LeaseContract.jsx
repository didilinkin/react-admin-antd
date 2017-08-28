// 客户管理 - 合同管理 - 租赁合同
import React from 'react'
import { apiPost } from '../../../api'
import {Table, Spin, Button } from 'antd'
import ContractHeadComponent from '../components/LeaseContract/ContractHead'
import LeaseCom from '../components/LeaseContract/LeaseCom'
import HappyCom from '../components/LeaseContract/HappyCom'
class LeaseContract extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            total: 0,
            current: 1,
            type: 2,
            id: 0,
            columns: [],
            dataSource: [],
            map: {
                ListBuildingInfo: [],
                MapDict: {},
                ListCustomerInfo: []
            },
            openLeaseCom: false,
            openHappyCom: false,
            openLeaseComUp: false,
            openHappyComUp: false
        }
    }
    updateRent = (contractSplit, id) => {
        if (contractSplit === 1) {
            this.setState({
                openLeaseCom: false,
                openHappyCom: false,
                openLeaseComUp: true,
                openHappyComUp: false,
                id: id
            })
        } else {
            this.setState({
                openLeaseCom: false,
                openHappyCom: false,
                openHappyComUp: true,
                openLeaseComUp: false,
                id: id
            })
        }
    }
    info = (url) => {
        this.props.history.push(url)
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/contract/contractlist',
            {type: this.state.type}
        )
        let ListBuildingInfo = await apiPost(
            '/contract/ListBuildingInfo'
        )
        let repairList = result.data.rows
        let updateRent = this.updateRent
        let info = this.info
        this.setState({loading: false,
            map: ListBuildingInfo.data,
            total: result.data.total,
            columns: [{
                title: '序号',
                width: 50,
                dataIndex: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '合同类型',
                width: 100,
                dataIndex: 'contractSplit',
                render: function (text, record, index) {
                    if (text === 1) {
                        text = '范本合同'
                    } else {
                        text = '欢乐颂合同'
                    }
                    return (
                        <span>{text}</span>
                    )
                }
            }, {
                title: '客户名称',
                dataIndex: 'clientName'
            }, {
                title: '合同编号',
                width: 150,
                dataIndex: 'contractCode'
            }, {
                title: '所属楼宇',
                width: 150,
                dataIndex: 'buildName'
            }, {
                title: '房间编号',
                width: 150,
                dataIndex: 'leaseRooms'
            }, {
                title: '合同面积',
                width: 100,
                dataIndex: 'leaseArea'
            }, {
                title: '合同开始日期',
                width: 150,
                dataIndex: 'startDate'
            }, {
                title: '合同结束日期',
                width: 150,
                dataIndex: 'endDate'
            }, {
                title: '合同状态',
                width: 100,
                dataIndex: 'contractStatus',
                render: function (text, record, index) {
                    if (text === 1) {
                        text = '已终止'
                    } else if (text === 0) {
                        text = '执行中'
                    } else {
                        text = '未开始'
                    }
                    return (
                        <span>{text}</span>
                    )
                }
            }, {
                title: '剩余天数',
                width: 100,
                dataIndex: 'daysRemaining'
            }, {
                title: '操作',
                width: 100,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let arr = []
                    let url = '/home/lease/LeaseContractDetails/contractTenancyDetail/' + record.id
                    if (record.contractSplit.toString() === '2') {
                        url = '/home/lease/LeaseContractDetails/happyDetail/' + record.id
                    }
                    arr.push(
                        <a onClick={() => info(url)} key="1"> 查看 &nbsp;</a>
                    )
                    arr.push(
                        <a key="2" onClick={() => updateRent(record.contractSplit, record.id)}>&nbsp; 编辑 </a>
                    )

                    return arr
                }
            }],
            dataSource: repairList
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (pagination, filters, sorter) => {
        // 刷新表格
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        filters['type'] = this.state.type
        if (pagination === null || typeof (pagination) === 'undefined') {
            filters['page'] = 1
            filters['rows'] = 30
        } else {
            filters['page'] = pagination.current
            filters['rows'] = pagination.pageSize
        }
        let result = await apiPost(
            '/contract/contractlist',
            filters
        )
        this.setState({
            dataSource: result.data.rows,
            total: result.data.total,
            current: pagination ? pagination.current : 1,
            type: filters['type'],
            id: 0,
            openLeaseCom: false,
            openHappyCom: false,
            openLeaseComUp: false,
            openHappyComUp: false
        })
    }
    openLeaseCom = () => {
        this.setState({
            id: 0,
            openLeaseCom: true,
            openHappyCom: false,
            openLeaseComUp: false,
            openHappyComUp: false
        })
    }
    openHappyCom = () => {
        this.setState({
            id: 0,
            openLeaseCom: false,
            openHappyCom: true,
            openLeaseComUp: false,
            openHappyComUp: false
        })
    }
    render () {
        return (
            <div>
                <ContractHeadComponent
                    refresh={this.refresh}
                    type={this.state.type}
                    ListBuildingInfo={this.state.map.ListBuildingInfo}
                />
                <Button style={{ marginBottom: 10}} type="primary" onClick={this.openLeaseCom}>添加范本合同</Button>&nbsp;&nbsp;
                <Button style={{ marginBottom: 10}} type="primary" onClick={this.openHappyCom}>添加欢乐颂合同</Button>
                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        scroll={{ x: 1500}}
                        bordered
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['15', '30', '45'],
                            current: this.state.current,
                            defaultPageSize: 30}}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
                <LeaseCom
                    refreshTable={this.refresh}
                    visible={this.state.openLeaseCom}
                    map={this.state.map}
                    title="添加范本租赁合同"
                />
                <HappyCom
                    refreshTable={this.refresh}
                    visible={this.state.openHappyCom}
                    map={this.state.map}
                    title="添加欢乐颂租赁合同"
                />
                <LeaseCom
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openLeaseComUp}
                    map={this.state.map}
                    title="修改范本租赁合同"
                />
                <HappyCom
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openHappyComUp}
                    map={this.state.map}
                    title="修改欢乐颂租赁合同"
                />
            </div>
        )
    }
}

export default LeaseContract

