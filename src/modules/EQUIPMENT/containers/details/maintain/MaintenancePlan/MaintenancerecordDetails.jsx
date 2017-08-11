// 保养记录
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'
import { apiPost, baseURL } from '../../../../../../api'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            '/deviceMaintain/maintenance/getmaintenance',
            {'id': this.props.match.params.id}
        )
        let maintenance = resulData.data
        let i = 0
        maintenance['scenePictures'] = maintenance.scenePictures.split('#').map(img => {
            if (img !== '') {
                i++
                return <img key={i} src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        this.setState({
            data: maintenance
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div>
                <h2>保养记录</h2>
                <div className="box5">
                    <h3>设备信息</h3>
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
                    <h3>保养记录</h3>
                    <Row>
                        <Col span={12}><b>保养日期：</b> {this.state.data.maintenanceDate}</Col>
                        <Col span={12}><b>保养单号：</b>{this.state.data.maintenanceNumber}</Col>
                    </Row>
                    <ul>
                        <li>
                            <b>保养人员：</b>
                            <div className="pl80">
                                <p>{this.state.data.maintenanceManName}</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>情况说明：</b>
                            <div className="pl80">
                                <p>{this.state.data.statusStatement}</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>现场图片：</b>
                            {this.state.data.scenePictures}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default App
