// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message, Select} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker
const Option = Select.Option

// React component
class AirConditioningRoom extends Component {
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
            'deviceMaintain/getAirMachineRoom'
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
                title: '设备编号',
                width: 150,
                dataIndex: 'machineRoomNumber',
                key: 'machineRoomNumber'
            }, {
                title: '设备名称',
                width: 150,
                dataIndex: 'machineRoomName',
                key: 'machineRoomName'
            }, {
                title: '类型',
                width: 150,
                dataIndex: 'inspectionState',
                key: 'inspectionState'
            }, {
                title: '巡检人',
                width: 150,
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '集水器',
                children: [{
                    title: '回水压力',
                    dataIndex: 'elevatorEngineState',
                    key: 'elevatorEngineState'
                }, {
                    title: '出水压力',
                    dataIndex: 'wireRopeState',
                    key: 'wireRopeState'
                }]
            }, {
                title: '补水器',
                width: 150,
                dataIndex: 'cabinetCleanState',
                key: 'cabinetCleanState'
            }, {
                title: '止回阀软连接',
                width: 150,
                dataIndex: 'cabinetDeviceState',
                key: 'cabinetDeviceState'
            }, {
                title: '电源与控制',
                width: 150,
                dataIndex: 'cabinetVentilatorState',
                key: 'cabinetVentilatorState'
            }, {
                title: '渗漏情况',
                width: 150,
                dataIndex: 'elevatorVoiceState',
                key: 'elevatorVoiceState'
            }, {
                title: '清扫情况',
                children: [{
                    title: '清扫',
                    dataIndex: 'wellLightingState',
                    key: 'wellLightingState'
                }, {
                    title: '拖拭',
                    dataIndex: 'airVentilateState',
                    key: 'airVentilateState'
                }]
            }, {
                title: '照明情况',
                width: 150,
                dataIndex: 'hygieneCleanState',
                key: 'hygieneCleanState'
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
            location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',6'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getAirMachineRoom',
            {'inspectionState': this.inspectionState,
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
    inspectionState = ''
    selectOnChange = (e) => {
        this.inspectionState = e
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
                    <span>巡检日期:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker style={{marginRight: '5px'}} onChange={this.getDate} />
                    <Select
                        showSearch
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择类型"
                        optionFilterProp="inspectionState"
                        onSelect={this.selectOnChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option key="8:00">8:00</Option>
                        <Option key="13:30">13:30</Option>
                    </Select>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡检人:&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
export default AirConditioningRoom

