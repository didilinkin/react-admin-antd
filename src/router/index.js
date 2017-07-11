// 根路由 配置
import React from 'react'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import {
    createStore,
    combineReducers,
    applyMiddleware
}    from 'redux'
import { Provider }         from 'react-redux'

import { syncHistoryWithStore } from 'react-router-redux'

import App                  from '../container'
import LoginContainer       from '../container/LoginContainer'

import styled               from 'styled-components'

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
