// 登录页
import React from 'react'
import { Redirect } from 'react-router-dom'

import { authenticate } from '../../utils/LocalStore' // 验证 localStorage 状态

const authState = authenticate()

class Login extends React.Component {
    state = {
        redirectToReferrer: false // 重定向到 来访地址
    }

    // 登录 事件
    login = () => {
        // 如果已经 登录了
        if (authState) {
            this.setState({
                redirectToReferrer: true
            })
        }
    }

    render () {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={ from } />
            )
        }

        return (
            <div>
                <p>若想访问 { from.pathname } ，你需要先登录</p>
                <button onClick={ this.login }>登录</button>
            </div>
        )
    }
}

export default Login
