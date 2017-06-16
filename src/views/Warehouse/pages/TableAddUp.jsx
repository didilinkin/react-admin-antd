// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm, Input, DatePicker } from 'antd'
import { apiPost } from '../../../api'
// 引入组件
/*import CancelRepairComponent from './common/CancelRepair'*/
/*import showDetailComponent from './common/DistributeLeaflets'*/
import showDetailComponent from './TableAddUp'
const { RangePicker } = DatePicker
// React component
class TableAddUp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openinvalid: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            visible: false,
            columns: [],
            dataSource: [],
            id: 0
        }
    }
    showDetail = (id) => {
        this.setState({
            opendispatch: false,
            openinvalid: false,
            openTableAddUp: true,
            openUpdate: false,
            id: id
        })
    }
    /*handleUpdate = (id) => {
     this.setState({
     openinvalid: true,
     opendispatch: false,
     openTableAddUp: false,
     openUpdate: false,
     id: id
     })
     }*/
    handleUpdateRepair = (id) => {
        this.setState({
            openinvalid: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    isFirst = true
    async initialRemarks (nextProps) {
        //this.setState({loading: true})
        let result = await apiPost(
                'http://127.0.0.1:18082/warehouse/getWarehouseDetail',
                {'warehouseId': nextProps.id}
            )
        const distributeLeaflets = this.distributeLeaflets
        /*const handleUpdate = this.handleUpdate*/
        this.setState({loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '出入库日起',
                width: 150,
                dataIndex: 'materialName',
                key: 'materialName'
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
                dataIndex: 'materialName',
                key: 'materialName'
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
                dataIndex: 'storageNum',
                key: 'storageNum'
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
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
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

                {/*<CancelRepairComponent
                 id={this.state.id}
                 refreshTable={this.refresh}
                 visible={this.state.openinvalid}
                 />*/}
               {/* <showDetailComponent
                    id={this.state.id}
                    visible={this.state.openTableAddUp}
                />*/}
                {/*<TableAddUpComponent
                 refreshTable={this.refresh}
                 visible={this.state.openTableAddUp}
                 />
                 <TableAddUpComponent
                 id={this.state.id}
                 refreshTable={this.refresh}
                 visible={this.state.openUpdate}
                 />*/}
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

