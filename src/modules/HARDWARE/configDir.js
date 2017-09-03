// 财务管理 - 目录配置
const HARDWARE_DIR = {
    title: '智能硬件管理后台',
    key: 'hardware',
    path: '/home/hardware',
    icon: 'tool',
    childRoute: [
        {
            title: '空调监控',
            key: 'airconditionermonitor',
            path: '/home/hardware/airconditionermonitor',
            ancestor: ['hardware'],
            childRoute: [
                {
                    title: '空调监控列表',
                    key: 'monitoringlist',
                    path: '/home/hardware/airconditionermonitor/monitoringlist',
                    ancestor: ['hardware', 'airconditionermonitor'],
                    component: require('./containers/AirConditionerMonitor/MonitoringList').default
                }
            ]
        }
    ]
}

// 详情页路由表
const HARDWARE_DETAILS = [
    {
        title: '空调详情',
        key: 'Airconditioningdetails',
        path: '/home/hardware/airconditionermonitor/Details/airconditioningdetails/:id',
        component: require('./containers/details/AirConditioningDetails').default
    }
]

export { HARDWARE_DIR, HARDWARE_DETAILS }
