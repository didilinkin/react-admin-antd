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
import Login        from '../views/common/pages/Login'

// 引入 '维修' 版块
import Table2       from '../views/UpKeep/pages/Table2'
import AsyncTable       from '../views/test/AsyncTable'

const SetRouter = () => (
    <Router>
        <div>
            {/* 首页 */}
            <Route exact path="/" component={ HomeRouter } />

            {/* 维修 - 开发中( 未匹配默认页 ) */}
            <Route path="/upkeep/list" component={ Table2 } />

            {/* 测试页面*/}
            <Route path="/test/async/table" component={ AsyncTable } />

            {/* 404 */}
            <Route path="/404" component={ NotFound } />

            {/* Login */}
            <Route path="/login" component={ Login } />
        </div>
    </Router>
)

export default SetRouter
