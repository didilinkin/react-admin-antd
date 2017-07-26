// 布局
import React from 'react'
import { Route, Link } from 'react-router-dom'

import styled from 'styled-components'
import { size } from 'polished'
import elf from '../../elf'

import Sider from './Sider'

// 样式
const LayoutBox = styled.div `
    position: fixed;
    ${size('100vh', '100%')};
`

const AsideBox = styled.aside `
    float: left;
    ${size('100%', '230px')};
    background-color: ${elf.c.dark}
`

const ArticleBox = styled.article `
    display: inline-block;
`

const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <route.component { ...props } routes={ route.routes } />
    )}
    />
)

const Layout = ({ route }) => (
    <LayoutBox>
        {/* 侧面导航栏 */}
        <AsideBox>
            <Sider />
            <Link to="/home/spicy"> 辣条 </Link>
            <Link to="/home/chips"> 薯片 </Link>
        </AsideBox>

        {/* 顶部导航 */}

        {/* 主体部分 */}
        <ArticleBox>
            {/* Tabs导航 */}

            {/* Main 内容 */}
            {
                route.routes.map((route, i) => (
                    <RouteWithSubRoutes key={ i } { ...route } />
                ))
            }
        </ArticleBox>
    </LayoutBox>
)

export default Layout
