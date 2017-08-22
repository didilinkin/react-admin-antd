// 收费管理 - 待收租
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select, Pagination} from 'antd'
import { apiPost } from '../../../../api/index'
import CollectRentConductComponent from '../details/CollectRent/PaidConfirm'
// 引入组件
const Option = Select.Option
// React component
class CollectRenting extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            AccountList: [],
            columns: [],
            total: 0,
            page: 1,
            rows: 30,
            dataSource: [],
            ListBuildingInfo: [],
            id: 0
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openinvalid: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/collectRent/rentingList',
            {auditStatus: 0,
                page: this.state.page,
                rows: this.state.rows}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        this.setState({loading: false,
            total: result.total,
            ListBuildingInfo: ListBuildingInfo.data,
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
                title: '所属楼宇',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '房间编号',
                width: 250,
                dataIndex: 'roomNum',
                key: 'roomNum'
            }, {
                title: '客户名称',
                width: 300,
                dataIndex: 'rentClientName',
                key: 'rentClientName'
            }, {
                title: '交费周期',
                width: 150,
                dataIndex: 'periodStatus',
                key: 'periodStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.periodStatus === 3) {
                        whType = '季付'
                    }
                    if (record.periodStatus === 6) {
                        whType = '半年付'
                    }
                    if (record.periodStatus === 12) {
                        whType = '年付'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '本期租金周期',
                width: 250,
                dataIndex: 'periodRent',
                key: 'periodRent'
            }, {
                title: '本期租金',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '预计下单日',
                width: 150,
                dataIndex: 'predictOrdersDate',
                key: 'predictOrdersDate'
            }, {
                title: '预计到账日',
                width: 150,
                dataIndex: 'predictReceiptDate',
                key: 'predictReceiptDate'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a type="primary" onClick={() => handleUpdate(record.id)} > 收租 &nbsp;</a>
                        </div>
                    )
                }
            }],
            dataSource: result.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (size, page) => {
        // 刷新表格
        let result = await apiPost(
            '/collectRent/rentingList',
            {'periodStatus': this.periodStatus,
                'rentClientName': this.rentClientName,
                'roomNum': this.roomNum,
                'page': page,
                'rows': size,
                'buildId': this.buildId,
                'auditStatus': 0
            }
        )
        this.setState({
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.rows,
            total: result.total,
            id: 0
        })
    }
    refresh1 = async () => {
        // 刷新表格
        let result = await apiPost(
            '/collectRent/rentingList',
            {'periodStatus': this.periodStatus,
                'rentClientName': this.rentClientName,
                'roomNum': this.roomNum,
                'page': this.state.page,
                'rows': this.state.rows,
                'buildId': this.buildId,
                'auditStatus': 0
            }
        )
        this.setState({
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.rows,
            total: result.total,
            id: 0
        })
    }
    close = async () => {
        this.setState({
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false
        })
    }
    rentClientName = null
    entryNameOnChange = (e) => {
        this.rentClientName = e.target.value
    }
    roomNum = null
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    periodStatus = null
    selectOnChange = (e) => {
        this.periodStatus = e
    }
    buildId = null
    selectBuild = (e) => {
        this.buildId = e
    }
    query = () => {
        this.refresh1()
    }
    onChange = (page, pageSize) => {
        this.setState({
            page: page
        })
        this.refresh(this.state.rows, page)
    }
    onSizeChange = (current, size) => {
        this.setState({
            rows: size
        })
        this.refresh(size, this.state.page)
    }
    render () {
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <div>
                <CollectRentConductComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    close={this.close}
                    visible={this.state.openUpdate}
                    accountLsit={this.state.accountList}
                />
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>所属楼宇:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 150,
                            marginRight: '5px'}}
                        placeholder="请选择所属楼宇"
                        optionFilterProp="children"
                        onChange={this.selectBuild}
                    >
                        {ListBuildingInfo.map(BuildingInfo => {
                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                        })}
                    </Select>
                    <span>房间编号:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>客户名称:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span>交费周期:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 150,
                            marginRight: '5px'}}
                        placeholder="请选择交费周期"
                        optionFilterProp="children"
                        onChange={this.selectOnChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option key="3">季付</Option>
                        <Option key="6">半年付</Option>
                        <Option key="12">年付</Option>
                    </Select>
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1500 }}
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                    <Pagination showQuickJumper showSizeChanger defaultCurrent={1}pageSizeOptions={['15', '30', '45']} defaultPageSize={this.state.rows} total={this.state.total} onShowSizeChange={this.onSizeChange} onChange={this.onChange} />
                </Spin>
            </div>
        )
    }
}
export default CollectRenting


