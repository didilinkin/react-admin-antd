// 仓库管理 - 目录配置
import InventoryManage from './containers/InventoryManage'
import ReceiveStatistics from './containers/ReceiveStatistics'
import MeterialManagement from './containers/MeterialManagement'

const WAREHOUSE_DIR = {
    title: '仓库管理',
    key: 'wareHouse',
    path: '/home/wareHouse',
    icon: 'database',
    childRoute: [
        {
            title: '库存管理',
            key: 'inventoryManage',
            path: '/home/wareHouse/inventoryManage',
            ancestor: ['wareHouse'],
            component: InventoryManage
        }, {
            title: '领用统计',
            key: 'receiveStatistics',
            path: '/home/wareHouse/receiveStatistics',
            ancestor: ['wareHouse'],
            component: ReceiveStatistics
        }, {
            title: '材料管理',
            key: 'meterialManagement',
            path: '/home/wareHouse/meterialManagement',
            ancestor: ['wareHouse'],
            component: MeterialManagement
        }
    ]
}

export default WAREHOUSE_DIR
