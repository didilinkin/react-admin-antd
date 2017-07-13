// 根路由 配置
import React from 'react'
import { Route } from 'react-router-dom'

import styled               from 'styled-components'

// import App                  from '../containers'
// import LoginContainer       from '../containers/LoginContainer'

// react-router-redex 测试用 计算器
import {
    App,
    Home,
    Foo,
    Bar
} from '../containers'

const RouterBox = styled.section `
    height: 100vh;
`

// <Route path="/login" component={ LoginContainer } />

const Routes = () => (
    <RouterBox>
        <Route component={ App }>
            <Route exact path="/" component={Home} />
            <Route exact path="foo" component={Foo} />
            <Route exact path="bar" component={Bar} />
        </Route>
    </RouterBox>
)

export default Routes
