// '物业管理系统' 内容 - 路由模版
import React from 'react'
import { Layout, Menu, Icon }   from 'antd'

const { Header, Sider, Content } = Layout

// import HeaderCustom from '../layout/HeaderCustom'
// import SiderCustom  from '../layout/SiderCustom'

// const { Content, Footer } = Layout

class HomeTemplate extends React.Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render () {
        return (
            <Layout>
                {/* 侧导航栏 */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >

                    <div className="logo" />

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                    </Menu>

                </Sider>

                {/* 内容 */}
                <Layout>
                    {/* 顶部 */}
                    <Header style={{
                        background: '#fff',
                        padding: 0 }}
                    >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>

                    {/* 内容 */}
                    <Content style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280 }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default HomeTemplate
