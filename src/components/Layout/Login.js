import React, { Component } from 'react'
import styles from './Login.less'
import { observer, inject } from 'mobx-react'
import { Button, Row, Form, Input } from 'antd'

const FormItem = Form.Item
const form = Form.create()

@inject('appStore') @form @observer
class Login extends Component {

  validate() {
    const { loginSubmit } = this.props.appStore
    const { validateFieldsAndScroll } = this.props.form
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      loginSubmit(values)
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form

    const { loading } = this.props.appStore

    return (
      <div className={styles.loginWrapper}>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input
              size='large'
              placeholder='用户名'
              onPressEnter={this.validate.bind(this)}
            />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码'
                }
              ]
            })(<Input
              size='large'
              type='password'
              placeholder='密码'
              onPressEnter={this.validate.bind(this)}
            />)}
          </FormItem>
          <Row>
            <Button
              type='primary'
              size='large'
              onClick={this.validate.bind(this)}
              loading={loading}
              disabled={loading}
            >
              登录
          </Button>
          </Row>
        </form>
      </div>
    )
  }
}

export default Login