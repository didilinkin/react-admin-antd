// 欢乐颂管理押金
import React from 'react'
import {Table, Spin} from 'antd'
import { apiPost } from '../../../../api'
import CashDepositChargeComponent from '../../components/CashDeposit/CashdepsitCharge'
import CashDepositRefundComponent from '../../components/CashDeposit/CashdepsitRefund'
import CashDepositHeadComponent from '../../components/CashDeposit/CashDepositHead'
// 引入组件
// React component
class CashDepositRent extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 30,
            sort: 'a.id',
            order: 'desc',
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    handleUpdate2 = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            id: id
        })
    }
    info = (url) => {
        this.props.pro.history.push(url)
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/cashDeposit/cashDepositList',
            {chargeItem: 3,
                page: this.state.page,
                order: this.state.order,
                sort: this.state.sort}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleUpdate2 = this.handleUpdate2
        const info = this.info
        this.setState({loading: false,
            ListBuildingInfo: ListBuildingInfo.data,
            total: result.data.total,
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
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '房间编号',
                dataIndex: 'roomNum',
                key: 'roomNum'
            }, {
                title: '客户名称',
                dataIndex: 'sublietName',
                key: 'sublietName'
            }, {
                title: '当前结余',
                dataIndex: 'currentBalance',
                key: 'currentBalance'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/client/cashDepositDetail/cashDepositDetail/' + record.id
                    if (record.auditDate === null) {
                        return (
                            <div>
                                <a onClick={() => info(url)}> 明细 &nbsp;</a>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <a onClick={() => info(url)}> 明细 &nbsp;&nbsp;</a>
                                <a onClick={() => handleUpdate(record.id)} > 扣款 &nbsp;&nbsp;</a>
                                <a onClick={() => handleUpdate2(record.id)} > 退款 </a>
                            </div>
                        )
                    }
                }
            }],
            dataSource: result.data.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    json = {}
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        if (pagination === null) {
            this.json = filters
        }
        for (let p in this.json) {
            filters[p] = this.json[p]
        }
        filters['chargeItem'] = 3
        filters['sort'] = this.state.sort
        filters['order'] = this.state.order
        if (pagination !== null && typeof (pagination) !== 'undefined') {
            filters['rows'] = pagination.pageSize
            filters['page'] = pagination.current
            this.setState({
                page: pagination.current
            })
        } else {
            this.setState({
                page: 1
            })
        }
        // 刷新表格
        let result = await apiPost(
            '/cashDeposit/cashDepositList',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data.rows,
            total: result.data.total,
            id: 0
        })
    }
    query = () => {
        this.refresh()
    }
    close = () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false
        })
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    render () {
        return (
            <div>
                <CashDepositChargeComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="扣款"
                    close={this.close}
                    visible={this.state.openUpdate}
                />
                <CashDepositRefundComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    title="退款"
                    close={this.close}
                    visible={this.state.openAdd}
                />
                <CashDepositHeadComponent
                    RowKeys={this.state.RowKeys}
                    refresh={this.refresh}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        rowSelection={{
                            onChange: this.onSelectChange
                        }}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['15', '30', '45'],
                            current: this.state.page,
                            defaultPageSize: this.state.rows}}
                        scroll={{ x: 1200 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CashDepositRent


