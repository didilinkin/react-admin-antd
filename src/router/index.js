// 根路由 配置
import React from 'react'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'

import styled               from 'styled-components'
import createBrowserHistory from 'history/createBrowserHistory'

import App                  from '../container'
import LoginContainer       from '../container/LoginContainer'

const history = createBrowserHistory()
const supportsHistory = 'pushState' in window.history // 当浏览器不支持 HTML5 的 history API 时强制刷新页面; 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true

const RouterBox = styled.section `
    height: 100vh;
`

const Routes = () => (
    <BrowserRouter history={ history } forceRefresh={!supportsHistory}>
        <RouterBox>
            <Route exact path="/" component={ App } />
            <Route path="/login" component={ LoginContainer } />
        </RouterBox>
    </BrowserRouter>
)

export default Routes
