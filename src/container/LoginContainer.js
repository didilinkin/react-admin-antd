// 登录页面
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// actions
import { signIn, signOut } from '../store/actions/common'

// reduces

// getters
import { getAuthState } from '../store/getter'

// components
import Login from '../common/Login'

// 样式组件
const LoginContainer = ({ authState, signIn, signOut }) => (
    <Login
        authState={ authState }
        authenticate={ () => signIn(authState) }
        onSignout={ () => signOut(authState) }
    />
)

// propTypes 验证
LoginContainer.propTypes = {
    authState: PropTypes.bool.isRequired,   // 布尔值
    signIn: PropTypes.func.isRequired,      // 函数
    signOut: PropTypes.func.isRequired      // 函数
}

// 将 Store中的state 状态 映射到 组件内
const mapStateToProps = (state) => ({
    authState: getAuthState(state)
})

// 使用 connect 包装一下
export default connect(
    mapStateToProps,
    {
        signIn,
        signOut
    }
)(LoginContainer)
