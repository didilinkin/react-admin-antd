// 导航菜单 测试
import React from 'react'

import globalDir from '../../utils/globalDir'

import { Menu, Icon, Button } from 'antd'

const SubMenu = Menu.SubMenu

class Sider extends React.Component {
    state = {
        collapsed: false, // 收缩
        current: '1', // 当前选中的菜单项 key 数组
        openKeys: [] // 当前展开的 SubMenu 菜单项 key 数组
    }

    handleClick = (e) => {
        console.log('Clicked: ', e)
        // this.setState({ current: e.key })
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    // 判断是否 有折叠; 返回值(Boolean)
    hasChildRoute = (childItem) => childItem.hasOwnProperty('childRoute')

    // 渲染 导航菜单
    renderChildRoute = (obj) => {
        let childHtml
        let childArray = obj.childRoute

        if (obj.hasOwnProperty('childRoute')) {
            childHtml = childArray.map((item) => {
                return this.renderChildRoute(item)
            })

            // 判断是否需要 图标
            if (obj.hasOwnProperty('icon')) {
                return (
                    <SubMenu
                        key={ obj.path }
                        title={
                            <span>
                                <Icon type={ obj.icon } />
                                <span>{ obj.title }</span>
                            </span>
                        }
                    >
                        { childHtml }
                    </SubMenu>
                )
            } else {
                return (
                    <SubMenu
                        key={ obj.path }
                        title={ obj.title }
                    >
                        { childHtml }
                    </SubMenu>
                )
            }
        } else {
            return (
                <Menu.Item key={ obj.path }>
                    { obj.title }
                </Menu.Item>
            )
        }
    }

    render () {
        const renderMenu = globalDir.map((childItem) => {
            if (this.hasChildRoute(childItem)) {
                return this.renderChildRoute(childItem)
            } else {
                return (
                    <Menu.Item key={ childItem.path }>
                        { childItem.title }
                    </Menu.Item>
                )
            }
        })

        return (
            <div style={{ width: 240 }}>
                <Button
                    type="primary"
                    onClick={this.toggleCollapsed}
                    style={{ marginBottom: 16 }}
                >
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>

                <Menu
                    mode="inline"
                    theme="dark"
                    onClick={ this.handleClick }
                    defaultOpenKeys={['sub1']}
                    inlineCollapsed={ this.state.collapsed }
                    defaultSelectedKeys={['1']}
                >
                    { renderMenu }
                </Menu>
            </div>
        )
    }
}

export default Sider
