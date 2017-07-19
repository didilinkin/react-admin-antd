// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker
// React component
class ElevatorRoom extends Component {
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
            'deviceMaintain/getElevatorMachineRoom'
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
                dataIndex: 'inspectionDate',
                key: 'inspectionDate'
            }, {
                title: '室内温/湿度',
                width: 100,
                dataIndex: 'temperature',
                key: 'temperature'
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
                title: '机房电梯',
                width: 100,
                dataIndex: 'elevatorName',
                key: 'elevatorName'
            }, {
                title: '电梯主机运行是否正常',
                width: 100,
                dataIndex: 'elevatorEngineState',
                key: 'elevatorEngineState'
            }, {
                title: '钢丝绳是否有起毛断丝',
                width: 100,
                dataIndex: 'wireRopeState',
                key: 'wireRopeState'
            }, {
                title: '控制柜内是否整洁干净',
                width: 100,
                dataIndex: 'cabinetCleanState',
                key: 'cabinetCleanState'
            }, {
                title: '控制柜内器件是否正常',
                width: 100,
                dataIndex: 'cabinetDeviceState',
                key: 'cabinetDeviceState'
            }, {
                title: '控制柜内排风扇是否正常',
                width: 100,
                dataIndex: 'cabinetVentilatorState',
                key: 'cabinetVentilatorState'
            }, {
                title: '电梯运行是否有异响',
                width: 150,
                dataIndex: 'elevatorVoiceState',
                key: 'elevatorVoiceState'
            }, {
                title: '井道照明是否完好',
                width: 150,
                dataIndex: 'wellLightingState',
                key: 'wellLightingState'
            }, {
                title: '室内空调通风是否正常',
                width: 150,
                dataIndex: 'airVentilateState',
                key: 'airVentilateState'
            }, {
                title: '室内卫生是否良好',
                width: 150,
                dataIndex: 'hygieneCleanState',
                key: 'hygieneCleanState'
            }, {
                title: '室内是否有异味',
                width: 150,
                dataIndex: 'abnormalTasteState',
                key: 'abnormalTasteState'
            }, {
                title: '门锁是否正常',
                width: 150,
                dataIndex: 'doorLockState',
                key: 'doorLockState'
            }, {
                title: '巡检人',
                width: 150,
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '异常情况',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <Button onClick={() => abnormal(record.id, 4)}>查看</Button>
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
            location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',4'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getElevatorMachineRoom',
            {'machineRoomName': this.machineRoomName,
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
    machineRoomName = ''
    selectOnChange = (e) => {
        this.machineRoomName = e.target.value
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
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>巡检日期:&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;机房名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.selectOnChange} />
                    <span>巡检人:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2280 }}
                        bordered={3}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default ElevatorRoom

