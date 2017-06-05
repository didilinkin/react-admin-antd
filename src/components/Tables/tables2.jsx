import React, { Component } from 'react'
import { Table, Button, Popconfirm} from 'antd'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import axios from 'axios'

// const getget = (url) => axios.get(url).then(function (response) {
//     // debugger
//     // console.log(response.data)
//     return response.data
// }).catch(function (error) {
//     debugger
//     console.log(error)
// })

const getget = (url) => {
    return new Promise ( function (resolve, reject) {
        axios.get(url)
        .then ( response => {
            let resulData = response.data
            resolve ( resulData )
        })
        .catch ( error => {
            reject ( error )
        })
    })
}


// React component
class Counter extends Component {
    debugger;

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
    debugger
    switch (action.type) {
    case 'increase':
        return {count: action.payload}
    default:
        return {
            count: [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }]
        }
    }
}

// Store
const store = createStore(counter)


// Map Redux state to component props
function mapStateToProps (state, ownProps) {
    function handleDelete (id) {
        // getget('http://127.0.0.1:18082/ceshi')
        // let data = async function() { getget('/npm.json') }
        // console.log(data)
        // debugger

        const asyncGet = async function () {
            try {
                let result = await getget('/npm.json')
                console.log(result)
            } catch(err) {
                console.log(err)
            }
        }

        asyncGet()
    }


    return {
        products: state.count,
        columns: [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }, {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            render: function (text, record, index) {
                return (
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button >Delete</Button>
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

