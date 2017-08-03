import React from 'react'
import {Form, Select, Input, Button  } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const {TextArea} = Input
class PowerMeterWrite extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                alert('dad')
            }
        })
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
            height: 50,
            backgroundColor: '#199BFC',
            textAlign: 'center',
            fontSize: 20
        }


        return (
            <div style={{ width: 300,
                border: '1px solid #999'
            }}
            >
                <div style={titleLayout}>抄表录入</div>
                <Form onSubmit={this.handleSubmit}>
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
                    >{getFieldDecorator('lastMeterNumber')(<Input placeholder="请输入内容" />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="本次抄表数"
                    >{getFieldDecorator('meterNumber')(<Input placeholder="请输入内容" />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="本次用电量"
                    >{getFieldDecorator('useNumber')(<Input placeholder="请输入内容" />)
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
                    >{getFieldDecorator('price')(<Input placeholder="请输入内容" />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >{getFieldDecorator('note')(<TextArea rows={10} />)
                        }
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: '#1FCA3E'}}>增加本条记录</Button>
                    </FormItem>
                </Form>
            </div>)
    }
}

const PowerMeterWriteComponent = Form.create()(PowerMeterWrite)
export default PowerMeterWriteComponent
