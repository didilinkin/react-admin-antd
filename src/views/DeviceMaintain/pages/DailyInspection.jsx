// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker

// React component
class DailyInspection extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            columns: [],
            dataSource: []
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            'deviceMaintain/getElevatorSystemInspection'
        )
        this.setState({
            loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '巡检日期 ',
                width: 150,
                dataIndex: 'inspectionDate',
                key: 'inspectionDate'
            }, {
                title: '所属楼宇',
                width: 100,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '设备编号',
                width: 150,
                dataIndex: 'elevatorNumber',
                key: 'elevatorNumber'
            }, {
                title: '设备名称',
                width: 150,
                dataIndex: 'elevatorName',
                key: 'elevatorName'
            }, {
                title: '检查结果',
                children: [{
                    title: '初始厅门',
                    dataIndex: 'hallDoorState',
                    key: 'hallDoorState'
                }, {
                    title: '轿箱',
                    dataIndex: 'cageState',
                    key: 'cageState'
                }, {
                    title: '标示',
                    dataIndex: 'markState',
                    key: 'markState'
                }, {
                    title: '监控与紧急呼叫装置',
                    dataIndex: 'monitoringState',
                    key: 'monitoringState'
                }, {
                    title: '电梯运行',
                    dataIndex: 'elevatorState',
                    key: 'elevatorState'
                }, {
                    title: '设备卫生及机房安全',
                    dataIndex: 'safetyState',
                    key: 'safetyState'
                }]
            }, {
                title: '异常情况',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.handleResult === null || record.handleResult === '') {
                        return (
                            <div>
                                无异常
                            </div>
                        )
                    } else {
                        let url = '/deviceMaintain/elevatorSystemInspectionDetail/' + record.id
                        return (
                            <div>
                                <a href={url}><Button type="primary">查看</Button></a>
                            </div>
                        )
                    }
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
            'deviceMaintain/getElevatorSystemInspection',
            {'elevatorName': this.elevatorName,
                'patrolName': this.patrolName,
                'startTime': this.startTime,
                'endTime': this.endTime
            }
        )
        this.setState({
            openinvalid: false,
            opendispatch: false,
            openElevatorRoom: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    query = () => {
        this.refresh()
    }
    patrolName = ''
    entryNameOnChange = (e) => {
        this.patrolName = e.target.value
    }
    elevatorName = ''
    entryMachineRoomName = (e) => {
        this.elevatorName = e.target.value
    }
    startTime = ''
    endTime = ''
    getDate = (date, dateString) => {
        this.startTime = dateString[0]
        this.endTime = dateString[1]
    }
    render () {
        return (
            <div>
                <span>
                    <span>巡检日期:</span>
                    <RangePicker onChange={this.getDate} />
                    <span>巡检人:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <span>梯号:</span>
                    <Input style={{width: 200}} onChange={this.entryMachineRoomName} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2280 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default DailyInspection

