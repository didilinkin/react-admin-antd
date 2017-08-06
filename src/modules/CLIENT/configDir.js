// 客户管理 - 目录配置
const CLIENT_DIR = {
    title: '客户管理',
    key: 'client',
    path: '/home/client',
    icon: 'user',
    childRoute: [
        {
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
        }, {
            title: '客户资料',
            key: 'information',
            path: '/home/client/information',
            ancestor: ['client'],
            component: require('./containers/Information').default
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
        }
    ]
}

export default CLIENT_DIR
