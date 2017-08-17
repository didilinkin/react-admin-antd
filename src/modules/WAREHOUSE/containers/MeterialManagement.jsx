// 楼宇列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm, Select} from 'antd'
import { apiPost } from '../../../api'
import AddBuilding from '../components/Material/AddMaterial'
const Option = Select.Option
// 引入组件
// React component
class MeterialManagement extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            title: '',
            id: null,
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            title: '修改材料',
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/warehouse/updateMaterial',
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
            title: '添加材料',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/warehouse/materialManagement'
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
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
                title: '材料名称',
                width: 150,
                dataIndex: 'name'
            }, {
                title: '规格',
                width: 250,
                dataIndex: 'standard'
            }, {
                title: '单位',
                width: 300,
                dataIndex: 'unit'
            }, {
                title: '单价',
                width: 250,
                dataIndex: 'unitPrice'
            }, {
                title: '存放位置',
                width: 250,
                dataIndex: 'storagePlace'
            }, {
                title: '仓库类型',
                width: 250,
                dataIndex: 'whType',
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
            '/warehouse/materialManagement',
            {'name': this.name,
                'whType': this.whType
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
    name = null
    entryNameOnChange = (e) => {
        this.name = e.target.value
    }
    whType = null
    selectBuild = (e) => {
        this.whType = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <AddBuilding
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                    title={this.state.title}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>仓库类型&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 150,
                            marginRight: '5px'}}
                        placeholder="请选择仓库"
                        optionFilterProp="children"
                        onChange={this.selectBuild}
                    >
                        <Option key="0">工程库</Option>
                        <Option key="1">保洁用品库</Option>
                        <Option key="2">行政库</Option>
                    </Select>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;物品名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加材料</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1100 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default MeterialManagement


