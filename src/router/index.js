// 路由配置
import React from 'react'
import {
    BrowserRouter as Router,
    Route
    // Link
} from 'react-router-dom'

// 引入 styled样式配置
import styled               from 'styled-components'

// 引入路由 + 全局页面组件
import HomeRouter           from '../views/common/pages/HomeRouter'
import NotFound             from '../views/common/pages/404'
import Login                from '../views/common/pages/Login'

// 引入 '维修' 版块
import Table2               from '../views/UpKeep/pages/Table2'
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
            {/* 首页 */}
            <Route exact path="/" component={ HomeRouter } />

            {/* 维修 - 开发中( 未匹配默认页 ) */}
            <Route path="/upkeep/list" component={ Table2 } />

            {/* 测试页面*/}
            <Route path="/test/async/table" component={ AsyncTable } />

            {/* 库存管理 */}
            <Route path={'/warehouse'} />
                <Route path="/warehouse/inventorySummary" component={ InventorySummary } />
                <Route path="/warehouse/intoWarehouse" component={ IntoWarehouse } />
                <Route path="/warehouse/outWarehouse" component={ OutWarehouse } />
                <Route path="/warehouse/receiveStatistics" component={ ReceiveStatistics } />
                <Route path="/warehouse/materialManagement" component={ MaterialManagement } />

            {/* 404 */}
            <Route path="/404" component={ NotFound } />

            {/* Login */}
            <Route path="/login" component={ Login } />
        </ContainerDiv>
    </Router>
)

export default SetRouter
