// 保养明细
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'

class App extends React.Component {
    render () {
        return (
            <div>
                <h2>保养明细</h2>
                <div className="box1">
                    <Row>
                        <Col span={12}><b>保养日期：</b> 1</Col>
                        <Col span={12}><b>保养单号：</b>说的</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>保养人：</b>A</Col>
                        <Col span={812}></Col>
                    </Row>
                    <ul>
                        <li>
                            <b>情况说明：</b>
                            <div className="pl80">
                                <p>sdf</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>现场图片：</b>
                            <img src="" alt=""/>
                            <img src="" alt=""/>
                            <img src="" alt=""/>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default App
