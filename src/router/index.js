// 路由配置
import React from 'react'
import {
    BrowserRouter as Router
    // ,
    // Route,
    // Switch,
    // Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'

import styled               from 'styled-components'

// import HomeTemplate         from '../views/common/pages/HomeTemplate'
// import NotFound             from '../views/common/pages/404'
// import Login                from '../views/common/pages/Login'

// 容器Div 样式配置( 不需要单独写一个组件 )
const RouterDiv = styled.section `
    height: 100vh;
`

// 测试 Redux - 简单验证
class AuthTest extends React.Component {
    constructor (props) {
        super(props)
        this.authenticate = this.authenticate.bind(this)
    }

    // 鉴定事件
    authenticate () {
        setTimeout(() => {
            this.props.signIn()
        }, 1000)
    }

    // 需要更新
    componentWillReceiveProps (nextProps) {
        console.log(nextProps.value)
    }

    render () {
        const { value, signOut } = this.props
        return (
            <p>
                Clicked: { value ? (
                    <b> 登录A </b>
                ) : (
                    <b> 未登录B </b>
                )}
                <button onClick={ this.authenticate }> 检验登录 </button>
                <button onClick={ signOut }> 退出 </button>
            </p>
        )
    }
}

AuthTest.propTypes = {
    value: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
}

const SetRouter = () => (
    <Router>
        <RouterDiv>
            {/* 测试Redux => 原始路由配置 暂时注释 */}
            {/*
                <Switch>
                    <Route path="/login" component={ Login } />

                    <AuthRouter path="/" component={ HomeTemplate } />

                    <Route component={ NotFound } />
                </Switch>
            */}
        </RouterDiv>
    </Router>
)

export { SetRouter, AuthTest }
