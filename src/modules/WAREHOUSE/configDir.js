// 仓库管理 - 目录配置
const WAREHOUSE_DIR = {
    title: '仓库管理',
    key: 'wareHouse',
    routekey: '/wareHouse',
    icon: 'database',
    childRoute: [
        {
            title: '库存管理',
            key: 'inventoryManage',
            routekey: '/wareHouse/inventoryManage',
            compObj: require('./containers/InventoryManage')
        }, {
            title: '领用统计',
            key: 'receiveStatistics',
            routekey: '/wareHouse/receiveStatistics',
            compObj: require('./containers/ReceiveStatistics')
        }, {
            title: '材料管理',
            key: 'meterialManagement',
            routekey: '/wareHouse/meterialManagement',
            compObj: require('./containers/MeterialManagement')
        }
    ]
}

export default WAREHOUSE_DIR
