// 路由根组件
import React from 'react'

import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config' // 渲染静态 Route 配置

import configRoutes from './configRoutes'

// import PrivateRoute from '../router/PrivateRoute'

// class Routes extends React.Component {
//     render () {
//         const { isAuthenticate } = this.props

//         return (
//             <Route>
//                 <div>
//                     {/* 内容 展示 */}
//                     <PrivateRoute path="/" isAuthenticate={ isAuthenticate } />
//                     <Route exact path="/login" component={ Login } />
//                     <Route exact path="/sider" component={ Sider } />
//                 </div>
//             </Route>
//         )
//     }
// }

// 测试
const RouteView = ({ route }) => (
    <Switch>
        {/* 内容将全部 根据 routes匹配到的内容 进行渲染; 所以, 它的外部不可放置 组织; */}
        {/* 侧边栏 用 */}
        { renderRoutes(route.routes) }
    </Switch>
)

const rootRoutes = [
    {
        component: RouteView,
        routes: configRoutes
    }
]

export default rootRoutes
