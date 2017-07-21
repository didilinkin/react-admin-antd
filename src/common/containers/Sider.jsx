// 导航菜单 测试
import React from 'react'

import globalDir from '../../utils/globalDir'

import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu

class Sider extends React.Component {
    state = {
        current: '1',
        openKeys: []
    }

    handleClick = (e) => {
        console.log('Clicked: ', e)
        this.setState({ current: e.key })
    }

    onOpenChange = (openKeys) => {
        const state = this.state
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        this.setState({ openKeys: nextOpenKeys })
    }

    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2']
        }
        return map[key] || []
    }

    // 判断是否 有折叠, 继续向下渲染 => 用 三目运算
    hasChildRoute = (childItem) => childItem.hasOwnProperty('childRoute') // 返回值(Boolean): T / F

    // 可折叠
    renderChildRoute = (childItem) => {
        let childItemHtml = ''
        let childRouteArr = childItem.childRoute
        // 判断
        if (childRouteArr.hasOwnProperty('childRoute')) {
            childItemHtml = childRouteArr.map((item) => {
                return this.renderChildRoute(item)
            })
            return (
                <SubMenu
                    key={ childItem.path }
                    title={ childItem.title }
                >
                    { childItemHtml }
                </SubMenu>
            )
        } else {
            return (
                this.renderItemMenu(childItem)
            )
        }
    }

    // 无折叠
    renderItemMenu = (childItem) => {
        return (
            <Menu.Item key={ childItem.path }>
                { childItem.tilte }
            </Menu.Item>
        )
    }

    render () {
        // 负责 渲染 module下的 内容
        // let renderMenu = (item) => {
        //     item.childRoute.map((childItem) => {
        //         return (
        //             <Menu.Item key={ childItem.path }>
        //                 { childItem.tilte }
        //             </Menu.Item>
        //         )
        //     })
        // }

        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{ width: 240 }}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
            >
                {/* A版块 */}
                <SubMenu key="sub1" title={
                    <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                    </span>}
                >
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>

                {/* B版块 */}
                <SubMenu key="sub2" title={
                    <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                    </span>}
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                    </SubMenu>
                </SubMenu>

                {/* 仓库管理 */}
                {
                    globalDir.map((item) => {
                        return (
                            <SubMenu key={ item.path } title={
                                <span>
                                    <Icon type={ item.icon } />
                                    <span>{ item.title }</span>
                                </span>}
                            >
                                {
                                    item.childRoute.map((childItem) => {
                                        if (childItem.hasOwnProperty('childRoute')) {
                                            // 可折叠
                                            return (
                                                <SubMenu
                                                    key={ childItem.path }
                                                    title={ childItem.title }
                                                >
                                                    <Menu.Item key="6">Option 6</Menu.Item>
                                                    <Menu.Item key="7">Option 7</Menu.Item>
                                                </SubMenu>
                                            )
                                        } else {
                                            // 不折叠
                                            return (
                                                <Menu.Item key={ childItem.path }>
                                                    { childItem.title }
                                                </Menu.Item>
                                            )
                                        }
                                    })
                                }
                            </SubMenu>
                        )
                    })
                }
            </Menu>
        )
    }
}

export default Sider
