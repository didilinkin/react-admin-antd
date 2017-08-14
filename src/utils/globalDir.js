// 全局 目录配置(输出: 导航菜单 / 路由)
import BUILDING_DIR from '../modules/BUILDING/configDir' // 楼宇管理
import { LEASE_DIR } from '../modules/LEASE/configDir' // 租赁管理
import { PROPERTY_DIR } from '../modules/PROPERTY/configDir' // 物业管理
import { CLIENT_DIR } from '../modules/CLIENT/configDir' // 客户管理
import { FINANCE_DIR } from '../modules/FINANCE/configDir' // 财务管理
import STATISTICS_DIR from '../modules/STATISTICS/configDir' // 统计报表
import { WAREHOUSE_DIR } from '../modules/WAREHOUSE/configDir' // 仓库管理
import { EQUIPMENT_DIR } from '../modules/EQUIPMENT/configDir' // 设备管理
import SYSTEM_DIR from '../modules/SYSTEM/configDir' // 系统设置

const globalDir = [
    BUILDING_DIR,
    LEASE_DIR,
    PROPERTY_DIR,
    CLIENT_DIR,
    FINANCE_DIR,
    STATISTICS_DIR,
    WAREHOUSE_DIR,
    EQUIPMENT_DIR,
    SYSTEM_DIR
]

export default globalDir
