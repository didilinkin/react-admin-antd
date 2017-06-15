// 客户管理 - 客户回访
import React from 'react'
import {Table, Button, Spin } from 'antd'
import { apiPost } from '../../../api'
import VisitUpdateComponent from './common/VisitUpdate'

class ClientReview extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            open: false,
            columns: [],
            dataSource: []
        }
    }
    register = (id) => {
        this.setState({
            open: true
        })
    }
    async initialRemarks () {
        let result = await apiPost(
            'http://192.168.1.108:18082/upkeep/repairList'
        )
        const register = this.register
        this.setState({
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '完工日期',
                width: 150,
                dataIndex: 'repairedDate',
                key: 'repairedDate'
            }, {
                title: '公司名称',
                width: 150,
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '报修内容',
                width: 150,
                dataIndex: 'repairContent',
                key: 'repairContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    return (
                        <span>{text}</span>
                    )
                }
            }, {
                title: '客户评价',
                width: 100,
                dataIndex: 'ratedStatus',
                key: 'ratedStatus',
                render: function (text, record, index) {
                    let ratedStatus = '未评价'
                    if (record.ratedStatus === 1) {
                        ratedStatus = '已评价'
                    }
                    return (
                        <span>{ratedStatus}</span>
                    )
                }
            }, {
                title: '回访状态',
                width: 100,
                dataIndex: 'visit',
                key: 'visit',
                render: function (text, record, index) {
                    let visit = '未回访'
                    if (record.visitId > 0) {
                        visit = '已回访'
                    }
                    return (
                        <span>{visit}</span>
                    )
                }
            }, {
                title: '回访日期',
                width: 150,
                dataIndex: 'visitDate',
                key: 'visitDate'
            }, {
                title: '回访情况',
                width: 100,
                dataIndex: 'visitContent',
                key: 'visitContent'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                                <Button onClick={() => register(record.id)} >回访登记</Button>
                    )
                }
            }],
            dataSource: result.data
        })
        debugger
    }
    componentDidMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div>
                <VisitUpdateComponent
                    visible={this.state.open}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}

export default ClientReview
