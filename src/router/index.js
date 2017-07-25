// 路由根组件
import React from 'react'
import { Route } from 'react-router-dom'
import {
    Login,
    Sider
} from '../common/containers'

import PrivateRoute from '../router/PrivateRoute'

class Routes extends React.Component {
    render () {
        const { isAuthenticate } = this.props

        return (
            <Route>
                <div>
                    {/* 内容 展示 */}
                    <PrivateRoute path="/" isAuthenticate={ isAuthenticate } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/sider" component={ Sider } />
                </div>
            </Route>
        )
    }
}


export default Routes
