// 设备管理 - 目录配置
const EQUIPMENT_DIR = {
    title: '设备管理',
    path: '/equipment',
    icon: 'tool',
    childRoute: [
        {
            title: '设备台账',
            path: '/equipment/account',
            compObj: require('./containers/Account')
        }, {
            title: '机房管理',
            path: '/equipment/computerRoomManagement',
            compObj: require('./containers/ComputerRoomManagement')
        }, {
            title: '设备维保',
            path: '/equipment/maintain',
            childRoute: [
                {
                    title: '保养记录',
                    path: '/equipment/maintenancePlan',
                    compObj: require('./containers/maintain/MaintenancePlan')
                }, {
                    title: '维修记录',
                    path: '/equipment/repairRecord',
                    compObj: require('./containers/maintain/RepairRecord')
                }
            ]
        }, {
            title: '设备巡检',
            path: '/equipment/inspection',
            childRoute: [
                {
                    title: '电器系统',
                    path: '/equipment/inspection/electric',
                    childRoute: [
                        {
                            title: '配电房巡检记录',
                            path: '/equipment/electric/distributionRoom',
                            compObj: require('./containers/inspection/electric/DistributionRoom')
                        }, {
                            title: '弱电间巡检记录',
                            path: '/equipment/electric/weakRoom',
                            compObj: require('./containers/inspection/electric/WeakRoom')
                        }, {
                            title: '发电机运行记录',
                            path: '/equipment/electric/generatorLog',
                            compObj: require('./containers/inspection/electric/GeneratorLog')
                        }
                    ]
                }, {
                    title: '电梯系统',
                    path: '/equipment/inspection/elevator',
                    childRoute: [
                        {
                            title: '电梯机房',
                            path: '/equipment/elevator/elevatorRoom',
                            compObj: require('./containers/inspection/elevator/ElevatorRoom')
                        }, {
                            title: '日常巡检',
                            path: '/equipment/elevator/dailyInspection',
                            compObj: require('./containers/inspection/elevator/DailyInspection')
                        }
                    ]
                }
            ]
        }
    ]
}

export default EQUIPMENT_DIR
