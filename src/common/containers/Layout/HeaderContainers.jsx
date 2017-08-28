// 顶部导航条
import React from 'react'
import {Menu, Icon, Layout, Badge, Modal, Form, Input, Row, Col, notification} from 'antd'

import screenfull from 'screenfull'

import styled from 'styled-components'
import elf from '../../../elf'
import { apiPost } from '../../../api/index'

import userLogo from '../../../assets/images/b1.jpg'

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const FormItem = Form.Item

const UserDiv = styled.span`
    position: relative;
    display: inline-block;
    width: 40px;
    line-height: 1;
    border-radius: 500px;
    white-space: nowrap;
    font-weight: bold;
    i {
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        margin: 1px;
        border-width: 2px;
        border-style: solid;
        border-radius: 100%;
        border-color: #ffffff;
        &.bottom {
            left: auto;
            top: auto;
            bottom: 0;
            right: 0;
        }
        &.on {
            background-color: #6cc788;
        }
    }
    img {
        vertical-align: middle;
        border-radius: 500px;
        width: 100%;
    }
`

class headerContainers extends React.Component {
    // 展开状态
    state = {
        collapsed: false,
        visible: false,
        visible1: false
    }
    // 全屏操作
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request()
        }
    }

    Logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        if ((json.oldPassWord + '') === 'undefined' || (json.oldPassWord + '') === '') {
            notification.open({
                message: '旧密码不能为空！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            return false
        }
        if ((json.passWord + '') === 'undefined' || (json.passWord + '') === '') {
            notification.open({
                message: '新密码不能为空！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            return false
        }
        let pattern = /^(?![^a-zA-Z]+$)(?!\D+$).{6,12}/
        if (!pattern.test(json.passWord)) {
            notification.open({
                message: '密码长度6-12位，且必须同时含有数字和字母',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            return false
        }
        if (json.confirmPassWord !== json.passWord) {
            notification.open({
                message: '两次密码输入不一致！',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            return false
        }
        let result = await apiPost(
            '/system/updatePassWord',
            json
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        if (result.data === '修改成功') {
            this.setState({visible: false,
                isFirst: true })
            window.location.href = '/login'
        }
    }
    handleSubmit2 = async () => {
        let json = this.props.form.getFieldsValue()
        let result = await apiPost(
            '/system/updatePhone',
            json
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({visible: false,
            visible1: false })
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            visible1: false})
    }
    updatePassword = () => {
        this.setState({
            visible: true,
            visible1: false
        })
    }
    updatePhone = () => {
        this.setState({
            visible1: true,
            visible: false
        })
    }

    // 打开 '个人设置'页面
    // toOptions = () => {
    //     // console.log(this)
    //     this.props.route.history.push('/home/system/options')
    // }

    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Header className="custom-theme"
                style={{
                    padding: 0,
                    height: 65,
                    background: elf.c.content
                }}
            >
                <Modal maskClosable={false}
                    title="修改密码"
                    style={{top: 100}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={20}>
                                <FormItem label="旧密码" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('oldPassWord', {
                                        rules: [ {
                                            required: true,
                                            message: '旧密码不能为空'
                                        }]
                                    })(
                                        <Input placeholder="请输入旧密码" />
                                    )}
                                </FormItem>
                                <FormItem label="新密码" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('passWord', {
                                        rules: [ {
                                            required: true,
                                            message: '新密码不能为空'
                                        }]
                                    })(
                                        <Input placeholder="请输入新密码" />
                                    )}
                                </FormItem>
                                <FormItem label="确认密码" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('confirmPassWord', {
                                        rules: [ {
                                            required: true,
                                            message: '确认密码不能为空'
                                        }]
                                    })(
                                        <Input placeholder="请输入确认密码" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <Modal maskClosable={false}
                    title="修改电话"
                    style={{top: 100}}
                    width={400}
                    visible={this.state.visible1}
                    onOk={this.handleSubmit2}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={20}>
                                <FormItem label="电话" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('phone')(
                                        <Input placeholder="请输入新的手机号或座机号码" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <Icon
                    className="trigger custom-trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                    style={{
                        fontSize: elf.f.text + 'px',
                        lineHeight: '64px',
                        padding: '0',
                        cursor: 'pointer',
                        transition: 'color .3s'
                    }}
                />
                {/* 顶部导航菜单 */}
                <Menu
                    mode="horizontal"
                    style={{
                        background: elf.c.content,
                        lineHeight: '64px',
                        float: 'right'
                    }}
                >
                    {/* 全屏按钮 */}
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>

                    {/* 用户消息 */}
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>

                    {/* 用户中心 */}
                    <SubMenu
                        title={
                            <UserDiv className="avatar">
                                <img src={ userLogo } alt="头像" />
                                <i className="on bottom b-white" />
                            </UserDiv>
                        }
                    >
                        <MenuItemGroup style={{ paddingRight: '0' }}>
                            <Menu.Item key="setting:3">
                                <a onClick={this.updatePassword}>修改密码</a>
                            </Menu.Item>
                            <Menu.Item key="setting:4">
                                <a onClick={this.updatePhone}>修改电话</a>
                            </Menu.Item>
                            <Menu.Item key="setting:5">
                                <span onClick={this.Logout}>退出</span>
                            </Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -50px;
                    }
                `}</style>
            </Header>

        )
    }
}
let HeaderContainers = Form.create()(headerContainers)
export default HeaderContainers
