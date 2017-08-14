// 能源管理押金
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select } from 'antd'
import { apiPost } from '../../../../api'
import CashDepositChargeComponent from '../../components/CashDeposit/CashdepsitCharge'
import CashDepositRefundComponent from '../../components/CashDeposit/CashdepsitRefund'
// 引入组件
const Option = Select.Option
// React component
class CashDepositProperty extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    handleUpdate2 = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            id: id
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/cashDeposit/cashDepositList',
            {chargeItem: 2}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleUpdate2 = this.handleUpdate2
        this.setState({loading: false,
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
                dataIndex: 'sublietName',
                key: 'sublietName'
            }, {
                title: '当前结余',
                width: 250,
                dataIndex: 'currentBalance',
                key: 'currentBalance'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/upkeep/cashDepositDetail/' + record.id
                    if (record.currentBalance !== 0) {
                        return (
                            <div>
                                <a href={url}> 明细 &nbsp;</a>
                                <a onClick={() => handleUpdate(record.id)} > 扣款 </a>
                                <a onClick={() => handleUpdate2(record.id)} > 退款 </a>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <a href={url}> 明细 &nbsp;</a>
                            </div>
                        )
                    }
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
            '/cashDeposit/cashDepositList',
            {'sublietName': this.sublietName,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'chargeItem': 2
            }
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    sublietName = null
    entryNameOnChange = (e) => {
        this.sublietName = e.target.value
    }
    roomNum = null
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    buildId = null
    selectBuild = (e) => {
        this.buildId = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <div>
                <CashDepositChargeComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="扣款"
                    visible={this.state.openUpdate}
                />
                <CashDepositRefundComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="退款"
                    visible={this.state.openAdd}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>所属楼宇:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择所属楼宇"
                        optionFilterProp="children"
                        onChange={this.selectBuild}
                    >
                        {ListBuildingInfo.map(BuildingInfo => {
                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                        })}
                    </Select>
                    <span>房间编号:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1200 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CashDepositProperty


