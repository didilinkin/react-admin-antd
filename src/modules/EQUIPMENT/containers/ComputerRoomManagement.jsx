// 设备管理 - 机房管理
import React, {Component} from 'react'
import {Modal, Table, Button, Spin, Select, Input, Popconfirm, notification, Icon} from 'antd'
import {apiPost} from '../../../api'
// 引入组件
import RoomAddUpAddUpComponent from '../components/ComputerRoomManagement/RoomAddUp'
const Option = Select.Option
// React component
class ComputerRoom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            total: 0,
            current: 1,
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
    info = (url) => {
        this.props.history.push(url)
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/equipment/machineRoomList'
        )
        let systList = await apiPost('equipment/systList')
        let repairList = result.data.rows
        const handleUpdateEquipment = this.handleUpdateEquipment
        const delect = this.delect
        const info = this.info
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
                    let url = '/home/equipment/Details/serverRoomDetails/' + record.id
                    return (
                        <div>
                            <a onClick={() => info(url)}> 详情 &nbsp;</a>
                            <a onClick={() => handleUpdateEquipment(record.id)}>&nbsp; 修改 &nbsp;</a>
                            <Popconfirm title="确定修改吗?" onConfirm={() => delect(record.id)}>
                                <a>&nbsp; 删除 </a>
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

    refresh = async (pagination, url, equipmentNumber) => {
        // 刷新表格
        if (typeof (url) !== 'undefined' && pagination === null) {
            this.info(url, equipmentNumber)
        }
        let filters = []
        filters['systemName'] = this.systemName
        filters['machineRoomName'] = this.machineRoomName
        if (pagination === null || typeof (pagination) === 'undefined') {
            filters['page'] = 1
            filters['rows'] = 30
        } else {
            filters['page'] = pagination.current
            filters['rows'] = pagination.pageSize
        }
        let result = await apiPost(
            '/equipment/machineRoomList',
            filters
        )
        this.setState({
            total: result.data.total,
            current: pagination ? pagination.current : 1,
            openAdd: false,
            openUpdate: false,
            dataSource: result.data.rows,
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
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>所属系统&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={this.systemNameFN}
                    >
                        {this.state.systList.map(sys => {
                            return <Option key={sys.systemName}>{sys.systemName}</Option>
                        })}
                    </Select>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;机房名称&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.machineRoomNameFn}
                    />
                    <Button style={{marginRight: '5px'}} type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加机房</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            current: this.state.current,
                            pageSizeOptions: ['15', '30', '45'],
                            defaultPageSize: 30}}
                        onChange={this.refresh}
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


