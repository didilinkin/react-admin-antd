import React from 'react';
import { Row, Col } from 'antd';
import '../../../style/test.less';

class App extends React.Component {

    render() {
        return (
            <div className="box1">
                <h2>报修人信息</h2>
                <Row>
                    <Col span={12}><b>维修日期：</b> 2017-6-14 17:33:15</Col>
                    <Col span={12}><b>维修状态：</b>已完工/已取消</Col>
                </Row>
                <Row>
                    <Col span={12}><b>维修人：</b>维修人名称</Col>
                    <Col span={12}><b>协作人：</b>协作人1 协作人2</Col>
                </Row>
                <Row>
                    <Col span={24}><b>维修情况：</b>此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息此处是报修信息</Col>
                </Row>
                <ul>
                    <li><b>现场图片：</b> <img src="" alt=""/><img src="" alt=""/><img src="" alt=""/></li>
                </ul>
            </div>
        );
    }
}

export default App

