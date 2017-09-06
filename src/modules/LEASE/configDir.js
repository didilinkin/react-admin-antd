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
            component: require('./containers/LeaseContract').default
        }, {
            title: '租金管理',
            key: 'rentManagement',
            path: '/home/lease/rentManagement',
            ancestor: ['lease'],
            component: require('./containers/RentManagement').default
        }, {
            title: '注册信息',
            key: 'registrationMessage',
            path: '/home/building/registrationMessage',
            ancestor: ['building'],
            component: require('./containers/RegistrationMessage').default
        }
    ]
}
// 详情页路由表
const LEASE_DETAILS = [
    {
        title: '范本合同详情',
        key: 'ContractTenancyDetail',
        path: '/home/lease/LeaseContractDetails/contractTenancyDetail/:id',
        component: require('./containers/details/LeaseContract/ContractTenancyDetail').default
    }, {
        title: '欢乐颂合同详情',
        key: 'HappyDetail',
        path: '/home/lease/LeaseContractDetails/happyDetail/:id',
        component: require('./containers/details/LeaseContract/HappyDetail').default
    }
]
export { LEASE_DIR, LEASE_DETAILS }
