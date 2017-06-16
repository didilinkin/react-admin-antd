import React from 'react'
import { Route }            from 'react-router-dom'

import HomeTemplate         from '../views/common/pages/HomeTemplate'
import HomeIndex            from '../views/common/pages/HomeIndex'

// 测试组件
import AsyncTable           from '../views/test/AsyncTable'                             // 测试异步表格

// 引入 '客户管理' 版块
import RepairList           from '../views/Repair/pages/RepairList'                     // 客户报修
import ClientReview         from '../views/Repair/pages/ClientReview'                   // 客户回访
import UpkeepList           from '../views/Repair/pages/UpkeepList'                     // 维修费设置
import Rectification        from '../views/Repair/pages/Rectification'                  // 整改通知
import ClientReviewDetails  from '../views/Repair/pages/Details/ClientReviewDetails'    // [详情] - 客户回访

import Repair               from '../views/Repair/pages/Details/Repair'                 // [详情] - 报修明细
import ReturnVisit          from '../views/Repair/pages/Details/ReturnVisit'            // [详情] - 回访登记
import ReturnVisitDetail    from '../views/Repair/pages/Details/ReturnVisitDetail'      // [详情] - 回访登记明细
import Maintenance          from '../views/Repair/pages/Details/Maintenance'            // [详情] - 维修详情
import CorrectionDetail     from '../views/Repair/pages/Details/CorrectionDetail'       // [详情] - 整改信息明细
import MaintenanceProject   from '../views/Repair/pages/Details/MaintenanceProject'     // [详情] - 维修项目

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
        path: '/test',
        component: HomeBox,
        routes: [
            {
                path: '/test/table',                            // 测试 - 异步表格
                component: AsyncTable
            }
        ]
    }, {
        path: '/upkeep',
        component: HomeBox,
        routes: [
            {
                path: '/upkeep/repairList',                     // 客户管理 - 客户报修
                component: RepairList
            }, {
                path: '/upkeep/clientReview',                   // 客户管理 - 客户回访
                component: ClientReview
            }, {
                path: '/upkeep/upkeepList',                     // 客户管理 - 维修费设置
                component: UpkeepList
            }, {
                path: '/upkeep/rectification',                  // 客户管理 - 整改通知
                component: Rectification
            }, {
                path: '/upkeep/clientReviewDetails/:id',        // [详情] - 客户回访
                component: ClientReviewDetails
            }, {
                path: '/upkeep/repai/:id',                      // [详情] - 报修明细
                component: Repair
            }, {
                path: '/upkeep/returnVisit/:id',                // [详情] - 回访登记
                component: ReturnVisit
            }, {
                path: '/upkeep/returnVisitDetail/:id',          // [详情] - 回访登记明细
                component: ReturnVisitDetail
            }, {
                path: '/upkeep/maintenance/:id',                // [详情] - 维修详情
                component: Maintenance
            }, {
                path: '/upkeep/correctionDetail/:id',           // [详情] - 整改信息明细
                component: CorrectionDetail
            }, {
                path: '/upkeep/maintenanceProject/:id',         // [详情] - 维修项目
                component: MaintenanceProject
            }
        ]
    }, {
        path: '/warehouse',
        component: HomeBox,
        routes: [
            {
                path: '/warehouse/inventoryManage',             // 仓库管理 - 库存管理
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

const RouteWithSubRoutes = (route) => (
    <div style={{ height: '100%' }}>
        <Route path={route.path} render={props => (
            <route.component {...props} routes={route.routes} />
            )}
        />
    </div>
)

export { routes, RouteWithSubRoutes }
