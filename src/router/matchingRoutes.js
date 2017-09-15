// 映射 路由配置表(项目逻辑)
// 布局组件
import { HomeContainers } from '../common/containers' // LayoutContainers

import LayoutContainers from '../common/containers/Layout/LayoutContainers'

// 将 globalDir 中的映射处理好
import globalDir from '../utils/globalDir'
// 映射全局 详情页面 路由配置
import globalDetailsRoute from '../utils/globalDetailsRoute'

// 判断是否 有 compObj; 返回值(Boolean)
const hasCompObj = (obj) => obj.hasOwnProperty('component')

// 储存 迭代 globalDir中的路由数据(需要处理)
let globalRoutes = []

// 首页内容(柱状图 等信息展示)
const HomeIndexRoute = [{
    title: '首页',
    key: 'index',
    path: '/home/index',
    component: HomeContainers
}, {
    title: '测试',
    key: 'test',
    path: '/home/test',
    component: require('../common/components/Wysiwyg.jsx').default
}]

// 根据是否存在 component属性, 保存对象
const mapChildRoute = (item) => {
    item.map((itemChildRoute) => {
        hasCompObj(itemChildRoute) ?
            globalRoutes.push(itemChildRoute) : // 有 component, 存入 数组
            mapChildRoute(itemChildRoute.childRoute) // 无 component, 拿它的 childRoute 属性值(数组), 再次进入方法遍历
        return {}
    })
}

// map方法重写
globalDir.map((moduleItem) => {
    let childRouteItem = moduleItem.childRoute

    return mapChildRoute(childRouteItem)
})

// 合并 数据(测试 + 迭代出来的路由数据)
let routesArr = [
    ...globalRoutes,
    ...HomeIndexRoute,
    ...globalDetailsRoute // 全局详情页面路由, 不需要处理
]

const matchingRoutes = [{
    path: '/home',
    component: LayoutContainers,
    routes: routesArr
}]

export default matchingRoutes
