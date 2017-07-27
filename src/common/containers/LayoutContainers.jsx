// 布局
import React from 'react'
import { Route } from 'react-router-dom'

// import styled from 'styled-components'
import { size } from 'polished'
import elf from '../../elf'

import SiderContainers from './SiderContainers'

import { cloneDeep } from 'lodash'

// Antd 布局组件
import { Layout, Icon } from 'antd'
const { Header, Sider, Content, Footer } = Layout

// 样式
// const LayoutBox = styled.div `
//     position: fixed;
//     ${size('100vh', '100%')};
// `

// const AsideBox = styled.aside `
//     float: left;
//     ${size('100%', '230px')};
//     background-color: ${elf.c.dark}
// `

// const ArticleBox = styled.article `
//     display: inline-block;
// `

const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <route.component { ...props } routes={ route.routes } />
    )}
    />
)

const MainContent = ({ route }) => (
    <div>
        {/* Main 内容 */}
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

        const objA = {
            a: 'A',
            customizer: function (value) {
                if (typeof value === 'string') {
                    console.log('字符串')
                }
            }
        }

        const objB = cloneDeep(objA)

        objB.customizer('aaaa')

        return (
            <Layout>
                {/* 侧导航 */}
                <Sider
                    trigger={ null }
                    collapsible
                    collapsed={ this.state.collapsed }
                    style={{
                        flex: '0 0 230px',
                        ...size('100vh', '230px'),
                        backgroundColor: elf.c.dark
                    }}
                >
                    <div className="logo" />
                    <SiderContainers />
                </Sider>

                {/* 内容部分 */}
                <Layout>
                    {/* 顶部 */}
                    <Header
                        style={{
                            background: '#fff',
                            padding: 0
                        }}
                    >
                        <Icon
                            className="trigger"
                            type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
                            onClick={ this.toggle }
                        />
                    </Header>

                    {/* 内容 */}
                    <Content
                        style={{
                            // margin: elf.f.title,
                            // ...margin(`${elf.f.title}`, '12px', null, '12px'),
                            margin: elf.f.title,
                            marginBottom: 0,
                            padding: elf.f.title,
                            background: '#fff'
                        }}
                    >
                        {/* 无状态组件, 传递 props: route */}
                        <MainContent route={ route } />
                    </Content>

                    {/* 底部 */}
                    <Footer
                        style={{
                            textAlign: 'center',
                            padding: elf.f.assist
                        }}
                    >
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
                {/* 样式描述 */}
                <style>
                    {`
                        .ant-layout-sider {
                            flex: 0 0 230px !important;
                            width: 230px !important;
                        }
                    `}
                </style>
            </Layout>
        )
    }
}

export default LayoutContainers
