// 审核后
import React from 'react'
import { Row, Col, DatePicker, Input, Select, Button } from 'antd'
import '../../../style/test.less'

const Option = Select.Option

function onChange (date, dateString) {
    console.log(date, dateString)
}

function onChange1 (date, dateString) {
    console.log(date, dateString)
}

function handleChange (value) {
    console.log(`selected ${value}`)
}

class App extends React.Component {
    render () {
        return (
            <div className="contract">
                <Row>
                    <Col span={24}><i>本期周期：</i><DatePicker onChange={onChange} /></Col>
                </Row>
                <Row>
                    <Col span={24}><i>收费期限：</i><DatePicker onChange={onChange1} /></Col>
                </Row>
                <Row>
                    <Col span={24}><i>本期租金：</i>¥ 50000.0 </Col>
                </Row>
                <Row>
                    <Col span={24}><i>优惠金额：</i><Input addonBefore="¥" defaultValue="请输入" /></Col>
                </Row>
                <Row>
                    <Col span={24}><i>付款账户：</i>
                        <Select defaultValue="lucy" style={{ width: '120' }} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Col>
                </Row>
                <p className="line" />
                <Button type="primary">确认</Button>&nbsp;&nbsp;
                <Button>取消</Button>
            </div>
        )
    }
}

export default App

