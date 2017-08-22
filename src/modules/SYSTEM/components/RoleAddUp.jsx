// 系统设置 - 菜单管理
import React from 'react'
import { Tree, Button, Icon, Form, Modal, notification, Select, Input } from 'antd'
import styled from 'styled-components'
import { apiPost } from '../../../api'
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const Option = Select.Option

const MenuBox = styled.div `
    border: 1px solid #333;
    word-wrap: break-word;
    overflow-y: scroll;
    overflow-x: scroll;
    height: 363px;
`
class RoleAddUp extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            MenuList: [],
            HaveMenuList: [],
            visible: false,
            isFirst: true
        }
    }
    initialization = async (nextProps) => {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            if (nextProps.id > 0) {
                let MenuList = await apiPost(
                    '/system/RoleMenuList',
                    {'id': nextProps.id}
                )
                MenuList = MenuList.data
                let arr = []
                MenuList.forEach(menu => {
                    arr.push(menu.id)
                })
                this.setState({
                    visible: nextProps.visible,
                    HaveMenuList: arr,
                    isFirst: false
                })
                let Role = await apiPost(
                    'system/getRole',
                    {'id': nextProps.id}
                )
                Role = Role.data
                this.props.form.setFieldsValue({
                    departmentId: Role.departmentName,
                    roleName: Role.roleName,
                    roleNumber: Role.roleNumber
                })
            } else {
                this.setState({
                    visible: nextProps.visible,
                    HaveMenuList: [],
                    isFirst: false
                })
            }
        }
    }
    haveMenuList = (menu) => {
        let HaveMenuList = this.state.HaveMenuList
        if (HaveMenuList.indexOf(menu) >= 0) {
            HaveMenuList.splice(HaveMenuList.indexOf(menu), 1)
        } else {
            HaveMenuList.push(menu)
        }
        this.setState({
            HaveMenuList: HaveMenuList
        })
    }
    recursion (MenuList, i) {
        let arr = []
        let j = 0
        MenuList.forEach((menu) => {
            if (menu.parentId === i) {
                arr[j] =
                    <TreeNode title={
                        <Button style={this.state.HaveMenuList.indexOf(menu.id) >= 0 ? {backgroundColor: 'red',
                            color: 'antiquewhite'} : null } onClick={() => this.haveMenuList(menu.id)}
                        >
                            <Icon type={menu.menuType === 2 ? 'file' : menu.menuType === 3 ? 'tag-o' : 'folder'} />
                            {menu.menuName}
                        </Button>
                    } key={menu.id}
                    >
                        {this.recursion(MenuList, menu.id)}
                    </TreeNode>
                j = j + 1
            }
        })
        return arr
    }
    componentWillReceiveProps (nextProps) {
        this.initialization(nextProps)
    }
    initial = async () => {
        let MenuList = await apiPost(
            'system/MenuList'
        )
        MenuList = MenuList.data
        this.setState({
            MenuList: MenuList
        })
    }
    componentWillMount () {
        this.initial()
    }
    Preservation = async () => {
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
            if (!(json.departmentId > 0)) {
                json['departmentId'] = null
            }
            json['HaveMenuList'] = this.state.HaveMenuList.toString()
            let data = ''
            if (this.props.id > 0) {
                json['id'] = this.props.id
                data = await apiPost(
                    '/system/updateRole',
                    json
                )
            } else {
                data = await apiPost(
                    '/system/insertRole',
                    json
                )
            }
            notification.open({
                message: data.data,
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.setState({
                visible: false,
                isFirst: true
            })
            this.props.refresh()
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            isFirst: true
        })
        this.props.refresh('cancel')
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { department, title } = this.props
        return (
            <Modal
                title={title}
                style={{top: 20}}
                width={500}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <FormItem label="所属部门" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('departmentId', {
                            rules: [ {
                                required: true,
                                message: '请选择所属部门!'
                            }]
                        })(
                            <Select
                                showSearch
                                placeholder="请选择所属部门"
                                optionFilterProp="children"
                            >
                                {department.map(d => {
                                    return <Option key={d.id}>{d.departmentName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="角色名称" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('roleName', {
                            rules: [ {
                                required: true,
                                message: '请填写角色名称!'
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="角色编号" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('roleNumber', {
                            rules: [ {
                                required: true,
                                message: '请填写角色编号!'
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="权限设置" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('menu')(
                            <MenuBox>
                                <Tree
                                    showLine
                                    onSelect={this.onSelect}
                                >
                                    <TreeNode title={<Button><Icon type="folder" />菜单结构</Button>} key="0-0">
                                        {this.recursion(this.state.MenuList, 3)}
                                    </TreeNode>
                                </Tree>
                            </MenuBox>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
let RoleAddUpComponent = Form.create()(RoleAddUp)
export default RoleAddUpComponent
