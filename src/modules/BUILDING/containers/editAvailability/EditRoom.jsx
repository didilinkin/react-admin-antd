// 房间管理
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select, Popconfirm, Icon, notification} from 'antd'
import { apiPost } from '../../../../api'
import AddRoom from '../../components/RoomAdd'
// 引入组件
const Option = Select.Option
// React component
class EditRoom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            title: '',
            columns: [],
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            title: '编辑房间',
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/build/deleteRoom',
            {id: id,
                delFlag: 1}
        )
        notification.open({
            message: '删除成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    add = () => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            title: '添加房间',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/build/roomList'
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
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
                title: '建筑面积（㎡）',
                width: 300,
                dataIndex: 'roomArea',
                key: 'roomArea'
            }, {
                title: '层高',
                width: 250,
                dataIndex: 'roomHeight',
                key: 'roomHeight'
            }, {
                title: '房间状态',
                width: 250,
                dataIndex: 'roomStatus',
                key: 'roomStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.propertyType === 2) {
                        whType = '--'
                    }
                    if (record.roomStatus === 0) {
                        whType = '空置'
                    }
                    if (record.roomStatus === 1) {
                        whType = '已租'
                    }
                    if (record.roomStatus === 2) {
                        whType = '自用'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '产权性质',
                width: 250,
                dataIndex: 'propertyType',
                key: 'propertyType',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.propertyType === 0) {
                        whType = '自有'
                    }
                    if (record.propertyType === 1) {
                        whType = '使用权'
                    }
                    if (record.propertyType === 2) {
                        whType = '出售'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '产权单位',
                width: 250,
                dataIndex: 'propertyOwner',
                key: 'propertyOwner'
            }, {
                title: '产权联系人',
                width: 250,
                dataIndex: 'linkman',
                key: 'linkman'
            }, {
                title: '联系方式',
                width: 250,
                dataIndex: 'phoneNum',
                key: 'phoneNum'
            }, {
                title: '备注',
                width: 250,
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
                            <a href="#" onClick={() => handleUpdate(record.id)} > 编辑 </a>
                            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                <a href="#" > 删除 </a>
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
            '/build/roomList',
            {'propertyType': this.propertyType,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'roomStatus': this.roomStatus
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
    roomNum = null
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    buildId = null
    selectBuild = (e) => {
        this.buildId = e
    }
    propertyType = null
    selectPropertyType = (e) => {
        this.propertyType = e
    }
    roomStatus = null
    selectRoomStatus = (e) => {
        this.roomStatus = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <div>
                <AddRoom
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                    title={this.state.title}
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
                    <span>房间编号:&nbsp;&nbsp;</span>
                    <Input style={{width: 100,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>产权性质:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请选择产权性质"
                        optionFilterProp="children"
                        onChange={this.selectPropertyType}
                    >
                        <Option key="0">自有</Option>
                        <Option key="1">使用权</Option>
                        <Option key="2">出售</Option>
                    </Select>
                    <span>房间状态:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{ width: 150 }}
                        placeholder="请选择房间状态"
                        optionFilterProp="children"
                        onChange={this.selectRoomStatus}
                    >
                        <Option key="0">空置</Option>
                        <Option key="1">已租</Option>
                        <Option key="2">自用</Option>
                    </Select>
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加房间</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1900 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default EditRoom


