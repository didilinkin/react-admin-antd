// 路由配置
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import {
    routes,
    RouteWithSubRoutes
} from './HomeRouter'                                                               // 业务内容 路由匹配

import styled               from 'styled-components'                                // 引入 styled样式配置

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
                <Redirect exact from="/" to="/home/index" />
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                <Route path="/login" component={ Login } />
                <Route component={ NotFound } />
            </Switch>
        </ContainerDiv>
    </Router>
)

export default SetRouter
