// 设备维护 - 设备台帐
import React, {Component} from 'react'
import {Modal, Table, Button, Spin, Select, Input, Popconfirm, notification, Icon} from 'antd'
import {apiPost} from '../../../api'
// 引入组件
import RoomAddUpAddUpComponent from './common/RoomAddUp'
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
            systList: [],
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
    delect = async (id) => {
        let result = await apiPost(
            '/equipment/delectMachineRoom',
            {id: id}
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/equipment/machineRoomList'
        )
        let systList = await apiPost('equipment/systList')
        let repairList = result.data
        const handleUpdateEquipment = this.handleUpdateEquipment
        const delect = this.delect
        this.setState({
            loading: false,
            systList: systList.data,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
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
                render: function (text, record, index) {
                    let url = '/deviceMaintain/serverRoom/' + record.id
                    return (
                        <div>
                            <a href={url}><Button >详情</Button></a>
                            <Button onClick={() => handleUpdateEquipment(record.id)}>修改</Button>
                            <Popconfirm title="确定修改吗?" onConfirm={() => delect(record.id)}>
                                <Button>删除</Button>
                            </Popconfirm>
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
                'machineRoomName': this.machineRoomName,
                'systemName': this.systemName
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
    machineRoomName = ''
    machineRoomNameFn = (e) => {
        this.machineRoomName = e.target.value
    }
    systemName = ''
    systemNameFN = (value) => {
        this.systemName = value
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
                <RoomAddUpAddUpComponent
                    title="添加机房"
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                />
                <RoomAddUpAddUpComponent
                    title="修改机房"
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <span>
                    <span>所属系统:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.systemNameFN}
                    >
                        {this.state.systList.map(sys => {
                            return <Option key={sys.systemName}>{sys.systemName}</Option>
                        })}
                    </Select>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;机房名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.machineRoomNameFn} />
                    <Button style={{marginRight: '5px'}} type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加机房</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
                <Modal maskClosable={false} visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={this.state.imgUrl} />
                    <span style={{
                        textAlign: 'center',
                        display: 'block'
                    }}
                    >机房编号：{this.state.equipmentNumber}</span>
                </Modal>
            </div>
        )
    }
}
export default ComputerRoom


