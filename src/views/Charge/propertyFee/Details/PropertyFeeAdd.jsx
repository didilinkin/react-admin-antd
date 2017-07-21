// 收费管理 - 物业费管理
import React from 'react'
import {Row, Col, Input, DatePicker, Select, Modal, Form} from 'antd'
import '../../../../style/test.less'
import { apiPost  } from '../../../../api'
const FormItem = Form.Item
function onChange1 (date, dateString) {
    console.log(date, dateString)
}
function onChange2 (date, dateString) {
    console.log(date, dateString)
}
function onChange3 (date, dateString) {
    console.log(date, dateString)
}
const Option = Select.Option
function handleChange1 (value) {
    console.log(`selected ${value}`)
}
class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            accountList: [],
            openAdd: false,
            isFirst: true,
            data2: [],
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        let accountList = await apiPost(
            '/collectRent/getAccountList'
        )
        this.setState({accountList: accountList.data})
        if (this.state.isFirst && nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
                isFirst: false,
                view: true,
                fileList: []
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let accountList = this.state.accountList
        return (
            <div className="property">
                <Modal maskClosable={false}
                    title= "物业费添加"
                    style={{top: 20}}
                    width={700}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Row>
                            <Col span={12}><i>本次周期：</i><DatePicker onChange={onChange1} /></Col>
                            <Col span={12}><i>所属楼宇：</i><Input placeholder="" style={{ width: 120 }} disabled="disabled" /></Col>
                        </Row>
                        <Row>
                            <Col span={12}><i>交费期限：</i><DatePicker onChange={onChange2} /></Col>
                            <Col span={12}><i>房间编号：</i><Input placeholder="" style={{ width: 120 }} disabled="disabled" /></Col>
                        </Row>
                        <Row>
                            <Col span={12}><i>客户名称：</i>
                                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange1}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                            <Col span={12}><i>房间面积：</i><Input placeholder="" style={{ width: 120 }} disabled="disabled" /></Col>
                        </Row>
                        <Row>
                            <Col span={12}><i>转租客户：</i>
                                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange1}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                            <Col span={12}><i>年物业费：</i><Input placeholder="" style={{ width: 120 }} disabled="disabled" /></Col>
                        </Row>
                        <Row>
                            <Col span={12}><i>下单日期：</i><DatePicker onChange={onChange3} /></Col>
                            <Col span={12}><i>年空调费：</i><Input placeholder="" style={{ width: 120 }} disabled="disabled" /></Col>
                        </Row>
                        <Row>
                            <FormItem label="付款帐号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('accountId')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择付款帐号"
                                        optionFilterProp="children"
                                    >
                                        {accountList.map(Account => {
                                            return <Option key={Account.accountId}>{Account.accountName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                            <Col span={12} />
                        </Row>
                    </div>
                    <div className="bt">
                        <Input style={{ width: 520 }} placeholder="这里默认显示付款通知单名，可修改，打印时读该名" /> 物业费统计表
                    </div>

                    <table className="tb">
                        <tbody>
                            <tr className="hd">
                                <td>费用项目</td>
                                <td>面积</td>
                                <td />
                                <td>单价</td>
                                <td />
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
                        textAlign: 'right'}}
                    >优惠金额 &nbsp; <Input placeholder="" style={{ width: 120 }} /> &nbsp; 本期应收 ¥50,000.00</p>
                </Modal>
            </div>
        )
    }
}

export default App

