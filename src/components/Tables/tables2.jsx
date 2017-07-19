import React, { Component } from 'react'
import { Table, Button, Popconfirm} from 'antd'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {

    render () {
        const {products, columns} = this.props
        return (
            <Table
                dataSource={products}
                columns={columns}
            />
        )
    }
}


// Action

// Reducer
function counter (state = {count: []}, action) {
    this.setState({count: [{
        'id': 1,
        'entryName': '灯泡',
        'company': '个',
        'purchasePrice': 10.00000,
        'serviceCharge': 2.00000,
        'tollAmount': 12.00000,
        'createId': 1,
        'createDate': 1496727795000,
        'updateId': 0,
        'updateDate': null
    }]})
    return state
}

// Store
const store = createStore(counter)


// Map Redux state to component props
function mapStateToProps (state, ownProps) {
    function handleDelete (id) {
        store.dispatch({type: 'increase',
            payload: id})
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
                        <a href="javascript:">Delete</a>
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

