// 顶部导航条
import React from 'react'
import { Menu, Icon, Layout, Badge } from 'antd'

import screenfull       from 'screenfull'
import userLogo         from '../../../assets/images/b1.jpg'       // 用户头像

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class HeaderBar extends React.Component {
    // 展开状态
    state = {
        collapsed: false
    }

    // 全屏操作
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request()
        }
    }

    render () {
        return (
            <Header className="custom-theme" style={{
                backgroundColor: '#FFF',
                padding: 0,
                height: 65 }}
            >
                {/* 折叠按钮 */}
                <Icon
                    className="trigger custom-trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />

                {/* 顶部导航菜单 */}
                <Menu
                    mode="horizontal"
                    style={{
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
                    <SubMenu title={
                        <span className="avatar">
                            <img src={ userLogo } alt="头像" />
                            <i className="on bottom b-white" />
                        </span>}
                    >
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - UserA</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>

                {/* react-admin 案例 样式 */}
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default HeaderBar
