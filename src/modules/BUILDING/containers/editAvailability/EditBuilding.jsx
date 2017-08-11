// 楼宇列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm} from 'antd'
import { apiPost } from '../../../../api'
import AddBuilding from '../../components/BuidAdd'
// 引入组件
// React component
class EditBuilding extends Component {
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
            title: '修改楼宇',
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/build/deleteBuild',
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
            title: '添加楼宇',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/build/buildList'
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
                title: '楼宇名称',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '楼层数量',
                width: 250,
                dataIndex: 'floorNum',
                key: 'floorNum'
            }, {
                title: '客梯数量',
                width: 300,
                dataIndex: 'passengerElevatorNum',
                key: 'passengerElevatorNum'
            }, {
                title: '货梯数量',
                width: 250,
                dataIndex: 'goodsElevatorNum',
                key: 'goodsElevatorNum'
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
            '/build/buildList',
            {'buildName': this.buildName
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
    buildName = null
    entryNameOnChange = (e) => {
        this.buildName = e.target.value
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
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;楼宇名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加楼宇</Button>
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
export default EditBuilding


