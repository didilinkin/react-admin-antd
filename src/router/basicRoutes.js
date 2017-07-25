// 基础常用 路由配置表(404 / Login 等页面)
import React from 'react'

const NoMatch = () => <h3>404 页面</h3>

const basicRoutes = [
    {
        component: NoMatch
    }
]

export default basicRoutes
