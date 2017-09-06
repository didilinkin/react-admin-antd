// 楼宇管理 - 目录配置
const BUILDING_DIR = {
    title: '楼宇管理',
    key: 'building',
    path: '/home/building',
    icon: 'home',
    childRoute: [
        {
            title: '楼宇图示',
            key: 'buildingShow',
            path: '/home/building/buildingShow',
            ancestor: ['building'],
            component: require('./containers/BuildingShow').default
        }, {
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
}

export default BUILDING_DIR
