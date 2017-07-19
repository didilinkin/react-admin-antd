// 客户管理 - 客户回访
import React from 'react'
import {Table, Button, Spin, DatePicker, Input } from 'antd'
import { apiPost } from '../../../api'
const { RangePicker } = DatePicker
class ClientReview extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            columns: [],
            dataSource: [],
            id: 0
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            'upkeep/repairList',
            {repairStatus: 1}
        )
        this.setState({
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
                    let url = '/upkeep/repai/' + record.id
                    text = text.substring(0, 30)
                    return (
                        <a href={url}>{text}</a>
                    )
                }
            }, {
                title: '客户评价',
                width: 150,
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
                width: 150,
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
                dataIndex: 'visitContent',
                key: 'visitContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    let url = '/upkeep/returnVisitDetail/' + record.id
                    return (
                        <a href={url}>{text}</a>
                    )
                }
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/upkeep/returnVisit/' + record.id
                    return (
                        <a href={url}><Button>回访登记</Button></a>
                    )
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
            'upkeep/repairList',
            {'startDate': this.startDate,
                'endDate': this.endDate,
                'clientName': this.clientName,
                'type': 2
            }
        )
        this.setState({
            loading: false,
            id: 0,
            dataSource: result.data
        })
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        if (dateString[1] > 0) {
            this.endDate = dateString[1] + ' 23:59:59'
        } else {
            this.endDate = dateString[1]
        }
    }
    clientName = ''
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>回访日期:&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;公司名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
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
