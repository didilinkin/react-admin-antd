// 路由根组件
import React from 'react'

import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config' // 渲染静态 Route 配置

// import globalDir from '../utils/globalDir'

// 引入静态页面
import Sider from '../common/containers/Sider'
// import Login from '../common/containers/Login'

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

// 映射 路由配置表(项目逻辑)
// const matchingRoutes = [
//     {
//         path: '/sider',
//         exact: true,
//         component: Sider
//     }
// ]

// 基础常用 路由配置表(404 / Login 等页面)

// const basicRoutes = [
//     {
//         path: '/login',
//         exact: true,
//         component: Login
//     }, {
//         component: NoMatch
//     }
// ]

// <Switch>
//     <Route path="/sider" component={ Sider } />
// </Switch>

// 声明 rootRoutes
// const rootRoutes = [
//     ...matchingRoutes, // 映射
//     ...basicRoutes // 常用匹配
// ]

// 测试

// const Test = () => <h3>Test 页面</h3>
const NoMatch = () => <h3>404 页面</h3>
const Test = ({ route }) => (
    <Switch>
        {/* 内容将全部 根据 routes匹配到的内容 进行渲染; 所以, 它的外部不可放置 组织; */}
        { renderRoutes(route.routes) }
    </Switch>
)

const rootRoutes = [
    {
        component: Test,
        routes: [
            {
                path: '/sider',
                component: Sider
            }, {
                component: NoMatch
            }
        ]
    }
]

export default rootRoutes
