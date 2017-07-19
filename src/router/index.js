// 路由根组件
import React from 'react'
import { Route } from 'react-router-dom'
import {
    // Home,
    // Count,
    // View,
    PrivateRoute,
    Protected,
    Login
} from '../common/containers'

class Routes extends React.Component {
    render () {
        const { isAuthenticate } = this.props

        return (
            <Route>
                <div>
                    {/* 内容 展示 */}
                    <PrivateRoute path="/" component={ Protected } isAuthenticate={ isAuthenticate } />
                    <Route path="/login" component={ Login } />
                </div>
            </Route>
        )
    }
}


export default Routes
