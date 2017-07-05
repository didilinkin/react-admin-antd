// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Input, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件

const { RangePicker } = DatePicker
// React component
class TableAddUp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            columns: [],
            dataSource: []
        }
    }
    async initialRemarks (nextProps) {
        if (nextProps.visible) {
            let result = await apiPost(
                '/warehouse/getWarehouseDetail',
                {'warehouseId': this.props.match.params.id}
            )
            this.setState({
                loading: false,
                columns: [{
                    title: '序号',
                    width: 80,
                    dataIndex: 'id',
                    key: 'id'
                }, {
                    title: '出入库日期 ',
                    width: 150,
                    dataIndex: 'warehouseDate',
                    key: 'warehouseDate'
                }, {
                    title: '类型',
                    width: 100,
                    dataIndex: 'warehouseType',
                    key: 'warehouseType',
                    render: function (text, record, index) {
                        let warehouseType = '入库'
                        if (record.warehouseType === 1) {
                            warehouseType = '出库'
                        }
                        return (
                            <span>{warehouseType}</span>
                        )
                    }
                }, {
                    title: '凭证号',
                    width: 150,
                    dataIndex: 'voucherNo',
                    key: 'voucherNo'
                }, {
                    title: '数量',
                    width: 150,
                    dataIndex: 'number',
                    key: 'number'
                }, {
                    title: '金额',
                    width: 100,
                    dataIndex: 'amount',
                    key: 'amount'
                }, {
                    title: '备注',
                    width: 100,
                    dataIndex: 'remark',
                    key: 'remark'
                }, {
                    title: '采购人',
                    width: 100,
                    dataIndex: 'purchase',
                    key: 'purchase'
                }, {
                    title: '验收人',
                    width: 100,
                    dataIndex: 'acceptor',
                    key: 'acceptor'
                }, {
                    title: '领用人',
                    width: 100,
                    dataIndex: 'recipient',
                    key: 'recipient'
                }, {
                    title: '操作人',
                    width: 100,
                    dataIndex: 'createBy',
                    key: 'createBy'
                }, {
                    title: '操作时间',
                    width: 100,
                    dataIndex: 'createDate',
                    key: 'createDate'
                }, {
                    title: '操作',
                    width: 200,
                    dataIndex: 'fileUrl',
                    key: 'fileUrl'
                }],
                dataSource: result.data
            })
        }
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            '/warehouse/inventoryManage',
            {'storeroomType': this.storeroomType,
                'materialName': this.materialName,
                'storagePlace': this.storagePlace
            }
        )
        this.setState({
            openinvalid: false,
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
            openinvalid: false,
            openUpdate: false,
            openTableAddUp: true
        })
    }
    clientName = ''
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    query = () => {
        this.refresh()
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        this.endDate = dateString[1]
    }
    render () {
        return (
            <div>
                <span>
                    <span>报修日期:</span>
                    <RangePicker onChange={this.getDate}
                    />
                    <span>公司名称:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>入库</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1300 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default TableAddUp

