// 审核后
import React from 'react'
import { Row, Col, DatePicker, Input, Select } from 'antd'
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
                    <Col span={24}><b>本期周期：</b><DatePicker onChange={onChange} /></Col>
                </Row>
                <Row>
                    <Col span={24}><b>收费期限：</b><DatePicker onChange={onChange1} /></Col>
                </Row>
                <Row>
                    <Col span={24}><b>本期租金：</b>¥ 50000.0 </Col>
                </Row>
                <Row>
                    <Col span={24}><b>优惠金额：</b><Input addonBefore="¥" defaultValue="请输入" /></Col>
                </Row>
                <Row>
                    <Col span={24}><b>付款账户：</b>
                        <Select defaultValue="lucy" style={{ width: '120' }} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App

