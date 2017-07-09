// 登录页面
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

// particlesJS
// import particlesJS from 'particles.js'

import styled from 'styled-components'
import elf from '../../elf/main'

import particlesStart from './particles-conf'

const FormItem = Form.Item

// 样式 -start
const LoginBox = styled.div`
    height: 100%;
    ${elf.m.flexCenter()};
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
    padding-bottom: ${elf.d.autoPadding};
`
// 样式 - end

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.authenticate = this.authenticate.bind(this)
    }

    // 鉴定事件
    authenticate () {
        setTimeout(() => {
            this.props.authenticate()
        }, 500)
    }

    // 需要更新
    componentWillReceiveProps (nextProps) {
        console.log('props更新')

        // console.log(particlesJS)
        particlesStart()
    }

    // <p>
    //     Clicked: { authState ? (
    //         <b> 登录A </b>
    //     ) : (
    //         <b> 未登录B </b>
    //     )}
    //     <button onClick={ this.authenticate }>
    //         检验登录
    //     </button>
    //     <button onClick={ onSignOut }>
    //         退出
    //     </button>
    // </p>

    render () {
        // const { authState, onSignOut } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <LoginBox id="particles-js">
                <LoginForm>
                    <LoginTitle>
                        <span>长江中心 - 物业管理系统</span>
                    </LoginTitle>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true,
                                    message: '请输入用户名!'
                                }]
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: '请输入密码!'
                                }]
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{ float: 'right' }}>忘记密码</a>
                            <Button onClick={this.authenticate} type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </LoginForm>
            </LoginBox>
        )
    }
}

Login.propTypes = {
    authState: PropTypes.bool.isRequired,       // 布尔值
    authenticate: PropTypes.func.isRequired,    // 函数
    onSignOut: PropTypes.func.isRequired        // 函数
}

export default Form.create()(Login)
