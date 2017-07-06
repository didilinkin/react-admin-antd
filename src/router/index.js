import React from 'react'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'

import styled               from 'styled-components'
import createBrowserHistory from 'history/createBrowserHistory'

import App                  from '../container'

const history = createBrowserHistory()

const RouterBox = styled.section `
    height: 100vh;
`

// forceRefresh={!supportsHistory}  // 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true
const Routes = () => (
    <BrowserRouter history={ history }>
        <RouterBox>
            <Route path="/" component={ App } />
        </RouterBox>
    </BrowserRouter>
)

export default Routes
