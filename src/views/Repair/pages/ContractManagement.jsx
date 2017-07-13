// 客户管理 - 合同管理(非详情页)
import React from 'react'
import { apiPost } from '../../../api'
import {Table, Button, Spin, Radio } from 'antd'
import ContractHeadComponent from './common/ContractHead'
class ContractManagement extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            type: 1,
            id: 0,
            columns: [],
            dataSource: [],
            ListBuildingInfo: []
        }
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
        let repairList = result.data
        this.setState({loading: false,
            ListBuildingInfo: ListBuildingInfo.data,
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
                width: 100,
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
                width: 100,
                dataIndex: 'clientName'
            }, {
                title: '合同编号',
                width: 100,
                dataIndex: 'contractCode'
            }, {
                title: '所属楼宇',
                width: 100,
                dataIndex: 'buildId'
            }, {
                title: '房间编号',
                width: 100,
                dataIndex: 'leaseRooms'
            }, {
                title: '合同面积',
                width: 100,
                dataIndex: 'serviceArea'
            }, {
                title: '合同开始日期',
                width: 100,
                dataIndex: 'startDate'
            }, {
                title: '合同结束日期',
                width: 100,
                dataIndex: 'endDate'
            }, {
                title: '合同状态',
                width: 100,
                dataIndex: 'contractStatus',
                render: function (text, record, index) {
                    if (text === 1) {
                        text = '终止'
                    } else if (text === 0) {
                        text = '正常'
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
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let arr = []
                    arr.push(
                        <Button >查看</Button>
                    )
                    arr.push(
                        <Button >编辑</Button>
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
        if (!filters['type'] > 0) {
            filters['type'] = this.state.type
        }
        let result = await apiPost(
            '/contract/contractlist',
            filters
        )
        this.setState({
            dataSource: result.data,
            type: filters['type'],
            id: 0
        })
    }
    handleSizeChange = (e) => {
        this.refresh(null, {type: e.target.value}, null)
    }
    render () {
        return (
            <div>
                <Radio.Group value={this.state.type} onChange={this.handleSizeChange}>
                    <Radio.Button value={1}>物业合同</Radio.Button>
                    <Radio.Button value={2}>租赁合同</Radio.Button>
                </Radio.Group>
                <ContractHeadComponent
                    refresh={this.refresh}
                    type={this.state.type}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        scroll={{ x: 1300 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}

export default ContractManagement
