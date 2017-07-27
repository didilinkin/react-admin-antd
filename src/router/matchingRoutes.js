// 映射 路由配置表(项目逻辑)
import React from 'react'

// 布局组件
import { Layout } from '../common/containers'

// 将 globalDir 中的映射处理好
import globalDir from '../utils/globalDir'

const Spicy = () => <h3>辣条</h3>
const Chips = () => <h3>薯片</h3>

// 判断是否 有 compObj; 返回值(Boolean)
const hasCompObj = (obj) => obj.hasOwnProperty('component')

// 储存 迭代 globalDir中的路由数据(需要处理)
let globalRoutes = []

let testRoutes = [
    {
        path: '/home/spicy',
        component: Spicy
    }, {
        path: '/home/chips',
        component: Chips
    }
]

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

    mapChildRoute(childRouteItem)

    console.log(globalRoutes) // 查看 globalRoutes 存放内容
    return {}
})

// 合并 数据(测试 + 迭代出来的路由数据)
let routesArr = [
    ...testRoutes,
    ...globalRoutes
]

const matchingRoutes = [
    {
        path: '/home',
        component: Layout,
        routes: routesArr
    }
]

export default matchingRoutes
