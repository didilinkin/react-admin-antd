import React from 'react'
import { Route }            from 'react-router-dom'
import styled               from 'styled-components'

import HomeTemplate         from '../views/common/pages/HomeTemplate'
import HomeIndex            from '../views/common/pages/HomeIndex'

// 引入 '维修' 版块
import UpkeepList           from '../views/Repair/pages/UpkeepList'
import AsyncTable           from '../views/test/AsyncTable'
import RepairList           from '../views/Repair/pages/RepairList'

// 引入 '仓库管理' 版块
import InventoryManage      from '../views/Warehouse/pages/InventoryManage'             // 库存管理( 合并: 汇总, 入库, 出库 )
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
                path: '/upkeep/upkeepList',                           // 维修 - 表格
                component: UpkeepList
            }, {
                path: '/upkeep/repairList',
                component: RepairList
            }
        ]
    }, {
        path: '/test',
        component: HomeBox,
        routes: [
            {
                path: '/test/table',                             // 测试 - 异步表格
                component: AsyncTable
            }
        ]
    }, {
        path: '/warehouse',
        component: HomeBox,
        routes: [
            {
                path: '/warehouse/InventoryManage',             // 仓库管理 - 库存管理
                component: InventoryManage
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
