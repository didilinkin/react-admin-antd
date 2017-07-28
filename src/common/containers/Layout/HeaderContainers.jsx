// 顶部导航条
import React from 'react'
import { Menu, Icon, Layout, Badge } from 'antd'

import screenfull from 'screenfull'

import styled from 'styled-components'
import elf from '../../../elf'

import userLogo from '../../../assets/images/b1.jpg'

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

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
class HeaderContainers extends React.Component {
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
    Logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    render () {
        return (
            <Header className="custom-theme" style={{
                backgroundColor: '#FFF',
                padding: 0,
                height: 65 }}
            >
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
                        <MenuItemGroup style={{ paddingRight: '0' }} title="">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
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
export default HeaderContainers
