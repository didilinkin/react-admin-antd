// 保证金明细
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select } from 'antd'
import { apiPost, baseURL } from '../../../api'
// 引入组件
const Option = Select.Option
// React component
class CashDepositDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
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
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/cashDeposit/cashDepositDetailList',
            {'cashDepositId': this.props.match.params.id}
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        this.setState({loading: false,
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
                title: '收支类型',
                width: 150,
                dataIndex: 'revenueType',
                key: 'revenueType'
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
                key: 'auditStatus'
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
                title: '审核状态',
                width: 250,
                dataIndex: 'auditStatus',
                key: 'auditStatus'
            }, {
                title: '审核时间',
                width: 250,
                dataIndex: 'auditDate',
                key: 'auditDate'
            }, {
                title: '附件',
                width: 500,
                dataIndex: 'fileUrl',
                key: 'fileUrl',
                render: function (text, record, index) {
                    let i = 0
                    let arr = []
                    record.fileUrl.split('#').map(img => {
                        if (img !== '') {
                            i++
                            arr.push(<img key={i} style={{width: '100px',
                                height: '100px'}} src={baseURL + 'storage/files/' + img} alt=""
                            />)
                        }
                        return ''
                    })
                    return arr
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            '/cashDeposit/cashDepositDetailList',
            {'sublietName': this.sublietName,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'chargeItem': 0
            }
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    sublietName = null
    entryNameOnChange = (e) => {
        this.sublietName = e.target.value
    }
    roomNum = null
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    buildId = null
    selectBuild = (e) => {
        this.buildId = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <div>
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>所属楼宇:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择所属楼宇"
                        optionFilterProp="children"
                        onChange={this.selectBuild}
                    >
                        {ListBuildingInfo.map(BuildingInfo => {
                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                        })}
                    </Select>
                    <span>房间编号:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNumberOnChange}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;客户名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 150,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
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
export default CashDepositDetail


