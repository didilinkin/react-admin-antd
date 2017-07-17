// 收费管理 - 物业费管理
import React from 'react'
import { Row, Col, Input, DatePicker, Select } from 'antd'
import '../../../style/test.less'

function onChange1 (date, dateString) {
    console.log(date, dateString)
}
function onChange2 (date, dateString) {
    console.log(date, dateString)
}
function onChange3 (date, dateString) {
    console.log(date, dateString)
}
const Option = Select.Option
function handleChange1 (value) {
    console.log(`selected ${value}`)
}

class App extends React.Component {
    render () {
        return (
            <div className="property">
                <div style={{backgroundColor: '#dedede'}}>
                    <Row>
                        <Col span={12}><i>本次周期：</i><DatePicker onChange={onChange1} /></Col>
                        <Col span={12}><i>所属楼宇：</i><Input placeholder="" disabled="disabled" /></Col>
                    </Row>
                    <Row>
                        <Col span={12}><i>交费期限：</i><DatePicker onChange={onChange2} /></Col>
                        <Col span={12}><i>房间编号：</i><Input placeholder="" disabled="disabled" /></Col>
                    </Row>
                    <Row>
                        <Col span={12}><i>客户名称：</i>
                            <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange1}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                        <Col span={12}><i>房间面积：</i><Input placeholder="" disabled="disabled" /></Col>
                    </Row>
                    <Row>
                        <Col span={12}><i>转租客户：</i> </Col>
                        <Col span={12}><i>年物业费：</i><Input placeholder="" disabled="disabled" /></Col>
                    </Row>
                    <Row>
                        <Col span={12}><i>下单日期：</i><DatePicker onChange={onChange3} /></Col>
                        <Col span={12}><i>年空调费：</i><Input placeholder="" disabled="disabled" /></Col>
                    </Row>
                    <Row>
                        <Col span={12}><i>付款账号：</i> </Col>
                        <Col span={12} />
                    </Row>
                </div>
                <div className="bt">
                    <Input placeholder="这里默认显示付款通知单名，可修改，打印时读该名"/> 物业费统计表
                </div>
                <div className="wrapbox">
                    <div className="main">
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>费用项目</td>
                                    <td>面积</td>
                                    <td></td>
                                    <td>单价</td>
                                    <td></td>
                                    <td>月份</td>
                                    <td>金额</td>
                                </tr>
                                <tr>
                                    <td>物业管理费</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>电梯费</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>空调费</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>水费</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>优惠金额 <Input placeholder="" /> 本期应收 ¥50,000.00</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default App

