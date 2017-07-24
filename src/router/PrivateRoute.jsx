// 私有 容器组件 => 必须 本地登录状态 才可以访问
import React from 'react'
import { Redirect } from 'react-router-dom' // Route

// import Protected from './Protected'
import ProtectedRoute from './ProtectedRoute'

class PrivateRoute extends React.Component {
    render () {
        const { isAuthenticate } = this.props
        const { path } = this.props

        if (isAuthenticate) {
            return (
                <div className="PrivateRoute">
                    <ProtectedRoute path={ path } />
                </div>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

export default PrivateRoute
