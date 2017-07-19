// 客户管理 - 维修费设置
import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm, Input} from 'antd'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import { apiPost } from '../../../api'
// 引入组件
import Addupkeep from './common/AddUpkeep'
// Reducer
function reducer (state, action) {
    switch (action.type) {
        case 'update':
            return Object.assign({}, state, {
                id: action.payload
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
    id: ''
})

// React component
class Counter extends Component {
    state = {
        loading: false,
        open: false,
        id: 0
    }

    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            'upkeep/list'
        )
        this.setState({loading: false})
        this.props.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.id !== 0) {
            this.setState({open: true,
                id: nextProps.id})
        } else {
            this.setState({open: false})
        }
    }
    refresh = async () => {
        // 刷新表格
        this.setState({
            loading: true,
            open: false,
            id: 0
        })
        let result = await apiPost(
            'upkeep/list',
            {'entryName': this.entryName}
        )
        this.setState({loading: false})
        this.props.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: result.data
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({open: true,
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
        let title
        if (this.state.id > 0) {
            title = '收费项修改'
        } else {
            title = '添加收费项'
        }
        return (
            <div>
                <Addupkeep
                    title={title}
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.open}
                />
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>物品名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange} />
                    <Button style={{marginRight: '5px'}} type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>增加收费项</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
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
        products: state.count
    }
}

function mapDispatchToProps (dispatch) {
    async function handleDelete (id) {
        let result = await apiPost(
            'upkeep/delect',
            { 'id': id }
        )
        dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: result.data
        })
    }

    function handleUpdate (id) {
        dispatch({
            type: 'update',
            payload: id
        })
    }

    return {
        dispatch: dispatch,
        columns: [{
            title: '序号',
            dataIndex: 'id',
            render: function (text, record, index) {
                index++
                return (
                    <span>{index}</span>
                )
            }
        }, {
            title: '物品名称',
            dataIndex: 'entryName'
        }, {
            title: '单位',
            dataIndex: 'company'
        }, {
            title: '进货价格',
            dataIndex: 'purchasePrice'
        }, {
            title: '服务费',
            dataIndex: 'serviceCharge'
        }, {
            title: '收费',
            dataIndex: 'tollAmount'
        }, {
            title: '操作',
            dataIndex: 'opt',
            render: function (text, record, index) {
                return (
                    <div>
                        <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                            <a href="javascript:"> 删除 </a>
                        </Popconfirm>
                        <Popconfirm title="确定修改吗?" onConfirm={() => handleUpdate(record.id)}>
                            <a href="javascript:"> 修改 </a>
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

