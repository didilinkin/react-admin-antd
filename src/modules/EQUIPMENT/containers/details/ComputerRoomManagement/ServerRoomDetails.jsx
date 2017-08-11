// 机房明细
import React from 'react'
import { Row, Col} from 'antd'
import '../../../style/test.less'
import { apiPost, baseURL } from '../../../../../api'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            '/equipment/gitMachineRoom',
            {'id': this.props.match.params.id}
        )
        let machineRoom = resulData.data
        this.setState({
            data: machineRoom
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div>
                <div className="box6">
                    <h3>机房明细</h3>
                    <Row>
                        <Col span={24}><b>机房编号：</b>{this.state.data.machineRoomNumber}</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>机房名称：</b>{this.state.data.machineRoomName}</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所属系统：</b>{this.state.data.systemName}</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所属类别：</b>{this.state.data.categoryName}</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所在楼层：</b>{this.state.data.floor}层</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所属设备：</b>{this.state.data.equipmentNames}</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>设备二维码：</b><img src={baseURL + 'storage/files/' + this.state.data.twoCode} alt="" /></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default App
