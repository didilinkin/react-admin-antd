// 路由根组件
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import {
    Home,
    Count,
    View
} from '../containers'

const Routes = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/"> 首页 </Link></li>
                <li><Link to="/count"> 计算器 </Link></li>
                <li><Link to="/view"> 共享计算值 </Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={ Home } />
            <Route path="/count" component={ Count } />
            <Route path="/view" component={ View } />
        </div>
    </Router>
)

export default Routes
