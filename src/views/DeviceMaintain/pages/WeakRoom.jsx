// 设备维护 - 设备巡检 - 电器系统 - 弱电间巡查记录
import React from 'react'
import {Table, Button, Spin, DatePicker, Input, message } from 'antd'
import '../../../style/test.less'
import { apiPost } from '../../../api'
const { RangePicker } = DatePicker
class WeakRoom extends React.Component {
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
            location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',1'
        } else {
            message.info('无异常信息')
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            '/deviceMaintain/inspection/electric/ListRoom'
        )
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
                title: '巡查人',
                width: 150,
                dataIndex: 'createName',
                key: 'createName'
            }, {
                title: '楼层',
                width: 100,
                dataIndex: 'floor',
                key: 'floor'
            }, {
                title: '开关',
                width: 100,
                dataIndex: 'switchs',
                key: 'switchs'
            }, {
                title: '接线端子',
                width: 150,
                dataIndex: 'connectionTerminal',
                key: 'connectionTerminal'
            }, {
                title: '箱表面',
                width: 150,
                dataIndex: 'caseSurface',
                key: 'caseSurface'
            }, {
                title: '双电源箱',
                width: 150,
                dataIndex: 'doublePowerBox',
                key: 'doublePowerBox'
            }, {
                title: '清扫情况',
                width: 200,
                dataIndex: 'qs',
                key: 'qs',
                children: [{
                    title: '清扫',
                    width: 100,
                    dataIndex: 'cleaning',
                    key: 'cleaning'
                }, {
                    title: '托拭',
                    width: 100,
                    dataIndex: 'dragSwabs',
                    key: 'dragSwabs'
                }]
            }, {
                title: '照明情况',
                width: 150,
                dataIndex: 'lighting',
                key: 'lighting'
            }, {
                title: '其他',
                width: 150,
                dataIndex: 'other',
                key: 'other'
            }, {
                title: '异常情况',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <Button onClick={() => abnormal(record.id, 2)}>查看</Button>
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
            '/deviceMaintain/inspection/electric/ListRoom',
            {'startTime': this.startDate,
                'endTime': this.endDate,
                'createName': this.createName,
                'floor': this.floor
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
    floor = ''
    floorFn = (e) => {
        this.floor = e.target.value
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
                    <span>楼层:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.floorFn} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        bordered
                        scroll={{ x: 1550 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default WeakRoom
