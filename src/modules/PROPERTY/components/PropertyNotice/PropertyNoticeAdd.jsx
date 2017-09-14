// 楼宇添加
import {Modal, Input, Form, Row, Col, Icon, notification, Button} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import '../../style/test.less'
const FormItem = Form.Item
class PropertyNoticeAdd extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        title: '',
        data: {}
    }

    async initialRemarks (nextProps) {
        this.setState({
            view: false,
            title: nextProps.title
        })
        if (nextProps.id !== null) {
            if (this.state.isFirst && nextProps.visible) {
                let propertyNotice = await apiPost(
                    '/complaint/getNoticeById',
                    {id: nextProps.id}
                )
                console.log(propertyNotice)
                this.props.form.setFieldsValue({
                    title: propertyNotice.data.title,
                    content: propertyNotice.data.content
                })
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        } else {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async (status) => {
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
            json['status'] = status
            if (this.props.id > 0) {
                json['id'] = this.props.id
                await apiPost(
                    'complaint/updateNotice',
                    json
                )
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.close()
                this.props.refreshTable()
                this.setState({
                    visible: false,
                    isFirst: true
                })
            } else {
                await apiPost(
                    'complaint/insertNotice',
                    json
                )
                notification.open({
                    message: '添加成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.close()
                this.props.refreshTable()
                this.setState({
                    visible: false,
                    isFirst: true
                })
            }
        }
    }
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title={this.state.title}
                style={{top: 20}}
                width={500}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form layout="horizontal">
                    <Row>
                        <Col span={20}>
                            <FormItem label="标题" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('title', {
                                    rules: [ {
                                        required: true,
                                        message: '标题不能为空'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem label="内容" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('content')(<Input type={'textarea'} size={'large'} />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Button type="primary" onClick={() => this.handleSubmit(0)} >保存&nbsp;&nbsp;</Button>&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={() => this.handleSubmit(1)} >保存并发布&nbsp;&nbsp;</Button>&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.handleCancel} >取消</Button>
            </Modal>
        )
    }
}

let PropertyNoticeAddComponent = Form.create()(PropertyNoticeAdd)

export default PropertyNoticeAddComponent
