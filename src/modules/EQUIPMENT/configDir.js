// 设备管理 - 目录配置
const EQUIPMENT_DIR = {
    title: '设备管理',
    key: 'equipment',
    path: '/home/equipment',
    icon: 'tool',
    childRoute: [
        {
            title: '设备台账',
            key: 'account',
            path: '/home/equipment/account',
            ancestor: ['equipment'],
            component: require('./containers/Account').default
        }, {
            title: '机房管理',
            key: 'computerRoomManagement',
            path: '/home/equipment/computerRoomManagement',
            ancestor: ['equipment'],
            component: require('./containers/ComputerRoomManagement').default
        }, {
            title: '设备维保',
            key: 'maintain',
            path: '/home/equipment/maintain',
            ancestor: ['equipment'],
            childRoute: [
                {
                    title: '保养记录',
                    key: 'maintenancePlan',
                    path: '/home/equipment/maintain/maintenancePlan',
                    ancestor: ['equipment', 'maintain'],
                    component: require('./containers/maintain/MaintenancePlan').default
                }, {
                    title: '维修记录',
                    key: 'repairRecord',
                    path: '/home/equipment/maintain/repairRecord',
                    ancestor: ['equipment', 'maintain'],
                    component: require('./containers/maintain/RepairRecord').default
                }
            ]
        }, {
            title: '设备巡检',
            key: 'inspection',
            path: '/home/equipment/inspection',
            ancestor: ['equipment'],
            childRoute: [
                {
                    title: '电器系统',
                    key: 'electric',
                    path: '/home/equipment/inspection/electric',
                    ancestor: ['equipment', 'inspection'],
                    childRoute: [
                        {
                            title: '配电房巡检记录',
                            key: 'distributionRoom',
                            path: '/home/equipment/inspection/electric/distributionRoom',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            component: require('./containers/inspection/electric/DistributionRoom').default
                        }, {
                            title: '弱电间巡检记录',
                            key: 'weakRoom',
                            path: '/home/equipment/inspection/electric/weakRoom',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            component: require('./containers/inspection/electric/WeakRoom').default
                        }, {
                            title: '发电机运行记录',
                            key: 'generatorLog',
                            path: '/home/equipment/inspection/electric/generatorLog',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            component: require('./containers/inspection/electric/GeneratorLog').default
                        }
                    ]
                }, {
                    title: '电梯系统',
                    key: 'elevator',
                    path: '/home/equipment/inspection/elevator',
                    ancestor: ['equipment', 'inspection'],
                    childRoute: [
                        {
                            title: '电梯机房',
                            key: 'elevatorRoom',
                            path: '/home/equipment/inspection/elevator/elevatorRoom',
                            ancestor: ['equipment', 'inspection', 'elevator'],
                            component: require('./containers/inspection/elevator/ElevatorRoom').default
                        }, {
                            title: '日常巡检',
                            key: 'dailyInspection',
                            path: '/home/equipment/inspection/elevator/dailyInspection',
                            ancestor: ['equipment', 'inspection', 'elevator'],
                            component: require('./containers/inspection/elevator/DailyInspection').default
                        }
                    ]
                }
            ]
        }
    ]
}

export default EQUIPMENT_DIR
