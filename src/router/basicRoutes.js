// 基础常用 路由配置表(404 / Login 等页面)
import React from 'react'

import { Login } from '../common/containers'

const NoMatch = () => <h3>404 页面</h3>

const basicRoutes = [
    {
        path: '/login',
        component: Login
    }, {
        component: NoMatch
    }
]

export default basicRoutes
