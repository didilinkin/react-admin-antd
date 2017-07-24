// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message, Select} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker
const Option = Select.Option

// React component
class CentralAirConditioning extends Component {
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
            'deviceMaintain/getCentralAirConditioning'
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
                title: '巡检人',
                width: 150,
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '所在区域',
                width: 150,
                dataIndex: 'district',
                key: 'district'
            }, {
                title: '电压',
                width: 150,
                dataIndex: 'pressure',
                key: 'pressure'
            }, {
                title: '电流',
                width: 150,
                dataIndex: 'electricity',
                key: 'electricity'
            }, {
                title: '负荷',
                width: 150,
                dataIndex: 'charge',
                key: 'charge'
            }, {
                title: '冷水进',
                width: 150,
                dataIndex: 'coldWaterIn',
                key: 'coldWaterIn'
            }, {
                title: '冷水出',
                width: 150,
                dataIndex: 'coldWaterOut',
                key: 'coldWaterOut'
            }, {
                title: '蒸发温度',
                width: 150,
                dataIndex: 'evaporatingTemperature',
                key: 'evaporatingTemperature'
            }, {
                title: '蒸发压力',
                width: 150,
                dataIndex: 'evaporatingPressure',
                key: 'evaporatingPressure'
            }, {
                title: '冷却水进',
                width: 150,
                dataIndex: 'coolingWaterIn',
                key: 'coolingWaterIn'
            }, {
                title: '冷却水出',
                width: 150,
                dataIndex: 'coolingWaterOut',
                key: 'coolingWaterOut'
            }, {
                title: '冷凝温度',
                width: 150,
                dataIndex: 'condensingTemperature',
                key: 'condensingTemperature'
            }, {
                title: '冷凝压力',
                width: 150,
                dataIndex: 'condensingPressure',
                key: 'condensingPressure'
            }, {
                title: '导叶开度',
                width: 150,
                dataIndex: 'gateOpening',
                key: 'gateOpening'
            }, {
                title: '油温',
                width: 150,
                dataIndex: 'oilTemperature',
                key: 'oilTemperature'
            }, {
                title: '油压差',
                width: 150,
                dataIndex: 'oilPressureDifference',
                key: 'oilPressureDifference'
            }, {
                title: '排气温度',
                width: 150,
                dataIndex: 'exhaustTemperature',
                key: 'exhaustTemperature'
            }, {
                title: '轴承温度',
                width: 150,
                dataIndex: 'bearingTemperature',
                key: 'bearingTemperature'
            }, {
                title: '电机温度',
                width: 150,
                dataIndex: 'motorTemperature',
                key: 'motorTemperature'
            }, {
                title: '启用泵组',
                width: 150,
                dataIndex: 'pumpGroup',
                key: 'pumpGroup'
            }, {
                title: 'K1泵组',
                children: [{
                    title: '启动电量',
                    dataIndex: 'startPower1',
                    key: 'startPower1',
                    width: 150
                }, {
                    title: '关机电量',
                    dataIndex: 'endPower1',
                    key: 'endPower1',
                    width: 150
                }]
            }, {
                title: 'K2泵组',
                children: [{
                    title: '启动电量',
                    dataIndex: 'startPower2',
                    key: 'startPower2',
                    width: 150
                }, {
                    title: '关机电量',
                    dataIndex: 'endPower2',
                    key: 'endPower2',
                    width: 150
                }]
            }, {
                title: 'K3泵组',
                children: [{
                    title: '启动电量',
                    dataIndex: 'startPower3',
                    key: 'startPower3',
                    width: 150
                }, {
                    title: '关机电量',
                    dataIndex: 'endPower3',
                    key: 'endPower3',
                    width: 150
                }]
            }, {
                title: 'K4泵组',
                children: [{
                    title: '启动电量',
                    dataIndex: 'startPower4',
                    key: 'startPower4',
                    width: 150
                }, {
                    title: '关机电量',
                    dataIndex: 'endPower4',
                    key: 'endPower4',
                    width: 150
                }]
            }, {
                title: '值班情况',
                width: 150,
                dataIndex: 'dutyCondition',
                key: 'dutyCondition'
            }, {
                title: '值班人',
                width: 150,
                dataIndex: 'dutyPersonName',
                key: 'dutyPersonName'
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
            location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',7'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getCentralAirConditioning',
            {'district': this.district,
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
    district = ''
    selectOnChange = (e) => {
        this.district = e
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
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡检人:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Select
                        showSearch
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择所在区域"
                        optionFilterProp="district"
                        onSelect={this.selectOnChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option key="低区">低区</Option>
                        <Option key="高区">高区</Option>
                    </Select>
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 3000 }}
                        bordered={3}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CentralAirConditioning

