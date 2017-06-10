// 路由配置
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

// 引入 styled样式配置
import styled               from 'styled-components'

import {
    routes,
    RouteWithSubRoutes
} from './HomeRouter'

import NotFound             from '../views/common/pages/404'
import Login                from '../views/common/pages/Login'

// 容器Div 样式配置( 不需要单独写一个组件 )
const ContainerDiv = styled.section `
    height: 100vh;
`

const SetRouter = () => (
    <Router>
        <ContainerDiv>
            <Switch>
                {/* 重定向 - 必须是 '/' 或者 url为空时 => 跳向指定的首页 */}
                <Redirect exact from="/" to="/home/index" />

                {/* 业务URL - 匹配 */}
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                {/* Login */}
                <Route path="/login" component={ Login } />

                {/* 404 - 如果未匹配 将会跳转 '404'页面 */}
                <Route component={ NotFound } />
            </Switch>
        </ContainerDiv>
    </Router>
)

export default SetRouter
