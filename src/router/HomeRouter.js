import React from 'react'
import { Route }            from 'react-router-dom'
import styled               from 'styled-components'

import HomeTemplate         from '../views/common/pages/HomeTemplate'
import HomeIndex            from '../views/common/pages/HomeIndex'

// 引入 '维修' 版块
import upkeepList           from '../views/Repair/pages/upkeepList'
import AsyncTable           from '../views/test/AsyncTable'

// 引入 '仓库管理' 版块
import InventorySummary     from '../views/Warehouse/pages/InventorySummary'            // 库存汇总
import IntoWarehouse        from '../views/Warehouse/pages/IntoWarehouse'               // 入库管理
import OutWarehouse         from '../views/Warehouse/pages/OutWarehouse'                // 出库管理
import ReceiveStatistics    from '../views/Warehouse/pages/ReceiveStatistics'           // 领用统计
import MaterialManagement   from '../views/Warehouse/pages/MaterialManagement'          // 材料管理

const HomeBox = ({ routes }) => (
    <HomeTemplate>
        {
            routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))
        }
    </HomeTemplate>
)

const routes = [
    {
        path: '/home',
        component: HomeBox,
        routes: [
            {
                path: '/home/index',                            // 默认首页
                component: HomeIndex
            }
        ]
    }, {
        path: '/upkeep',
        component: HomeBox,
        routes: [
            {
                path: '/upkeep/list',                           // 维修 - 表格
                component: upkeepList
            }
        ]
    }, {
        path: '/test',
        component: HomeBox,
        routes: [
            {
                path: '/test',                                  // 测试 - 异步表格
                component: AsyncTable
            }
        ]
    }, {
        path: '/warehouse',
        component: HomeBox,
        routes: [
            {
                path: '/warehouse/inventorySummary',            // 仓库管理 - 库存汇总
                component: InventorySummary
            }, {
                path: '/warehouse/intoWarehouse',               // 仓库管理 - 入库管理
                component: IntoWarehouse
            }, {
                path: '/warehouse/outWarehouse',                // 仓库管理 - 出库管理
                component: OutWarehouse
            }, {
                path: '/warehouse/receiveStatistics',           // 仓库管理 - 领用统计
                component: ReceiveStatistics
            }, {
                path: '/warehouse/materialManagement',          // 仓库管理 - 材料管理
                component: MaterialManagement
            }
        ]
    }
]

const SubRoutes = styled.section `
    height: 100%
`

const RouteWithSubRoutes = (route) => (
    <SubRoutes>
        {/* 重定向操作 */}

        {/* 匹配操作 */}
        <Route path={route.path} render={props => (
            <route.component {...props} routes={route.routes} />
            )}
        />
    </SubRoutes>
)

export { routes, RouteWithSubRoutes }
