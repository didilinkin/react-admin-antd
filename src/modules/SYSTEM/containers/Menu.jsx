// 系统设置 - 菜单管理
import React from 'react'
import { Tree, Button, Icon, Menu, Dropdown, Form, Input, Radio, notification } from 'antd'
import styled from 'styled-components'
import { apiPost } from '../../../api'
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const RadioGroup = Radio.Group
const MenuContent = styled.div `
    display: flex
`

const MenuBox = styled.div `
    flex: 1;
    border: 1px solid #333;
    word-wrap: break-word;
    overflow-y: scroll;
    overflow-x: scroll;
    height: 463px;
`
const MenuBox1 = styled.div `
    flex: 1;
    border: 1px solid #333;
`
const style = {
    width: '100px',
    height: '25px',
    textAlign: 'center',
    border: '1px solid #c5b4b4',
    lineHeight: '25px'
}
class MenuCom extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            MenuList: [],
            id: 0,
            state: 1, // 1详情 2编辑 3添加
            menu: {}
        }
    }
    Caidan = <Menu>
        <Menu.Item key="1">
            <a onClick={() => this.updateState(3)}>添加下级目录</a>
        </Menu.Item>
        <Menu.Item key="2">
            <a onClick={() => this.updateState(2)}>编辑菜单</a>
        </Menu.Item>
        <Menu.Item key="3">
            <a onClick={() => this.deleteMenu()}>删除菜单</a>
        </Menu.Item>
    </Menu>
    CaidanTwo = <Menu>
        <Menu.Item key="1">
            <a onClick={() => this.updateState(3)}>添加下级目录</a>
        </Menu.Item>
    </Menu>
    deleteMenu = async () => {
        let data = await apiPost(
            'system/deleteMenu',
            {id: this.state.id,
                delFlag: 1}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.initialization()
    }
    updateState = (value) => {
        let menu1 = {}
        this.state.MenuList.forEach(menu => {
            if (menu.id === this.state.id) {
                menu1 = menu
            }
        })
        if (value === 2) {
            let parentName = ''
            this.setState({
                menu: menu1,
                state: value
            })
            this.state.MenuList.forEach(menu => {
                if (menu.id === menu1.parentId) {
                    parentName = menu.menuName
                }
            })
            this.props.form.setFieldsValue({
                menuName: menu1.menuName,
                permissionCode: menu1.permissionCode,
                menuType: menu1.menuType,
                menuUrl: menu1.menuUrl,
                menuImg: menu1.menuImg,
                parentName: parentName
            })
        } else {
            this.props.form.resetFields()
            this.setState({
                menu: menu1,
                state: value
            })
            this.props.form.setFieldsValue({
                parentName: menu1.menuName
            })
        }
    }
    handleButtonClick = (id) => {
        this.setState({
            id: id
        })
    }
    initialization = async () => {
        let MenuList = await apiPost(
            'system/MenuList'
        )
        MenuList = MenuList.data
        this.setState({
            state: 1, // 1详情 2编辑 3添加
            MenuList: MenuList
        })
    }
    info = (menu) => {
        let parentName = ''
        this.state.MenuList.forEach(menu1 => {
            if (menu1.id === menu.parentId) {
                parentName = menu1.menuName
            }
        })
        this.setState({
            state: 1,
            id: menu.id,
            menu: menu
        })
        this.props.form.setFieldsValue({
            menuName: menu.menuName,
            permissionCode: menu.permissionCode,
            menuType: menu.menuType,
            menuUrl: menu.menuUrl,
            menuImg: menu.menuImg,
            parentName: parentName
        })
    }
    recursion (MenuList, i) {
        let arr = []
        let j = 0
        MenuList.forEach((menu) => {
            if (menu.parentId === i) {
                arr[j] = <TreeNode title={<div style={style} onClick={() => this.info(menu)}><Icon type={menu.menuType === 2 ? 'file' : menu.menuType === 3 ? 'tag-o' : 'folder'} />&nbsp;&nbsp;{menu.menuName}&nbsp;&nbsp;<Dropdown trigger={['click']} overlay={this.Caidan} placement="bottomLeft"><Icon onClick={this.handleButtonClick.bind(this, menu.id)} type="caret-down" /></Dropdown></div>} key={menu.id} >
                    {this.recursion(MenuList, menu.id)}
                </TreeNode>
                j = j + 1
            }
        })
        return arr
    }
    componentDidMount () {
        this.initialization()
    }
    Preservation = async () => {
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
            if (this.state.state === 3) {
                json['parentId'] = this.state.id
                this.state.MenuList.forEach(menu => {
                    if (menu.id === this.state.id) {
                        json['menuNumber'] = menu.menuNumber + 1
                    }
                })
                let data = await apiPost(
                    'system/insertMenu',
                    json
                )
                notification.open({
                    message: data.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else if (this.state.state === 2) {
                json['id'] = this.state.id
                let data = await apiPost(
                    'system/updateMenu',
                    json
                )
                notification.open({
                    message: data.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            }
            this.initialization()
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <MenuContent>
                <MenuBox>
                    <Tree
                        showLine
                        defaultExpandAll
                        onSelect={this.onSelect}
                    >
                        <TreeNode title={
                            <div style={style}><Icon type="folder" />&nbsp;&nbsp;菜单结构&nbsp;&nbsp;
                                <Dropdown trigger={['click']} overlay={this.CaidanTwo} placement="bottomLeft">
                                    <Icon onClick={this.handleButtonClick.bind(this, 3)} type="caret-down" />
                                </Dropdown>
                            </div>
                        } key="0-0"
                        >
                            {this.recursion(this.state.MenuList, 3)}
                        </TreeNode>
                    </Tree>
                </MenuBox>
                <MenuBox1>
                    <h2 style={{ marginLeft: '7%',
                        fontWeight: 600 }}
                    >{this.state.state === 1 ? '菜单详情' : this.state.state === 2 ? '编辑菜单' : '添加菜单'}</h2>
                    <hr style={{color: '#EBEBEB',
                        width: '90%',
                        marginLeft: '5%' }}
                    />
                    <Form style={{marginTop: 20}} layout="horizontal">
                        <FormItem label="菜单名称" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('menuName', {
                                rules: [ {
                                    required: true,
                                    message: '请输入菜单名称!'
                                }]
                            })(
                                <Input disabled = {this.state.state === 1} placeholder="请输入菜单名称" />
                            )}
                        </FormItem>
                        <FormItem label="权限标识" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('permissionCode', {
                                rules: [ {
                                    required: true,
                                    message: '请输入权限标识!'
                                }]
                            })(

                                <Input disabled = {this.state.state === 1} placeholder="请输入权限标识" />
                            )}
                        </FormItem>
                        <FormItem label="菜单级别" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('menuType', {
                                rules: [ {
                                    required: true,
                                    message: '请选择菜单级别!'
                                }]
                            })(
                                <RadioGroup disabled = {this.state.state === 1}>
                                    <Radio value={1}>目录</Radio>
                                    <Radio value={2}>页面</Radio>
                                    <Radio value={3}>按钮</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem label="菜单地址" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('menuUrl')(
                                <Input disabled = {this.state.state === 1} placeholder="请输入菜单地址" />
                            )}
                        </FormItem>
                        <FormItem label="图标" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('menuImg')(
                                <Input disabled = {this.state.state === 1} />
                            )}
                        </FormItem>
                        <FormItem label="父级菜单" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('parentName')(
                                <Input disabled />
                            )}
                        </FormItem>
                        {this.state.state !== 1 &&
                        <FormItem>
                            <Button onClick={this.Preservation} type="primary" style={{marginLeft: '45%'}}>保存</Button>
                        </FormItem>
                        }
                    </Form>
                </MenuBox1>
            </MenuContent>
        )
    }
}
let MenuComponent = Form.create()(MenuCom)
export default MenuComponent
