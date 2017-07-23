// 仓库管理 - 目录配置
const WAREHOUSE_DIR = {
    title: '仓库管理',
    path: 'wareHouse',
    routePath: '/wareHouse',
    icon: 'database',
    childRoute: [
        {
            title: '库存管理',
            path: 'inventoryManage',
            routePath: '/wareHouse/inventoryManage',
            compObj: require('./containers/InventoryManage')
        }, {
            title: '领用统计',
            path: 'receiveStatistics',
            routePath: '/wareHouse/receiveStatistics',
            compObj: require('./containers/ReceiveStatistics')
        }, {
            title: '材料管理',
            path: 'meterialManagement',
            routePath: '/wareHouse/meterialManagement',
            compObj: require('./containers/MeterialManagement')
        }
    ]
}

export default WAREHOUSE_DIR
