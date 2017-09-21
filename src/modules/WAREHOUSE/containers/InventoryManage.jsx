// 仓库管理 - 库存管理
import React from 'react'

import { Table, Button, Spin, Input, Select, DatePicker } from 'antd'

import { apiPost } from '../../../api'

// 引入组件
import WarehouseAddUp from '../components/InventoryManage/WarehouseAddUp'
import WarehouseUpdate from '../components/InventoryManage/WarehouseUpdate'

const Option = Select.Option

class InventoryManage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 15,
            warehouseId: 0,
            amount: 0,
            number: 0,
            unitPrice: 0
        }
    }

    handleUpdate = (id, amount, number, unitPrice) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            warehouseId: id,
            amount: amount,
            number: number,
            unitPrice: unitPrice
        })
    }
    info = (url) => {
        this.props.history.push(url)
    }
    async initialRemarks () {
        this.setState({ loading: true })
        let result = await apiPost(
            '/warehouse/inventoryManage',
            {page: this.state.page}
        )
        const handleUpdate = this.handleUpdate
        const info = this.info
        this.setState({
            loading: false,
            total: result.data.total,
            columns: [{
                title: '序号',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '仓库类型',
                width: 150,
                dataIndex: 'whType',
                key: 'whType',
                render: function (text, record, index) {
                    let whType = '工程库'
                    if (record.whType === 1) {
                        whType = '保洁用品库'
                    }
                    if (record.whType === 2) {
                        whType = '行政库'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '材料名称',
                width: 150,
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '存放位置',
                width: 150,
                dataIndex: 'storagePlace',
                key: 'storagePlace'
            }, {
                title: '规格',
                width: 150,
                dataIndex: 'standard',
                key: 'standard'
            }, {
                title: '单位',
                width: 150,
                dataIndex: 'unit',
                key: 'unit'
            }, {
                title: '单价',
                width: 150,
                dataIndex: 'unitPrice',
                key: 'unitPrice'
            }, {
                title: '库存数量',
                width: 150,
                dataIndex: 'number',
                key: 'number'
            }, {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/wareHouse/inventory/' + record.warehouseId
                    return (
                        <div>
                            <a onClick={() => info(url)}> 明细 &nbsp;</a>
                            <a onClick={() => handleUpdate(record.warehouseId, record.amount, record.number, record.unitPrice)} >&nbsp; 出库</a>
                        </div>
                    )
                }
            }],
            dataSource: result.data.rows
        })
    }

    componentDidMount = () => {
        this.initialRemarks()
    }
    json={}
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        if (pagination === null) {
            this.json = filters
        }
        for (let p in this.json) {
            filters[p] = this.json[p]
        }
        filters['startDate'] = this.startDate
        filters['name'] = this.name
        filters['whType'] = this.whType
        if (pagination !== null && typeof (pagination) !== 'undefined') {
            filters['rows'] = pagination.pageSize
            filters['page'] = pagination.current
            this.setState({
                page: pagination.current
            })
        } else {
            this.setState({
                page: 1
            })
        }
        // 刷新表格
        let result = await apiPost(
            '/warehouse/inventoryManage',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data.rows,
            total: result.data.total,
            id: 0
        })
    }

    // 弹出框设置
    showModal = () => {
        this.setState({
            openAdd: true,
            openUpdate: false,
            openTableAddUp: false
        })
    }

    name = null
    entryNameOnChange = (e) => {
        this.name = e.target.value
    }

    whType = null
    selectOnChange = (e) => {
        this.whType = e
    }

    startDate = null
    getDate = (e) => {
        if (e !== null) {
            this.startDate = e.format('YYYY-MM-DD')
        } else {
            this.startDate = null
        }
    }
    close = async () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false
        })
    }
    query = () => {
        this.refresh()
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    enterKey = (event) => {
        if (event.keyCode === 13) { // enter 键
            this.refresh()
        }
    }
    render () {
        return (
            <div onKeyDown={this.enterKey}>
                <WarehouseAddUp
                    refreshTable={ this.refresh }
                    visible={ this.state.openAdd }
                    close={this.close}
                />

                <WarehouseUpdate
                    refreshTable={ this.refresh }
                    visible={ this.state.openUpdate }
                    close={this.close}
                    warehouseId={ this.state.warehouseId }
                    amount={ this.state.amount }
                    number={ this.state.number }
                    unitPrice={ this.state.unitPrice }
                />

                <span
                    style={{
                        paddingBottom: '10px',
                        display: 'block'
                    }}
                >
                    <span>截止日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <DatePicker
                        style={{
                            width: 200,
                            marginRight: '5px'
                        }} onChange={ this.getDate }
                    />

                    <span>仓库类型&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{
                            width: 200,
                            marginRight: '5px'
                        }}
                        placeholder="请选择仓库"
                        optionFilterProp="children"
                        onChange={ this.selectOnChange }
                    >
                        <Option key="0">工程库</Option>
                        <Option key="1">保洁用品库</Option>
                        <Option key="2">行政库</Option>
                    </Select>

                    <span>&nbsp;&nbsp;&nbsp;&nbsp;材料名称&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <Input
                        style={{
                            width: 200,
                            marginRight: '5px'
                        }}
                        onChange={ this.entryNameOnChange }
                    />
                    <Button style={{ marginRight: '5px' }} type="primary" onClick={ this.query }>查询</Button>
                    <Button type="primary" onClick={ this.showModal }>入库</Button>
                </span>

                <Spin spinning={ this.state.loading }>
                    <Table
                        onChange={this.refresh}
                        rowSelection={{
                            onChange: this.onSelectChange
                        }}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['15', '30', '45'],
                            current: this.state.page,
                            defaultPageSize: this.state.rows}}
                        scroll={{ x: 1500 }}
                        bordered
                        dataSource={ this.state.dataSource }
                        columns={ this.state.columns }
                    />
                </Spin>
            </div>
        )
    }
}

export default InventoryManage
