// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件
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
        let result2 = await apiPost(
            '/warehouse/getRecipient'
        )
        let list = result2.data
        let number = {
            title: '总计',
            dataIndex: 'number1',
            key: 'number1'
        }
        let amount = {
            title: '领用金额',
            dataIndex: 'amount1',
            key: 'amount1'
        }
        list.push(number)
        list.push(amount)
        this.setState({loading: true})
        let result = await apiPost(
            '/warehouse/receiveStatistics'
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
                },
                {
                    title: '上月剩余金额',
                    dataIndex: 'preAmount',
                    key: 'preAmount',
                    width: 100
                }]
            }, {
                title: '出库',
                width: 100,
                children: list
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
            '/warehouse/receiveStatistics',
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
    getDate = (e) => {
        if (e !== null) {
            this.startDate = e.format('YYYY-MM-DD')
        } else {
            this.startDate = ''
        }
    }
    render () {
        return (
            <div>
                <span>
                    <span>查询截止日期:&nbsp;&nbsp;</span>
                    <DatePicker style={{width: 200,
                        marginRight: '5px'}} onChange={this.getDate} />
                    <Select
                        showSearch
                        style={{ width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择仓库"
                        optionFilterProp="children"
                        onSelect={this.selectOnChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option key="0">工程库</Option>
                        <Option key="1">保洁用品库</Option>
                        <Option key="2">行政库</Option>
                    </Select>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;材料名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1900 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        bordered
                        size="middle"
                    />
                </Spin>
            </div>
        )
    }
}
export default RepairList

