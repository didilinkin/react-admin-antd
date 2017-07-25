// 映射 路由配置表(项目逻辑)
import React from 'react'
import { Route, Link } from 'react-router-dom'
// import { Link } from 'react-router-redux-dom-link'

// 将 globalDir 中的映射处理好
// import globalDir from '../utils/globalDir'

import Sider from '../common/containers/Sider'

// 测试'路由配置'
const Snacks = ({ route }) => (
    <div>
        <h2> 内容页面 </h2>
        <Link to="/snacks/spicy"> 辣条 </Link>
        <Link to="/snacks/chips"> 薯片 </Link>

        <hr />
        {
            route.routes.map((route, i) => (
                <RouteWithSubRoutes key={ i } { ...route} />
            ))
        }
    </div>
)

const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <route.component { ...props } routes={ route.routes } />
    )}
    />
)

const Spicy = () => <h3>辣条</h3>
const Chips = () => <h3>薯片</h3>

const matchingRoutes = [
    {
        path: '/sider',
        component: Sider
    }, {
        path: '/snacks',
        component: Snacks,
        routes: [
            {
                path: '/snacks/spicy',
                component: Spicy
            }, {
                path: '/snacks/chips',
                component: Chips
            }
        ]
    }
]

export default matchingRoutes
