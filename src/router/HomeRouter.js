import React from 'react'
import { Route } from 'react-router-dom'

import HomeTemplate             from '../views/common/pages/HomeTemplate'
import HomeIndex                from '../views/common/pages/HomeIndex'

// 测试组件
import AsyncTable               from '../views/test/AsyncTable'                                         // 测试异步表格
import Echarts                  from '../views/test/Echarts'                                            // 测试 echarts组建(简单例子)
import Recharts                 from '../views/test/Recharts'                                           // 测试 Recharts组件(饼状图 - 简单例子)
import SimpleBarChart           from '../views/test/SimpleBarChart'                                     // 测试 Recharts组件(柱状图)
import TabsTest                 from '../views/test/TabsTest'                                           // 测试 标签页切换 案例

// 引入 '客户管理' 版块
import RepairList               from '../views/Repair/pages/RepairList'                                 // 客户报修
import ClientReview             from '../views/Repair/pages/ClientReview'                               // 客户回访
import UpkeepList               from '../views/Repair/pages/UpkeepList'                                 // 维修费设置
import Rectification            from '../views/Repair/pages/Rectification'                              // 整改通知

import LeaseContract            from '../views/Repair/pages/LeaseContract'                              // 租赁合同
import PropertyContract         from '../views/Repair/pages/PropertyContract'                           // 物业合同

import MarginManagement         from '../views/Repair/pages/MarginManagement'                           // 保证金管理
import SecondaryDecoration      from '../views/Repair/pages/SecondaryDecoration'                        // 二次装修

import ClientReviewDetails      from '../views/Repair/pages/Details/ClientReviewDetails'                // [详情] - 客户回访
import ContractDetail           from '../views/Repair/pages/Details/ContractDetail'                     // [详情] - 合同详情
import ContractTenancyDetail           from '../views/Repair/pages/Details/ContractTenancyDetail'                     // [详情] - 合同详情

import ElectricityDetail        from '../views/Repair/pages/Details/ElectricityDetail'                  // [详情] - 电费详情
import HappyDetail              from '../views/Repair/pages/Details/HappyDetail'                        // [详情] - 欢乐颂详情

import Repair                   from '../views/Repair/pages/Details/Repair'                             // [详情] - 报修明细
import ReturnVisit              from '../views/Repair/pages/Details/ReturnVisit'                        // [详情] - 回访登记
import ReturnVisitDetail        from '../views/Repair/pages/Details/ReturnVisitDetail'                  // [详情] - 回访登记明细
import Maintenance              from '../views/Repair/pages/Details/Maintenance'                        // [详情] - 维修详情
import CorrectionDetail         from '../views/Repair/pages/Details/CorrectionDetail'                   // [详情] - 整改信息明细
import MaintenanceProject       from '../views/Repair/pages/Details/MaintenanceProject'                 // [详情] - 维修项目

// 引入 '仓库管理' 版块
import InventoryManage          from '../views/Warehouse/pages/InventoryManage'                         // 库存管理( 合并: 汇总, 入库, 出库 )
import ReceiveStatistics        from '../views/Warehouse/pages/ReceiveStatistics'                       // 领用统计
import MaterialManagement       from '../views/Warehouse/pages/MaterialManagement'                      // 材料管理
import WarehouseDetail          from '../views/Warehouse/pages/WarehouseDetail'                         // [详情] - 出入库详情

// 引入 '设备维护' 版块
import Account                  from '../views/DeviceMaintain/pages/Account'                            // 设备台账
import ComputerRoom             from '../views/DeviceMaintain/pages/ComputerRoom'                       // 机房编码
import InspectionPlan           from '../views/DeviceMaintain/pages/InspectionPlan'                     // 设备维护保障 - 巡检计划
import MaintenancePlan          from '../views/DeviceMaintain/pages/MaintenancePlan'                    // 设备维护保障 - 保养记录
import EquipmentRepair          from '../views/DeviceMaintain/pages/EquipmentRepair'                    // 设备维护保障 - 设备报修

import DistributionRoom         from '../views/DeviceMaintain/pages/DistributionRoom'                   // 设备巡检 - 电器系统 - 配电房巡查记录
import WeakRoom                 from '../views/DeviceMaintain/pages/WeakRoom'                           // 设备巡检 - 电器系统 - 弱电间巡查记录
import GeneratorLog             from '../views/DeviceMaintain/pages/GeneratorLog'                       // 设备巡检 - 电器系统 - 发电机运行记录

