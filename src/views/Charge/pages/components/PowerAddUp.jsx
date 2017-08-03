import React from 'react'
import {Form, Row, Col, Input, Button, DatePicker, Select} from 'antd'
const FormItem = Form.Item
const {RangePicker} = DatePicker
const Option = Select.Option
const {TextArea} = Input
class PowerAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        PmContract: [],
        PowerRecordlList: []
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }
    // 添加条目
    add = () => {
        console.log('呵呵')
        let json = this.props.form.getFieldsValue()
        console.log(json)
        let jsontwo = {}
        jsontwo['room'] = json.room
        jsontwo['lastMeterNumber'] = json.lastMeterNumber
        jsontwo['meterNumber'] = json.meterNumber
        jsontwo['useNumber'] = json.meterNumber - json.lastMeterNumber
        jsontwo['chenge'] = json.chenge
        jsontwo['sumWater'] = (parseFloat(jsontwo.meterLoss) + parseFloat(json.meterRead)).toFixed(2)
        jsontwo['price'] = json.price
        jsontwo['money'] = (jsontwo.waterUnitPrice * jsontwo.sumWater).toFixed(2)
        jsontwo['electricalLoss'] = jsontwo.chenge * jsontwo.useNumber
        jsontwo['totalPower'] = jsontwo.useNumber * jsontwo.chenge + jsontwo.electricalLoss
        jsontwo['money'] = jsontwo.totalPower * jsontwo.price
        jsontwo['note'] = json.note
        jsontwo['lastMouthUnitPrice'] = json.lastMouthUnitPrice
        jsontwo['lastMouthTotalDosage'] = json.lastMouthTotalDosage
        jsontwo['unitPriceBalance'] = json.unitPriceBalance
        jsontwo['lastMouthTotalDosage'] = json.lastMouthTotalDosage
        jsontwo['Balance'] = json.Balance
        jsontwo['uuid'] = new Date().getTime()
        let PowerRecordlList = this.state.PowerRecordlList
        PowerRecordlList.push(jsontwo)
        this.setState({
            // totalPower: (parseFloat(this.state.totalPower) + parseFloat(jsontwo.sumWater)).toFixed(2),
            // totalMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsontwo.money)).toFixed(2),
            PowerRecordlList: PowerRecordlList
        })
        // this.props.form.setFieldsValue({
        //     receivableMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsontwo.money)).toFixed(2)
        // })
    }
    // 删除条目
    delete = (uuid) => {
        console.log(uuid)
        let PowerRecordlList = this.state.PowerRecordlList
        PowerRecordlList.map((PowerRecord, i) => {
            if (PowerRecord.uuid.toString() === uuid.toString()) {
                PowerRecordlList.splice(i, 1)
                this.setState({
                    // totalWater: (parseFloat(this.state.totalWater) - parseFloat(PowerRecordlList.sumWater)).toFixed(2),
                    // totalMoney: (parseFloat(this.state.totalMoney) - parseFloat(PowerRecordlList.money)).toFixed(2),
                    WaterRecordlList: PowerRecordlList
                })
                // this.props.form.setFieldsValue({
                //     receivableMoney: (parseFloat(this.state.totalMoney) - parseFloat(WaterRecordl.money)).toFixed(2)
                // })
            }
            return ''
        })
    }
    // 数字计算联动
    inputValueChange = (e) => {
        let json = this.props.form.getFieldsValue()
        if (e.target.id === 'meterNumber') {
            let meterNumber = e.target.value
            let lastMeterNumber = json.lastMeterNumber
            console.log(typeof (meterNumber) + '--2--' + typeof (lastMeterNumber))
            this.props.form.setFieldsValue(
                {
                    useNumber: (meterNumber - lastMeterNumber).toFixed(2)
                }
            )
        } else if (e.target.id === 'lastMeterNumber') {
            let lastMeterNumber = e.target.value
            let meterNumber = json.meterNumber
            console.log(meterNumber + '--1--' + lastMeterNumber)
            this.props.form.setFieldsValue(
                {
                    useNumber: meterNumber - lastMeterNumber
                }
            )
        } else if (e.target.id === 'currentMouthUnitPrice') {
            let lastMouthUnitPrice = json.lastMouthUnitPrice
            let currentMouthUnitPrice = e.target.value
            let lastMouthTotalDosage = json.lastMouthTotalDosage
            this.props.form.setFieldsValue(
                {
                    unitPriceBalance: currentMouthUnitPrice - lastMouthUnitPrice,
                    Balance: (currentMouthUnitPrice - lastMouthUnitPrice) * lastMouthTotalDosage
                }
            )
        } else if (e.target.id === 'lastMouthUnitPrice') {
            let lastMouthUnitPrice = e.target.value
            let currentMouthUnitPrice = json.currentMouthUnitPrice
            let lastMouthTotalDosage = json.lastMouthTotalDosage
            this.props.form.setFieldsValue(
                {
                    unitPriceBalance: currentMouthUnitPrice - lastMouthUnitPrice,
                    Balance: (currentMouthUnitPrice - lastMouthUnitPrice) * lastMouthTotalDosage
                }
            )
        } else {
            let lastMouthTotalDosage = e.target.value
            let lastMouthUnitPrice = json.lastMouthUnitPrice
            let currentMouthUnitPrice = json.currentMouthUnitPrice
            this.props.form.setFieldsValue(
                {
                    unitPriceBalance: currentMouthUnitPrice - lastMouthUnitPrice,
                    Balance: (currentMouthUnitPrice - lastMouthUnitPrice) * lastMouthTotalDosage
                }
            )
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 14,
                    offset: 6
                }
            }
        }

        const titleLayout = {
            color: '#ffffff',
            height: 30,
            backgroundColor: '#199BFC',
            textAlign: 'center',
            fontSize: 20
        }
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
                                <td>电损</td>
                                <td>总电量</td>
                                <td>峰谷比例</td>
                                <td>单价</td>
                                <td>金额</td>
                                <td>备注</td>
                                <td>操作</td>
                            </tr>
                            {this.state.PowerRecordlList.map((PowerRecord, i) => <tr key={i}>
                                <td>{PowerRecord.room}</td>
                                <td>{PowerRecord.lastMeterNumber}</td>
                                <td>{PowerRecord.meterNumber}</td>
                                <td>{PowerRecord.useNumber}</td>
                                <td>{PowerRecord.chenge}</td>
                                <td>{PowerRecord.electricalLoss}</td>
                                <td>{PowerRecord.totalPower}</td>
                                <td>{PowerRecord.fenggubili}</td>
                                <td>{PowerRecord.price}</td>
                                <td>{PowerRecord.money}</td>
                                <td>{PowerRecord.note}</td>
                                <td><Button onClick={() => this.delete(PowerRecord.uuid)}>删除</Button></td></tr>)}
                        </tbody>
                    </table>
                </div>
                <Row>
                    <Col span={12} />
                    <Col span={6}>
                        <FormItem label="本期应收" labelCol={{ span: 9 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('receivableMoney', {
                                rules: [ {
                                    required: true,
                                    message: '请填写本期应收!'
                                }]
                            })(<Input style={{width: '100px'}} addonBefore="￥" />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="优惠金额" labelCol={{ span: 9 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('amountReceivable')(<Input onChange={this.amountReceivable} style={{width: '100px'}} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div style={{ width: 300,
                            border: '1px solid #bbb'
                        }}
                        >
                            <div style={titleLayout}>抄表录入</div>
                            <div style={{marginTop: 20}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="房间编号"
                                >{getFieldDecorator('room')(<Select>
                                        <Option value="0001">0001</Option>
                                        <Option value="0002">0002</Option>
                                        <Option value="0003">0003</Option>
                                    </Select>)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="费用名称"
                                >{getFieldDecorator('name')(<Input placeholder="请输入内容" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="上次抄表数"
                                >{getFieldDecorator('lastMeterNumber')(<Input id="lastMeterNumber" onChange={this.inputValueChange} placeholder="请输入内容" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="本次抄表数"
                                >{getFieldDecorator('meterNumber')(<Input id="meterNumber" onChange={this.inputValueChange} placeholder="请输入内容" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="本次用电量"
                                >{getFieldDecorator('useNumber')(<Input addonAfter="Kwh" disabled />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="变比"
                                >{getFieldDecorator('chenge')(<Input placeholder="请输入内容" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单价"
                                >{getFieldDecorator('price')(<Input placeholder="请输入内容" addonAfter="元/度" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="备注"
                                >{getFieldDecorator('note')(<TextArea rows={6} />)
                                    }
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button onClick={this.add} type="primary" htmlType="submit" style={{backgroundColor: '#1FCA3E'}}>增加本条记录</Button>
                                </FormItem>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ width: 300,
                            border: '1px solid #999'
                        }}
                        >
                            <div style={titleLayout}>调差</div>
                            <div onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="本月单价："
                                >{getFieldDecorator('currentMouthUnitPrice')(<Input id="currentMouthUnitPrice" onChange={this.inputValueChange} placeholder="请输入内容" addonAfter="元/度" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="上月单价："
                                >{getFieldDecorator('lastMouthUnitPrice')(<Input id="lastMouthUnitPrice" onChange={this.inputValueChange} placeholder="请输入内容" addonAfter="元/度" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单价差额："
                                >{getFieldDecorator('unitPriceBalance')(<Input disabled addonAfter="元/度" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="上月总用量："
                                >{getFieldDecorator('lastMouthTotalDosage')(<Input id="lastMouthTotalDosage" onChange={this.inputValueChange} placeholder="请输入内容" addonAfter="Kwh" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="差额："
                                >{getFieldDecorator('Balance')(<Input disabled addonAfter="元" />)
                                    }
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{backgroundColor: '#1FCA3E'}}>增加本条记录</Button>
                                </FormItem>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ width: 300,
                            border: '1px solid #999'
                        }}
                        >
                            <div style={titleLayout}>录入违约金</div>
                            <div onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="违约金名称："
                                >{getFieldDecorator('penalbondName')(<Input placeholder="请输入内容" />)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="违约金金额："
                                >{getFieldDecorator('penalbondMoney')(<Input placeholder="请输入内容" addonAfter="元" />)
                                    }
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{backgroundColor: '#1FCA3E'}}>增加本条记录</Button>
                                </FormItem>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Button type="primary" onClick={this.add} style={{marginTop: 20}}>提交</Button>
            </Form>
        )
    }
}

let PowerAddUpComponent = Form.create()(PowerAddUp)
export default PowerAddUpComponent
