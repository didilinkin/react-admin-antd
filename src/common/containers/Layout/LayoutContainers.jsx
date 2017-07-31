// 布局
import React from 'react'
import { Route } from 'react-router-dom'

import elf from '../../../elf'

import { findIndex } from 'lodash'

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

// 挑选 state中 router.url => 用于比较是否需要增加
const select = (state) => {
    return state.router.location.pathname
}

class LayoutContainers extends React.Component {
    state = {
        arrayCurrentTabs: [], // 当前的 Tabs url信息; Array
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    // 每次比较 Tabs 数组数据
    handleChange = (strTabsUrl) => {
        let arrayPreviousTabs = this.state.arrayCurrentTabs // 将 state中的 数组暂存

        // 使用 lodash: _.findIndex 查找匹配对象; 示例 => _.findIndex(array, 'active')

        // 优先比较 之前保存的
        if (findIndex(arrayPreviousTabs, select(this.props.rootState)) < 0) {
            // 数组中 没有 这个url值(返回值为-1) => 保存到数组中
        } else {
            // 数组中 有 这个url值(返回值 不小于0) => 无事件
        }
    }

    render () {
        const { route, rootState } = this.props

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
                            padding: 0,
                            paddingLeft: elf.f.title,
                            background: '#fff'
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
                            padding: elf.f.title,
                            paddingBottom: null,
                            borderTop: '2px solid rgb(233, 233, 233)'
                        }}
                    >
                        <MainContent route={ route } />
                        {
                            console.log(select(rootState))
                        }
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
