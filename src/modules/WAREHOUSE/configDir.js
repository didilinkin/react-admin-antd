// 仓库管理 - 目录配置
const WAREHOUSE_DIR = {
    title: '仓库管理',
    path: '/wareHouse',
    icon: 'database',
    childRoute: [
        {
            title: '库存管理',
            path: '/wareHouse/inventoryManage',
            compObj: require('./containers/InventoryManage')
        }, {
            title: '领用统计',
            path: '/wareHouse/receiveStatistics',
            compObj: require('./containers/ReceiveStatistics')
        }, {
            title: '材料管理',
            path: '/wareHouse/meterialManagement',
            compObj: require('./containers/MeterialManagement')
        }
    ]
}

export default WAREHOUSE_DIR
