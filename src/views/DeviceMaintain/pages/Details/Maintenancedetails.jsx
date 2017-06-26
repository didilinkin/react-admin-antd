// 维修明细
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'

class App extends React.Component {
    render () {
        return (
            <div>
                <h2>维修信息</h2>
                <div className="box5">
                    <h3>报修信息</h3>
                    <Row>
                        <Col span={8}><b>送修时间：</b> 1</Col>
                        <Col span={8}><b>报修时间：</b>说的</Col>
                        <Col span={8}><b>维修单号：</b>说的</Col>
                    </Row>
                    <Row>
                        <Col span={8}><b>故障等级：</b>A</Col>
                        <Col span={8}><b>设备状态：</b>运行</Col>
                        <Col span={8} />
                    </Row>
                    <ul>
                        <li>
                            <b>故障描述：</b>
                            <div className="pl80">
                                <p>sdf</p>
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
                    <p className="line" />
                    <h3>报修信息</h3>
                    <Row>
                        <Col span={8}><b>完工时间：</b> 1</Col>
                        <Col span={8}><b>维修人：</b>说的</Col>
                        <Col span={8}><b>协作人：</b>说的</Col>
                    </Row>
                    <ul>
                        <li>
                            <b>维修情况：</b>
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
                    <ul>
                        <li>
                            <b>维修项目：</b>
                            <div className="pl80">
                                <table className="tb">
                                    <tr className="hd">
                                        <td>材料名称</td>
                                        <td>材料编号</td>
                                        <td>数量</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>123</td>
                                    </tr>
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
