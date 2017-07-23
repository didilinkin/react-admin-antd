// 导航菜单 测试
import React from 'react'

import globalDir from '../../utils/globalDir'

import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu

class Sider extends React.Component {
    state = {
        collapsed: false, // 缩起内嵌菜单(使用)
        current: '1', // 只展开父级:  当前选中的菜单项 key 数组
        openKeys: [] // 只展开父级: 当前展开的 SubMenu 菜单项 key 数组
        // multiple: false, // 是否允许多选
    }

    // 缩起内嵌菜单(使用)
    toggleCollapsed = () => {
        // 测试 按钮点击效果
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    // 只展开父级: 点击事件
    handleClick = (e) => {
        console.log('Clicked: ', e)
        this.setState({ current: e.key })
    }

    // 只展开父级:
    onOpenChange = (openKeys) => {
        const state = this.state
        // 最后打开的 Key
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
        console.log('latestOpenKey:' + latestOpenKey)

        // 最后关闭的 key
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))
        console.log('latestCloseKey:' + latestCloseKey)

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
        const map = {
            sub3: ['sub2'],
            // 新改: 仓库管理
            inventoryManage: ['wareHouse'],
            receiveStatistics: ['wareHouse'],
            meterialManagement: ['wareHouse'],
            // 新改: 仓库管理
        }
        return map[key] || []
    }

    // // SubMenu 展开/关闭的回调
    // onOpenChange = (e) => {
    //     console.log('Clicked:', e)
    //     // 清空 openKeys, 然后把 最新的 放入
    //     this.setState({ openKeys: [] }) // 清空
    //     console.log(this)
    // }


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
                    <Menu.Item key={childItem.path}>
                        { childItem.title }
                    </Menu.Item>
                )
            }
        })

        return (
            <div style={{ width: 230 }}>
                <Button
                    type="primary"
                    onClick={ this.toggleCollapsed }
                    style={{ marginBottom: 16 }}
                >
                    <Icon type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' } />
                </Button>

                <Menu
                    // 折叠
                    defaultSelectedKeys={['1']} // 初始选中的菜单项 key 数组
                    defaultOpenKeys={['wareHouse']} // 初始展开的 SubMenu 菜单项 key 数组
                    // mode={ this.state.collapsed ? 'inline' : 'vertical' } // 排版模式 => 后期改
                    mode="inline"
                    theme="dark" // 主题色
                    inlineCollapsed="false" // inline 时菜单是否收起状态 => 切换 mode 类型

                    // 只展开父级
                    openKeys={ this.state.openKeys } // 当前展开的 SubMenu 菜单项 key 数组
                    selectedKeys={ [this.state.current] } // 当前选中的菜单项 key 数组
                    onOpenChange={ this.onOpenChange } // SubMenu 展开/关闭的回调
                    onClick={ this.handleClick } // 点击事件
                    // multiple={ this.state.multiple }
                >
                    { renderMenu }
                </Menu>
            </div >
        )
    }
}

export default Sider
