// 电梯异常
import React from 'react'
import { Row, Col} from 'antd'
import '../../../../style/test.less'

class App extends React.Component {
    render () {
        return (
            <div>
                <div className="box6">
                    <h3>异常记录</h3>
                    <Row>
                        <Col span={12}><b>设备名称：</b>moumoumo</Col>
                        <Col span={12}><b>提交日期：</b>2017-7-5 10:10:58</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备编号：</b>A</Col>
                        <Col span={12}><b>记录人：</b>某某某</Col>
                    </Row>
                    <ul>
                        <li>
                            <b>故障描述：</b>
                            <div className="pl80">
                                <p>收电费的方法</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>处理结果：</b>
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
                            <b>停机时间：</b>
                            <div className="pl80">
                                <table className="tb">
                                    <tr className="hd">
                                        <td>开始时间</td>
                                        <td>结束时间</td>
                                        <td>用时</td>
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
