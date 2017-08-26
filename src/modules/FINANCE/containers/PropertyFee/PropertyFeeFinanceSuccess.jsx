// 收费管理 - 审核成功
import React from 'react'
import {Table, Spin, Popconfirm, Icon, notification} from 'antd'
import { apiPost } from '../../../../api'
import PropertyFeeHeadComponent from '../../components/PropertyFee/PropertyFeeHead'
// 引入组件
// React component
class PropertyFeeFinanceSuccess extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 30,
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = async (id) => {
        await apiPost(
            '/propertyFee/updatePropertyFeeByRecall',
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
            '/propertyFee/propertyFeeList',
            {auditStatus: 2,
                page: this.state.page}
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
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '本期物业费周期',
                width: 280,
                dataIndex: 'periodPropertyFee',
                key: 'periodPropertyFee'
            }, {
                title: '应收金额',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                width: 150,
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收物业费日期',
                width: 150,
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '逾期天数',
                width: 150,
                dataIndex: 'overdueDay',
                key: 'overdueDay'
            }, {
                title: '延期下个月电费',
                width: 150,
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
                width: 150,
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
                title: '审核时间',
                width: 150,
                dataIndex: 'auditDate',
                key: 'auditDate'
            }, {
                title: '审核人',
                width: 150,
                dataIndex: 'auditName',
                key: 'auditName'
            }, {
                title: '申请人',
                width: 150,
                dataIndex: 'updateName',
                key: 'updateName'
            }, {
                title: '申请日期',
                width: 150,
                dataIndex: 'updateDate',
                key: 'updateDate'
            }, {
                title: '操作',
                width: 100,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/home/finance/propertyFeeDetails/PropertyFeeDetail/' + record.id
                    return (
                        <div>
                            <a onClick={() => info(url)}> 明细 &nbsp;&nbsp;</a>
                            <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                <a> 撤回 </a>
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
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        filters['auditStatus'] = 2
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
                <PropertyFeeHeadComponent
                    RowKeys={this.state.RowKeys}
                    refresh={this.refresh}
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
                        scroll={{ x: 2200 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyFeeFinanceSuccess


