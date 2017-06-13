// '物业管理系统' 内容 - 路由模版
import React from 'react'
import { Layout, Icon }   from 'antd'

import Sidebar from '../layout/Sidebar'
// import HeaderCustom from '../layout/HeaderCustom'

const { Header, Content, Footer } = Layout

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
            <Layout className="ant-layout-has-sider" style={{ height: '100%' }}>
                {/* 侧导航栏 */}
                {/*
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >

                    </Sider>
                */}
                <Sidebar
                    collapsed={this.state.collapsed}
                />

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
                        margin: '0 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280 }}
                    >
                        {this.props.children}
                    </Content>

                    {/* 底部 */}
                    <Footer style={{
                        textAlign: 'center'
                    }}
                    >
                        长江中心物业管理系统 ©2017 Created by 上朝科技
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default HomeTemplate
