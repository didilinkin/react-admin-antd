// 设备维护 - 设备巡检 - 电器系统 - 发电机运行记录
import React from 'react'
import {Table, Button, Spin, DatePicker, Input, message } from 'antd'
import '../../style/test.less'
import {apiPost} from '../../../../api/api.dev'
const { RangePicker } = DatePicker
class GeneratorLog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            columns: [],
            dataSource: []
        }
    }
    abnormal = async (id, type) => {
        let resulData = await apiPost('/deviceMaintain/electricalErrorDevice',
            {parentId: id,
                parentType: type})
        if (resulData.data !== null) {
            window.location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',1'
        } else {
            message.info('无异常信息')
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            '/deviceMaintain/inspection/electric/alternatorlist'
        )
        const abnormal = this.abnormal
        this.setState({
            columns: [{
                title: '设备编号',
                width: 200,
                dataIndex: 'equipmentNumber',
                key: 'equipmentNumber'
            }, {
                title: '设备名称',
                width: 150,
                dataIndex: 'equipmentName',
                key: 'equipmentName'
            }, {
                title: '运行日期',
                width: 150,
                dataIndex: 'runningDate',
                key: 'runningDate'
            }, {
                title: '设备信息',
                width: 150,
                dataIndex: 'sbxx',
                key: 'sbxx',
                children: [{
                    title: '运行原因',
                    width: 100,
                    dataIndex: 'runCause',
                    key: 'runCause'
                }, {
                    title: '设备负责人',
                    width: 100,
                    dataIndex: 'liabilityPerson',
                    key: 'liabilityPerson'
                }, {
                    title: '运行监护人',
                    width: 100,
                    dataIndex: 'runningGuardian',
                    key: 'runningGuardian'
                }, {
                    title: '累计运行时间',
                    width: 100,
                    dataIndex: 'sumRunTime',
                    key: 'sumRunTime'
                }, {
                    title: '本次运行时间',
                    width: 100,
                    dataIndex: 'thisRunTime',
                    key: 'thisRunTime'
                }]
            }, {
                title: '开机前检查',
                width: 100,
                dataIndex: 'kjqjc',
                key: 'kjqjc',
                children: [{
                    title: '柴油油位',
                    width: 100,
                    dataIndex: 'dieselOilLevel',
                    key: 'dieselOilLevel'
                }, {
                    title: '机油油位',
                    width: 100,
                    dataIndex: 'oilLevel',
                    key: 'oilLevel'
                }, {
                    title: '水箱水位',
                    width: 100,
                    dataIndex: 'tankWaterLevel',
                    key: 'tankWaterLevel'
                }, {
                    title: '选择开关位置',
                    width: 100,
                    dataIndex: 'selectSwitchLocation',
                    key: 'selectSwitchLocation'
                }, {
                    title: '输出开关位置',
                    width: 100,
                    dataIndex: 'outputSwitchLocation',
                    key: 'outputSwitchLocation'
                }, {
                    title: '电瓶液位',
                    width: 100,
                    dataIndex: 'batteryLevel',
                    key: 'batteryLevel'
                }]
            }, {
                title: '记录项目',
                width: 100,
                dataIndex: 'jlxm',
                key: 'jlxm',
                children: [{
                    title: '输出电压(伏)',
                    width: 100,
                    dataIndex: 'scdy',
                    key: 'scdy',
                    children: [{
                        title: 'AB',
                        width: 100,
                        dataIndex: 'outputVoltageAb',
                        key: 'outputVoltageAb'
                    },
                    {
                        title: 'BC',
                        width: 100,
                        dataIndex: 'outputVoltageBc',
                        key: 'outputVoltageBc'
                    },
                    {
                        title: 'CA',
                        width: 100,
                        dataIndex: 'outputVoltageCa',
                        key: 'outputVoltageCa'
                    }]
                }, {
                    title: '输出电流（它）',
                    width: 100,
                    dataIndex: 'scdl',
                    key: 'scdl',
                    children: [{
                        title: 'A',
                        width: 100,
                        dataIndex: 'outputCurrentAb',
                        key: 'outputCurrentAb'
                    },
                    {
                        title: 'B',
                        width: 100,
                        dataIndex: 'outputCurrentBc',
                        key: 'outputCurrentBc'
                    },
                    {
                        title: 'C',
                        width: 100,
                        dataIndex: 'outputCurrentCa',
                        key: 'outputCurrentCa'
                    }]
                }, {
                    title: '频率（HZ）',
                    width: 100,
                    dataIndex: 'frequency',
                    key: 'frequency'
                }, {
                    title: '转速（转/分）',
                    width: 100,
                    dataIndex: 'speed',
                    key: 'speed'
                }, {
                    title: '电瓶电压',
                    width: 100,
                    dataIndex: 'batteryVoltage',
                    key: 'batteryVoltage'
                }, {
                    title: '机油油压（MPa）',
                    width: 100,
                    dataIndex: 'oilPressure',
                    key: 'oilPressure'
                }, {
                    title: '机油油温',
                    width: 100,
                    dataIndex: 'oilTemperature',
                    key: 'oilTemperature'
                }, {
                    title: '水温',
                    width: 100,
                    dataIndex: 'waterTemperature',
                    key: 'waterTemperature'
                }, {
                    title: '室内温度',
                    width: 100,
                    dataIndex: 'indoorTemperature',
                    key: 'indoorTemperature'
                }, {
                    title: '通风系统',
                    width: 100,
                    dataIndex: 'ventilationSystem',
                    key: 'ventilationSystem'
                }, {
                    title: '机器响声震动',
                    width: 100,
                    dataIndex: 'machineNoiseVibration',
                    key: 'machineNoiseVibration'
                }, {
                    title: '消防系统',
                    width: 100,
                    dataIndex: 'fireProtectionSystem',
                    key: 'fireProtectionSystem'
                }, {
                    title: '照明',
                    width: 100,
                    dataIndex: 'lighting',
                    key: 'lighting'
                }, {
                    title: '停机检查',
                    width: 100,
                    dataIndex: 'checkAfterShutdown',
                    key: 'checkAfterShutdown'
                }]
            }, {
                title: '异常情况',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <a onClick={() => abnormal(record.id, 3)}>查看</a>
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
            '/deviceMaintain/inspection/electric/alternatorlist',
            {'startTime': this.startDate,
                'endTime': this.endDate,
                'createName': this.createName,
                'equipmentNumber': this.equipmentNumber
            }
        )
        this.setState({
            loading: false,
            dataSource: result.data
        })
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        this.endDate = dateString[1]
    }
    createName = ''
    entryNameOnChange = (e) => {
        this.createName = e.target.value
    }
    query = () => {
        this.refresh()
    }
    handleCancel = () => {
        this.setState({
            list: [],
            open: false,
            id: ''
        })
    }
    equipmentNumber = ''
    equipmentNumberFn = (e) => {
        this.equipmentNumber = e.target.value
    }
    render () {
        return (
            <div>
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>巡查日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡查人&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span>设备编号&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.equipmentNumberFn}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        bordered
                        scroll={{ x: 3500 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default GeneratorLog

