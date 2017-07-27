// 客户管理 - 合同管理 - 欢乐颂合同 [详情]
import React from 'react'
import { Row, Button, Col} from 'antd'
import '../../../../style/test.less'

class App extends React.Component {
    render () {
        return (
            <div className="contract">
                <div className="wrapbox">
                    <div className="title">房源信息</div>
                    <div className="main">
                        <Row>
                            <Col span={8}><b>所属楼宇：</b>长江中心A座 </Col>
                            <Col span={8}><b>服务面积：</b>d</Col>
                            <Col span={8}><b>房间别名：</b>123</Col>
                        </Row>
                        <Row>
                            <Col span={24}><b>房间编号：</b>2301/2302/2303/2305/2306 </Col>
                        </Row>
                    </div>
                </div>
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
                    <Button type="primary">终止合同</Button>
                </div>
            </div>
        )
    }
}

export default App

