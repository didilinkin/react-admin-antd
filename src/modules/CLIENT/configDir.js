// 客户管理 - 目录配置
const CLIENT_DIR = {
    title: '客户管理',
    key: 'client',
    path: '/home/client',
    icon: 'user',
    childRoute: [
        {
            title: '客户资料',
            key: 'information',
            path: '/home/client/information',
            ancestor: ['client'],
            component: require('./containers/Information').default
        }, {
            title: '客户报修',
            key: 'repair',
            path: '/home/client/repair',
            ancestor: ['client'],
            childRoute: [
                {
                    title: '客户报修',
                    key: 'clientRepair',
                    path: '/home/client/repair/clientRepair',
                    ancestor: ['client', 'repair'],
                    component: require('./containers/repair/ClientRepair').default
                }, {
                    title: '客户回访',
                    key: 'returnVisit',
                    path: '/home/client/repair/returnVisit',
                    ancestor: ['client', 'repair'],
                    component: require('./containers/repair/ReturnVisit').default
                }, {
                    title: '维修费设置',
                    key: 'maintenanceFees',
                    path: '/home/client/repair/maintenanceFees',
                    ancestor: ['client', 'repair'],
                    component: require('./containers/repair/MaintenanceFees').default
                }
            ]
        }, {
            title: '整改通知',
            key: 'notice',
            path: '/home/client/notice',
            ancestor: ['client'],
            component: require('./containers/Notice').default
        }, {
            title: '二次装修',
            key: 'secondaryDecoration',
            path: '/home/client/secondaryDecoration',
            ancestor: ['client'],
            component: require('./containers/SecondaryDecoration').default
        }, {
            title: '保证金管理',
            key: 'margin',
            path: '/home/client/margin',
            ancestor: ['client'],
            component: require('./containers/Margin').default
        }, {
            title: '门禁卡管理',
            key: 'accessCard',
            path: '/home/client/accessCard',
            ancestor: ['client'],
            childRoute: [
                {
                    title: '门禁卡管理',
                    key: 'management',
                    path: '/home/client/accessCard/management',
                    ancestor: ['client', 'accessCard'],
                    component: require('./containers/accessCard/Management').default
                }, {
                    title: '门禁卡押金',
                    key: 'deposit',
                    path: '/home/client/accessCard/deposit',
                    ancestor: ['client', 'accessCard'],
                    component: require('./containers/accessCard/Deposit').default
                }
            ]
        }
    ]
}

// 详情页路由表
const CLIENT_DETAILS = [
    {
        title: '报修内容',
        key: 'RepairDetail',
        path: '/home/client/repair/repairDetail/:id',
        component: require('./containers/details/repair/RepairDetail').default
    }, {
        title: '维修明细',
        key: 'MaintenanceDetail',
        path: '/home/client/repair/MaintenanceDetail/:id',
        component: require('./containers/details/repair/MaintenanceDetail').default
    }, {
        title: '回访情况',
        key: 'ReturnVisitDetail',
        path: '/home/client/repair/ReturnVisitDetail/:id',
        component: require('./containers/details/repair/ReturnVisitDetail').default
    }, {
        title: '回访登记',
        key: 'ReturnDetail',
        path: '/home/client/repair/ReturnDetail/:id',
        component: require('./containers/details/repair/ReturnDetail').default
    }, {
        title: '保证金详情',
        key: 'CashDepositDetail',
        path: '/home/client/cashDepositDetail/cashDepositDetail/:id',
        component: require('./containers/details/cashDeposit/CashDepositDetail').default
    }
]
export { CLIENT_DIR, CLIENT_DETAILS }
