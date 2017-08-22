// 收费管理 - 审核中
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select, Pagination} from 'antd'
import { apiPost } from '../../../../api/index'
import CollectRentConductComponent from '../details/CollectRent/RentReviewDetail'
// 引入组件
const Option = Select.Option
// React component
class CollectRentConduct extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            total: 0,
            page: 1,
            rows: 30,
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
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
            '/collectRent/collectRentList',
            {auditStatus: 1,
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
                title: '交费期限',
                width: 150,
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a onClick={() => handleUpdate(record.id)} > 明细 &nbsp;</a>
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
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            '/collectRent/collectRentList',
            {'periodStatus': this.periodStatus,
                'rentClientName': this.rentClientName,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'page': this.state.page,
                'rows': this.state.rows,
                'auditStatus': 1
            }
        )
        this.setState({
            openAdd: false,
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
    buildId = null
    selectBuild = (e) => {
        this.buildId = e
    }
    periodStatus = null
    selectOnChange = (e) => {
        this.periodStatus = e
    }
    query = () => {
        this.refresh()
    }
    onChange = (page, pageSize) => {
        this.setState({
            page: page
        })
        this.refresh()
    }
    onSizeChange = (current, size) => {
        this.setState({
            rows: size
        })
        this.refresh()
    }
    render () {
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <div>
                <CollectRentConductComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    close={this.close}
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
                    <span>房间编号&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span>交费周期:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        style={{width: 150,
                            marginRight: '5px'}}
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
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                    <Pagination showQuickJumper showSizeChanger defaultCurrent={1}pageSizeOptions={[15, 30, 45]} defaultPageSize={this.state.rows} total={this.state.total} onShowSizeChange={this.onSizeChange} onChange={this.onChange} />
                </Spin>
            </div>
        )
    }
}
export default CollectRentConduct


