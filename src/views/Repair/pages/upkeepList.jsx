import React, { Component } from 'react'
import { Table, Button, Spin, Popconfirm } from 'antd'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import axios from 'axios'
// 引入组件
import Addupkeep from './addUpkeep'
// Reducer
function counter (state = {count: []}, action) {
    debugger
    return {count: action.payload}
}

// Store
const store = createStore(counter)

// React component
class Counter extends Component {
    state = { loading: false}
    componentDidMount () {
        this.setState({ loading: true })
        axios.post('http://192.168.1.108:18082/upkeep/list').then(response => {
            let resulData = response.data
            this.setState({ loading: false })
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: resulData.data
            })
        }).catch(error => {
            store.dispatch({
                type: 'eorr'
            })
        })
    }
    onChange = (e) => {
        const { value } = e.target
        alert(value)
    }
    render () {
        const {products, columns} = this.props
        debugger
        return (
            <div>
               <Addupkeep/>
                <Spin spinning={this.state.loading} >
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
    function handleDelete (id) {
        axios({
            method: 'post',
            url: 'http://192.168.1.108:18082/upkeep/delect',
            params: {
                id: id
            }
        }).then(response => {
            let resulData = response.data
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: resulData.data
            })
        }).catch(error => {
            alert(error)
        })
    }
    return {
        products: state.count,
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
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
                        <Button >删除</Button>
                    </Popconfirm>
                )
            }
        }]
    }
}
// Connected Component
const App = connect(
    mapStateToProps
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

