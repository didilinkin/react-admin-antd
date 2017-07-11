// 报修明细
import React from 'react'
import { Row, Col, Tabs } from 'antd'
import '../../../style/test.less'
const TabPane = Tabs.TabPane
function callback (key) {
    console.log(key)
}


class App extends React.Component {
    render () {
        return (
            <div className="contract">
                <h2>房源信息</h2>
                <Row>
                    <Col span={8}><b>所属楼宇：</b>长江中心A座 </Col>
                    <Col span={8}><b>服务面积：</b>d</Col>
                    <Col span={8}><b>房间别名：</b>123</Col>
                </Row>
                <Row>
                    <Col span={24}><b>房间编号：</b>2301/2302/2303/2305/2306 </Col>
                </Row>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="物业合同" key="1">
                        <div className="wrapbox">
                            <div className="title">
                                客户信息
                            </div>
                            <div className="main">
                                <h3>客户信息</h3>
                                <Row>
                                    <Col span={8}><b>物业客户名称：</b>长江中心A座 </Col>
                                    <Col span={8}><b>联系人：</b>对对对</Col>
                                    <Col span={8}><b>经理电话：</b>123456789</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>行政电话：</b>123456789 </Col>
                                    <Col span={8}><b>财务电话：</b>123456789</Col>
                                    <Col span={8}><b>E-mail：</b>123456789@163.com</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>签约日期：</b>2017-7-11 14:17:07 </Col>
                                    <Col span={8} />
                                    <Col span={8} />
                                </Row>
                                <p className="line" />
                                <h3>转租信息</h3>
                                <Row>
                                    <Col span={8}><b>租户名称：</b>长江中心A座 </Col>
                                    <Col span={8}><b>联系人：</b>对对对</Col>
                                    <Col span={8}><b>行政电话：</b>123456789</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>财务电话：</b>123456789 </Col>
                                    <Col span={8}><b>经理电话：</b>123456789</Col>
                                    <Col span={8}><b>E-mail：</b>123456789@163.com</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>转租周期：</b>2017-7-11 14:17:07 </Col>
                                    <Col span={16}><b>转租房间：</b>2301/2302/2303/2305/2306 </Col>
                                </Row>
                            </div>

                        </div>
                        <div className="wrapbox">
                            <div className="title">
                                日期信息
                            </div>
                            <div className="main">
                                <Row>
                                    <Col span={8}><b>服务周期：</b>2015-10-02  ~ 2015-10-10 </Col>
                                    <Col span={16}><b>录入时间：</b>王小明      2016-09-26    12:12:12</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>合同编号：</b>ABC-123456789 </Col>
                                    <Col span={16}><b>最后修改：</b>王小明      2016-09-26    12:12:12</Col>
                                </Row>
                                <p className="line" />
                                <Row>
                                    <Col span={8}><b>终止日期：</b>长江中心A座 </Col>
                                    <Col span={16}><b>终止原因：</b>对对对长江中心A座</Col>
                                </Row>
                            </div>
                        </div>

                        <div className="wrapbox">
                            <div className="title">
                                日期信息
                            </div>
                            <div className="main">
                                <Row>
                                    <Col span={8}><b>物业费单价：</b>4.85 元／㎡/月 </Col>
                                    <Col span={16}><b>电费收费方式：</b>峰平谷        单价 2 元/度            变比  1    电损比 10%</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>空调费单价：</b>ABC-123456789 </Col>
                                    <Col span={16}><b>水费收费方式：</b>王小明      2016-09-26    12:12:12</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>电梯费单价：</b>ABC-123456789 </Col>
                                    <Col span={16}><b>能源管理押金：</b>王小明      2016-09-26    12:12:12</Col>
                                </Row>
                                <ul>
                                    <li>
                                        <b>业主自交房间：</b>
                                        2501/2502/25032501/2502/25032501/2502
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="租赁合同" key="2">
                        <div className="wrapbox">
                            <div className="title">
                                客户信息
                            </div>
                            <div className="main">
                                <Row>
                                    <Col span={8}><b>租赁客户名称：</b>张三的公司</Col>
                                    <Col span={8}><b>联系人：</b>王小明</Col>
                                    <Col span={8}><b>经理电话：</b>123456789</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>行政电话：</b>123456789 </Col>
                                    <Col span={8}><b>财务电话：</b>123456789</Col>
                                    <Col span={8}><b>E-mail：</b>123456789@123.com</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>签约日期：</b>2017-7-11 15:23:19 </Col>
                                    <Col span={16} />
                                </Row>
                            </div>
                        </div>
                        <div className="wrapbox">
                            <div className="title">
                                日期信息
                            </div>
                            <div className="main">
                                <Row>
                                    <Col span={8}><b>租赁周期：</b>2015-10-02  ~ 2015-10-10</Col>
                                    <Col span={16}><b>录入时间：</b>王小明      2016-09-26    12:12:12</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>合同编号：</b>ABC-123456789 </Col>
                                    <Col span={16}><b>最后修改：</b>王小明      2016-09-26    12:12:12</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>终止日期：</b>王小明      2016-09-26    12:12:12</Col>
                                    <Col span={16}><b>终止原因：</b>终止原因终止原因终止原因终止原因</Col>
                                </Row>
                            </div>
                        </div>
                        <div className="wrapbox">
                            <div className="title">
                                租赁费用
                            </div>
                            <div className="main">
                                <Row>
                                    <Col span={8}><b>收费方式：</b>单价递增</Col>
                                    <Col span={8}><b>合同单价：</b>2.0 元/㎡/天</Col>
                                    <Col span={8}><b>首年租金：</b>123,456 元 </Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>交费周期：</b>季付</Col>
                                    <Col span={8}><b>免租期：</b>2017/1/1-2017/1/15</Col>
                                    <Col span={8}><b>免租金额：</b>10000 元</Col>
                                </Row>
                                <Row>
                                    <Col span={24}><b>租赁保证金：</b>1,378.42 元 （当前余额：123.00 元） &nbsp; 1 年后租金每年递增 5 %</Col>
                                </Row>
                                <p className="line" />
                                <table className="tb">
                                    <tbody>
                                        <tr className="hd">
                                            <td>租赁周期</td>
                                            <td>交费期限</td>
                                            <td>金额 （元）</td>
                                            <td>优惠（元）</td>
                                            <td>应收租金（元）</td>
                                            <td>实收租金（元）</td>
                                            <td>未收租金（元）</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>23</td>
                                            <td>23</td>
                                            <td>11</td>
                                            <td>23</td>
                                            <td>23</td>
                                            <td>11</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>23</td>
                                            <td>23</td>
                                            <td>11</td>
                                            <td>23</td>
                                            <td>23</td>
                                            <td>11</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>23</td>
                                            <td>23</td>
                                            <td>11</td>
                                            <td>23</td>
                                            <td>23</td>
                                            <td>11</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="首期费用" key="3">
                        <div className="wrapbox">
                            <div className="title">
                                租赁费用
                            </div>
                            <div className="main">
                                <Row>
                                    <Col span={8}><b>合同单价：</b>2.0 元/㎡/天</Col>
                                    <Col span={8}><b>租赁保证金：</b>1,378.42 元</Col>
                                    <Col span={8}><b>首年租金：</b>123,456 元</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>首期周期：</b>2017/1/1-2017/1/15</Col>
                                    <Col span={8}><b>首期租金：</b>123,456 元</Col>
                                    <Col span={8}><b>费用小计：</b>111,112 元</Col>
                                </Row>
                            </div>
                        </div>
                        <div className="wrapbox">
                            <div className="title">
                                物业费用
                            </div>
                            <div className="main">
                                <div className="leftbox">
                                    <table className="tb">
                                        <tbody>
                                            <tr className="hd">
                                                <td>费用类别</td>
                                                <td>收费标准</td>
                                                <td>金额 （元）</td>
                                            </tr>
                                            <tr>
                                                <td>物业管理费</td>
                                                <td>4.85 元／㎡/月</td>
                                                <td>123.12</td>
                                            </tr>
                                            <tr>
                                                <td>电梯费</td>
                                                <td>1.35 元／㎡/月</td>
                                                <td>123.12</td>
                                            </tr>
                                            <tr>
                                                <td>空调费</td>
                                                <td>0.85 元／㎡/月</td>
                                                <td>123.12</td>
                                            </tr>
                                            <tr>
                                                <td>水费</td>
                                                <td>1.0 元/㎡ </td>
                                                <td>0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="right">
                                    <ul>
                                        <li><b>首次周期 :</b>2015-10-02  ~ 2015-10-10</li>
                                        <li><b>首期物业费 :</b>1378.42 元 </li>
                                        <li><b>能源管理押金 :</b>ABC-123456789</li>
                                        <li><b>费用小计 :</b>123,456.00 元 (已优惠金额  0.12元 )</li>
                                    </ul>
                                </div>
                                <p className="clearfix" />
                            </div>
                        </div>
                        <p>费用合计：50,000.0元</p>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default App

