// 路由配置
import React from 'react'
import {
    BrowserRouter as Router,
    Route
    // Link
} from 'react-router-dom'

// 引入路由 + 全局页面组件
import HomeRouter   from '../views/common/pages/HomeRouter'
import NotFound     from '../views/common/pages/404'

// 引入 '维修' 版块
import Table2       from '../views/UpKeep/pages/Table2'

const SetRouter = () => (
    <Router>
        <div>
            {/* 首页 */}
            <Route exact path="/" component={ HomeRouter } />

            {/* 维修 - 开发中( 未匹配默认页 ) */}
            <Route path="/upkeep/list" component={ Table2 } />

            {/* 404 */}
            <Route path="/404" component={ NotFound } />
        </div>
    </Router>
)

export default SetRouter
