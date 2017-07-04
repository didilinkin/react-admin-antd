// 设备维护 - 设备台帐
import React, {Component} from 'react'
import {Modal, Table, Button, Spin, Select, Input} from 'antd'
import {apiPost} from '../../../api'
// 引入组件
import EquipmentAddUpComponent from './common/EquipmentAddUp'
const Option = Select.Option
// React component
class ComputerRoom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openUpdate: false,
            previewVisible: false,
            equipmentNumber: '',
            imgUrl: '',
            columns: [],
            dataSource: [],
            id: 0
        }
    }
    handleUpdateEquipment = (id) => {
        this.setState({
            openAdd: false,
            openUpdate: true,
            id: id
        })
    }

    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/equipment/machineRoomList'
        )
        let repairList = result.data
        const handleUpdateEquipment = this.handleUpdateEquipment
        this.setState({
            loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '机房名称',
                width: 150,
                dataIndex: 'machineRoomName',
                key: 'machineRoomName'
            }, {
                title: '所属系统',
                width: 150,
                dataIndex: 'systemName',
                key: 'systemName'
            }, {
                title: '所属类别',
                width: 150,
                dataIndex: 'categoryName',
                key: 'categoryName'
            }, {
                title: '操作',
                width: 250,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/deviceMaintain/equipmentLedger/' + record.id
                    return (
                        <div>
                            <a href={url}><Button >详情</Button></a>
                            <Button onClick={() => handleUpdateEquipment(record.id)}>修改</Button>
                            <Button>删除</Button>
                        </div>
                    )
                }
            }],
            dataSource: repairList
        })
    }

    componentDidMount () {
        this.initialRemarks()
    }

    refresh = async (url, equipmentNumber) => {
        // 刷新表格
        if (typeof (url) !== 'undefined') {
            this.info(url, equipmentNumber)
        }
        let result = await apiPost(
            '/equipment/machineRoomList',
            {
                'equipmentName': this.equipmentName,
                'equipmentStatus': this.equipmentStatus
            }
        )
        this.setState({
            openAdd: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            openUpdate: false,
            openAdd: true
        })
    }
    equipmentName = ''
    entryNameOnChange = (e) => {
        this.equipmentName = e.target.value
    }
    machineRoomName = ''
    machineRoomNameFN = (value) => {
        this.machineRoomName = value
    }
    query = () => {
        this.refresh()
    }

    info (url, equipmentNumber) {
        this.setState({
            previewVisible: true,
            loading: false,
            openAdd: false,
            openUpdate: false,
            equipmentNumber: equipmentNumber,
            imgUrl: url
        })
    }

    handleCancel = () => {
        this.setState({
            previewVisible: false,
            loading: false,
            openAdd: false,
            openUpdate: false,
            equipmentNumber: '',
            imgUrl: ''
        })
    }

    render () {
        return (
            <div>
                <EquipmentAddUpComponent
                    title="添加设备"
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                />
                <EquipmentAddUpComponent
                    title="修改设备"
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <span>
                    <span>所属系统:</span>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.machineRoomNameFN}
                    >
                        <Option key="工程与维修部">工程与维修部</Option>
                        <Option key="设备与运行部">设备与运行部</Option>
                        <Option key="消防与监控部">消防与监控部</Option>
                        <Option key="交通与安全部">交通与安全部</Option>
                        <Option key="卫生与环保部">卫生与环保部</Option>
                        <Option key="综合管理部">综合管理部</Option>
                    </Select>
                    <span>机房民称:</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <Button type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加设备</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{x: 1550}}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={this.state.imgUrl} />
                    <span style={{
                        textAlign: 'center',
                        display: 'block'
                    }}
                    >设备编号：{this.state.equipmentNumber}</span>
                </Modal>
            </div>
        )
    }
}
export default ComputerRoom


