import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm} from 'antd'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import axios from 'axios'
// 引入组件
import Addupkeep from './addUpkeep'
// Reducer
function counter (state, action) {
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
const store = createStore(counter, {
    count: [],
    id: ''
})

// React component
class Counter extends Component {
    state = {
        loading: false,
        open: false
    }

    componentDidMount () {
        this.setState({loading: true})
        axios.post('http://192.168.1.108:18082/upkeep/list').then(response => {
            let resulData = response.data
            this.setState({loading: false})
            this.props.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: resulData.data
            })
        }).catch(error => {
            this.props.dispatch({
                type: 'eorr'
            })
        })
    }

    onChange = (e) => {
        const {value} = e.target
        alert(value)
    }
    refresh = (data) => {
        // 刷新表格
        this.setState({
            loading: true,
            open: false
        })
        axios.post('http://192.168.1.108:18082/upkeep/list').then(response => {
            let resulData = response.data
            this.setState({loading: false})
            this.props.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: resulData.data
            })
        }).catch(error => {
            store.dispatch({
                type: 'eorr'
            })
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({open: true})
    }

    render () {
        debugger
        const {products, columns, id} = this.props
        let opentwo
        if (id > 0) {
            opentwo = true
        } else {
            opentwo = false
        }
        return (
            <div>
                <Addupkeep
                    refreshTable={this.refresh}
                    visible={this.state.open}
                />
                <Addupkeep
                    id={id}
                    refreshTable={this.refresh}
                    visible={opentwo}
                />
                <Button type="primary" onClick={this.showModal}>增加收费项</Button>
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
    function handleDelete (id) {
        axios({
            method: 'post',
            url: 'http://192.168.1.108:18082/upkeep/delect',
            params: {
                id: id
            }
        }).then(response => {
            let resulData = response.data
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: resulData.data
            })
        }).catch(error => {
            alert(error)
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
            key: 'id'
        }, {
            title: '物品名称',
            dataIndex: 'entryName',
            key: 'entryName'
        }, {
            title: '单位',
            dataIndex: 'company',
            key: 'company'
        }, {
            title: '进货价格',
            dataIndex: 'purchasePrice',
            key: 'purchasePrice'
        }, {
            title: '服务费',
            dataIndex: 'serviceCharge',
            key: 'serviceCharge'
        }, {
            title: '收费',
            dataIndex: 'tollAmount',
            key: 'tollAmount'
        }, {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            render: function (text, record, index) {
                return (
                    <div>
                        <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                            <Button >删除</Button>
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

