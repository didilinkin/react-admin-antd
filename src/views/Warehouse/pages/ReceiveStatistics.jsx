// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件
import WarehouseAddUpComponent from './common/WarehouseAddUp'
import WarehouseUpdateComponent from './common/WarehouseUpdate'
const Option = Select.Option
// React component
class RepairList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            warehouseId: 0,
            amount: 0,
            number: 0,
            unitPrice: 0
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            'http://127.0.0.1:18082/warehouse/getRecipient'
        )
        this.setState({loading: true})
        result = await apiPost(
            'http://127.0.0.1:18082/warehouse/receiveStatistics'
        )
        this.setState({loading: false,
            columns: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 100,
                fixed: 'left',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '商品信息',
                background: '#41e946',
                children: [{
                    title: '仓库类型',
                    dataIndex: 'wh_type',
                    key: 'wh_type',
                    width: 100,
                    render: function (text, record, index) {
                        let whType = '工程库'
                        if (record.wh_type === 1) {
                            whType = '保洁用品库'
                        }
                        if (record.wh_type === 2) {
                            whType = '行政库'
                        }
                        return (
                            <span>{whType}</span>
                        )
                    }
                }, {
                    title: '材料名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 100
                }, {
                    title: '规格',
                    dataIndex: 'standard',
                    key: 'standard',
                    width: 100
                }, {
                    title: '单位',
                    dataIndex: 'unit',
                    key: 'unit',
                    width: 100
                },
                {
                    title: '单价',
                    dataIndex: 'unit_price',
                    key: 'unit_price',
                    width: 100
                },
                {
                    title: '上月剩余',
                    dataIndex: 'preNumber',
                    key: 'preNumber',
                    width: 100
                }]
            }, {
                title: '出库',
                dataIndex: 'title',
                key: 'title',
                width: 100,
                children: [{
                    title: '总计',
                    dataIndex: 'title',
                    key: 'title'
                }, {
                    title: '领用金额',
                    dataIndex: 'amount',
                    key: 'amount'
                }]
            }, {
                title: '剩余',
                children: [{
                    title: '剩余数量',
                    dataIndex: 'number',
                    key: 'number'
                }, {
                    title: '剩余金额',
                    dataIndex: 'amount',
                    key: 'amount'
                }]
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
            'http://127.0.0.1:18082/warehouse/inventoryManage',
            {'startDate': this.startDate,
                'name': this.name,
                'whType': this.whType
            }
        )
        this.setState({
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            opendispatch: false,
            openAdd: true,
            openUpdate: false,
            openTableAddUp: false
        })
    }
    name = ''
    entryNameOnChange = (e) => {
        this.name = e.target.value
    }
    whType = ''
    selectOnChange = (e) => {
        this.whType = e
    }
    query = () => {
        this.refresh()
    }
    startDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
    }
    render () {
        return (
            <div>
                <WarehouseAddUpComponent
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                />
                <WarehouseUpdateComponent
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                    warehouseId= {this.state.warehouseId}
                    amount={this.state.amount}
                    number={this.state.number}
                    unitPrice={this.state.unitPrice}
                />
                <span>
                    <span>查询截止日期:</span>
                    <DatePicker onChange={this.getDate} />
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择仓库"
                        optionFilterProp="children"
                        onSelect={this.selectOnChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option key="0">工程部</Option>
                        <Option key="1">保洁用品</Option>
                        <Option key="2">行政库</Option>
                    </Select>
                    <span>材料名称:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>入库</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1200 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default RepairList