import AirConditioningRoom      from '../views/DeviceMaintain/pages/AirConditioningRoom'                // 设备巡检 - 空调系统 - 空调机房
import NewWindRoom              from '../views/DeviceMaintain/pages/NewWindRoom'                        // 设备巡检 - 空调系统 - 新风机房
import CentralAirConditioning   from '../views/DeviceMaintain/pages/CentralAirConditioning'             // 设备巡检 - 空调系统 - 中央空调

import HeatExchange             from '../views/DeviceMaintain/pages/HeatExchange'                       // 设备巡检 - 水暖系统 - 热交换设备巡检
import FirePump                 from '../views/DeviceMaintain/pages/FirePump'                           // 设备巡检 - 水暖系统 - 消防水泵房巡检
import PlumbingPipeline         from '../views/DeviceMaintain/pages/PlumbingPipeline'                   // 设备巡检 - 水暖系统 - 水暖管道
import PlumbingInfrastructure   from '../views/DeviceMaintain/pages/PlumbingInfrastructure'             // 设备巡检 - 水暖系统 - 水暖基建
import SolarEnergy              from '../views/DeviceMaintain/pages/SolarEnergy'                        // 设备巡检 - 水暖系统 - 太阳能
import HeatTransferStation      from '../views/DeviceMaintain/pages/HeatTransferStation'                // 设备巡检 - 水暖系统 - 换热站巡检

import WaterTank                from '../views/DeviceMaintain/pages/WaterTank'                          // 设备巡检 - 消防系统 - 高位消防水箱
import GasFireExtinguishing     from '../views/DeviceMaintain/pages/GasFireExtinguishing'               // 设备巡检 - 消防系统 - 气体灭火
import MaintenanceRecords       from '../views/DeviceMaintain/pages/MaintenanceRecords'                 // 设备巡检 - 消防系统 - 消防维保记录

import ElevatorRoom             from '../views/DeviceMaintain/pages/ElevatorRoom'                       // 设备巡检 - 电梯系统 - 电梯机房
import DailyInspection          from '../views/DeviceMaintain/pages/DailyInspection'                    // 设备巡检 - 电梯系统 - 日常检查
import AbnormalLog              from '../views/DeviceMaintain/pages/Details/AbnormalLog'                // [详情] - 设备巡检 - 电梯系统 - 异常记录

import Equipmentledger          from '../views/DeviceMaintain/pages/Details/Equipmentledger'            // 设备明细
import Maintenancedetails       from '../views/DeviceMaintain/pages/Details/Maintenancedetails'         // 维修明细
import Maintenanceschedule      from '../views/DeviceMaintain/pages/Details/Maintenanceschedule'        // 保养明细
import Patrolscheme             from '../views/DeviceMaintain/pages/Details/Patrolscheme'               // 巡检计划
import Maintenancerecord        from '../views/DeviceMaintain/pages/Details/Maintenancerecord'
import Repairrecord             from '../views/DeviceMaintain/pages/Details/Repairrecord'
import ServerRoom               from '../views/DeviceMaintain/pages/Details/ServerRoom'
import ElectricalErrorDevice    from '../views/DeviceMaintain/pages/Details/ElectricalErrorDevice'      // 电器异常带设备信息
import ElectricalError          from '../views/DeviceMaintain/pages/Details/ElectricalError'            // 电器异常不带设备信息
import ElevatorError            from '../views/DeviceMaintain/pages/Details/ElevatorError'              // 电梯异常
import ElevatorErrorDevice      from '../views/DeviceMaintain/pages/Details/ElevatorErrorDevice'        // 电梯异常

// 引入 '收费管理' 版块
import ReceivableRent           from '../views/Charge/pages/ReceivableRent'                             // 收费管理 - 应收租金
import RentManagement           from '../views/Charge/pages/RentManagement'                             // 收费管理 - 租金管理
import PropertyManagement       from '../views/Charge/propertyFee/ReceivablePropertyFee'                // 收费管理 - 物业费管理
import InitiateRent             from '../views/Charge/components/InitiateRent'
import PropertyDetail           from '../views/Charge/pages/Details/PropertyDetail'                     // [详情] - 物业费管理
import ChargeWaterBill          from '../views/Charge/pages/ChargeWaterBill'                            // 收费管理 - 水费管理
import ChargePowerBill          from '../views/Charge/pages/ChargePowerBill'                            // 收费管理 - 电费管理

