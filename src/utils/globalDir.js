// 全局 目录配置(输出: 导航菜单 / 路由)
import WAREHOUSE_DIR from '../modules/WAREHOUSE/configDir' // 仓库管理
import EQUIPMENT_DIR from '../modules/EQUIPMENT/configDir' // 设备管理
import BUILDING_DIR from '../modules/BUILDING/configDir' // 楼宇管理
import LEASE_DIR from '../modules/LEASE/configDir' // 租赁管理

const globalDir = [
    BUILDING_DIR,
    LEASE_DIR,
    WAREHOUSE_DIR,
    EQUIPMENT_DIR
]

export default globalDir
