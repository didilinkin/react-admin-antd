// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker

// React component
class HeatTransferStation extends Component {
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
            'deviceMaintain/getHeatSystem'
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
                title: '巡查节点',
                width: 150,
                dataIndex: 'patrolNode',
                key: 'patrolNode'
            }, {
                title: '高区板换',
                children: [{
                    title: '1#电机电流',
                    dataIndex: 'currentOneH',
                    key: 'currentOneH',
                    width: 150
                }, {
                    title: '2#电机电流',
                    dataIndex: 'currentTwoH',
                    key: 'currentTwoH',
                    width: 150
                }, {
                    title: '温度（一次）',
                    width: 150,
                    children: [{
                        title: '进水℃',
                        dataIndex: 'temperatureOneInH',
                        key: 'temperatureOneInH',
                        width: 150
                    }, {
                        title: '出水℃',
                        dataIndex: 'temperatureOneOutH',
                        key: 'temperatureOneOutH',
                        width: 150
                    }]
                }, {
                    title: '温度（二次）',
                    width: 150,
                    children: [{
                        title: '进水℃',
                        dataIndex: 'temperatureTwoInH',
                        key: 'temperatureTwoInH',
                        width: 150
                    }, {
                        title: '出水℃',
                        dataIndex: 'temperatureTwoOutH',
                        key: 'temperatureTwoOutH',
                        width: 150
                    }]
                }, {
                    title: '压力（一次）',
                    width: 150,
                    children: [{
                        title: '进水Mpa',
                        dataIndex: 'pressureOneInH',
                        key: 'pressureOneInH',
                        width: 150
                    }, {
                        title: '出水Mpa',
                        dataIndex: 'pressureOneOutH',
                        key: 'pressureOneOutH',
                        width: 150
                    }]
                }, {
                    title: '压力（二次）',
                    width: 150,
                    children: [{
                        title: '进水Mpa',
                        dataIndex: 'pressureTwoInH',
                        key: 'pressureTwoInH',
                        width: 150
                    }, {
                        title: '出水Mpa',
                        dataIndex: 'pressureTwoOutH',
                        key: 'pressureTwoOutH',
                        width: 150
                    }]
                }]
            }, {
                title: '低区板换',
                children: [{
                    title: '1#电机电流',
                    dataIndex: 'currentOneL',
                    key: 'currentOneL',
                    width: 150
                }, {
                    title: '2#电机电流',
                    dataIndex: 'currentTwoL',
                    key: 'currentTwoL',
                    width: 150
                }, {
                    title: '温度（一次）',
                    width: 150,
                    children: [{
                        title: '进水℃',
                        dataIndex: 'temperatureOneInL',
                        key: 'temperatureOneInL',
                        width: 150
                    }, {
                        title: '出水℃',
                        dataIndex: 'temperatureOneOutL',
                        key: 'temperatureOneOutL',
                        width: 150
                    }]
                }, {
                    title: '温度（二次）',
                    width: 150,
                    children: [{
                        title: '进水℃',
                        dataIndex: 'temperatureTwoInL',
                        key: 'temperatureTwoInL',
                        width: 150
                    }, {
                        title: '出水℃',
                        dataIndex: 'temperatureTwoOutL',
                        key: 'temperatureTwoOutL',
                        width: 150
                    }]
                }, {
                    title: '压力（一次）',
                    width: 150,
                    children: [{
                        title: '进水Mpa',
                        dataIndex: 'pressureOneInL',
                        key: 'pressureOneInL',
                        width: 150
                    }, {
                        title: '出水Mpa',
                        dataIndex: 'pressureOneOutL',
                        key: 'pressureOneOutL',
                        width: 150
                    }]
                }, {
                    title: '压力（二次）',
                    width: 150,
                    children: [{
                        title: '进水Mpa',
                        dataIndex: 'pressureTwoInL',
                        key: 'pressureTwoInL',
                        width: 150
                    }, {
                        title: '出水Mpa',
                        dataIndex: 'pressureTwoOutL',
                        key: 'pressureTwoOutL',
                        width: 150
                    }]
                }]
            }, {
                title: '高区集水器',
                children: [{
                    title: '进水Mpa',
                    dataIndex: 'collectorInH',
                    key: 'collectorInH',
                    width: 150
                }, {
                    title: '出水Mpa',
                    dataIndex: 'collectorOutH',
                    key: 'collectorOutH',
                    width: 150
                }]
            }, {
                title: '低区集水器',
                children: [{
                    title: '进水Mpa',
                    dataIndex: 'collectorInL',
                    key: 'collectorInL',
                    width: 150
                }, {
                    title: '出水Mpa',
                    dataIndex: 'collectorOutL',
                    key: 'collectorOutL',
                    width: 150
                }]
            }, {
                title: '累计热量',
                children: [{
                    title: '开机热量',
                    dataIndex: 'startHeat',
                    key: 'startHeat',
                    width: 150
                }, {
                    title: '关机热量',
                    dataIndex: 'shutdownHeat',
                    key: 'shutdownHeat',
                    width: 150
                }, {
                    title: '合计热量',
                    dataIndex: 'sumHeat',
                    key: 'sumHeat',
                    width: 150
                }]
            }, {
                title: '高区换热Kwh',
                children: [{
                    title: '开机电量',
                    dataIndex: 'startPowerH',
                    key: 'startPowerH',
                    width: 150
                }, {
                    title: '关机电量',
                    dataIndex: 'shutdownPowerH',
                    key: 'shutdownPowerH',
                    width: 150
                }, {
                    title: '合计电量',
                    dataIndex: 'sumPowerH',
                    key: 'sumPowerH',
                    width: 150
                }]
            }, {
                title: '低区换热Kwh',
                children: [{
                    title: '开机电量',
                    dataIndex: 'startPowerL',
                    key: 'startPowerL',
                    width: 150
                }, {
                    title: '关机电量',
                    dataIndex: 'shutdownPowerL',
                    key: 'shutdownPowerL',
                    width: 150
                }, {
                    title: '合计电量',
                    dataIndex: 'sumPowerL',
                    key: 'sumPowerL',
                    width: 150
                }]
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
            window.location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',14'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getHeatSystem',
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
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>巡检日期:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡检人:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 5000 }}
                        bordered={3}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default HeatTransferStation