// 引入 '财务管理' 版块
import RentReview               from '../views/Financial/pages/RentReview'                              // 财务管理 - 租金审核
import RentReviewDetail         from '../views/Financial/pages/Details/RentReviewDetail'                // [详情] - 租金审核 状态详情( 如: 审核中/审核完成/收款完成 )
import RentReviewDetailNoLate   from '../views/Financial/pages/Details/RentReviewDetailNoLate'
import RentReviewDetailNoPaid   from '../views/Financial/pages/Details/RentReviewDetailNoPaid'
import NoLateAndRentFinish      from '../views/Financial/pages/Details/NoLateAndRentFinish'
import RentFinishAndLate        from '../views/Financial/pages/Details/RentFinishAndLate'
import PropertyCostsReview      from '../views/Financial/propertyFee/PropertyCostsReview'               // 财务管理 - 物业费审核
import PropertyFeeDetailNoPaid  from '../views/Financial/propertyFee/Details/PropertyFeeDetailNoPaid'
import PropertyFeeDetailNoLate  from '../views/Financial/propertyFee/Details/PropertyFeeDetailNoLate'
import NoLateAndPropertyFinish  from '../views/Financial/propertyFee/Details/NoLateAndPropertyFinish'
import PropertyFinishAndLate    from '../views/Financial/propertyFee/Details/PropertyFinishAndLate'
import PropertyFeeDetail        from '../views/Financial/propertyFee/Details/PropertyFeeDetail'
import WaterBill                from '../views/Financial/pages/WaterBill'                               // 水费审核
import PowerBill                from '../views/Financial/pages/PowerBill'                               // 电费审核
import CollectionDetails        from '../views/Financial/pages/Details/CollectionDetails'

import SecondaryDecorationReview from '../views/Financial/pages/SecondaryDecorationReview'              // 财务管理 - 二次装修审核
import LeaseMarginAudit         from '../views/Financial/cashDeposit/CashDepositRent'                   // 财务管理 - 租赁保证金审核
import HappyDepositcheck        from '../views/Financial/cashDeposit/CashDepositSong'                   // 财务管理 - 欢乐颂押金审核
import EnergyDepositReview      from '../views/Financial/cashDeposit/CashDepositProperty'               // 财务管理 - 能源管理押金审核

