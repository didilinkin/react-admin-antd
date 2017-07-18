// 私有 容器组件 => 必须 本地登录状态 才可以访问
import React from 'react'
import { Route } from 'react-router-dom' // Redirect

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={ props => (
//         this.isAuthenticate ? (
//             <Component { ...props } />
//         ) : (
//             <Redirect
//                 to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }}
//             />
//         )
//     )}
//     />
// )

// <h3 style={{ test: component }}> 经过验证, 已经登陆 </h3>

class PrivateRoute extends React.Component {
    render () {
        const { isAuthenticate } = this.props
        const { component } = this.props
        const { path } = this.props

        if (isAuthenticate) {
            return (
                <Route>
                    { ...component }
                </Route>
            )
        } else {
            return (
                <h3 style={{ test: path }}> 未登录, 需要使用重定向方式, 跳转到登录页 </h3>
            )
        }
    }
}

export default PrivateRoute
