// 设备维护 - 设备巡检 - 电器系统 - 配电房巡查记录
import React from 'react'
import {Table, Button, Spin, DatePicker, Input, Modal, message } from 'antd'
import '../../../style/test.less'
import { apiPost } from '../../../api'
const { RangePicker } = DatePicker
class DistributionRoom extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            open: false,
            list: [],
            id: '',
            columns: [],
            dataSource: []
        }
    }
    info = async (id) => {
        let result = await apiPost(
            '/deviceMaintain/inspection/electric/Transformerlist',
            {distributionId: id}
        )
        this.setState({
            list: result.data,
            open: true,
            id: id
        })
    }
    abnormal = async (id, type) => {
        let resulData = await apiPost('/deviceMaintain/electricalErrorDevice',
            {parentId: id,
                parentType: type})
        if (resulData.data !== null) {
            location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',1'
        } else {
            message.info('无异常信息')
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            '/deviceMaintain/inspection/electric/list'
        )
        const info = this.info
        const abnormal = this.abnormal
        this.setState({
            columns: [{
                title: '机房编号',
                width: 200,
                dataIndex: 'machineRoomNumber',
                key: 'machineRoomNumber'
            }, {
                title: '机房名称',
                width: 150,
                dataIndex: 'machineRoomName',
                key: 'machineRoomName'
            }, {
                title: '巡检日期',
                width: 150,
                dataIndex: 'inspectionDate',
                key: 'inspectionDate'
            }, {
                title: '配电室设备',
                width: 150,
                dataIndex: 'distributionState',
                key: 'distributionState'
            }, {
                title: '发电机房',
                width: 100,
                dataIndex: 'alternatorState',
                key: 'alternatorState'
            }, {
                title: '变压器',
                width: 100,
                dataIndex: 'transformer',
                key: 'transformer',
                render: function (text, record, index) {
                    return (
                        <Button onClick={() => info(record.id)}>查看明细</Button>
                    )
                }
            }, {
                title: '高压总表',
                width: 150,
                dataIndex: 'voltmeter',
                key: 'voltmeter'
            }, {
                title: '空调机房',
                width: 150,
                dataIndex: 'conditioner',
                key: 'conditioner'
            }, {
                title: '各区域　卫生',
                width: 150,
                dataIndex: 'hygiene',
                key: 'hygiene'
            }, {
                title: '各楼层公共区域照明',
                width: 250,
                dataIndex: 'lighting',
                key: 'lighting'
            }, {
                title: '各配电箱',
                width: 150,
                dataIndex: 'electricBox',
                key: 'electricBox'
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
                        <Button onClick={() => abnormal(record.id, 1)}>查看</Button>
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
            '/deviceMaintain/inspection/electric/list',
            {'startDate': this.startDate,
                'endDate': this.endDate,
                'patrolName': this.patrolName
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
    patrolName = ''
    entryNameOnChange = (e) => {
        this.patrolName = e.target.value
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
    render () {
        return (
            <div>
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>巡查日期:&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡查人:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1550 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
                <Modal maskClosable={false}
                    title="变压器巡检信息"
                    style={{top: 20}}
                    width={800}
                    visible={this.state.open}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Table
                        bordered
                        dataSource={this.state.list}
                        columns={[{
                            title: '设备名称',
                            width: 200,
                            dataIndex: 'equipmentName',
                            key: 'equipmentName'
                        }, {
                            title: '变电流',
                            width: 200,
                            dataIndex: 'electricCurrent',
                            key: 'electricCurrent',
                            children: [
                                {
                                    title: 'A',
                                    width: 200,
                                    dataIndex: 'electricCurrentA',
                                    key: 'electricCurrentA'
                                },
                                {
                                    title: 'B',
                                    width: 200,
                                    dataIndex: 'electricCurrentB',
                                    key: 'electricCurrentB'
                                },
                                {
                                    title: 'C',
                                    width: 200,
                                    dataIndex: 'electricCurrentC',
                                    key: 'electricCurrentC'
                                },
                                {
                                    title: 'N',
                                    width: 200,
                                    dataIndex: 'electricCurrentN',
                                    key: 'electricCurrentN'
                                }
                            ]
                        }, {
                            title: '变电压',
                            width: 200,
                            dataIndex: 'voltage',
                            key: 'voltage',
                            children: [
                                {
                                    title: 'A',
                                    width: 200,
                                    dataIndex: 'voltageA',
                                    key: 'voltageA'
                                },
                                {
                                    title: 'B',
                                    width: 200,
                                    dataIndex: 'voltageB',
                                    key: 'voltageB'
                                },
                                {
                                    title: 'C',
                                    width: 200,
                                    dataIndex: 'voltageC',
                                    key: 'voltageC'
                                }
                            ]
                        }, {
                            title: '变温度',
                            width: 200,
                            dataIndex: 'temperature',
                            key: 'temperature',
                            children: [
                                {
                                    title: 'A',
                                    width: 200,
                                    dataIndex: 'temperatureA',
                                    key: 'temperatureA'
                                },
                                {
                                    title: 'B',
                                    width: 200,
                                    dataIndex: 'temperatureB',
                                    key: 'temperatureB'
                                },
                                {
                                    title: 'C',
                                    width: 200,
                                    dataIndex: 'temperatureC',
                                    key: 'temperatureC'
                                }
                            ]
                        }]}
                    />
                </Modal>
            </div>
        )
    }
}
export default DistributionRoom
