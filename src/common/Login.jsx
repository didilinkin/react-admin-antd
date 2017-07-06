// 登录页面
import React from 'react'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.authenticate = this.authenticate.bind(this)
    }

    // 鉴定事件
    authenticate () {
        setTimeout(() => {
            this.props.onClickAuth()
        }, 500)
    }

    // 需要更新
    componentWillReceiveProps (nextProps) {
        console.log('props更新')
        // console.log(nextProps.value)
    }

    render () {
        const { authState, onSignout } = this.props
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
                <button onClick={ onSignout }>
                    退出
                </button>
            </p>
        )
    }
}

export default Login
