// 系统设置 - 目录配置
const SYSTEM_DIR = {
    title: '系统设置',
    key: 'system',
    path: '/home/system',
    icon: 'setting',
    childRoute: [
        {
            title: '角色管理',
            key: 'role',
            path: '/home/system/role',
            ancestor: ['system'],
            component: require('./containers/Role').default
        }, {
            title: '部门管理',
            key: 'department',
            path: '/home/system/department',
            ancestor: ['system'],
            component: require('./containers/Department').default
        }, {
            title: '账号管理',
            key: 'account',
            path: '/home/system/account',
            ancestor: ['system'],
            component: require('./containers/Account').default
        }, {
            title: '操作日志',
            key: 'operationLog',
            path: '/home/system/operationLog',
            ancestor: ['system'],
            component: require('./containers/OperationLog').default
        }, {
            title: '菜单管理',
            key: 'menu',
            path: '/home/system/menu',
            ancestor: ['system'],
            component: require('./containers/Menu').default
        }
    ]
}

export default SYSTEM_DIR
