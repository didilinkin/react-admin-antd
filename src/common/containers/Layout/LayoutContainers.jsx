// 布局
import React from 'react'
import { Route } from 'react-router-dom'

import styled from 'styled-components'
import elf from '../../../elf'

import SiderContainers from './SiderContainers'
import HeaderContainers from './HeaderContainers'
import TabsBox from './TabsBox'

// Antd 布局组件
import { Layout } from 'antd' // Icon
const { Header, Sider } = Layout // Sider

// 负责 渲染传递进来的 compObj
const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <TabsBox
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

// Logo 图片
const logoObj = require('../../../assets/images/logo200X50.png')

const LogoBox = styled.div `
    width: 100%;
    object-fit: cover;
`

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
            <Layout
                style={{
                    height: '100%'
                }}
            >
                {/* 左侧导航栏 */}
                <Sider
                    trigger={ null }
                    collapsible
                    collapsed={ this.state.collapsed }
                >
                    <LogoBox className="logo">
                        <img src={ logoObj } alt="Logo" />
                    </LogoBox>

                    <SiderContainers />
                </Sider>

                <Layout
                    style={{
                        width: `calc(100% - ${elf.d.asideWidth}px)`,
                        background: '#FFF'
                    }}
                >
                    <Header
                        style={{
                            background: '#fff',
                            padding: 0
                        }}
                    >
                        {/*
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        */}
                        <HeaderContainers />
                    </Header>

                    <ContentBox>
                        <MainContent route={route} />
                    </ContentBox>

                    {/* 底部 */}
                    <FooterBox>
                        <p> 长江中心 PMS 物业管理系统 ©2016 Created by 上朝科技 </p>
                    </FooterBox>
                </Layout>
            </Layout>
        )
    }
}

// 样式
const FooterBox = styled.footer `
    position: fixed;
    bottom: 0;
    width: calc(100% - 200px);
    height: ${elf.d.autoPadding * 2}px;
    text-align: center;
    line-height: ${elf.d.autoPadding * 2}px;
    background: ${elf.c.background};
`

const ContentBox = styled.div `
    padding: 24px;
    background: #fff;
    min-height: 280px;
    border-top: 2px solid rgb(233, 233, 233);
`

export default LayoutContainers
