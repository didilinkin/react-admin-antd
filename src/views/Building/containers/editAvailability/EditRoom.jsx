// 收费管理 - 审核中
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Select } from 'antd'
import { apiPost } from '../../../../api'
// 引入组件
const Option = Select.Option
// React component
class PropertyFeeConduct extends Component {
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
            '/build/buildList'
        )
        const handleUpdate = this.handleUpdate
        this.setState({loading: false,
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
                title: '楼宇名称',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '楼层数量',
                width: 250,
                dataIndex: 'floorNum',
                key: 'floorNum'
            }, {
                title: '客梯数量',
                width: 300,
                dataIndex: 'passengerElevatorNum',
                key: 'passengerElevatorNum'
            }, {
                title: '货梯数量',
                width: 250,
                dataIndex: 'goodsElevatorNum',
                key: 'goodsElevatorNum'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a href="javascript:" onClick={() => handleUpdate(record.id)} > 明细 </a>
                        </div>
                    )
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
            '/propertyFee/propertyFeeList',
            {'clientName': this.clientName,
                'roomNum': this.roomNum,
                'buildId': this.buildId,
                'contractStatus': 0,
                'auditStatus': 1
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
    clientName = null
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    roomNum = ''
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    buildId = ''
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
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="请选择所属楼宇"
                        optionFilterProp="children"
                        onSelect={this.selectBuild}
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
export default PropertyFeeConduct


