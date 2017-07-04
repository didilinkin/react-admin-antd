// 保养记录
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'

class App extends React.Component {
    render () {
        return (
            <div>
                <h2>保养记录</h2>
                <div className="box5">
                    <h3>设备信息</h3>
                    <Row>
                        <Col span={12}><b>设备编号：</b> 1</Col>
                        <Col span={12}><b>所属系统：</b>说的</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备名称：</b>A</Col>
                        <Col span={12}><b>设备类别：</b>运行</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>规格型号：</b>A</Col>
                        <Col span={12}><b>使用部门：</b>运行</Col>
                    </Row>
                    <p className="linenone" />
                    <h3>保养记录</h3>
                    <Row>
                        <Col span={12}><b>保养日期：</b> 2017-6-27</Col>
                        <Col span={12}><b>保养单号：</b>说的</Col>
                    </Row>
                    <ul>
                        <li>
                            <b>保养人员：</b>
                            <div className="pl80">
                                <p>收电费的方法</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>情况说明：</b>
                            <div className="pl80">
                                <p>收电费的方法</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>现场图片：</b>
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default App
