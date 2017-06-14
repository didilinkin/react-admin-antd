// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm, Input} from 'antd'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import { apiPost } from '../../../api'
// 引入组件
import CancelRepairComponent from './CancelRepair'
import DistributeLeafletsComponent from './DistributeLeaflets'
// Reducer
function reducer (state, action) {
    switch (action.type) {
        case 'update':
            return Object.assign({}, state, {
                id: action.payload,
                IdType: 'openinvalid'
            })
        case 'distributeLeaflets':
            return Object.assign({}, state, {
                id: action.payload,
                IdType: 'opendispatch'
            })
        default:
            return {
                count: action.payload,
                id: 0
            }
    }
}
// Store
const store = createStore(reducer, {
    count: [],
    IdType: '',
    id: ''
})

// React component
class Counter extends Component {
    state = {
        loading: false,
        openinvalid: false,
        opendispatch: false,
        id: 0
    }

    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            'http://192.168.1.108:18082/upkeep/repairList'
        )
        this.setState({loading: false})
        this.props.dispatch({
            type: 'repairList',
            payload: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.id !== 0) {
            if (nextProps.IdType === 'openinvalid') {
                this.setState({
                    openinvalid: true,
                    opendispatch: false,
                    id: nextProps.id
                })
            } else if (nextProps.IdType === 'opendispatch') {
                this.setState({
                    openinvalid: false,
                    opendispatch: true,
                    id: nextProps.id
                })
            }
        }
    }
    refresh = async () => {
        // 刷新表格
        this.setState({
            loading: true,
            openinvalid: false,
            opendispatch: false,
            id: 0
        })
        let result = await apiPost(
            'http://192.168.1.108:18082/upkeep/repairList'
        )
        this.setState({loading: false})
        this.props.dispatch({
            type: 'repairList',
            payload: result.data
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({openinvalid: true,
            id: 'add'})
    }
    entryName = ''
    entryNameOnChange = (e) => {
        this.entryName = e.target.value
    }
    query = () => {
        this.refresh()
    }
    render () {
        const {products, columns} = this.props
        return (
            <div>
                <CancelRepairComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openinvalid}
                />
                <DistributeLeafletsComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.opendispatch}
                    />
                <span>
                    <span>物品名称:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加保单</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 1300 }}
                        dataSource={products}
                        columns={columns}
                    />
                </Spin>
            </div>
        )
    }
}


// Action


// Map Redux state to component props
function mapStateToProps (state, ownProps) {
    return {
        id: state.id,
        IdType: state.IdType,
        products: state.count
    }
}

function mapDispatchToProps (dispatch) {
    function handleUpdate (id) {
        dispatch({
            type: 'update',
            payload: id
        })
    }
    function distributeLeaflets (id) {
        dispatch({
            type: 'distributeLeaflets',
            payload: id
        })
    }
    return {
        dispatch: dispatch,
        columns: [{
            title: '序号',
            width: 80,
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '报修日期',
            width: 150,
            dataIndex: 'repairDate',
            key: 'repairDate'
        }, {
            title: '公司名称',
            width: 150,
            dataIndex: 'clientName',
            key: 'clientName'
        }, {
            title: '报修内容',
            width: 150,
            dataIndex: 'repairContent',
            key: 'repairContent',
            render: function (text, record, index) {
                text = text.substring(0, 30)
                return (
                    <span>{text}</span>
                )
            }
        }, {
            title: '来源',
            width: 100,
            dataIndex: 'fromType',
            key: 'fromType'
        }, {
            title: '派工状态',
            width: 100,
            dataIndex: 'pieStatus',
            key: 'pieStatus',
            render: function (text, record, index) {
                let pieStatus = '未派单'
                if (record.pieStatus === 1) {
                    pieStatus = '已派单'
                }
                return (
                    <span>{pieStatus}</span>
                )
            }
        }, {
            title: '维修人',
            width: 100,
            dataIndex: 'repairedMan',
            key: 'repairedMan'
        }, {
            title: '维修状态',
            width: 100,
            dataIndex: 'repairStatus',
            key: 'repairStatus',
            render: function (text, record, index) {
                let repairStatus = '未完成'
                if (record.repairStatus === 1) {
                    repairStatus = '已完成'
                }
                return (
                    <span>{repairStatus}</span>
                )
            }
        }, {
            title: '维修项目',
            width: 100,
            dataIndex: 'maintenanceProject',
            key: 'maintenanceProject',
            render: function (text, record, index) {
                return (
                    <span>查看明细</span>
                )
            }
        }, {
            title: '维修明细',
            width: 100,
            dataIndex: 'MaintenanceDetails',
            key: 'MaintenanceDetails',
            render: function (text, record, index) {
                return (
                    <span>查看明细</span>
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
                        <Popconfirm title="确定派单吗?" onConfirm={() => distributeLeaflets(record.id)}>
                            <Button >派单</Button>
                        </Popconfirm>
                        <Popconfirm title="确定作废吗?" onConfirm={() => handleUpdate(record.id)}>
                            <Button >作废</Button>
                        </Popconfirm>
                        <Popconfirm title="确定修改吗?" onConfirm={() => handleUpdate(record.id)}>
                            <Button >修改</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }]
    }
}
// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)


class index extends Component {
    render () {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default index

