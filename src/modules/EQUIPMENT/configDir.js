// 设备管理 - 目录配置
const EQUIPMENT_DIR = {
    title: '设备管理',
    routePath: '/equipment',
    key: 'equipment',
    icon: 'tool',
    childRoute: [
        {
            title: '设备台账',
            routePath: '/equipment/account',
            key: 'account',
            compObj: require('./containers/Account')
        }, {
            title: '机房管理',
            routePath: '/equipment/computerRoomManagement',
            key: 'computerRoomManagement',
            compObj: require('./containers/ComputerRoomManagement')
        }, {
            title: '设备维保',
            routePath: '/equipment/maintain',
            key: 'maintain',
            childRoute: [
                {
                    title: '保养记录',
                    routePath: '/equipment/maintenancePlan',
                    key: 'maintenancePlan',
                    compObj: require('./containers/maintain/MaintenancePlan')
                }, {
                    title: '维修记录',
                    routePath: '/equipment/repairRecord',
                    key: 'repairRecord',
                    compObj: require('./containers/maintain/RepairRecord')
                }
            ]
        }, {
            title: '设备巡检',
            routePath: '/equipment/inspection',
            key: 'inspection',
            childRoute: [
                {
                    title: '电器系统',
                    routePath: '/equipment/inspection/electric',
                    key: 'electric',
                    childRoute: [
                        {
                            title: '配电房巡检记录',
                            routePath: '/equipment/electric/distributionRoom',
                            key: 'distributionRoom',
                            compObj: require('./containers/inspection/electric/DistributionRoom')
                        }, {
                            title: '弱电间巡检记录',
                            routePath: '/equipment/electric/weakRoom',
                            key: 'weakRoom',
                            compObj: require('./containers/inspection/electric/WeakRoom')
                        }, {
                            title: '发电机运行记录',
                            routePath: '/equipment/electric/generatorLog',
                            key: 'generatorLog',
                            compObj: require('./containers/inspection/electric/GeneratorLog')
                        }
                    ]
                }, {
                    title: '电梯系统',
                    routePath: '/equipment/inspection/elevator',
                    key: 'elevator',
                    childRoute: [
                        {
                            title: '电梯机房',
                            routePath: '/equipment/elevator/elevatorRoom',
                            key: 'elevatorRoom',
                            compObj: require('./containers/inspection/elevator/ElevatorRoom')
                        }, {
                            title: '日常巡检',
                            routePath: '/equipment/elevator/dailyInspection',
                            key: 'dailyInspection',
                            compObj: require('./containers/inspection/elevator/DailyInspection')
                        }
                    ]
                }
            ]
        }
    ]
}

export default EQUIPMENT_DIR
