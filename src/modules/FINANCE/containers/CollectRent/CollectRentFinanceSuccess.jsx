// 收费管理 - 应收租金
import React from 'react'
import {Table, Spin, Popconfirm, notification, Icon} from 'antd'
import { apiPost, verification, baseURL } from '../../../../api'
// 引入组件
import CollectRentHeadComponent from '../../components/CollectRent/CollectRentHead'
// React component
class CollectRentFinanceSuccess extends React.Component {
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
    handleUpdate = async (id) => {
        await apiPost(
            '/collectRent/updateCollectRentVoByRecall',
            {id: id}
        )
        notification.open({
            message: '撤回成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    info = (url) => {
        this.props.pro.history.push(url)
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
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '房间编号',
                width: 250,
                dataIndex: 'roomNum',
                key: 'roomNum'
            }, {
                title: '客户名称',
                width: 320,
                dataIndex: 'rentClientName',
                key: 'rentClientName'
            }, {
                title: '交费周期',
                width: 150,
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
                width: 280,
                dataIndex: 'periodRent',
                key: 'periodRent'
            }, {
                title: '本期租金',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                width: 150,
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收租金日期',
                width: 150,
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '未收金额',
                width: 150,
                dataIndex: 'unpaidMoney',
                key: 'unpaidMoney'
            }, {
                title: '违约金',
                width: 150,
                dataIndex: 'lateMoney',
                key: 'lateMoney'
            }, {
                title: '租金开票状态',
                width: 150,
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
                title: '操作',
                width: 250,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/finance/collectRentDetails/RentReviewDetail/' + record.id
                    return (
                        <div>
                            <a onClick={() => info(url)}> 明细 &nbsp;&nbsp;</a>
                            {verification('revokeRent') &&
                            <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                <a> 撤回 &nbsp;&nbsp;</a>
                            </Popconfirm>
                            }
                            <Popconfirm title="确定打印吗?" onConfirm={() => {
                                window.open(baseURL + '/collectRent/print?ids=' + record.id + '&source=' + 2)
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
    componentWillMount () {
        this.initialRemarks()
    }
    json={}
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
    query = () => {
        this.refresh()
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    render () {
        return (
            <div>
                <CollectRentHeadComponent
                    refresh={this.refresh}
                    RowKeys={this.state.RowKeys}
                    type={2}
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
                        scroll={{ x: 2000 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default CollectRentFinanceSuccess


