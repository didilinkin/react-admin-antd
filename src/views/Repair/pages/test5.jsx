// 弹出
import React from 'react'
import { Row, Col, Input, DatePicker, Checkbox } from 'antd'
import '../../../style/test.less'
function onChange (date, dateString) {
    console.log(date, dateString)
}
const CheckboxGroup = Checkbox.Group

function onChange1 (checkedValues) {
    console.log('checked = ', checkedValues)
}

const plainOptions = ['Apple', 'Pear', 'Orange']

class App extends React.Component {
    render () {
        return (
            <div className="alert">
                <Row>
                    <Col span={24}><b>客户明细：</b><Input placeholder=" " /> </Col>
                </Row>
                <Row>
                    <Col span={24}><b>联系人：</b><Input placeholder=" " /> </Col>
                </Row>
                <Row>
                    <Col span={24}><b>行政电话：</b><Input placeholder=" " /> </Col>
                </Row>
                <Row>
                    <Col span={24}><b>财务电话：</b><Input placeholder=" " /> </Col>
                </Row>
                <Row>
                    <Col span={24}><b>经理电话：</b><Input placeholder=" " /> </Col>
                </Row>
                <Row>
                    <Col span={24}><b>E-mail：</b><Input placeholder=" " /> </Col>
                </Row>
                <Row>
                    <Col span={24}><b>起租日期：</b><DatePicker onChange={onChange} /></Col>
                </Row>
                <Row>
                    <Col span={24}><b>结束日期：</b><DatePicker onChange={onChange} /></Col>
                </Row>
                <Row>
                    <Col span={24}><b>租赁房间：</b> <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange1} /></Col>
                </Row>
                <Row>
                    <Col span={24}><b>能源管理押金：</b> <Input placeholder=" " /> 元</Col>
                </Row>
            </div>
        )
    }
}

export default App

