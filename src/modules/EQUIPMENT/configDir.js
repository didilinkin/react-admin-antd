// 设备管理 - 目录配置
const EQUIPMENT_DIR = {
    title: '设备管理',
    routePath: '/equipment',
    key: 'equipment',
    icon: 'tool',
    childRoute: [
        {
            title: '设备台账',
            key: 'account',
            routePath: '/equipment/account',
            ancestor: ['equipment'],
            compObj: require('./containers/Account')
        }, {
            title: '机房管理',
            key: 'computerRoomManagement',
            routePath: '/equipment/computerRoomManagement',
            ancestor: ['equipment'],
            compObj: require('./containers/ComputerRoomManagement')
        }, {
            title: '设备维保',
            key: 'maintain',
            routePath: '/equipment/maintain',
            ancestor: ['equipment'],
            childRoute: [
                {
                    title: '保养记录',
                    key: 'maintenancePlan',
                    routePath: '/equipment/maintenancePlan',
                    ancestor: ['equipment', 'maintain'],
                    compObj: require('./containers/maintain/MaintenancePlan')
                }, {
                    title: '维修记录',
                    key: 'repairRecord',
                    routePath: '/equipment/repairRecord',
                    ancestor: ['equipment', 'maintain'],
                    compObj: require('./containers/maintain/RepairRecord')
                }
            ]
        }, {
            title: '设备巡检',
            key: 'inspection',
            routePath: '/equipment/inspection',
            ancestor: ['equipment'],
            childRoute: [
                {
                    title: '电器系统',
                    key: 'electric',
                    routePath: '/equipment/inspection/electric',
                    ancestor: ['equipment', 'inspection'],
                    childRoute: [
                        {
                            title: '配电房巡检记录',
                            key: 'distributionRoom',
                            routePath: '/equipment/electric/distributionRoom',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            compObj: require('./containers/inspection/electric/DistributionRoom')
                        }, {
                            title: '弱电间巡检记录',
                            key: 'weakRoom',
                            routePath: '/equipment/electric/weakRoom',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            compObj: require('./containers/inspection/electric/WeakRoom')
                        }, {
                            title: '发电机运行记录',
                            key: 'generatorLog',
                            routePath: '/equipment/electric/generatorLog',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            compObj: require('./containers/inspection/electric/GeneratorLog')
                        }
                    ]
                }, {
                    title: '电梯系统',
                    key: 'elevator',
                    routePath: '/equipment/inspection/elevator',
                    ancestor: ['equipment', 'inspection'],
                    childRoute: [
                        {
                            title: '电梯机房',
                            key: 'elevatorRoom',
                            routePath: '/equipment/elevator/elevatorRoom',
                            ancestor: ['equipment', 'inspection', 'elevator'],
                            compObj: require('./containers/inspection/elevator/ElevatorRoom')
                        }, {
                            title: '日常巡检',
                            key: 'dailyInspection',
                            routePath: '/equipment/elevator/dailyInspection',
                            ancestor: ['equipment', 'inspection', 'elevator'],
                            compObj: require('./containers/inspection/elevator/DailyInspection')
                        }
                    ]
                }
            ]
        }
    ]
}

export default EQUIPMENT_DIR
