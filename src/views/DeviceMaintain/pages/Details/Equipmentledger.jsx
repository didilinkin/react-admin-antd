// 报修明细
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
            <div className="box4">
                <h2>设备明细</h2>
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
                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Equipmentledger

