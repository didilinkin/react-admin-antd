// 硬件管理-空调监控
import React from 'react'
import {Table, Button, Spin, Input } from 'antd'
import { apiPost } from '../../../../api'
class MonitoringList extends React.Component {
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
            '/hardware/mongodbAirStatusList'
        )
        let info = this.info
        this.setState({
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
                title: '所属楼宇',
                width: 200,
                dataIndex: 'buildingName'
            }, {
                title: '控制区域',
                width: 200,
                dataIndex: 'controlArea'
            }, {
                title: '空调编号',
                width: 200,
                dataIndex: 'numCode'
            }, {
                title: '状态',
                width: 200,
                dataIndex: 'onOff'
            }, {
                title: '当前模式',
                width: 200,
                dataIndex: 'model'
            }, {
                title: '设定温度',
                width: 200,
                dataIndex: 'setTemp'
            }, {
                title: '室内温度',
                width: 200,
                dataIndex: 'roomTemp'
            }, {
                title: '操作',
                width: 100,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/hardware/airconditionermonitor/Details/airconditioningdetails/' + record.id
                    return (
                        <a onClick={() => info(url)}> 详情 </a>
                    )
                }
            }],
            dataSource: result.data
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
        filters['controlAreaText'] = this.controlAreaText
        filters['numberText'] = this.numberText
        if (pagination === null || typeof (pagination) === 'undefined') {
            filters['page'] = 1
            filters['rows'] = 30
        } else {
            filters['page'] = pagination.current
            filters['rows'] = pagination.pageSize
        }
        let result = await apiPost(
            '/hardware/mongodbAirStatusList',
            filters
        )
        this.setState({
            total: result.data.total,
            current: pagination ? pagination.current : 1,
            loading: false,
            id: 0,
            dataSource: result.data
        })
    }
    controlAreaText = ''
    controlArea = (e) => {
        this.controlAreaText = e.target.value
    }
    numberText = ''
    number = (e) => {
        this.numberText = e.target.value
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
                    <span>控制区域：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        arginRight: '5px'}} onChange={this.controlArea}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;空调编号&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.number}
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

export default MonitoringList
