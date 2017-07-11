// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker

// React component
class HeatExchange extends Component {
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
            'deviceMaintain/getHeatExchange'
        )
        const abnormal = this.abnormal
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
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '机房编号',
                width: 150,
                dataIndex: 'machineRoomNumber',
                key: 'machineRoomNumber'
            }, {
                title: '机房名称',
                width: 150,
                dataIndex: 'machineRoomName',
                key: 'machineRoomName'
            }, {
                title: '巡检人',
                width: 150,
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '循环水泵机组',
                width: 150,
                children: [{
                    title: '电动机运行',
                    dataIndex: 'running',
                    key: 'running',
                    width: 150
                }, {
                    title: '电动机风叶',
                    dataIndex: 'fan',
                    key: 'fan',
                    width: 150
                }, {
                    title: '绝缘电阻',
                    dataIndex: 'resistance',
                    key: 'resistance',
                    width: 150
                }, {
                    title: '漏水压盘根',
                    dataIndex: 'leak',
                    key: 'leak',
                    width: 150
                }, {
                    title: '背轮连轴器',
                    dataIndex: 'coupling',
                    key: 'coupling',
                    width: 150
                }, {
                    title: '螺旋紧固',
                    dataIndex: 'fastening',
                    key: 'fastening',
                    width: 150
                }]
            }, {
                title: '控制柜',
                width: 150,
                children: [{
                    title: '自动启动检查',
                    dataIndex: 'autoStart',
                    key: 'autoStart',
                    width: 150
                }, {
                    title: '指示仪表信号灯',
                    dataIndex: 'signalLamp',
                    key: 'signalLamp',
                    width: 150
                }, {
                    title: '变频器电压/电流',
                    dataIndex: 'inverter',
                    key: 'inverter',
                    width: 150
                }, {
                    title: '接线端子相关',
                    dataIndex: 'fasten',
                    key: 'fasten',
                    width: 150
                }, {
                    title: '自动空气开关/按钮',
                    dataIndex: 'autoAir',
                    key: 'autoAir',
                    width: 150
                }, {
                    title: '交流接触器',
                    dataIndex: 'touch',
                    key: 'touch',
                    width: 150
                }]
            }, {
                title: '软化设备',
                width: 150,
                children: [{
                    title: '软化水加药设备',
                    dataIndex: 'soften',
                    key: 'soften',
                    width: 150
                }, {
                    title: '输药软管连接情况',
                    dataIndex: 'hose',
                    key: 'hose',
                    width: 150
                }, {
                    title: '树脂桶相关',
                    dataIndex: 'sealRing',
                    key: 'sealRing',
                    width: 150
                }]
            }, {
                title: '管路阀门',
                width: 150,
                children: [{
                    title: '连接点相关检查',
                    dataIndex: 'connectionPoint',
                    key: 'connectionPoint',
                    width: 150
                }, {
                    title: '托架检查',
                    dataIndex: 'bracket',
                    key: 'bracket',
                    width: 150
                }, {
                    title: '电阀门相关检查',
                    dataIndex: 'solenoidValve',
                    key: 'solenoidValve',
                    width: 150
                }, {
                    title: '结垢漏水检查',
                    dataIndex: 'exchanger',
                    key: 'exchanger',
                    width: 150
                }]
            }, {
                title: '仪表相关检查',
                width: 150,
                dataIndex: 'meter',
                key: 'meter'
            }, {
                title: '倒泵操作检查',
                width: 150,
                dataIndex: 'pumpDown',
                key: 'pumpDown'
            }, {
                title: '清洁除尘检查',
                width: 150,
                dataIndex: 'clean',
                key: 'clean'
            }, {
                title: '异常情况',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <Button onClick={() => abnormal(record.id, 5)}>查看</Button>
                    )
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    abnormal = async (id, type) => {
        let resulData = await apiPost('/deviceMaintain/electricalErrorDevice',
            {parentId: id,
                parentType: type})
        if (resulData.data !== null) {
            location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',9'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getHeatExchange',
            {'patrolName': this.patrolName,
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
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 3500 }}
                        bordered={3}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default HeatExchange

