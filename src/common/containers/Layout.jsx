// 布局
import React from 'react'
import { Route, Link } from 'react-router-dom'

const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <route.component { ...props } routes={ route.routes } />
    )}
    />
)

const Layout = ({ route }) => (
    <div>
        <h2> 内容页面 </h2>
        <Link to="/home/spicy"> 辣条 </Link>
        <Link to="/home/chips"> 薯片 </Link>

        <hr />
        {
            route.routes.map((route, i) => (
                <RouteWithSubRoutes key={ i } { ...route } />
            ))
        }
    </div>
)

export default Layout
