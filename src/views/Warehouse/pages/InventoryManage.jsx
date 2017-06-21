// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Input, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件
import WarehouseAddUpComponent from './common/WarehouseAddUp'
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
            id: 0
        }
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            'http://127.0.0.1:18082/warehouse/inventoryManage'
        )
        this.setState({loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '仓库类型',
                width: 100,
                dataIndex: 'storeroomType',
                key: 'storeroomType',
                render: function (text, record, index) {
                    let storeroomType = '工程库'
                    if (record.storeroomType === 1) {
                        storeroomType = '保洁用品库'
                    }
                    return (
                        <span>{storeroomType}</span>
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
                width: 100,
                dataIndex: 'standard',
                key: 'standard'
            }, {
                title: '单位',
                width: 100,
                dataIndex: 'unit',
                key: 'unit'
            }, {
                title: '单价',
                width: 100,
                dataIndex: 'unitPrice',
                key: 'unitPrice'
            }, {
                title: '库存数量',
                width: 100,
                dataIndex: 'number',
                key: 'number'
            }, {
                title: '金额',
                width: 100,
                dataIndex: 'amount',
                key: 'amount'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/warehouse/warehouseDetail/' + record.warehouseId
                    return (
                        <div>
                            <a href={url}><Button type="primary">明细</Button></a>
                            <Button type="primary" >出库</Button>
                        </div>
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
            'http://127.0.0.1:18082/warehouse/inventoryManage',
            {'startDate': this.startDate,
                'name': this.name
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
                <span>
                    <span>报修日期:</span>
                    <DatePicker onChange={this.getDate} />
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

