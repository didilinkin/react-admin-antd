import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import OperationBar from '../../components/Layout/OperationBar.js'
import { Button, Row, Form, Input, Select, Layout } from 'antd'
import styles from './UmbrellaEdit.less'

const FormItem = Form.Item


@inject('appStore') @observer
class UmbrellaEdit extends Component {
  render() {

    const { getFieldDecorator, validateFieldsAndScroll } = this.props.form

    return (
      <Layout>
        <OperationBar><div className={styles.title}>修改雨伞</div></OperationBar>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('category', {
              rules: [
                {
                  required: true,
                  message: '选择分类'
                }
              ]
            })(<Input
              size='large'
              placeholder='分类'
            />)}
          </FormItem>
        </form>
      </Layout>
    )
  }
}

export default Form.create()(UmbrellaEdit)