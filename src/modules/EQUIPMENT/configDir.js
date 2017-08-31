// 设备管理 - 目录配置
const EQUIPMENT_DIR = {
    title: '设备管理',
    key: 'equipment',
    path: '/home/equipment',
    icon: 'tool',
    childRoute: [
        {
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
            title: '设备台账',
            key: 'equipmentAccount',
            path: '/home/equipment/equipmentAccount',
            ancestor: ['equipment'],
            component: require('./containers/EquipmentAccount').default
        }, {
            title: '机房管理',
            key: 'computerRoomManagement',
            path: '/home/equipment/computerRoomManagement',
            ancestor: ['equipment'],
            component: require('./containers/ComputerRoomManagement').default
        }, {
            title: '设备巡检',
            key: 'inspection',
            path: '/home/equipment/inspection',
            ancestor: ['equipment'],
            component: require('./containers/Inspection').default
        }
    ]
}
// 详情页路由表
const EQUIPMENT_DETAILS = [
    {
        title: '设备明细',
        key: 'equipmentledgerDetails',
        path: '/home/equipment/Details/equipmentledgerDetails/:id',
        component: require('./containers/details/EquipmentAccount/EquipmentledgerDetails').default
    }, {
        title: '机房明细',
        key: 'ServerRoomDetails',
        path: '/home/equipment/Details/serverRoomDetails/:id',
        component: require('./containers/details/ComputerRoomManagement/ServerRoomDetails').default
    }, {
        title: '保养情况',
        key: 'MaintenancerecordDetails',
        path: '/home/equipment/Details/maintain/maintenancerecordDetails/:id',
        component: require('./containers/details/maintain/MaintenancePlan/MaintenancerecordDetails').default
    }, {
        title: '维修情况',
        key: 'RepairrecordDetails',
        path: '/home/equipment/Details/maintain/repairrecordDetails/:id',
        component: require('./containers/details/maintain/RepairRecord/RepairrecordDetails').default
    }, { // 以下 页面非 '详情页'; 只是不需要在 左侧导航显示; 因此划入 '详情' 路由部分( 无影响 )
        title: '配电房巡检记录',
        key: 'distributionRoom',
        path: '/home/equipment/distributionRoom',
        component: require('./containers/ElectricSystem/DistributionRoom').default
    }, {
        title: '弱电间巡检记录',
        key: 'WeakRoom',
        path: '/home/equipment/WeakRoom',
        component: require('./containers/ElectricSystem/WeakRoom').default
    }, {
        title: '发电机运行记录',
        key: 'GeneratorLog',
        path: '/home/equipment/GeneratorLog',
        component: require('./containers/ElectricSystem/GeneratorLog').default
    }, {
        title: '电梯机房',
        key: 'ElevatorRoom',
        path: '/home/equipment/ElevatorRoom',
        component: require('./containers/ElevatorSystem/ElevatorRoom').default
    }, {
        title: '日常巡检',
        key: 'DailyInspection',
        path: '/home/equipment/DailyInspection',
        component: require('./containers/ElevatorSystem/DailyInspection').default
    }, {
        title: '空调机房',
        key: 'AirConditioningRoom',
        path: '/home/equipment/AirConditioningRoom',
        component: require('./containers/AirConditionSystem/AirConditioningRoom').default
    }, {
        title: '新风机房',
        key: 'NewWindRoom',
        path: '/home/equipment/NewWindRoom',
        component: require('./containers/AirConditionSystem/NewWindRoom').default
    }, {
        title: '中央空调',
        key: 'CentralAirConditioning',
        path: '/home/equipment/CentralAirConditioning',
        component: require('./containers/AirConditionSystem/CentralAirConditioning').default
    }, {
        title: '热交换设备巡检',
        key: 'HeatExchange',
        path: '/home/equipment/HeatExchange',
        component: require('./containers/WaterSystem/HeatExchange').default
    }, {
        title: '水暖管道',
        key: 'PlumbingPipeline',
        path: '/home/equipment/PlumbingPipeline',
        component: require('./containers/WaterSystem/PlumbingPipeline').default
    }, {
        title: '水暖基建',
        key: 'PlumbingInfrastructure',
        path: '/home/equipment/PlumbingInfrastructure',
        component: require('./containers/WaterSystem/PlumbingInfrastructure').default
    }, {
        title: '太阳能巡检',
        key: 'SolarEnergy',
        path: '/home/equipment/SolarEnergy',
        component: require('./containers/WaterSystem/SolarEnergy').default
    }, {
        title: '换热站巡检',
        key: 'HeatTransferStation',
        path: '/home/equipment/HeatTransferStation',
        component: require('./containers/WaterSystem/HeatTransferStation').default
    }, {
        title: '高位消费水箱',
        key: 'WaterTank',
        path: '/home/equipment/WaterTank',
        component: require('./containers/FireSystem/WaterTank').default
    }, {
        title: '气体灭火巡检',
        key: 'GasFireExtinguishing',
        path: '/home/equipment/GasFireExtinguishing',
        component: require('./containers/FireSystem/GasFireExtinguishing').default
    }, {
        title: '消防维保记录',
        key: 'MaintenanceRecords',
        path: '/home/equipment/MaintenanceRecords',
        component: require('./containers/FireSystem/MaintenanceRecords').default
    }
]
export { EQUIPMENT_DIR, EQUIPMENT_DETAILS }
