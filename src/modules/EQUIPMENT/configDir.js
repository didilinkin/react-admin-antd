// 设备管理 - 目录配置
import Account from './containers/Account'
import ComputerRoomManagement from './containers/ComputerRoomManagement'
import MaintenancePlan from './containers/maintain/MaintenancePlan'
import RepairRecord from './containers/maintain/RepairRecord'
import DistributionRoom from './containers/inspection/electric/DistributionRoom'
import WeakRoom from './containers/inspection/electric/WeakRoom'
import GeneratorLog from './containers/inspection/electric/GeneratorLog'
import ElevatorRoom from './containers/inspection/elevator/ElevatorRoom'
import DailyInspection from './containers/inspection/elevator/DailyInspection'


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
            component: Account
        }, {
            title: '机房管理',
            key: 'computerRoomManagement',
            path: '/home/equipment/computerRoomManagement',
            ancestor: ['equipment'],
            component: ComputerRoomManagement
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
                    component: MaintenancePlan
                }, {
                    title: '维修记录',
                    key: 'repairRecord',
                    path: '/home/equipment/maintain/repairRecord',
                    ancestor: ['equipment', 'maintain'],
                    component: RepairRecord
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
                            component: DistributionRoom
                        }, {
                            title: '弱电间巡检记录',
                            key: 'weakRoom',
                            path: '/home/equipment/inspection/electric/weakRoom',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            component: WeakRoom
                        }, {
                            title: '发电机运行记录',
                            key: 'generatorLog',
                            path: '/home/equipment/inspection/electric/generatorLog',
                            ancestor: ['equipment', 'inspection', 'electric'],
                            component: GeneratorLog
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
                            component: ElevatorRoom
                        }, {
                            title: '日常巡检',
                            key: 'dailyInspection',
                            path: '/home/equipment/inspection/elevator/dailyInspection',
                            ancestor: ['equipment', 'inspection', 'elevator'],
                            component: DailyInspection
                        }
                    ]
                }
            ]
        }
    ]
}

export default EQUIPMENT_DIR
