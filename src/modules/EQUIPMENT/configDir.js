// 设备管理 - 目录配置
const EQUIPMENT_DIR = {
    title: '设备管理',
    routePath: '/equipment',
    path: 'equipment',
    icon: 'tool',
    childRoute: [
        {
            title: '设备台账',
            routePath: '/equipment/account',
            path: 'account',
            compObj: require('./containers/Account')
        }, {
            title: '机房管理',
            routePath: '/equipment/computerRoomManagement',
            path: 'computerRoomManagement',
            compObj: require('./containers/ComputerRoomManagement')
        }, {
            title: '设备维保',
            routePath: '/equipment/maintain',
            path: 'maintain',
            childRoute: [
                {
                    title: '保养记录',
                    routePath: '/equipment/maintenancePlan',
                    path: 'maintenancePlan',
                    compObj: require('./containers/maintain/MaintenancePlan')
                }, {
                    title: '维修记录',
                    routePath: '/equipment/repairRecord',
                    path: 'repairRecord',
                    compObj: require('./containers/maintain/RepairRecord')
                }
            ]
        }, {
            title: '设备巡检',
            routePath: '/equipment/inspection',
            path: 'inspection',
            childRoute: [
                {
                    title: '电器系统',
                    routePath: '/equipment/inspection/electric',
                    path: 'electric',
                    childRoute: [
                        {
                            title: '配电房巡检记录',
                            routePath: '/equipment/electric/distributionRoom',
                            path: 'distributionRoom',
                            compObj: require('./containers/inspection/electric/DistributionRoom')
                        }, {
                            title: '弱电间巡检记录',
                            routePath: '/equipment/electric/weakRoom',
                            path: 'weakRoom',
                            compObj: require('./containers/inspection/electric/WeakRoom')
                        }, {
                            title: '发电机运行记录',
                            routePath: '/equipment/electric/generatorLog',
                            path: 'generatorLog',
                            compObj: require('./containers/inspection/electric/GeneratorLog')
                        }
                    ]
                }, {
                    title: '电梯系统',
                    routePath: '/equipment/inspection/elevator',
                    path: 'elevator',
                    childRoute: [
                        {
                            title: '电梯机房',
                            routePath: '/equipment/elevator/elevatorRoom',
                            path: 'elevatorRoom',
                            compObj: require('./containers/inspection/elevator/ElevatorRoom')
                        }, {
                            title: '日常巡检',
                            routePath: '/equipment/elevator/dailyInspection',
                            path: 'dailyInspection',
                            compObj: require('./containers/inspection/elevator/DailyInspection')
                        }
                    ]
                }
            ]
        }
    ]
}

export default EQUIPMENT_DIR
