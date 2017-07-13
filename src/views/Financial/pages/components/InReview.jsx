// 审核中
import React from 'react'
import { Row, Col, Input } from 'antd'
import '../../../../style/test.less'


class App extends React.Component {
    render () {
        return (
            <div className="contract">
                <h2>租户信息</h2>
                <Row>
                    <Col span={8}><b>客户明细：</b>中国移动山东分公司 </Col>
                    <Col span={8}><b>租赁日期：</b>2016-10-02  ~ 2017-10-01</Col>
                    <Col span={8}><b>租赁面积：</b>1378.42 ㎡ </Col>
                </Row>
                <Row>
                    <Col span={8}><b>所属楼宇：</b>长江中心A座 </Col>
                    <Col span={16}><b>房间编号：</b>2301/2302/2303/2305/2306 </Col>
                </Row>
                <div className="wrapbox">
                    <div className="title">
                        租金信息
                    </div>
                    <div className="main">
                        <h2>费用设置</h2>
                        <Row>
                            <Col span={8}><b>合同单价：</b>2.00 元/㎡/天</Col>
                            <Col span={8}><b>缴费方式：</b>季付</Col>
                            <Col span={8}><b>首年租金：</b>123,456.00  元</Col>
                        </Row>
                        <Row>
                            <Col span={24}> 1 年后租金每年递增 5 % </Col>
                        </Row>
                        <p className="line" />
                        <h2>本期租金</h2>
                        <Row>
                            <Col span={8}><b>本期周期：</b>2015-10-02  ~ 2015-10-10</Col>
                            <Col span={8}><b>缴费期限：</b>2015-10-02</Col>
                            <Col span={8}><b>本期租金：</b>1,234 元  （已优惠  0.12 元）</Col>
                        </Row>
                        <p className="line" />
                        <h2>其他信息</h2>
                        <Row>
                            <Col span={8}><b>录入日期：</b>王小明  2017-7-12 13:09:29</Col>
                            <Col span={16}><b>最后修改：</b>王小明  2017-7-12 13:09:29</Col>
                        </Row>
                    </div>
                </div>
                <Input placeholder="请输入审批意见" />
            </div>
        )
    }
}

export default App