import EditBuilding             from '../views/Building/containers/editAvailability/EditBuilding'       // 楼宇管理 - 编辑房源 - 编辑楼宇
import EditRoom                 from '../views/Building/containers/editAvailability/EditRoom'           // 楼宇管理 - 编辑房源 - 编辑房间

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
                path: '/home/index',                                                                    // 默认首页
                component: HomeIndex
            }
        ]
    }, {
        path: '/test',
        component: HomeBox,
        routes: [
            {
                path: '/test/table',                                                                    // 测试 - 异步表格
                component: AsyncTable
            }, {
                path: '/test/echarts',                                                                  // 测试 echarts组建( 简单例子 )
                component: Echarts
            }, {
                path: '/test/recharts',                                                                 // 测试 Recharts组件( 饼状图 - 简单例子 )
                component: Recharts
            }, {
                path: '/test/simpleBarChart',                                                           // 测试 Recharts组件(柱状图)
                component: SimpleBarChart
            }, {
                path: '/test/tabsTest',
                component: TabsTest
            }
        ]
    }, {
        path: '/upkeep',
        component: HomeBox,
        routes: [
            {
                path: '/upkeep/repairList',                                                             // 客户管理 - 客户报修
                component: RepairList
            }, {
                path: '/upkeep/clientReview',                                                           // 客户管理 - 客户回访
                component: ClientReview
            }, {
                path: '/upkeep/upkeepList',                                                             // 客户管理 - 维修费设置
                component: UpkeepList
            }, {
                path: '/upkeep/rectification',                                                          // 客户管理 - 整改通知
                component: Rectification
            }, {
                path: '/upkeep/contractManagement/leaseContract',                                       // 客户管理 - 合同管理 - 租赁合同
                component: LeaseContract
            }, {
                path: '/upkeep/contractManagement/propertyContract',                                    // 客户管理 - 合同管理 - 物业合同
                component: PropertyContract
            }, {
                path: '/upkeep/contractManagement/marginManagement',                                    // 客户管理 - 保证金管理
                component: MarginManagement
            }, {
                path: '/upkeep/contractManagement/secondaryDecoration',                                 // 客户管理 - 二次装修
                component: SecondaryDecoration
            }, {
                path: '/upkeep/clientReviewDetails/:id',                                                // [详情] - 客户回访
                component: ClientReviewDetails
            }, {
                path: '/upkeep/repai/:id',                                                              // [详情] - 报修明细
                component: Repair
            }, {
                path: '/upkeep/returnVisit/:id',                                                        // [详情] - 回访登记
                component: ReturnVisit
            }, {
                path: '/upkeep/returnVisitDetail/:id',                                                  // [详情] - 回访登记明细
                component: ReturnVisitDetail
            }, {
                path: '/upkeep/maintenance/:id',                                                        // [详情] - 维修详情
                component: Maintenance
            }, {
                path: '/upkeep/correctionDetail/:id',                                                   // [详情] - 整改信息明细
                component: CorrectionDetail
            }, {
                path: '/upkeep/maintenanceProject/:id',                                                 // [详情] - 维修项目
                component: MaintenanceProject
            }, {
                path: '/upkeep/contractDetail/:id',                                                     // [详情] - 合同详情
                component: ContractDetail
            }, {
                path: '/upkeep/contractTenancyDetail/:id',                                              // [详情] - 合同租赁详情
                component: ContractTenancyDetail
            }, {
                path: '/upkeep/electricityDetail/:id',                                                  // [详情] - 电费详情
                component: ElectricityDetail
            }, {
                path: '/upkeep/happyDetail/:id',                                                        // [详情] - 欢乐颂详情
                component: HappyDetail
            }
        ]
    }, {
        path: '/warehouse',
        component: HomeBox,
        routes: [
            {
                path: '/warehouse/inventoryManage',                                                     // 仓库管理 - 库存管理
                component: InventoryManage
            }, {
                path: '/warehouse/receiveStatistics',                                                   // 仓库管理 - 领用统计
                component: ReceiveStatistics
            }, {
                path: '/warehouse/materialManagement',                                                  // 仓库管理 - 材料管理
                component: MaterialManagement
            }, {
                path: '/warehouse/warehouseDetail/:id',                                                 // [详情] - 出入库详情
                component: WarehouseDetail
            }
        ]
    }, {
        path: '/deviceMaintain',
        component: HomeBox,
        routes: [
            {
                path: '/deviceMaintain/account',                                                        // 设备维护 - 设备台帐
                component: Account
            }, {
                path: '/deviceMaintain/computerRoom',                                                   // 设备维护 - 机房编码
                component: ComputerRoom
            },
            {
                path: '/deviceMaintain/maintenance/inspectionPlan',                                     // 设备维护 - 设备维护保障 - 巡检计划
                component: InspectionPlan
            }, {
                path: '/deviceMaintain/maintenance/maintenancePlan',                                    // 设备维护 - 设备维护保障 - 保养记录
                component: MaintenancePlan
            }, {
                path: '/deviceMaintain/maintenance/equipmentRepair',                                    // 设备维护 - 设备维护保障 - 设备报修
                component: EquipmentRepair
            }, {
                path: '/deviceMaintain/inspection/electric/distributionRoom',                           // 设备维护 - 设备巡检 - 电器系统 - 配电房巡查记录
                component: DistributionRoom
            }, {
                path: '/deviceMaintain/inspection/electric/weakRoom',                                   // 设备维护 - 设备巡检 - 电器系统 - 弱电间巡查记录
                component: WeakRoom
            }, {
                path: '/deviceMaintain/inspection/electric/generatorLog',                               // 设备维护 - 设备巡检 - 电器系统 - 发电机运行记录
                component: GeneratorLog
            }, {
                path: '/deviceMaintain/inspection/airConditioning/airConditioningRoom',                 // 设备维护 - 设备巡检 - 空调系统 - 空调机房
                component: AirConditioningRoom
            }, {
                path: '/deviceMaintain/inspection/airConditioning/newWindRoom',                         // 设备维护 - 设备巡检 - 空调系统 - 新风机房
                component: NewWindRoom
            }, {
                path: '/deviceMaintain/inspection/airConditioning/centralAirConditioning',              // 设备维护 - 设备巡检 - 空调系统 - 中央空调
                component: CentralAirConditioning
            }, {
                path: '/deviceMaintain/inspection/waterHeating/heatExchange',                           // 设备维护 - 设备巡检 - 水暖系统 - 热交换设备巡检
                component: HeatExchange
            }, {
                path: '/deviceMaintain/inspection/waterHeating/firePump',                               // 设备维护 - 设备巡检 - 水暖系统 - 消防水泵房巡检
                component: FirePump
            }, {
                path: '/deviceMaintain/inspection/waterHeating/plumbingPipeline',                       // 设备维护 - 设备巡检 - 水暖系统 - 水暖管道
                component: PlumbingPipeline
            }, {
                path: '/deviceMaintain/inspection/waterHeating/plumbingInfrastructure',                 // 设备维护 - 设备巡检 - 水暖系统 - 水暖基建
                component: PlumbingInfrastructure
            }, {
                path: '/deviceMaintain/inspection/waterHeating/solarEnergy',                            // 设备维护 - 设备巡检 - 水暖系统 - 太阳能
                component: SolarEnergy
            }, {
                path: '/deviceMaintain/inspection/waterHeating/heatTransferStation',                    // 设备维护 - 设备巡检 - 水暖系统 - 换热站巡检
                component: HeatTransferStation
            }, {
                path: '/deviceMaintain/inspection/firefighting/waterTank',                              // 设备维护 - 设备巡检 - 消防系统 - 高位消防水箱
                component: WaterTank
            }, {
                path: '/deviceMaintain/inspection/firefighting/gasFireExtinguishing',                   // 设备维护 - 设备巡检 - 消防系统 - 气体灭火
                component: GasFireExtinguishing
            }, {
                path: '/deviceMaintain/inspection/firefighting/maintenanceRecords',                     // 设备维护 - 设备巡检 - 消防系统 - 消防维保记录
                component: MaintenanceRecords
            }, {
                path: '/deviceMaintain/inspection/elevator/elevatorRoom',                               // 设备维护 - 设备巡检 - 电梯系统 - 电梯机房
                component: ElevatorRoom
            }, {
                path: '/deviceMaintain/inspection/elevator/dailyInspection',                            // 设备维护 - 设备巡检 - 电梯系统 - 日常检查
                component: DailyInspection
            }, {
                path: '/deviceMaintain/inspection/elevator/abnormalLog/:id',                            // [详情] - 设备维护 - 设备巡检 - 电梯系统 - 异常记录
                component: AbnormalLog
            }, {
                path: '/deviceMaintain/equipmentLedger/:id',                                            // 设备维护 - 设备台账 - 设备明细
                component: Equipmentledger
            }, {
                path: '/deviceMaintain/maintenanceDetails/:id',                                         // 设备维护 - 设备台账 - 维修明细
                component: Maintenancedetails
            }, {
                path: '/deviceMaintain/maintenanceSchedule/:id',                                        // 设备维护 - 设备台账 - 保养明细
                component: Maintenanceschedule
            }, {
                path: '/deviceMaintain/patrolScheme',                                                   // 设备维护 - 设备维保 - 巡检计划明细
                component: Patrolscheme
            }, {
                path: '/deviceMaintain/maintenanceRecord/:id',                                          // 设备维护 - 设备维保 - 保养记录
                component: Maintenancerecord
            }, {
                path: '/deviceMaintain/repairRecord/:id',                                               // 设备维护 - 设备维保 - 维修记录
                component: Repairrecord
            }, {
                path: '/deviceMaintain/serverRoom/:id',                                                 // 设备维护 - 机房明细
                component: ServerRoom
            }, {
                path: '/deviceMaintain/electricalErrorDevice/:id',                                      // 设备维护 - 电器异常带设备信息
                component: ElectricalErrorDevice
            }, {
                path: '/deviceMaintain/electricalError',                                                // 设备维护 - 电器异常不带设备信息
                component: ElectricalError
            }, {
                path: '/deviceMaintain/elevatorError',                                                  // 设备维护 - 电梯异常
                component: ElevatorError
            }, {
                path: '/deviceMaintain/elevatorErrorDevice',                                            // 设备维护 - 电梯异常
                component: ElevatorErrorDevice
            }

        ]
    }, {
        path: '/charge',
        component: HomeBox,
        routes: [
            {
                path: '/charge/receivableRent',                                                         // 收费管理 - 应收租金
                component: ReceivableRent
            }, {
                path: '/charge/rentManagement',                                                         // 收费管理 - 租金管理
                component: RentManagement
            }, {
                path: '/charge/propertyManagement',                                                     // 收费管理 - 物业费管理
                component: PropertyManagement
            }, {
                path: '/charge/initiateRent',                                                           // 弹出
                component: InitiateRent
            }, {
                path: '/charge/propertyDetail/:id',                                                     // [详情] - 物业费管理
                component: PropertyDetail
            }, {
                path: '/charge/chargeWaterBill',                                                        // 收费管理(物业管理) - 水费管理
                component: ChargeWaterBill
            }, {
                path: '/charge/chargePowerBill',                                                        // 收费管理(物业管理) - 电费管理
                component: ChargePowerBill
            }
        ]
    }, {
        path: '/financial',
        component: HomeBox,
        routes: [
            {
                path: '/financial/rentReview',                                                          // 财务管理 - 租金审核
                component: RentReview
            }, {
                path: '/financial/RentReviewDetail/:id',                                                // [详情] - 租金审核 状态详情
                component: RentReviewDetail
            }, {
                path: '/financial/RentReviewDetailNoLate/:id',
                component: RentReviewDetailNoLate
            }, {
                path: '/financial/RentReviewDetailNoPaid/:id',
                component: RentReviewDetailNoPaid
            }, {
                path: '/financial/NoLateAndRentFinish/:id',
                component: NoLateAndRentFinish
            }, {
                path: '/financial/RentFinishAndLate/:id',
                component: RentFinishAndLate
            }, {
                path: '/financial/propertyCostsReview',                                                 // 财务管理 - 物业费审核
                component: PropertyCostsReview
            }, {
                path: '/financial/PropertyFeeDetailNoPaid/:id',                                         // 财务管理 - 物业费审核
                component: PropertyFeeDetailNoPaid
            }, {
                path: '/financial/PropertyFeeDetailNoLate/:id',                                         // 财务管理 - 物业费审核
                component: PropertyFeeDetailNoLate
            }, {
                path: '/financial/NoLateAndPropertyFinish/:id',                                         // 财务管理 - 物业费审核
                component: NoLateAndPropertyFinish
            }, {
                path: '/financial/PropertyFinishAndLate/:id',                                           // 财务管理 - 物业费审核
                component: PropertyFinishAndLate
            }, {
                path: '/financial/PropertyFeeDetail/:id',                                               // 财务管理 - 物业费审核
                component: PropertyFeeDetail
            }, {
                path: '/financial/waterBill',                                                           // 财务管理 - 水费
                component: WaterBill
            }, {
                path: '/financial/CollectionDetails/:id',                                                           // 财务管理 - 水费详情
                component: CollectionDetails
            }, {
                path: '/financial/powerBill',                                                           // 财务管理 - 电费
                component: PowerBill
            }, {
                path: '/financial/secondaryDecorationReview',                                           // 财务管理 - 二次装修审核
                component: SecondaryDecorationReview
            }, {
                path: '/financial/leaseMarginAudit',                                                    // 财务管理 - 租赁保证金审核
                component: LeaseMarginAudit
            }, {
                path: '/financial/happyDepositcheck',                                                   // 财务管理 - 欢乐颂押金审核
                component: HappyDepositcheck
            }, {
                path: '/financial/energyDepositReview',                                                 // 财务管理 - 能源管理押金审核
                component: EnergyDepositReview
            }
        ]
    }, {
        path: '/building',
        component: HomeBox,
        routes: [
            {
                path: '/building/editAvailability/editBuilding',                                        // 楼与管理 - 编辑房源 - 编辑房间
                component: EditBuilding
            }, {
                path: '/building/editAvailability/editRoom',                                            // 楼与管理 - 编辑房源 - 编辑房间
                component: EditRoom
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
