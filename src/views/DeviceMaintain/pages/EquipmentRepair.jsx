// 设备维护 - 设备维护保障 - 设备报修
import React from 'react'
import {Table, Button, Spin, DatePicker, Input, Select } from 'antd'
import '../../../style/test.less'
import { apiPost } from '../../../api'
const { RangePicker } = DatePicker
const Option = Select.Option
class EquipmentRepair extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            columns: [],
            dataSource: []
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            '/deviceMaintain/maintenance/equipmentRepairList'
        )
        this.setState({
            columns: [{
                title: '序号',
                width: 200,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '送修时间',
                width: 150,
                dataIndex: 'repairDate',
                key: 'repairDate'
            }, {
                title: '维修单号',
                width: 150,
                dataIndex: 'maintenanceNumber',
                key: 'maintenanceNumber'
            }, {
                title: '设备编号',
                width: 150,
                dataIndex: 'equipmentNumber',
                key: 'equipmentNumber'
            }, {
                title: '设备名称',
                width: 100,
                dataIndex: 'equipmentName',
                key: 'equipmentName'
            }, {
                title: '故障等级',
                width: 100,
                dataIndex: 'failureLevel',
                key: 'failureLevel'
            }, {
                title: '维修状态',
                width: 150,
                dataIndex: 'repairStatus',
                key: 'repairStatus'
            }, {
                title: '报修人',
                width: 150,
                dataIndex: 'repairerName',
                key: 'repairerName'
            }, {
                title: '维修明细',
                width: 150,
                dataIndex: 'wxmx',
                key: 'wxmx',
                render: function (text, record, index) {
                    let url = '/deviceMaintain/repairRecord/' + record.id
                    return (
                        <a href={url}>查看明细</a>
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
            '/deviceMaintain/maintenance/equipmentRepairList',
            {'startTime': this.startDate,
                'endTime': this.endDate,
                'failureLevel': this.equipmentName,
                'equipmentName': this.maintenanceManName
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
    failureLevel = ''
    failureLevelFn = (value) => {
        this.failureLevel = value
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
    equipmentName = ''
    equipmentNameFn = (e) => {
        this.equipmentName = e.target.value
    }
    render () {
        return (
            <div>
                <span>
                    <span>送修时间:</span>
                    <RangePicker onChange={this.getDate} />
                    <span>故障等级:</span>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.failureLevelFn}
                    >
                        <Option key="紧急">紧急</Option>
                        <Option key="重大">重大</Option>
                        <Option key="一般">一般</Option>
                    </Select>
                    <span>设备名称:</span>
                    <Input style={{width: 200}} onChange={this.equipmentNameFn} />
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
export default EquipmentRepair
