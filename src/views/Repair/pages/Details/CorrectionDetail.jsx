import React from 'react'
import { Row, Col } from 'antd'
import '../../../../style/test.less'

class App extends React.Component {

    render () {
        return (
            <div className="box1">
                <h2>整改信息明细</h2>
                <Row>
                    <Col span={12}><b>检查日期：</b> 2017-6-14 17:33:15</Col>
                    <Col span={12}><b>所属楼宇：</b>自动读取结果</Col>
                </Row>
                <Row>
                    <Col span={12}><b>公司名称：</b>此处是公司名称</Col>
                    <Col span={12}><b>所属房间：</b>自动读取</Col>
                </Row>
                <Row>
                    <Col span={24}><b>整改项目：</b>
                        <div style={{float: 'left'}}>
                            <p>1.地插破坏、突出严重；</p>
                            <p>2.原物业管理用房办公桌堆放凌乱，易引起火灾。</p>
                            <p>3.办公室内有微波炉、电磁炉等家电，注意用电安全。</p>
                            <p>4.裙楼办工区部分接线盒破损，线头裸露。</p>
                        </div>
                    </Col>
                </Row>
                <ul>
                    <li><b>现场图片：</b> <img src="" alt=""/><img src="" alt=""/><img src="" alt=""/></li>
                </ul>
                <Row>
                    <Col span={24}><b>检查人：</b>薛凯丽、宋强、徐德存</Col>
                </Row>
            </div>
        )
    }
}
export default App
