// 路由配置
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
    // Link
} from 'react-router-dom'

// 引入 styled样式配置
import styled               from 'styled-components'

// 引入路由 + 全局页面组件
import HomeRouter           from '../views/common/pages/HomeRouter'
import HomeIndex            from '../views/common/pages/HomeIndex'
import HomeTest             from '../views/common/pages/HomeTest'

import NotFound             from '../views/common/pages/404'
import Login                from '../views/common/pages/Login'

// 引入 '维修' 版块
import upkeepList               from '../views/Repair/pages/upkeepList'
import AsyncTable           from '../views/test/AsyncTable'

// 引入 '仓库管理' 版块
import InventorySummary     from '../views/Warehouse/pages/InventorySummary'            // 库存汇总
import IntoWarehouse        from '../views/Warehouse/pages/IntoWarehouse'               // 入库管理
import OutWarehouse         from '../views/Warehouse/pages/OutWarehouse'                // 出库管理
import ReceiveStatistics    from '../views/Warehouse/pages/ReceiveStatistics'           // 领用统计
import MaterialManagement   from '../views/Warehouse/pages/MaterialManagement'          // 材料管理

// 容器Div 样式配置( 不需要单独写一个组件 )
const ContainerDiv = styled.section `
    height: 100vh;
    background: blue;
`

const SetRouter = () => (
    <Router>
        <ContainerDiv>
            {/* 开启匹配配置 */}
            <Switch>

                {/* '物业管理系统' 内容 - 这是个路由匹配模版( 设置 顶部导航 / 侧导航栏 ) */}
                <Route exact path="/" component={ HomeRouter } />
                    {/* 测试: 首页 - 'HOME' */}
                    <Route path="home" main={ HomeIndex } />
                    {/* 测试: 测试首页 - 'test' */}
                    <Route path="test" main={ HomeTest } />

                {/* 维修 - 开发中( 未匹配默认页 ) */}
                <Route path="/upkeep/list" component={ upkeepList } />

                {/* 测试页面*/}
                <Route path="/test/async/table" component={ AsyncTable } />

                {/* 库存管理 */}
                <Route path={'/warehouse'}>
                    <Route path="/warehouse/inventorySummary" component={ InventorySummary } />
                    <Route path="/warehouse/intoWarehouse" component={ IntoWarehouse } />
                    <Route path="/warehouse/outWarehouse" component={ OutWarehouse } />
                    <Route path="/warehouse/receiveStatistics" component={ ReceiveStatistics } />
                    <Route path="/warehouse/materialManagement" component={ MaterialManagement } />
                </Route>

                {/* Login */}
                <Route path="/login" component={ Login } />

                {/* 404 - 如果未匹配 将会跳转 '404'页面 */}
                <Route component={ NotFound } />

            </Switch>
        </ContainerDiv>
    </Router>
)

export default SetRouter
