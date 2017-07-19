// 登录页: 如果登录状态, 禁止查看此页
import React from 'react'
import { Redirect } from 'react-router-dom'

const localStore = require('../../utils/LocalStore').default

class Login extends React.Component {
    state = {
        redirectToReferrer: false // 重定向到 来访地址
    }

    // 保存 登录状态: 成功
    setLocalT = () => {
        localStore.set('isAuthenticate', true)
        this.setState({
            redirectToReferrer: true
        })
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
                <p>登录页: 若想访问 内容, 你必须登录</p>
                <button onClick={ this.setLocalT }>登录页: 登录</button>
            </div>
        )
    }
}

export default Login
