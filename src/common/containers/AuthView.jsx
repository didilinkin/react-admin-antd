// 展示登录状态 页面
import React from 'react'

class AuthView extends React.Component {
    render () {
        const { isAuthenticate } = this.props

        if (isAuthenticate) {
            return (
                <p> 监视登录状态: 已登录 </p>
            )
        } else {
            return (
                <p> 监视登录状态: 未登录 </p>
            )
        }
    }
}

export default AuthView

