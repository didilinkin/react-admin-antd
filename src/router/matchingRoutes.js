// 映射 路由配置表(项目逻辑)
import React from 'react'
// import { Route, Link } from 'react-router-dom'
// import { Link } from 'react-router-redux-dom-link'

import {
    Layout,
    Sider
} from '../common/containers'

// 将 globalDir 中的映射处理好
// import globalDir from '../utils/globalDir'

const Spicy = () => <h3>辣条</h3>
const Chips = () => <h3>薯片</h3>

const matchingRoutes = [
    {
        path: '/sider',
        component: Sider
    }, {
        path: '/home',
        component: Layout,
        routes: [
            {
                path: '/home/spicy',
                component: Spicy
            }, {
                path: '/home/chips',
                component: Chips
            }
        ]
    }
]

export default matchingRoutes
