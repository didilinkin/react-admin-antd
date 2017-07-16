import React from 'react'
import { Provider } from 'react-redux'
// import DevTools from '../../utils/DevTools' // 页面内调试工具; 如果要将调试器放在页面中, 则 引用此组件, 并且解开下方的注释(方便未安装chrome 或 火狐浏览器插件的 调试) => 目前开发使用chrome环境, 所以不使用 页内调试器

import { ConnectedRouter } from 'react-router-redux' // push

// 路由
// import Routes from '../../router'

// 测试修改 Route
import { Route } from 'react-router-dom'
import Link from 'react-router-redux-dom-link'
import {
    Home,
    Count,
    View,
    TestRoute
} from '../../containers'

// react-router-redux: Now you can dispatch navigation actions from anywhere!
// react-router-redux: store.dispatch(push('/foo'))
class Root extends React.Component {
    render () {
        const { store } = this.props
        const { history } = this.props

        return (
            <Provider store={store}>
                <ConnectedRouter history={ history } >
                    <div>
                        <ul>
                            <li><Link to="/" replace> 首页 </Link></li>
                            <li><Link to="/count" replace> 计算器 </Link></li>
                            <li><Link to="/view" replace> 共享计算值 </Link></li>
                            <li><Link to="/testRoute" replace> 测试路由页面 </Link></li>
                        </ul>

                        <hr />

                        <Route exact path="/" component={ Home } />
                        <Route path="/count" component={ Count } />
                        <Route path="/view" component={ View } />
                        <Route path="/testRoute" component={ TestRoute } />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default Root
