// 设备明细
import React from 'react'
import { Row, Col, Tabs } from 'antd'
import '../../../../style/test.less'
const TabPane = Tabs.TabPane

function callback (key) {
    console.log(key)
}
class Equipmentledger extends React.Component {
    render () {
        return (
            <div>
                <h2>设备明细</h2>
                <div className="box4">
                    <Row>
                        <Col span={12}><b>所属系统：</b>系统名称</Col>
                        <Col span={12}><b>设备状态：</b>闲置</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>所属类别：</b>类别名</Col>
                        <Col span={12}><b>制造日期：</b>2017-6-23</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备名称：</b>电梯L5</Col>
                        <Col span={12}><b>购置日期：</b>2017-6-23</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备编号：</b>aa122</Col>
                        <Col span={12}><b>使用年限：</b>10年</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>规格型号：</b>PT18/25-19</Col>
                        <Col span={12}><b>使用部门：</b>综合管理部</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>设备品牌：</b>三菱电梯</Col>
                        <Col span={12}><b>维保责任人：</b>张三公司</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>制造单位：</b>单位名</Col>
                        <Col span={12}><b>巡检责任人：</b>李四</Col>
                    </Row>
                    <Row>
                        <Col span={24}><b>备注：</b><div className="pl120">底层</div></Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>安装位置：</b><div className="pl120">底层</div></Col>
                        <Col span={12}><b>设备二维码：</b><img src="" alt=""/></Col>
                    </Row>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="维修记录" key="1">
                            <table className="tb">
                                <tr className="hd">
                                    <td>序号</td>
                                    <td>维修完工时间</td>
                                    <td>故障描述</td>
                                    <td>维修情况</td>
                                    <td>操作</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td><a href="">查看明细</a></td>
                                </tr>
                            </table>
                        </TabPane>
                        <TabPane tab="保养记录" key="2">
                            <table className="tb">
                                <tr className="hd">
                                    <td>序号</td>
                                    <td>保养日期</td>
                                    <td>保养单号</td>
                                    <td>保养情况</td>
                                    <td>保养人员</td>
                                    <td>操作</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td><a href="">查看明细</a></td>
                                </tr>
                            </table>
                        </TabPane>
                        <TabPane tab="启停记录" key="3">
                            <table className="tb">
                                <tr className="hd">
                                    <td>类型</td>
                                    <td>申请部门</td>
                                    <td>申请人</td>
                                    <td>申请日期</td>
                                    <td>申请原因</td>
                                    <td>设备去向</td>
                                    <td>审批人</td>
                                    <td>审批日期</td>
                                    <td>备注</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>9</td>
                                </tr>
                            </table>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Equipmentledger

