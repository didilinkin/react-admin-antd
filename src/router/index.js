// 根路由 配置
import React from 'react'
import { Route } from 'react-router-dom'

import styled               from 'styled-components'

import App                  from '../container'
import LoginContainer       from '../container/LoginContainer'

const RouterBox = styled.section `
    height: 100vh;
`

const Routes = () => (
    <RouterBox>
        <Route exact path="/" component={ App } />
        <Route path="/login" component={ LoginContainer } />
    </RouterBox>
)

export default Routes
