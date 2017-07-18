// 私有 容器组件 => 必须 本地登录状态 才可以访问
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => (
        this.isAuthenticate ? (
            <Component { ...props } />
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        )
    )}
    />
)

export default PrivateRoute
