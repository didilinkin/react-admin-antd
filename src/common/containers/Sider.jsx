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

    // 判断是否 有折叠, 继续向下渲染
    hasChildRoute = (childItem) => childItem.hasOwnProperty('childRoute') // 返回值(Boolean): T / F

    // 判断深度 逻辑: 第一层之后, 设置 => 从2级 childRoute数组 开始遍历;
    // 如果有 childRoute, 继续遍历
    // 如果无 childRoute. 停止遍历

    // 配合判断 进行渲染
    // <SubMenu key="sub3" title="Submenu">
    //     <Menu.Item key="6">Option 6</Menu.Item>
    //     <Menu.Item key="7">Option 7</Menu.Item>
    // </SubMenu>

    render () {
        console.log(globalDir)

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
                                        return (
                                            // 开始判断(三元运算): ES方案 => Object.keys(childItem).includes('childRoute')
                                            // childItem.hasOwnProperty('childRoute') ? (
                                            //     {/* 有折叠 */}
                                            //     <SubMenu>
                                            // )

                                            <Menu.Item key={ childItem.path }>
                                                { childItem.title }
                                            </Menu.Item>
                                        )
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
