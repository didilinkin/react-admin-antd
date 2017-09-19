// 收费管理 - 审核成功
import React, {Component} from 'react'
import {Table, Spin, Popconfirm} from 'antd'
import { apiPost, baseURL } from '../../../../api'
import PropertyFeeHeadComponent from '../../components/PropertyFee/PropertyFeeHead'
import AllPaidComponent from '../details/PropertyFee/PropertyDetail'
// 引入组件
// React component
class PropertyFeeSuccess extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            id: null,
            dataSource: [],
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 15,
            auditStatus: 2,
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
    close = async () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            {auditStatus: this.state.auditStatus,
                page: this.state.page,
                order: this.state.order,
                sort: this.state.sort}
        )
        const handleUpdate = this.handleUpdate
        this.setState({loading: false,
            total: result.data.total,
            ListBuildingInfo: ListBuildingInfo.data,
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
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '本期物业费周期',
                dataIndex: 'periodPropertyFee',
                key: 'periodPropertyFee'
            }, {
                title: '应收金额',
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收物业费日期',
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '逾期天数',
                dataIndex: 'overdueDay',
                key: 'overdueDay'
            }, {
                title: '延期下个月电费',
                dataIndex: 'lateConductWay',
                key: 'lateConductWay',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.lateConductWay === 0) {
                        whType = '否'
                    }
                    if (record.lateConductWay === 1) {
                        whType = '是'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '物业费开票状态',
                dataIndex: 'invoicePropertyStatus',
                key: 'invoicePropertyStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.invoicePropertyStatus === 0) {
                        whType = '未开票'
                    }
                    if (record.invoicePropertyStatus === 1) {
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
                width: 150,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a onClick={() => handleUpdate(record.id)} > 明细 &nbsp;&nbsp;&nbsp;</a>
                            <Popconfirm title="确定打印吗?" onConfirm={() => {
                                window.open(baseURL + '/propertyFee/print?ids=' + record.id + '&source=' + 1)
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
            '/propertyFee/propertyFeeList',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data.rows,
            total: result.data.total
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
                <PropertyFeeHeadComponent
                    RowKeys={this.state.RowKeys}
                    refresh={this.refresh}
                    type={2}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <AllPaidComponent
                    close={this.close}
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        scroll={{ x: 2000 }}
                        bordered
                        rowSelection={{
                            onChange: this.onSelectChange
                        }}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['15', '30', '45'],
                            current: this.state.page,
                            defaultPageSize: this.state.rows}}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyFeeSuccess


