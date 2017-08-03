// 录入违约金
import React from 'react'
import {Form, Input, Button  } from 'antd'
const FormItem = Form.Item

class PowerWritePenalty extends React.Component {
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
                <div style={titleLayout}>录入违约金</div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="违约金名称："
                    >{getFieldDecorator('name')(<Input placeholder="请输入内容" />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="违约金金额："
                    >{getFieldDecorator('lastMeterNumber')(<Input placeholder="请输入内容" />)
                        }
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: '#1FCA3E'}}>增加本条记录</Button>
                    </FormItem>
                </Form>
            </div>)
    }
}

const PowerWritePenaltyComponent = Form.create()(PowerWritePenalty)
export default PowerWritePenaltyComponent
