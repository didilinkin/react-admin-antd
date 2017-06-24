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

// 测试 Redux - Counter
class Counter extends React.Component {
    constructor (props) {
        super(props)
        this.incrementAsync = this.incrementAsync.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
    }

    incrementIfOdd () {
        // if (this.props.value % 2 !== 0) {
        //     this.props.onIncrement()
        // }
        this.props.onIncrement()
    }

    incrementAsync () {
        setTimeout(this.props.onIncrement, 1000)
    }

    render () {
        const { value, onIncrement, onDecrement } = this.props
        return (
            <p>
                Clicked: { value } times
                {' '}

                <button onClick={ onIncrement }>
                    +
                </button>
                {' '}

                <button onClick={ onDecrement }>
                    -
                </button>
                {' '}

                <button onClick={ this.incrementIfOdd }>
                    增量奇数( 是偶数则不增加; 奇数增加 )
                </button>
                {' '}

                <button onClick={ this.incrementAsync }>
                    异步增加
                </button>
            </p>
        )
    }
}

// 对 Redux 对象 Counter设置 propTypes
Counter.propTypes = {
    value: PropTypes.string.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

// 测试 Redux - 简单验证
class AuthTest extends React.Component {
    constructor (props) {
        super(props)
        this.authenticate = this.authenticate.bind(this)
    }

    // 鉴定事件
    authenticate () {
        // setTimeout(console.log('登录'), 2000)
        // let timedCount = function () {
        //     console.log(this)
        // }

        setTimeout(() => {
            // console.log(this)
            this.props.signIn()
        }, 2000)
    }

    // 需要更新
    componentWillReceiveProps (nextProps) {
        console.log('props更新')
        console.log(nextProps.value)
    }

    render () {
        const { value, signout } = this.props
        return (
            <p>
                Clicked: { value ? (
                    <b> 登录A </b>
                ) : (
                    <b> 未登录B </b>
                )}

                {/* 登录 */}
                <button onClick={ this.authenticate }>
                    检验登录
                </button>

                {/* 退出 */}
                <button onClick={ signout }>
                    退出
                </button>
            </p>
        )
    }
}


// 伪造验证
// const fakeAuth = {
//     isAuthenticated: false

//     // ,
//     // // 登录
//     // authenticate(cb) {
//     //     this.isAuthenticated = true
//     //     setTimeout(cb, 100) // 模拟异步。
//     // }
//     // ,
//     // 退出帐户
//     // signout(cb) {
//     //     this.isAuthenticated = false
//     //     setTimeout(cb, 100)
//     // }
// }

// 私有路由
// const AuthRouter = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         fakeAuth.isAuthenticated ? (
//             <Component {...props} />
//         ) : (
//             <Redirect to={{
//                 pathname: '/login',
//                 state: { from: props.location } }}
//             />
//         ))}
//     />
// )

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

export { SetRouter, Counter, AuthTest }
