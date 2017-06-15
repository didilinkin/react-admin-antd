import React from 'react'
import { Row, Col } from 'antd'
import '../../../../style/test.less'

class App extends React.Component {

    render() {
        return (
            <div className="box1">
                <h2>报修人信息</h2>
                <Row>
                    <Col span={8}><b>报修人：</b> 大叔的哈芬</Col>
                    <Col span={8}><b>联系方式：</b>此处是报修人联系方式</Col>
                    <Col span={8}><b>报修日期：</b>2017-6-13 15:52:03</Col>
                </Row>
                <Row>
                    <Col span={8}><b>报修房间：</b>1504</Col>
                    <Col span={8}><b>公司名称：</b>此处是公司名称</Col>
                    <Col span={8}><b>报修来源：</b>客服录入/微信</Col>
                </Row>
                <Row>
                    <Col span={8}><b>报修单号：</b>123456789</Col>
                    <Col span={8}></Col>
                    <Col span={8}></Col>
                </Row>
                <h2>报修信息</h2>
                <ul>
                    <li><b>报修内容：</b> <span>此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息</span></li>
                    <li><b>报修图片：</b> <img src="" alt=""/><img src="" alt=""/><img src="" alt=""/></li>
                </ul>
                <h2>派单信息</h2>
                <Row>
                    <Col span={8}><b>派单状态：</b>已派工</Col>
                    <Col span={8}><b>派单人：</b>韩俊 2017-6-13 17:12:16</Col>
                    <Col span={8}><b>维修人：</b>被指派的人名</Col>
                </Row>
            </div>
        );
    }
}

export default App

