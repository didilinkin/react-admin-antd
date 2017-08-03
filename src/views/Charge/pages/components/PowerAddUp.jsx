import React from 'react'
import {Form, Row, Col, Input, Button, DatePicker} from 'antd'
import PowerMeterWrite from './PowerMeterWrite'
import PowerAdjustDifferent from './PowerAdjustDifferent'
import PowerWritePenalty from './PowerWritePenalty'
const FormItem = Form.Item
const {RangePicker} = DatePicker
class PowerAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        PmContract: [],
        WaterRecordlList: []
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="horizontal">
                <div style={{background: '#f7f7f7',
                    width: 1000,
                    marginBottom: 20,
                    paddingTop: '22px'}}
                >
                    <Row>
                        <Col span={8}>
                            <FormItem label="本次周期" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('sfzq', {
                                    rules: [ {
                                        required: true,
                                        message: '请选择本次周期!'
                                    }]
                                })(<RangePicker />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="交费期限" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('overdueDate', {
                                    rules: [ {
                                        required: true,
                                        message: '请填写交费期限!'
                                    }]
                                })(<DatePicker />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="抄表人员" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('readId', {
                                    rules: [ {
                                        required: true,
                                        message: '请填写抄表人员!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="客户名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('voucherNo')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="转租客户" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('acceptor')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('rrr')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                </div>

                <span style={{textAlign: 'center',
                    display: 'block'}}
                >
                    {getFieldDecorator('eee')(<Input style={{width: '300px'}} />)}
                    <span>电量统计表</span>
                </span>
                <br />
                <div style={{width: 1000,
                    marginBottom: 20}}
                >
                    <table className="tb">
                        <tbody>
                            <tr className="hd">
                                <td>电费名称</td>
                                <td>上次抄表数</td>
                                <td>本次抄表数</td>
                                <td>本次用电量</td>
                                <td>变比</td>
                                <td>电损0%</td>
                                <td>总电量</td>
                                <td>峰谷比例</td>
                                <td>单价(1.0685)</td>
                                <td>金额</td>
                                <td>备注</td>
                                <td>操作</td>
                            </tr>
                            {this.state.WaterRecordlList.map((WaterRecordl, i) => <tr key={i}>
                                <td>{WaterRecordl.whTypeName}</td>
                                <td>{WaterRecordl.storagePlace}</td>
                                <td>{WaterRecordl.name}</td>
                                <td>{WaterRecordl.standard}</td>
                                <td>{WaterRecordl.unit}</td>
                                <td>{WaterRecordl.unitPrice}</td>
                                <td>{WaterRecordl.number}</td>
                                <td>{WaterRecordl.amount}</td>
                                <td>{WaterRecordl.remark}</td>
                                <td><Button onClick={() => this.delect(WaterRecordl.uuid)}>删除</Button></td></tr>)}
                        </tbody>
                    </table>
                </div>
                <Row>
                    <Col span={8}>
                        <PowerMeterWrite />
                    </Col>
                    <Col span={8}>
                        <PowerAdjustDifferent />
                    </Col>
                    <Col span={8}>
                        <PowerWritePenalty />
                    </Col>
                </Row>
                <Button type="primary" onClick={this.add} style={{marginTop: 20}}>提交</Button>
            </Form>
        )
    }
}

let PowerAddUpComponent = Form.create()(PowerAddUp)
export default PowerAddUpComponent
