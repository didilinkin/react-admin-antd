// 仓库管理 - 目录配置
const WAREHOUSE_DIR = {
    title: '仓储管理',
    key: 'wareHouse',
    path: '/home/wareHouse',
    icon: 'database',
    childRoute: [
        {
            title: '库存管理',
            key: 'inventoryManage',
            path: '/home/wareHouse/inventoryManage',
            ancestor: ['wareHouse'],
            component: require('./containers/InventoryManage').default
        }, {
            title: '领用统计',
            key: 'receiveStatistics',
            path: '/home/wareHouse/receiveStatistics',
            ancestor: ['wareHouse'],
            component: require('./containers/ReceiveStatistics').default
        }, {
            title: '材料管理',
            key: 'meterialManagement',
            path: '/home/wareHouse/meterialManagement',
            ancestor: ['wareHouse'],
            component: require('./containers/MeterialManagement').default
        }
    ]
}

// 仓库管理 - 详情页路由表
const WAREHOUSE_DETAILS = [
    {
        title: '库存管理',
        key: 'Inventory',
        path: '/home/wareHouse/inventory/:id',
        component: require('./containers/details/Inventory').default
    }
]

export { WAREHOUSE_DIR, WAREHOUSE_DETAILS }
