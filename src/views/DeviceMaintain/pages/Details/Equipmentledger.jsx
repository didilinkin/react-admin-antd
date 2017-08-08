// 设备明细
import React from 'react'
import { Row, Col, Tabs, Button, Modal } from 'antd'
import '../../../../style/test.less'
import { apiPost, baseURL } from '../../../../api'
const TabPane = Tabs.TabPane

function callback (key) {
    console.log(key)
}
class Equipmentledger extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            EquipmentData: {},
            EquipmentSsData: [],
            maintenanceOpen: false,
            equipmentMaintenanceOpen: false,
            id: ''
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            'equipment/getEquipment',
            {'id': this.props.match.params.id}
        )
        let equipment = resulData.data
        if (equipment.useDepartment.toString() === '0') {
            equipment['useDepartment'] = '工程与维修部'
        } else if (equipment.useDepartment.toString() === '1') {
            equipment['useDepartment'] = '设备与运行部'
        } else if (equipment.useDepartment.toString() === '2') {
            equipment['useDepartment'] = '消防与监控部'
        } else if (equipment.useDepartment.toString() === '3') {
            equipment['useDepartment'] = '交通与安全部'
        } else if (equipment.useDepartment.toString() === '4') {
            equipment['useDepartment'] = '卫生与环保部'
        } else {
            equipment['useDepartment'] = '综合管理部'
        }
        if (equipment.equipmentStatus.toString() === '0') {
            equipment['equipmentStatus'] = '使用'
        } else if (equipment.equipmentStatus.toString() === '1') {
            equipment['equipmentStatus'] = '闲置'
        } else {
            equipment['equipmentStatus'] = '报废'
        }
        let ListEquipmentSs = await apiPost(
            '/equipment/listEquipmentSs',
            {'equipmentId': this.props.match.params.id}
        )
        let listSs = ListEquipmentSs.data.map((EquipmentSs, j) => {
            if (EquipmentSs.typeSs.toString() === '0') {
                EquipmentSs['typeSs'] = '启用'
            } else if (EquipmentSs.typeSs.toString() === '1') {
                EquipmentSs['typeSs'] = '报废'
            } else {
                EquipmentSs['typeSs'] = '闲置'
            }
            return (
                <tr key={j}>
                    <td>{EquipmentSs.typeSs}</td>
                    <td>{EquipmentSs.departmentName}</td>
                    <td>{EquipmentSs.applicant}</td>
                    <td>{EquipmentSs.applyDate}</td>
                    <td>{EquipmentSs.applyReason}</td>
                    <td>{EquipmentSs.whereabouts}</td>
                    <td>{EquipmentSs.approver}</td>
                    <td>{EquipmentSs.approvalDate}</td>
                    <td>{EquipmentSs.remarks}</td>
                </tr>
            )
        })
        let maintenanceDataList = await apiPost(
            '/deviceMaintain/maintenance/maintenanceList',
            {'equipmentId': this.props.match.params.id}
        )
        let equipmentMaintenanceList = await apiPost(
            '/deviceMaintain/maintenance/equipmentRepairList',
            {'equipmentId': this.props.match.params.id}
        )
        console.log(equipmentMaintenanceList)
        this.setState({
            EquipmentData: equipment,
            EquipmentSsData: listSs,
            maintenanceData: maintenanceDataList.data.map((maintenance, j) => {
                return (
                    <tr key={j}>
                        <td>{maintenance.maintenanceDate}</td>
                        <td>{maintenance.maintenanceNumber}</td>
                        <td>{maintenance.statusStatement.toString().split(0, 30)}</td>
                        <td>{maintenance.maintenanceManName}</td>
                        <td><Button onClick={() => this.maintenanceOpen(maintenance.id)}>查看明细</Button></td>
                    </tr>
                )
            }),
            equipmentMaintenanceList: equipmentMaintenanceList.data.map((equipmentMaintenance, j) => {
                return (
                    <tr key={j}>
                        <td>{equipmentMaintenance.makespan}</td>
                        <td>{equipmentMaintenance.faultDescription}</td>
                        <td>{equipmentMaintenance.maintenanceStatus}</td>
                        <td><Button onClick={() => this.equipmentMaintenanceOpen(equipmentMaintenance.id)}>查看明细</Button></td>
                    </tr>
                )
            })
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    equipmentMaintenance = ''
    list = []
    equipmentMaintenanceOpen = async (id) => {
        let resulData = await apiPost(
            '/deviceMaintain/maintenance/getEquipmentRepair',
            {'id': id}
        )
        let equipmentMaintenance = resulData.data
        equipmentMaintenance['scenePictures'] = equipmentMaintenance.scenePictures.split('#').map((img, i) => {
            if (img !== '') {
                return <img key={i} src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        equipmentMaintenance['servicePicture'] = equipmentMaintenance.servicePicture.split('#').map((img, i) => {
            if (img !== '') {
                return <img key={i} src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        this.equipmentMaintenance = equipmentMaintenance
        this.list = equipmentMaintenance.list
        this.setState({
            equipmentMaintenanceOpen: true,
            id: id
        })
    }
    maintenanceOpen = async (id) => {
        let resulData = await apiPost(
            '/deviceMaintain/maintenance/getmaintenance',
            {'id': id}
        )
        let maintenance = resulData.data
        maintenance['scenePictures'] = maintenance.scenePictures.split('#').map((img, i) => {
            if (img !== '') {
                return <img key={i} src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        this.maintenanceData = maintenance
        this.setState({
            maintenanceOpen: true,
            id: id
        })
    }
    handleCancel = () =>{
        this.maintenanceData = {}
        this.setState({
            equipmentMaintenanceOpen: false,
            maintenanceOpen: false,
            id: ''
        })
    }
    maintenanceData = {}
    render () {
        return (
            <div>
                <h2>设备明细</h2>
                <div className="box4">
                    <Row>
                        <Col span={12}><b>所属系统：</b>{this.state.EquipmentData.systemName}</Col>
                        <Col span={12}><b>设备状态：</b>{this.state.EquipmentData.equipmentStatus}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>所属类别：</b>{this.state.EquipmentData.categoryName}</Col>
                        <Col span={12}><b>制造日期：</b>{this.state.EquipmentData.manufacturingDate}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备名称：</b>{this.state.EquipmentData.equipmentName}</Col>
                        <Col span={12}><b>购置日期：</b>{this.state.EquipmentData.purchaseDate}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备编号：</b>{this.state.EquipmentData.equipmentNumber}</Col>
                        <Col span={12}><b>使用年限：</b>{this.state.EquipmentData.serviceLife}年</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>规格型号：</b>{this.state.EquipmentData.equipmentModel}</Col>
                        <Col span={12}><b>使用部门：</b>{this.state.EquipmentData.useDepartment}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备品牌：</b>{this.state.EquipmentData.equipmentBrand}</Col>
                        <Col span={12}><b>维保责任人：</b>{this.state.EquipmentData.maintenanceName}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>制造单位：</b>{this.state.EquipmentData.manufacturingUnit}</Col>
                        <Col span={12}><b>巡检责任人：</b>{this.state.EquipmentData.patrolName}</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>备注：</b><div className="pl120">{this.state.EquipmentData.remarks}</div></Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>安装位置：</b><div className="pl120">{this.state.EquipmentData.installationLocation}</div></Col>
                        <Col span={12}><b>设备二维码：</b><img src={baseURL + 'storage/files/' + this.state.EquipmentData.twoCode} alt="" /></Col>
                    </Row>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="维修记录" key="1">
                            <table className="tb">
                                <tbody>
                                    <tr className="hd">
                                        <td>维修完工时间</td>
                                        <td>故障描述</td>
                                        <td>维修情况</td>
                                        <td>操作</td>
                                    </tr>
                                    {this.state.equipmentMaintenanceList}
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tab="保养记录" key="2">
                            <table className="tb">
                                <tbody>
                                    <tr className="hd">
                                        <td>保养日期</td>
                                        <td>保养单号</td>
                                        <td>保养情况</td>
                                        <td>保养人员</td>
                                        <td>操作</td>
                                    </tr>
                                    {this.state.maintenanceData}
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tab="启停记录" key="3">
                            <table className="tb">
                                <tbody>
                                    <tr className="hd">
                                        <td>类型</td>
                                        <td>申请部门</td>
                                        <td>申请人</td>
                                        <td>申请日期</td>
                                        <td>申请原因</td>
                                        <td>设备去向</td>
                                        <td>审批人</td>
                                        <td>审批日期</td>
                                        <td>备注</td>
                                    </tr>
                                    {this.state.EquipmentSsData}
                                </tbody>
                            </table>
                        </TabPane>
                    </Tabs>
                </div>
                <Modal maskClosable={false}
                    title="维修明细"
                    style={{top: 20}}
                    width={700}
                    footer={null}
                    visible={this.state.equipmentMaintenanceOpen}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <h2>维修信息</h2>
                        <div className="box5">
                            <h3>报修信息</h3>
                            <Row>
                                <Col span={8}><b>送修时间：</b> {this.equipmentMaintenance.repairDate}</Col>
                                <Col span={8}><b>报修人：</b>{this.equipmentMaintenance.repairManName}</Col>
                                <Col span={8}><b>维修单号：</b>{this.equipmentMaintenance.maintenanceNumber}</Col>
                            </Row>
                            <Row>
                                <Col span={8}><b>故障等级：</b>{this.equipmentMaintenance.failureLevel}</Col>
                                <Col span={8}><b>设备状态：</b>{this.equipmentMaintenance.equipmentStatus}</Col>
                                <Col span={8} />
                            </Row>
                            <ul className="clearfix">
                                <li>
                                    <b>故障描述：</b>
                                    <div className="pl80">
                                        <p>{this.equipmentMaintenance.faultDescription}</p>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <b>现场图片：</b>
                                    {this.equipmentMaintenance.scenePictures}
                                </li>
                            </ul>
                            <p className="line" />
                            <h3>维修情况</h3>
                            <Row>
                                <Col span={8}><b>完工时间：</b> {this.equipmentMaintenance.makespan}</Col>
                                <Col span={8}><b>维修人：</b>{this.equipmentMaintenance.repairerName}</Col>
                                <Col span={8}><b>协作人：</b>{this.equipmentMaintenance.collaboratorNames}</Col>
                            </Row>
                            <ul className="clearfix">
                                <li>
                                    <b>维修情况：</b>
                                    <div className="pl80">
                                        <p>{this.equipmentMaintenance.maintenanceStatus}</p>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <b>现场图片：</b>
                                    {this.equipmentMaintenance.servicePicture}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <b>维修项目：</b>
                                    <div className="pl80">
                                        <table className="tb">
                                            <tbody>
                                                <tr className="hd">
                                                    <td>材料名称</td>
                                                    <td>数量</td>
                                                </tr>
                                                {this.list.map((maintenanceProject, i) => {
                                                    return <tr key={i}>
                                                        <td >{maintenanceProject.materialName}</td>
                                                        <td >{maintenanceProject.number}</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Equipmentledger

