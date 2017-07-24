import React, {Component} from 'react'
import {Table, Button, Spin, Popconfirm, Input, Select} from 'antd'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import { apiPost } from '../../../api'

// 引入组件
import AddMaterial from './AddMaterial'
const Option = Select.Option
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
            '/warehouse/materialManagement'
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
            '/warehouse/materialManagement',
            {'name': this.name,
                'whType': this.whType}
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
    name = ''
    entryNameOnChange = (e) => {
        this.name = e.target.value
    }
    whType = ''
    selectOnChange = (e) => {
        this.whType = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        const {products, columns} = this.props
        let title
        if (this.state.id > 0) {
            title = '材料修改'
        } else {
            title = '添加材料'
        }
        return (
            <div>
                <AddMaterial
                    title={title}
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.open}
                />
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>仓库类型:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择仓库"
                        optionFilterProp="children"
                        onSelect={this.selectOnChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option key="0">工程库</Option>
                        <Option key="1">保洁用品库</Option>
                        <Option key="2">行政库</Option>
                    </Select>
                    <span>物品名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button style={{marginRight: '5px'}} type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>新建材料</Button>
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
            '/warehouse/delete',
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
            dataIndex: 'index',
            key: 'index',
            render: function (text, record, index) {
                index++
                return (
                    <span>{index}</span>
                )
            }
        }, {
            title: '材料名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '规格',
            dataIndex: 'standard',
            key: 'standard'
        }, {
            title: '单位',
            dataIndex: 'unit',
            key: 'unit'
        }, {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice'
        }, {
            title: '存放位置',
            dataIndex: 'storagePlace',
            key: 'storagePlace'
        }, {
            title: '仓库类型',
            width: 100,
            dataIndex: 'whType',
            key: 'whType',
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
            dataIndex: 'opt',
            key: 'opt',
            render: function (text, record, index) {
                return (
                    <div>
                        <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                            <a href="javascript:" > 删除 &nbsp;</a>
                        </Popconfirm>
                        <Popconfirm title="确定修改吗?" onConfirm={() => handleUpdate(record.id)}>
                            <a href="javascript:" >&nbsp; 修改 </a>
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

