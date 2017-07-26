// 路由根组件
import React from 'react'

import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config' // 渲染静态 Route 配置

import configRoutes from './configRoutes'

// 测试
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
