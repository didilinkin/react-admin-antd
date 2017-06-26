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
import WarehouseDetail      from '../views/Warehouse/pages/WarehouseDetail'             // [详情] - 出入库详情

// 引入 '设备维护' 版块
import Account              from '../views/DeviceMaintain/pages/Account'                // 设备台账
import InspectionPlan       from '../views/DeviceMaintain/pages/InspectionPlan'         // 设备维护保障 - 巡检计划
import MaintenancePlan      from '../views/DeviceMaintain/pages/MaintenancePlan'        // 设备维护保障 - 保养记录
import EquipmentRepair      from '../views/DeviceMaintain/pages/EquipmentRepair'        // 设备维护保障 - 设备报修
import Electric             from '../views/DeviceMaintain/pages/Electric'               // 设备巡检 - 电器系统
import Elevator             from '../views/DeviceMaintain/pages/Elevator'               // 设备巡检 - 电梯系统
import AirConditioning      from '../views/DeviceMaintain/pages/AirConditioning'        // 设备巡检 - 空调系统
import WaterHeating         from '../views/DeviceMaintain/pages/WaterHeating'           // 设备巡检 - 水暖系统
import Firefighting         from '../views/DeviceMaintain/pages/Firefighting'           // 设备巡检 - 消防系统
import ElevatorRoom         from '../views/DeviceMaintain/pages/ElevatorRoom'           // 设备巡检 - 电梯间系统

import Equipmentledger         from '../views/DeviceMaintain/pages/Details/Equipmentledger'           // 设备明细
import Maintenancedetails         from '../views/DeviceMaintain/pages/Details/Maintenancedetails'           // 维修明细
import Maintenanceschedule         from '../views/DeviceMaintain/pages/Details/Maintenanceschedule'           // 保养明细

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
                path: '/home/index',                                                    // 默认首页
                component: HomeIndex
            }
        ]
    }, {
        path: '/test',
        component: HomeBox,
        routes: [
            {
                path: '/test/table',                                                    // 测试 - 异步表格
                component: AsyncTable
            }
        ]
    }, {
        path: '/upkeep',
        component: HomeBox,
        routes: [
            {
                path: '/upkeep/repairList',                                             // 客户管理 - 客户报修
                component: RepairList
            }, {
                path: '/upkeep/clientReview',                                           // 客户管理 - 客户回访
                component: ClientReview
            }, {
                path: '/upkeep/upkeepList',                                             // 客户管理 - 维修费设置
                component: UpkeepList
            }, {
                path: '/upkeep/rectification',                                          // 客户管理 - 整改通知
                component: Rectification
            }, {
                path: '/upkeep/clientReviewDetails/:id',                                // [详情] - 客户回访
                component: ClientReviewDetails
            }, {
                path: '/upkeep/repai/:id',                                              // [详情] - 报修明细
                component: Repair
            }, {
                path: '/upkeep/returnVisit/:id',                                        // [详情] - 回访登记
                component: ReturnVisit
            }, {
                path: '/upkeep/returnVisitDetail/:id',                                  // [详情] - 回访登记明细
                component: ReturnVisitDetail
            }, {
                path: '/upkeep/maintenance/:id',                                        // [详情] - 维修详情
                component: Maintenance
            }, {
                path: '/upkeep/correctionDetail/:id',                                   // [详情] - 整改信息明细
                component: CorrectionDetail
            }, {
                path: '/upkeep/maintenanceProject/:id',                                 // [详情] - 维修项目
                component: MaintenanceProject
            }
        ]
    }, {
        path: '/warehouse',
        component: HomeBox,
        routes: [
            {
                path: '/warehouse/inventoryManage',                                     // 仓库管理 - 库存管理
                component: InventoryManage
            }, {
                path: '/warehouse/receiveStatistics',                                   // 仓库管理 - 领用统计
                component: ReceiveStatistics
            }, {
                path: '/warehouse/materialManagement',                                  // 仓库管理 - 材料管理
                component: MaterialManagement
            }, {
                path: '/warehouse/warehouseDetail/:id',                                 // [详情] - 出入库详情
                component: WarehouseDetail
            }
        ]
    }, {
        path: '/deviceMaintain',
        component: HomeBox,
        routes: [
            {
                path: '/deviceMaintain/account',                                        // 设备维护 - 设备台帐
                component: Account
            }, {
                path: '/deviceMaintain/maintenance/inspectionPlan',                     // 设备维护 - 设备维护保障 - 巡检计划
                component: InspectionPlan
            }, {
                path: '/deviceMaintain/maintenance/maintenancePlan',                    // 设备维护 - 设备维护保障 - 保养记录
                component: MaintenancePlan
            }, {
                path: '/deviceMaintain/maintenance/equipmentRepair',                    // 设备维护 - 设备维护保障 - 设备报修
                component: EquipmentRepair
            }, {
                path: '/deviceMaintain/inspection/electric',                            // 设备维护 - 设备巡检 - 电器系统
                component: Electric
            }, {
                path: '/deviceMaintain/inspection/elevator',                            // 设备维护 - 设备巡检 - 电梯系统
                component: Elevator
            }, {
                path: '/deviceMaintain/inspection/airConditioning',                     // 设备维护 - 设备巡检 - 空调系统
                component: AirConditioning
            }, {
                path: '/deviceMaintain/inspection/waterHeating',                        // 设备维护 - 设备巡检 - 水暖系统
                component: WaterHeating
            }, {
                path: '/deviceMaintain/inspection/firefighting',                        // 设备维护 - 设备巡检 - 消防系统
                component: Firefighting
            }, {
                path: '/deviceMaintain/inspection/elevatorRoom',                        // 设备维护 - 设备巡检 - 电梯房系统
                component: ElevatorRoom
            }, {
                path: '/deviceMaintain/equipmentLedger/:id',                        // 设备台账
                component: Equipmentledger
            }, {
                path: '/deviceMaintain/maintenanceDetails/:id',                        // 维修明细
                component: Maintenancedetails
            }, {
                path: '/deviceMaintain/maintenanceSchedule/:id',                        // 维修明细
                component: Maintenanceschedule
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
