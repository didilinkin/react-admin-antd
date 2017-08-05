// 租赁管理 - 目录配置
const LEASE_DIR = {
    title: '租赁管理',
    key: 'lease',
    path: '/home/lease',
    icon: 'schedule',
    childRoute: [
        {
            title: '租赁合同',
            key: 'leaseContract',
            path: '/home/lease/leaseContract',
            ancestor: ['lease'],
            component: require('./LeaseContract').default
        }, {
            title: '租金管理',
            key: 'rentManagement',
            path: '/home/lease/rentManagement',
            ancestor: ['lease'],
            component: require('./RentManagement').default
        }
    ]
}

export default LEASE_DIR
