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
            'http://192.168.1.250:18082/rectification/list'
        )
        let repairList = result.data
        const handleUpdateRectification = this.handleUpdateRectification
        this.setState({loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id'
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
                    let url = '/upkeep/repai/' + record.id
                    return (
                        <a href={url}>{text}</a>
                    )
                }
            }, {
                title: '检查人',
                width: 100,
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
            'http://192.168.1.250:18082/rectification/list',
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
        this.endDate = dateString[1]
    }
    render () {
        return (
            <div>
                <RectificationAddUpComponent
                    refreshTable={this.refresh}
                    visible={this.state.openTableAddUp}
                />
                <RectificationAddUpComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <span>
                    <span>检查日期:</span>
                    <RangePicker onChange={this.getDate}
                    />
                    <span>公司名称:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加整改日期</Button>
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

