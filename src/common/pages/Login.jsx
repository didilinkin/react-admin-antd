// 登录页面
import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.authenticate = this.authenticate.bind(this)
    }

    // 鉴定事件
    authenticate () {
        setTimeout(() => {
            this.props.authenticate()
        }, 500)
    }

    // 需要更新
    componentWillReceiveProps (nextProps) {
        console.log('props更新')
        // console.log(nextProps.value)
    }

    render () {
        const { authState, onSignOut } = this.props
        return (
            <p>
                Clicked: { authState ? (
                    <b> 登录A </b>
                ) : (
                    <b> 未登录B </b>
                )}
                <button onClick={ this.authenticate }>
                    检验登录
                </button>
                <button onClick={ onSignOut }>
                    退出
                </button>
            </p>
        )
    }
}

Login.propTypes = {
    authState: PropTypes.bool.isRequired,   // 布尔值
    authenticate: PropTypes.func.isRequired,      // 函数
    onSignOut: PropTypes.func.isRequired      // 函数
}

export default Login
