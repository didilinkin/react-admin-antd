// 机房明细
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'

class App extends React.Component {
    render () {
        return (
            <div>
                <div className="box6">
                    <h3>机房明细</h3>
                    <Row>
                        <Col span={24}><b>机房编号：</b> 1</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>机房名称：</b>A</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所属系统：</b>某某系统</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所属类别：</b>某某类别</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所在楼层：</b>1层</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>所属设备：</b>设备名称1  设备名称2  设备名称3  设备名称4  设备名称5  设备名称6 设备名称7</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>设备二维码：</b><img src="" alt="" /></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default App
