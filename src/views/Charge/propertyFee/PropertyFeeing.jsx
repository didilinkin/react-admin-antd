// 收费管理 - 待收费
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select, Popconfirm, Icon, notification} from 'antd'
import { apiPost } from '../../../api'
import PropertyAddComponent from './Details/PropertyFeeAdd'
// 引入组件
const Option = Select.Option
// React component
class PropertyFeeing extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            AccountList: [],
            columns: [],
            dataSource: [],
            ListBuildingInfo: [],
            id: null
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
    handleDelete = async (id) => {
        await apiPost(
            '/propertyFee/updatePropertyFee',
            {id: id,
                delFlag: 1}
        )
        notification.open({
            message: '删除成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    handleCommit = async (id) => {
        await apiPost(
            '/propertyFee/updatePropertyFee',
            {id: id,
                auditStatus: 1}
        )
        notification.open({
            message: '提交成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            openAdd: true,
            openUpdate: false,
            openTableAddUp: false
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            {auditStatus: 0,
                contractStatus: 0}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
        const handleCommit = this.handleCommit
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
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '本期物业费周期',
                width: 250,
                dataIndex: 'periodPropertyFee',
                key: 'periodPropertyFee'
            }, {
                title: '应收金额',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
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
                            <Popconfirm title="确定提交吗?" onConfirm={() => handleCommit(record.id)}>
                                <a href="javascript:" > 提交 </a>
                            </Popconfirm>
                            <a href="javascript:" type="primary" onClick={() => handleUpdate(record.id)} > 重新收费 </a>
                            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                <a href="javascript:" > 删除 </a>
                            </Popconfirm>
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
            '/propertyFee/propertyFeeList',
            {'clientName': this.clientName,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'contractStatus': 0,
                'auditStatus': 0
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
    clientName = null
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    roomNum = ''
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    buildId = ''
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
                <PropertyAddComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                />
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>所属楼宇:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择所属楼宇"
                        optionFilterProp="children"
                        onSelect={this.selectBuild}
                    >
                        {ListBuildingInfo.map(BuildingInfo => {
                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                        })}
                    </Select>
                    <span>房间编号:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>客户名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>收物业费</Button>
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
export default PropertyFeeing


