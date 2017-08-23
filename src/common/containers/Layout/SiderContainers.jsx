// 导航菜单 测试
import React from 'react'
import Link from 'react-router-redux-dom-link'

import styled from 'styled-components'
import elf from '../../../elf'
import localStore from '../../../utils/LocalStore' // LS操作统一使用此方法

import globalDir from '../../../utils/globalDir'

import { Menu, Icon } from 'antd' // Button
const SubMenu = Menu.SubMenu

const SiderBox = styled.div `
    display: inline-block;
    width: ${elf.d.asideWidth}px;
`

class SiderContainers extends React.Component {
    state = {
        collapsed: false, // 缩起内嵌菜单(使用)
        current: '1', // 只展开父级:  当前选中的菜单项 key 数组
        openKeys: [] // 只展开父级: 当前展开的 SubMenu 菜单项 key 数组
    }

    // 判断是否 有折叠; 返回值(Boolean)
    hasChildRoute = (childItem) => childItem.hasOwnProperty('childRoute')

    // 缩起内嵌菜单(使用)
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    // 只展开父级: 点击事件
    handleClick = (e) => {
        this.setState({ current: e.key })
    }

    // 只展开父级:
    onOpenChange = (openKeys) => {
        const state = this.state
        // 最后打开的 Key
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))

        // 最后关闭的 key
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

        // 新打开的 key
        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }

        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        this.setState({ openKeys: nextOpenKeys })
    }

    // 只展开父级: 获取祖先级 Key
    getAncestorKeys = (key) => {
        let map = {} // 创建 map

        // (调用者: 下面 迭代) 判断 item 内是否 需要 迭代; 如果不需要 => 保存对象
        let setItemKey = (item) => {
            let itemArray = item.childRoute
            if (this.hasChildRoute(item)) {
                for (let item of itemArray) {
                    let obj = item.key // 需要先保存一下 它的 key 与 ancestor
                    map[obj] = item.ancestor

                    setItemKey(item)
                }
            } else {
                let obj = item.key // key 从 字符串转换为 对象
                map[obj] = item.ancestor
            }
        }

        // 迭代 globalDir 中的 module 配置
        for (let moduleItem of globalDir) {
            setItemKey(moduleItem)
        }

        return map[key] || []
    }

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
                        key={ obj.key }
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
                        key={ obj.key }
                        title={ obj.title }
                    >
                        { childHtml }
                    </SubMenu>
                )
            }
        } else {
            return (
                <Menu.Item key={ obj.key }>
                    <Link to={ obj.path }>
                        { obj.title }
                    </Link>
                </Menu.Item>
            )
        }
    }
    jurisdiction = (itemChildRoute) => {
        let PermissionsList = localStore.get('PermissionsList')
        let existence = false
        PermissionsList.forEach(Permissions => {
            if (Permissions.permissionCode.toString() === itemChildRoute.key.toString()) {
                existence = true
            }
        })
        return existence
    }

    render () {
        const renderMenu = globalDir.map((childItem) => {
            if (this.hasChildRoute(childItem)) {
                // if (this.jurisdiction(childItem)) {
                return this.renderChildRoute(childItem)
                // } else {
                //     return null
                // }
            } else {
                return (
                    <Menu.Item key={childItem.key}>
                        <Link to={ childItem.path }>
                            { childItem.title }
                        </Link>
                    </Menu.Item>
                )
            }
        })

        return (
            <SiderBox>
                <Menu
                    // 折叠
                    defaultSelectedKeys={['1']} // 初始选中的菜单项 key 数组
                    defaultOpenKeys={[]} // 初始展开的 SubMenu 菜单项 key 数组
                    // mode={ this.state.collapsed ? 'inline' : 'vertical' } // 排版模式 => 后期改
                    mode="inline"
                    theme="dark" // 主题色
                    inlineCollapsed={ this.state.collapsed } // inline 时菜单是否收起状态 => 切换 mode 类型

                    // 只展开父级
                    openKeys={ this.state.openKeys } // 当前展开的 SubMenu 菜单项 key 数组
                    selectedKeys={ [this.state.current] } // 当前选中的菜单项 key 数组
                    onOpenChange={ this.onOpenChange } // SubMenu 展开/关闭的回调
                    onClick={ this.handleClick } // 点击事件
                >
                    { renderMenu }
                </Menu>
            </SiderBox>
        )
    }
}

export default SiderContainers
