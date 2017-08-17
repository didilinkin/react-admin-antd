// 基础常用 路由配置表(404 / Login 等页面)
import React from 'react'

import { Login, Navigator } from '../common/containers'

const NoMatch = () => <h3>404 页面</h3>

const basicRoutes = [
    {
        path: '/login',
        component: Login
    }, {
        path: '/navigator',
        component: Navigator
    }, {
        component: NoMatch
    }
]

export default basicRoutes
