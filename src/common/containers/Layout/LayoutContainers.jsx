// 布局
import React from 'react'
import { Route } from 'react-router-dom'

import { padding } from 'polished'
import elf from '../../../elf'

import SiderContainers from './SiderContainers'
import HeaderContainers from './HeaderContainers'
import TabsContainers from './TabsContainers'

// Antd 布局组件
import { Layout } from 'antd'
const { Header, Sider, Content, Footer } = Layout

// 负责 渲染传递进来的 compObj
const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <TabsContainers
            route={ route }
            tabsProps={ props }
        />
    )}
    />
)


// 渲染内容
const MainContent = ({ route }) => (
    <div>
        {
            route.routes.map((route, i) => (
                <RouteWithSubRoutes key={ i } { ...route } />
            ))
        }
    </div>
)

class LayoutContainers extends React.Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render () {
        const { route } = this.props

        return (
            <Layout>
                {/* 侧导航 */}
                <Sider
                    trigger={ null }
                    collapsible
                    collapsed={ this.state.collapsed }
                    width= {'230px'}
                    style={{
                        flex: '0 0 230px',
                        height: '100vh',
                        backgroundColor: elf.c.dark
                    }}
                >
                    <div className="logo" />
                    <SiderContainers />
                </Sider>

                {/* 内容部分 */}
                <Layout style={{ background: '#FFF' }}>
                    {/* 顶部 */}
                    <Header
                        style={{
                            background: '#fff',
                            ...padding('0', '0', '0', elf.f.title)
                        }}
                    >
                        {/*
                            <Icon
                                className="trigger"
                                type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
                                onClick={ this.toggle }
                            />
                        */}
                        <HeaderContainers />
                    </Header>

                    {/* 内容 */}
                    <Content
                        style={{
                            ...padding(elf.f.title, elf.f.title, null, elf.f.title),
                            borderTop: '2px solid rgb(233, 233, 233)'
                        }}
                    >
                        <MainContent route={ route } />
                    </Content>

                    {/* 底部 */}
                    <Footer
                        style={{
                            padding: elf.f.assist,
                            textAlign: 'center',
                            background: elf.c.background
                        }}
                    >
                        长江中心 PMS 物业管理系统 ©2016 Created by 上朝科技
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default LayoutContainers
