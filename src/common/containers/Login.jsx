/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-03 12:02:51
 * @modify date 2017-09-03 12:02:51
 * @desc '登录' 页面
*/

import React from 'react'
import { Form, Icon, Input, Button, Modal, Checkbox, notification } from 'antd'
import { apiPost } from '../../api'

import styled from 'styled-components'
import elf from '../../elf'

const FormItem = Form.Item

function info () {
    Modal.info({
        title: '忘记密码',
        content: (
            <div>
                <p>请联系管理员</p>
                <p>修改密码。</p>
            </div>
        ),
        onOk () { }
    })
}

class Login extends React.Component {
    handleSubmit = async () => {
        let adopt = false
        this.props.form.validateFields(
            (err) => {
                if (err) {
                    adopt = false
                } else {
                    adopt = true
                }
            },
        )
        if (adopt) {
            let json = this.props.form.getFieldsValue()
            json['jobNum'] = json.loginName
            console.log(json)
            let token = await apiPost('/login',
                json)
            if (typeof (token.data.eorr) !== 'undefined' && token.data.eorr.toString() === '登陆失败') {
                notification.open({
                    message: '登陆失败',
                    Icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
                })
            } else {
                localStorage.setItem('token', token.data.token)
                localStorage.setItem('PermissionsList', JSON.stringify(token.data.list))
                window.location.href = '/home/index'
            }
        }
    }

    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <LoginBox>
                <LoginForm>
                    <LoginTitle> 长江中心 - 物业管理系统 </LoginTitle>
                    <Form style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {
                                getFieldDecorator('loginName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入用户名!'
                                    }]
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passWord', {
                                    rules: [{
                                        required: true,
                                        message: '请输入密码!'
                                    }]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )
                            }
                            {/* 禁止使用: href="javascript:" */}
                            <a className="login-form-forgot" onClick={info} style={{ float: 'right' }}>忘记密码</a>
                            <Button onClick={this.handleSubmit} type="primary" className="login-form-button" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </LoginForm>
            </LoginBox>
        )
    }
}

// style
const loginImg = require('../../assets/images/Login@2x.png')

const LoginBox = styled.div`
    height: 100%;
    ${elf.m.flexCenter()};
    ${elf.m.bCimg(loginImg, 'cover')};
`

const LoginForm = styled.div`
    width: 320px;
    height: 340px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0,0,0,.08);
    background: #fff;
`

const LoginTitle = styled.h2`
    font-size: ${elf.f.title}px;
    text-align: center;
    padding-bottom: ${elf.d.autoPadding}px;
`

export default Form.create()(Login)
