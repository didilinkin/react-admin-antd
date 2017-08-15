// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message} from 'antd'
import { apiPost } from '../../../api'
// 引入组件
const { RangePicker } = DatePicker

// React component
class WaterTank extends Component {
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
            'deviceMaintain/getGasExtinguisher'
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
                title: '1号瓶',
                width: 150,
                dataIndex: 'bottle1',
                key: 'bottle1'
            }, {
                title: '2号瓶',
                width: 150,
                dataIndex: 'bottle2',
                key: 'bottle2'
            }, {
                title: '3号瓶',
                width: 150,
                dataIndex: 'bottle3',
                key: 'bottle3'
            }, {
                title: '4号瓶',
                width: 150,
                dataIndex: 'bottle4',
                key: 'bottle4'
            }, {
                title: '5号瓶',
                width: 150,
                dataIndex: 'bottle5',
                key: 'bottle5'
            }, {
                title: '6号瓶',
                width: 150,
                dataIndex: 'bottle6',
                key: 'bottle6'
            }, {
                title: '7号瓶',
                width: 150,
                dataIndex: 'bottle7',
                key: 'bottle7'
            }, {
                title: '8号瓶',
                width: 150,
                dataIndex: 'bottle8',
                key: 'bottle8'
            }, {
                title: '9号瓶',
                width: 150,
                dataIndex: 'bottle9',
                key: 'bottle9'
            }, {
                title: '10号瓶',
                width: 150,
                dataIndex: 'bottle10',
                key: 'bottle10'
            }, {
                title: '11号瓶',
                width: 150,
                dataIndex: 'bottle11',
                key: 'bottle11'
            }, {
                title: '启动瓶',
                width: 150,
                dataIndex: 'bottle12',
                key: 'bottle12'
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
            window.location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',16'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getGasExtinguisher',
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
                    <span>巡检日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡检人&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1900 }}
                        bordered={3}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default WaterTank

