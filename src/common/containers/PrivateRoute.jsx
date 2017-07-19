// 私有 容器组件 => 必须 本地登录状态 才可以访问
import React from 'react'
import { Route, Redirect } from 'react-router-dom' // Redirect

import Protected from './Protected'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route { ...rest } render={ props => (
//         <h3>非公开的页面</h3>
//     )}
//     />
// )

// <Redirect to={{
//     pathname: '/login',
//     state: { from: props.location } }}
// />

class PrivateRoute extends React.Component {
    render (props) {
        const { isAuthenticate } = this.props
        // const { component } = this.props
        const { path } = this.props

        if (isAuthenticate) {
            return (
                <Route path={ path }>
                    <Protected />
                </Route>
            )
        } else {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            )
        }
    }
}

export default PrivateRoute
