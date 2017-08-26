// 维修记录
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'
import { apiPost, baseURL } from '../../../../api'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {},
            list: []
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            '/deviceMaintain/maintenance/getEquipmentRepair',
            {'id': this.props.match.params.id}
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
        this.setState({
            data: equipmentMaintenance,
            list: equipmentMaintenance.list
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div>
                <h2>维修明细</h2>
                <div className="box5">
                    <h3>设备明细</h3>
                    <Row>
                        <Col span={12}><b>设备编号：</b> {this.state.data.equipmentNumber}</Col>
                        <Col span={12}><b>所属系统：</b>{this.state.data.systemName}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备名称：</b>{this.state.data.equipmentName}</Col>
                        <Col span={12}><b>设备类别：</b>{this.state.data.categoryName}</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>规格型号：</b>{this.state.data.equipmentModel}</Col>
                        <Col span={12}><b>使用部门：</b>{this.state.data.useDepartment}</Col>
                    </Row>
                    <p className="linenone" />
                    <h3>报修信息</h3>
                    <Row>
                        <Col span={8}><b>送修时间：</b> {this.state.data.repairDate}</Col>
                        <Col span={8}><b>报修人：</b>{this.state.data.repairManName}</Col>
                        <Col span={8}><b>维修单号：</b>{this.state.data.maintenanceNumber}</Col>
                    </Row>
                    <Row>
                        <Col span={8}><b>故障等级：</b>{this.state.data.failureLevel}</Col>
                        <Col span={8}><b>设备状态：</b>{this.state.data.equipmentStatus}</Col>
                        <Col span={8} />
                    </Row>
                    <ul className="clearfix">
                        <li>
                            <b>故障描述：</b>
                            <div className="pl80">
                                <p>{this.state.data.faultDescription}</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>现场图片：</b>
                            {this.state.data.scenePictures}
                        </li>
                    </ul>
                    <p className="line" />
                    <h3>维修情况</h3>
                    <Row>
                        <Col span={8}><b>完工时间：</b> {this.state.data.makespan}</Col>
                        <Col span={8}><b>维修人：</b>{this.state.data.repairerName}</Col>
                        <Col span={8}><b>协作人：</b>{this.state.data.collaboratorNames}</Col>
                    </Row>
                    <ul className="clearfix">
                        <li>
                            <b>维修情况：</b>
                            <div className="pl80">
                                <p>{this.state.data.maintenanceStatus}</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>现场图片：</b>
                            {this.state.data.servicePicture}
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
                                        {this.state.list.map((maintenanceProject, i) => {
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
        )
    }
}

export default App
