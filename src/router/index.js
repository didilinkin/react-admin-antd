// 路由根组件
import React from 'react'

import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import configRoutes from './configRoutes'

const RouteView = ({ route }) => (
    <Switch> { renderRoutes(route.routes) } </Switch>
)

const rootRoutes = [
    {
        component: RouteView,
        routes: configRoutes
    }
]

export default rootRoutes
