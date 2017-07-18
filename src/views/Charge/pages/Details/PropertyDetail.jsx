// 收费管理 - 物业费管理(详情)
import React from 'react'
import { Row, Col } from 'antd'
import '../../../../style/test.less'


class App extends React.Component {
    render () {
        return (
            <div className="contract">
                <h2>租户信息</h2>
                <Row>
                    <Col span={8}><i>房间编号：</i>2301/2302/2303/2305/2306 </Col>
                    <Col span={8}><i>所在楼宇：</i>长江中心A座 </Col>
                    <Col span={8}><i>交费期限：</i>2017-07-10 </Col>
                </Row>
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
                <p style={{margin: '20px 0',
                    textAlign: 'right'}}>优惠金额  ¥0 本期应收 ¥50,000.00</p>

                <div className="wrapbox">
                    <div className="main">
                        <p className="line" />
                        <h2>其他信息</h2>
                        <Row>
                            <Col span={8}><i>录入日期：</i>王小明  2017-7-12 13:09:29</Col>
                            <Col span={16}><i>最后修改：</i>王小明  2017-7-12 13:09:29</Col>
                        </Row>
                        <Row>
                            <Col span={8}><i>审核人：</i>李某明   2016-09-27   12:12:12 </Col>
                            <Col span={16}><i>审核状态：</i>不通过，某某原因某某原因某某原因某某原因某某原因某某原因</Col>
                        </Row>
                    </div>
                </div>

                <div className="wrapbox">
                    <div className="title">
                        收款信息
                    </div>
                    <div className="main">
                        <h2>确认收款</h2>
                        <Row>
                            <Col span={8}><i>应收金额：</i>1234 元</Col>
                            <Col span={16}><i>开票状态：</i>已开票</Col>
                        </Row>
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>时间</td>
                                    <td>实收金额</td>
                                    <td>未收收金额</td>
                                    <td>收款方式</td>
                                    <td>经手人</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="line" />
                        <h2>确认违约金</h2>
                        <Row>
                            <Col span={8}><i>违约天数：</i>1 天</Col>
                            <Col span={8}><i>违约金额：</i>1,234  元  （已优惠  0.12 元）</Col>
                            <Col span={8}><i>开票状态：</i>已开票</Col>
                        </Row>
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>时间</td>
                                    <td>实收金额</td>
                                    <td>未收收金额</td>
                                    <td>收款方式</td>
                                    <td>经手人</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>11</td>
                                    <td>23</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default App


