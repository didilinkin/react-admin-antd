// 楼宇管理 - 目录配置
const BUILDING_DIR = {
    title: '楼宇管理',
    key: 'building',
    path: '/home/building',
    icon: 'home',
    childRoute: [
        {
            title: '编辑房源',
            key: 'editAvailability',
            path: '/home/building/editAvailability',
            ancestor: ['building'],
            childRoute: [
                {
                    title: '编辑房间',
                    key: 'editRoom',
                    path: '/home/building/editAvailability/editRoom',
                    ancestor: ['building', 'editAvailability'],
                    component: require('./containers/editAvailability/EditRoom').default
                }, {
                    title: '编辑楼宇',
                    key: 'editBuilding',
                    path: '/home/building/editAvailability/editBuilding',
                    ancestor: ['building', 'editAvailability'],
                    component: require('./containers/editAvailability/EditBuilding').default
                }
            ]
        }, {
            title: '楼宇图示',
            key: 'buildingShow',
            path: '/home/building/buildingShow',
            ancestor: ['building'],
            component: require('./containers/BuildingShow').default
        }, {
            title: '注册信息',
            key: 'registrationMessage',
            path: '/home/building/registrationMessage',
            ancestor: ['building'],
            component: require('./containers/RegistrationMessage').default
        }
    ]
}

export default BUILDING_DIR
