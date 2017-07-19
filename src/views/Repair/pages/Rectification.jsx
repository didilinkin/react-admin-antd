// 客户管理 - 整改通知
import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm, Input, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件
import RectificationAddUpComponent from './common/RectificationAddUp'
const { RangePicker } = DatePicker
// React component
class RepairList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            id: 0
        }
    }
    handleUpdateRectification = (id) => {
        this.setState({
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            'rectification/list'
        )
        let repairList = result.data
        const handleUpdateRectification = this.handleUpdateRectification
        this.setState({loading: false,
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
                title: '检查日期',
                width: 150,
                dataIndex: 'inspectDate',
                key: 'inspectDate'
            }, {
                title: '公司名称',
                width: 150,
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '所属楼宇',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '所属房间',
                width: 150,
                dataIndex: 'roomNums',
                key: 'roomNums'
            }, {
                title: '整改项目',
                width: 150,
                dataIndex: 'rectificationContent',
                key: 'rectificationContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    let url = '/upkeep/correctionDetail/' + record.id
                    return (
                        <a href={url}>{text}</a>
                    )
                }
            }, {
                title: '检查人',
                dataIndex: 'inspectName',
                key: 'inspectName'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <Popconfirm title="确定修改吗?" onConfirm={() => handleUpdateRectification(record.id)}>
                                <Button >修改</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }],
            dataSource: repairList
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'rectification/list',
            {'startDate': this.startDate,
                'endDate': this.endDate,
                'clientName': this.clientName
            }
        )
        this.setState({
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            openUpdate: false,
            openTableAddUp: true
        })
    }
    clientName = ''
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    query = () => {
        this.refresh()
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
    render () {
        return (
            <div>
                <RectificationAddUpComponent
                    title="添加整改通知"
                    refreshTable={this.refresh}
                    visible={this.state.openTableAddUp}
                />
                <RectificationAddUpComponent
                    id={this.state.id}
                    title="修改整改通知"
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>检查日期:&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;公司名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button style={{marginRight: '5px'}} type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加整改通知</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1000 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default RepairList

