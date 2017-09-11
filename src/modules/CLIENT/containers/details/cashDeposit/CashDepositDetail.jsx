// 保证金明细
import React from 'react'
import {Table, Button, Spin, Select } from 'antd'
import { apiPost, baseURL } from '../../../../../api'
// 引入组件
const Option = Select.Option
// React component
class CashDepositDetail extends React.Component {
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
        let result = await apiPost(
            '/cashDeposit/cashDepositDetailList',
            {'cashDepositId': this.props.match.params.id,
                page: this.state.page,
                order: this.state.order,
                sort: this.state.sort}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
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
                title: '收支类型',
                width: 250,
                dataIndex: 'revenueType',
                key: 'revenueType',
                render: function (text, record, index) {
                    let revenueType = ''
                    if (record.revenueType === 0) {
                        revenueType = '收款'
                    }
                    if (record.revenueType === 1) {
                        revenueType = '扣款'
                    }
                    if (record.revenueType === 2) {
                        revenueType = '退款'
                    }
                    return (
                        <span>{revenueType}</span>
                    )
                }
            }, {
                title: '金额',
                width: 250,
                dataIndex: 'operateMoney',
                key: 'operateMoney'
            }, {
                title: '事由',
                width: 300,
                dataIndex: 'reason',
                key: 'reason'
            }, {
                title: '当前结余',
                width: 250,
                dataIndex: 'currentBalance',
                key: 'currentBalance'
            }, {
                title: '审核状态',
                width: 250,
                dataIndex: 'auditStatus',
                key: 'auditStatus',
                render: function (text, record, index) {
                    let auditStatus = ''
                    if (record.auditStatus === 0) {
                        auditStatus = '待审核'
                    }
                    if (record.auditStatus === 1) {
                        auditStatus = '审核成功'
                    }
                    if (record.auditStatus === 2) {
                        auditStatus = '审核失败'
                    }
                    return (
                        <span>{auditStatus}</span>
                    )
                }
            }, {
                title: '审核说明',
                width: 250,
                dataIndex: 'remark',
                key: 'remark'
            }, {
                title: '申请人',
                width: 250,
                dataIndex: 'createName',
                key: 'createName'
            }, {
                title: '申请时间',
                width: 250,
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '审核人',
                width: 250,
                dataIndex: 'auditName',
                key: 'auditName'
            }, {
                title: '审核时间',
                width: 250,
                dataIndex: 'auditDate',
                key: 'auditDate'
            }, {
                title: '附件',
                width: 1000,
                render: function (text, record, index) {
                    let i = 0
                    let arr = []
                    if (record.fileUrl !== null && record.fileUrl !== '') {
                        record.fileUrl.split('#').map(img => {
                            if (img !== '') {
                                i++
                                arr.push(
                                    <img key={i} style={{
                                        width: '100px',
                                        height: '100px'
                                    }} src={baseURL + 'storage/files/' + img} alt=""
                                    />)
                            }
                            return ''
                        })
                    }
                    return arr
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
        filters['chargeItem'] = 0
        filters['cashDepositId'] = this.props.match.params.id
        filters['revenueType'] = this.revenueType
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
            '/cashDeposit/cashDepositDetailList',
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
    revenueType = null
    selectBuild = (e) => {
        this.revenueType = e
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
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>收支类型:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择收支类型"
                        optionFilterProp="children"
                        onChange={this.selectBuild}
                    >
                        <Option key="0">收款</Option>
                        <Option key="1">扣款</Option>
                        <Option key="2">退款</Option>
                    </Select>
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>

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
export default CashDepositDetail


