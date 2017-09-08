// 收费管理 - 审核成功
import React from 'react'
import {Table, Spin, Popconfirm} from 'antd'
import { apiPost } from '../../../../api/index'
import CollectRentHeadComponent from '../../components/CollectRent/CollectRentHead'
import AllPaidComponent from '../details/CollectRent/RentReviewDetail'
// 引入组件
// React component
class CollectRentSuccess extends React.Component {
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
    async initialRemarks () {
        this.setState({loading: true})
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        let result = await apiPost(
            '/collectRent/collectRentList',
            {auditStatus: 2,
                page: this.state.page,
                order: this.state.order,
                sort: this.state.sort}
        )
        const handleUpdate = this.handleUpdate
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
                dataIndex: 'rentClientName',
                key: 'rentClientName'
            }, {
                title: '交费周期',
                dataIndex: 'periodStatus',
                key: 'periodStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.periodStatus === 3) {
                        whType = '季付'
                    }
                    if (record.periodStatus === 6) {
                        whType = '半年付'
                    }
                    if (record.periodStatus === 12) {
                        whType = '年付'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '本期租金周期',
                dataIndex: 'periodRent',
                key: 'periodRent'
            }, {
                title: '本期租金',
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收租金日期',
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '逾期天数',
                dataIndex: 'overdueDay',
                key: 'overdueDay'
            }, {
                title: '租金开票状态',
                dataIndex: 'invoiceRentStatus',
                key: 'invoiceRentStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.invoiceRentStatus === 0) {
                        whType = '未开票'
                    }
                    if (record.invoiceRentStatus === 1) {
                        whType = '已开票'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '打印状态',
                dataIndex: 'whetherPrinted',
                key: 'whetherPrinted',
                render: function (text, record, index) {
                    let whetherPrinted = ''
                    if (record.whetherPrinted === 0) {
                        whetherPrinted = '未打印'
                    }
                    if (record.whetherPrinted === 1) {
                        whetherPrinted = '已打印'
                    }
                    return (
                        <span>{whetherPrinted}</span>
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
                            <a onClick={() => handleUpdate(record.id)} > 明细 &nbsp;&nbsp;&nbsp;</a>
                            <Popconfirm title="确定打印吗?" onConfirm={() => {
                                window.open('http://192.168.5.24:18082/collectRent/print?ids=' + record.id + '&source=' + 1)
                            }}
                            >
                                <a>打印通知单</a>
                            </Popconfirm>
                        </div>
                    )
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
        filters['auditStatus'] = 2
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
            '/collectRent/collectRentList',
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
    close = async () => {
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
                <Spin spinning={this.state.loading}>
                    <CollectRentHeadComponent
                        refresh={this.refresh}
                        RowKeys={this.state.RowKeys}
                        close={this.close}
                        type={2}
                        ListBuildingInfo={this.state.ListBuildingInfo}
                    />
                    <AllPaidComponent
                        id={this.state.id}
                        close={this.close}
                        refreshTable={this.refresh}
                        visible={this.state.openUpdate}
                    />
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
                        scroll={{ x: 1800 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CollectRentSuccess


