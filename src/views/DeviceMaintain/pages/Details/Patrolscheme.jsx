// 巡检计划
import React from 'react'
import { Row, Col, Table} from 'antd'
import '../../../../style/test.less'

const columns = [{
    title: '设备编号',
    dataIndex: 'number',
    key: 'number'
}, {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '规格型号',
    dataIndex: 'type',
    key: 'type'
}, {
    title: '所属系统',
    dataIndex: 'sys',
    key: 'sys'
}]

const data = [{
    key: '1',
    number: '1',
    name: 'John Brown',
    type: 32,
    sys: 'New York No. 1 Lake Park'
}, {
    key: '2',
    number: '2',
    name: 'Jim Green',
    type: 42,
    sys: 'London No. 1 Lake Park'
}, {
    key: '3',
    number: '3',
    name: 'Joe Black',
    type: 32,
    sys: 'Sidney No. 1 Lake Park'
}]
class App extends React.Component {
    render () {
        return (
            <div>
                <h2>巡检计划明细</h2>
                <div className="box1">
                    <Row>
                        <Col span={12}><b>计划名称：</b> 1</Col>
                        <Col span={12}><b>计划状态：</b>执行中</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>所属系统：</b>水暖系统</Col>
                        <Col span={12}><b>执行时间：</b>2017-06-01</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>所属部门：</b>工程与维修部</Col>
                        <Col span={12}><b>截止时间：</b>2017-06-01</Col>
                    </Row>
                    <Row>
                        <Col span={12}><b>巡检人：</b>徐德存</Col>
                        <Col span={12}><b>循环周期：</b>4周</Col>
                    </Row>
                    <p className="line" />
                    <p>巡检设备</p>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default App
