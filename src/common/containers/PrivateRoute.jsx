// 私有 容器组件 => 必须 本地登录状态 才可以访问
import React from 'react'
import { Route, Redirect } from 'react-router-dom' // Redirect

import Protected from './Protected'

class PrivateRoute extends React.Component {
    render () {
        const { isAuthenticate } = this.props
        const { path } = this.props

        if (isAuthenticate) {
            return (
                <Route path={ path }>
                    <Protected />
                </Route>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

export default PrivateRoute
