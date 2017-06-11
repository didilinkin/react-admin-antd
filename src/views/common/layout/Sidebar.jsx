// 侧导航栏
import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
    render () {
        return (
            <Sider
                trigger={ null }
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >

                    <SubMenu key="1">
                        <Icon type="user" />
                        <span className="nav-text">nav 1</span>
                    </SubMenu>

                    <SubMenu key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                    </SubMenu>

                    <SubMenu key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
