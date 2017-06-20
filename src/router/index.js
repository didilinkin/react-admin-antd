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
} from './HomeRouter'

import styled               from 'styled-components'

import NotFound             from '../views/common/pages/404'
import Login                from '../views/common/pages/Login'
import Registration         from '../views/common/pages/Registration'

// 容器Div 样式配置( 不需要单独写一个组件 )
const ContainerDiv = styled.section `
    height: 100vh;
`

const SetRouter = () => (
    <Router>
        <ContainerDiv>
            {/* 正确配置 - 静态下存在问题 - 在排查中 */}
            <Switch>
                <Redirect exact from="/" to="/home/index" />
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                <Route path="/login" component={ Login } />
                <Route path="/registration" component={ Registration } />
                <Route component={ NotFound } />
            </Switch>

            {/* 测试: 排除 404检查 - 测试成功 */}
            {/*
                <Redirect exact from="/" to="/home/index" />
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
                <Route path="/login" component={ Login } />
                <Route path="/registration" component={ Registration } />
            */}
        </ContainerDiv>
    </Router>
)

export default SetRouter
