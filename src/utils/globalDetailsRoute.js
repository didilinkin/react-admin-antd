// 全局 模块详情 路由 配置
import { WAREHOUSE_DETAILS } from '../modules/WAREHOUSE/configDir' // 仓库管理
import { CLIENT_DETAILS } from '../modules/CLIENT/configDir' // 客户管理
import { PROPERTY_DETAILS } from '../modules/PROPERTY/configDir' // 物业管理'
import { LEASE_DETAILS } from '../modules/LEASE/configDir' // 租赁管理
const globalDetailsRoute = [
    ...WAREHOUSE_DETAILS,
    ...CLIENT_DETAILS,
    ...PROPERTY_DETAILS,
    ...LEASE_DETAILS
]

export default globalDetailsRoute
