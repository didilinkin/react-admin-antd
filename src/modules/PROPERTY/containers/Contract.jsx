// 物业管理 - 物业合同
import React from 'react'
import { apiPost } from '../../../api'
import {Table, Button, Spin } from 'antd'
import ContractHeadComponent from '../components/Contract/ContractHead'
import PropertyContractAddedCom from '../components/Contract/PropertyContractAdded'
import HydropowerContractAdditionCom from '../components/Contract/HydropowerContractAddition'
class PropertyContract extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            type: 1,
            id: 0,
            columns: [],
            total: 0,
            current: 1,
            dataSource: [],
            map: {
                ListBuildingInfo: [],
                MapDict: {},
                ListCustomerInfo: []
            },
            PropertyContractAddedComOpen: false,
            HydropowerContractAdditionComOpen: false,
            PropertyContractAddedComOpenUP: false,
            HydropowerContractAdditionComOpenUP: false
        }
    }
    updatePm = (contractSplit, id) => {
        if (contractSplit === 1) {
            this.setState({
                PropertyContractAddedComOpen: false,
                HydropowerContractAdditionComOpen: false,
                PropertyContractAddedComOpenUP: true,
                HydropowerContractAdditionComOpenUP: false,
                id: id
            })
        } else {
            this.setState({
                PropertyContractAddedComOpen: false,
                HydropowerContractAdditionComOpen: false,
                PropertyContractAddedComOpenUP: false,
                HydropowerContractAdditionComOpenUP: true,
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
        let updatePm = this.updatePm
        let info = this.info
        this.setState({loading: false,
            map: ListBuildingInfo.data,
            total: result.data.total,
            columns: [{
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
                title: '合同类型',
                dataIndex: 'contractSplit',
                render: function (text, record, index) {
                    if (text === 1) {
                        text = '范本合同'
                    } else {
                        text = '仅水电合同'
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
                dataIndex: 'contractCode'
            }, {
                title: '所属楼宇',
                dataIndex: 'buildName'
            }, {
                title: '房间编号',
                dataIndex: 'leaseRooms'
            }, {
                title: '合同面积',
                dataIndex: 'serviceArea'
            }, {
                title: '合同开始日期',
                dataIndex: 'startDate'
            }, {
                title: '合同结束日期',
                dataIndex: 'endDate'
            }, {
                title: '合同状态',
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
                dataIndex: 'daysRemaining',
                render: function (text, record, index) {
                    return record.contractStatus !== 1 ? text : '0'
                }
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let arr = []
                    let url = ''
                    if (record.contractSplit === 1) {
                        url = '/home/property/contractDetails/contractDetail/' + record.id
                    } else {
                        url = '/home/property/contractDetails/electricityDetail/' + record.id
                    }
                    arr.push(
                        <a key="1" onClick={() => info(url)}> 查看 &nbsp;</a>
                    )
                    arr.push(
                        <a key="2" onClick={() => updatePm(record.contractSplit, record.id)}>&nbsp; 编辑 </a>
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
            PropertyContractAddedComOpen: false,
            HydropowerContractAdditionComOpen: false,
            PropertyContractAddedComOpenUP: false,
            HydropowerContractAdditionComOpenUP: false,
            id: 0
        })
    }
    openPropertyContractAddedCom = () => {
        this.setState({
            PropertyContractAddedComOpen: true,
            HydropowerContractAdditionComOpen: false,
            PropertyContractAddedComOpenUP: false,
            HydropowerContractAdditionComOpenUP: false
        })
    }
    openHydropowerContractAdditionCom = () => {
        this.setState({
            PropertyContractAddedComOpen: false,
            HydropowerContractAdditionComOpen: true,
            PropertyContractAddedComOpenUP: false,
            HydropowerContractAdditionComOpenUP: false
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
                <Button style={{ marginBottom: 10}} type="primary" onClick={this.openPropertyContractAddedCom}>添加物业合同</Button>&nbsp;&nbsp;
                <Button style={{ marginBottom: 10}} type="primary" onClick={this.openHydropowerContractAdditionCom}>添加仅水电合同</Button>
                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        scroll={{ x: 1500 }}
                        bordered
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            current: this.state.current,
                            pageSizeOptions: ['15', '30', '45'],
                            defaultPageSize: 30}}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
                <PropertyContractAddedCom
                    refreshTable={this.refresh}
                    visible={this.state.PropertyContractAddedComOpen}
                    title="添加范本物业合同"
                />
                <HydropowerContractAdditionCom
                    refreshTable={this.refresh}
                    visible={this.state.HydropowerContractAdditionComOpen}
                    title="添加仅水电合同"
                />
                <PropertyContractAddedCom
                    refreshTable={this.refresh}
                    id={this.state.id}
                    visible={this.state.PropertyContractAddedComOpenUP}
                    title="修改范本物业合同"
                />
                <HydropowerContractAdditionCom
                    refreshTable={this.refresh}
                    id={this.state.id}
                    visible={this.state.HydropowerContractAdditionComOpenUP}
                    title="修改仅水电合同"
                />
            </div>
        )
    }
}

export default PropertyContract

