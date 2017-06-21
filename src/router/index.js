// 路由配置
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import styled               from 'styled-components'

import HomeTemplate         from '../views/common/pages/HomeTemplate'
import NotFound             from '../views/common/pages/404'
import Login                from '../views/common/pages/Login'

// 容器Div 样式配置( 不需要单独写一个组件 )
const ContainerDiv = styled.section `
    height: 100vh;
`

// 伪造验证
const fakeAuth = {
    isAuthenticated: false

    // ,
    // // 登录
    // authenticate(cb) {
    //     this.isAuthenticated = true
    //     setTimeout(cb, 100) // 模拟异步。
    // }
    // ,
    // 退出帐户
    // signout(cb) {
    //     this.isAuthenticated = false
    //     setTimeout(cb, 100)
    // }
}

// 私有路由
const AuthRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location } }}
            />
        ))}
    />
)

const SetRouter = () => (
    <Router>
        <ContainerDiv>
            {/* 正确配置 - 静态下存在问题 - 在排查中 */}
            <Switch>
                <Route path="/login" component={ Login } />

                {/* 权限认证 => 必须登录 才能查看 */}
                <AuthRouter path="/" component={ HomeTemplate } />

                <Route component={ NotFound } />
            </Switch>
        </ContainerDiv>
    </Router>
)

export default SetRouter
