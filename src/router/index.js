// 路由根组件
import React from 'react'
import { Route } from 'react-router-dom'
import {
    Home,
    Count,
    View,
    TestRoute
} from '../common/containers'

import Link from 'react-router-redux-dom-link'


class Routes extends React.Component {
    render () {
        return (
            <Route>
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
            </Route>
        )
    }
}


export default Routes
