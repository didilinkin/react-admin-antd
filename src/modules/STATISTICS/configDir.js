// 统计报表 - 目录配置
const STATISTICS_DIR = {
    title: '统计报表',
    key: 'statistics',
    path: '/home/statistics',
    icon: 'file-text',
    childRoute: [
        {
            title: '租金汇总',
            key: 'rent',
            path: '/home/statistics/rent',
            ancestor: ['statistics'],
            component: require('./containers/Rent').default
        }, {
            title: '物业费汇总',
            key: 'propertyCosts',
            path: '/home/statistics/propertyCosts',
            ancestor: ['statistics'],
            component: require('./containers/PropertyCosts').default
        }, {
            title: '电费汇总',
            key: 'electricityBill',
            path: '/home/statistics/electricityBill',
            ancestor: ['statistics'],
            component: require('./containers/ElectricityBill').default
        }, {
            title: '水费汇总',
            key: 'watchFee',
            path: '/home/statistics/watchFee',
            ancestor: ['statistics'],
            component: require('./containers/WatchFee').default
        }
    ]
}

export default STATISTICS_DIR
