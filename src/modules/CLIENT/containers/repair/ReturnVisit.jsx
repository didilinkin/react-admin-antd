// 客户管理 - 客户回访
import React from 'react'
import {Table, Button, Spin, DatePicker, Input } from 'antd'
import { apiPost, verification } from '../../../../api'
const { RangePicker } = DatePicker
class ReturnVisit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            total: 0,
            current: 1,
            loading: false,
            columns: [],
            dataSource: [],
            id: 0
        }
    }
    info = (url) => {
        this.props.history.push(url)
    }
    async initialRemarks () {
        let result = await apiPost(
            'upkeep/repairList',
            {repairStatus: 1,
                sort: 'id',
                order: 'desc'
            }
        )
        let info = this.info
        this.setState({
            total: result.data.total,
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
                width: 200,
                dataIndex: 'repairedDate',
                key: 'repairedDate'
            }, {
                title: '公司名称',
                width: 200,
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '报修内容',
                width: 200,
                dataIndex: 'repairContent',
                key: 'repairContent',
                render: function (text, record, index) {
                    let url = '/home/client/repair/repairDetail/' + record.id
                    text = text.substring(0, 30)
                    return (
                        <a onClick={() => info(url)}>{text}</a>
                    )
                }
            }, {
                title: '客户评价',
                width: 200,
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
                width: 200,
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
                width: 200,
                dataIndex: 'visitDate',
                key: 'visitDate'
            }, {
                title: '回访情况',
                width: 200,
                dataIndex: 'visitContent',
                key: 'visitContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    let url = '/home/client/repair/ReturnVisitDetail/' + record.id
                    return (
                        <a onClick={() => info(url)}>{text}</a>
                    )
                }
            }, {
                title: '操作',
                width: 100,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/client/repair/ReturnDetail/' + record.id
                    return (
                        verification('visitingCustomers') &&
                            <a onClick={() => info(url)}> 回访登记 </a>
                    )
                }
            }],
            dataSource: result.data.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (pagination, filters, sorter) => {
        // 刷新表格
        if (filters === null || typeof (filters) === 'undefined') {
            filters = []
        }
        filters['startDate'] = this.startDate
        filters['endDate'] = this.endDate
        filters['clientName'] = this.clientName
        filters['type'] = 2
        filters['repairStatus'] = 1
        if (pagination === null || typeof (pagination) === 'undefined') {
            filters['page'] = 1
            filters['rows'] = 30
        } else {
            filters['page'] = pagination.current
            filters['rows'] = pagination.pageSize
        }
        filters['sort'] = 'id'
        filters['order'] = 'desc'
        let result = await apiPost(
            'upkeep/repairList',
            filters
        )
        this.setState({
            total: result.data.total,
            current: pagination ? pagination.current : 1,
            loading: false,
            id: 0,
            dataSource: result.data.rows
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
                    display: 'block'}}
                >
                    <span>回访日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;公司名称&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        onChange={this.refresh}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            current: this.state.current,
                            pageSizeOptions: ['15', '30', '45'],
                            defaultPageSize: 30}}
                    />
                </Spin>
            </div>
        )
    }
}

export default ReturnVisit
