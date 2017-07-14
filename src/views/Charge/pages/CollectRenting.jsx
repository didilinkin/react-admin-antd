// 收费管理 - 应收租金
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select } from 'antd'
import { apiPost } from '../../../api'
import CollectRentConductComponent from './components/PaidConfirm'
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
            dataSource: [],
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
            {auditStatus: 0}
        )
        const handleUpdate = this.handleUpdate
        this.setState({loading: false,
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
                            <Button type="primary" onClick={() => handleUpdate(record.id)} >收租</Button>
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
            '/collectRent/rentingList',
            {'periodStatus': this.periodStatus,
                'rentClientName': this.rentClientName,
                'roomNum': this.roomNum,
                'auditStatus': 0
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
    rentClientName = ''
    entryNameOnChange = (e) => {
        this.rentClientName = e.target.value
    }
    roomNum = ''
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    periodStatus = ''
    selectOnChange = (e) => {
        this.periodStatus = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <CollectRentConductComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                    accountLsit={this.state.accountList}
                />
                <span>
                    <span>房间编号:</span>
                    <Input style={{width: 150}} onChange={this.entryNumberOnChange} />
                    <span>客户名称:</span>
                    <Input style={{width: 150}} onChange={this.entryNameOnChange} />
                    <Select
                        showSearch
                        style={{ width: 150 }}
                        placeholder="请选择交费周期"
                        optionFilterProp="children"
                        onSelect={this.selectOnChange}
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
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CollectRenting


