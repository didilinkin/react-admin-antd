// 收费管理 - 审核失败
import React, {Component} from 'react'
import {Table, Spin, Icon, notification, Popconfirm} from 'antd'
import { apiPost } from '../../../../api'
import CollectRentFailComponent from '../details/PropertyFee/PropertyDetail'
import PropertyAddComponent from '../../components/PropertyFee/PropertyFeeAdd'
import PropertyFeeHeadComponent from '../../components/PropertyFee/PropertyFeeHead'
// 引入组件
// React component
class PropertyFeeFail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            RowKeys: [],
            id: null,
            total: 0,
            page: 1,
            rows: 30,
            sort: 'a.id',
            order: 'desc',
            dataSource: [],
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
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            id: null
        })
    }
    handleUpdate2 = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: true,
            openUpdate: false,
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/propertyFee/updatePropertyFee',
            {id: id,
                delFlag: 1,
                order: this.state.order,
                sort: this.state.sort}
        )
        notification.open({
            message: '删除成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            {auditStatus: 3,
                contractStatus: 0,
                page: this.state.page}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        const handleUpdate = this.handleUpdate
        const handleUpdate2 = this.handleUpdate2
        const handleDelete = this.handleDelete
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
                title: '审核说明',
                dataIndex: 'remark',
                key: 'remark'
            }, {
                title: '审核时间',
                dataIndex: 'auditDate',
                key: 'auditDate'
            }, {
                title: '审核人',
                dataIndex: 'auditName',
                key: 'auditName'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a type="primary" onClick={() => handleUpdate(record.id)} > 明细 &nbsp;&nbsp;</a>
                            <a type="primary" onClick={() => handleUpdate2(record.id)} > 重新收费 &nbsp;&nbsp;</a>
                            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                <a> 删除 </a>
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
        filters['auditStatus'] = 3
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
            dataSource: result.data.rows
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
                    type={3}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <CollectRentFailComponent
                    close={this.close}
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <PropertyAddComponent
                    close={this.close}
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openTableAddUp}
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
                        scroll={{ x: 1500 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyFeeFail


