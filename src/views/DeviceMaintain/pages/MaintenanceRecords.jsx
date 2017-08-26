// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input} from 'antd'
import { apiPost, baseURL} from '../../../api'
// 引入组件
const { RangePicker } = DatePicker

// React component
class MaintenanceRecords extends Component {
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
            'deviceMaintain/getFightingMaintenance'
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
                title: '维保人员',
                width: 150,
                dataIndex: 'maintenanceName',
                key: 'maintenanceName'
            }, {
                title: '维保内容',
                width: 150,
                dataIndex: 'maintenanceContent',
                key: 'maintenanceContent'
            }, {
                title: '维保结果',
                width: 150,
                dataIndex: 'maintenanceResult',
                key: 'maintenanceResult'
            }, {
                title: '巡检人',
                width: 150,
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '现场图片',
                width: 500,
                dataIndex: 'imgUrl',
                key: 'imgUrl',
                render: function (text, record, index) {
                    let i = 0
                    let arr = []
                    record.imgUrl.split('#').map(img => {
                        if (img !== '') {
                            i++
                            arr.push(
                                <img key={i} style={{width: '100px',
                                    height: '100px'}} src={baseURL + 'storage/files/' + img} alt=""
                                />)
                        }
                        return ''
                    })
                    return arr
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
            'deviceMaintain/getFightingMaintenance',
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
export default MaintenanceRecords

