// 路由根组件
import React from 'react'
import { Route } from 'react-router-dom'
import {
    // Home,
    // Count,
    // View,
    TestRoute,
    AuthView,
    PrivateRoute,
    Protected,
    Login
} from '../common/containers'

import Link from 'react-router-redux-dom-link'

class Routes extends React.Component {
    render () {
        const { isAuthenticate } = this.props

        return (
            <Route>
                <div>
                    {/* 导航 部分 */}
                    <ul>
                        <li><Link to="/" replace> 首页 </Link></li>
                        <li><Link to="/testRoute" replace> 测试路由页面 </Link></li>
                        <li><Link to="/protected" replace> 权限页面 </Link></li>
                        <li><Link to="/login" replace> 登录页面 </Link></li>
                    </ul>

                    <hr />

                    {/* 登录状态 展示 */}
                    <Route path="/testRoute" component={ TestRoute } />
                    <AuthView isAuthenticate={ isAuthenticate } />

                    <hr />

                    {/* 内容 展示 */}
                    <PrivateRoute
                        path="/protected "
                        component={ Protected }
                        isAuthenticate={ isAuthenticate }
                    />
                    <Route path="/login" component={ Login } />

                    <hr />
                </div>
            </Route>
        )
    }
}


export default Routes
