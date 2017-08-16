// 全局 模块详情 路由 配置
import { WAREHOUSE_DETAILS } from '../modules/WAREHOUSE/configDir' // 仓库管理
import { CLIENT_DETAILS } from '../modules/CLIENT/configDir' // 客户管理
import { PROPERTY_DETAILS } from '../modules/PROPERTY/configDir' // 物业管理'
import { LEASE_DETAILS } from '../modules/LEASE/configDir' // 租赁管理
import { EQUIPMENT_DETAILS } from '../modules/EQUIPMENT/configDir' // 设备管理
import { FINANCE_DETAILS } from '../modules/FINANCE/configDir' // 财务详情
import { SYSTEM_DETAILS } from '../modules/SYSTEM/configDir' // 系统设置

const globalDetailsRoute = [
    ...WAREHOUSE_DETAILS,
    ...CLIENT_DETAILS,
    ...PROPERTY_DETAILS,
    ...LEASE_DETAILS,
    ...EQUIPMENT_DETAILS,
    ...FINANCE_DETAILS,
    ...SYSTEM_DETAILS
]

export default globalDetailsRoute
