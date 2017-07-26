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

// 初始循环
const mapItem = (obj) => {
    for (let item of obj) {
        let childItem = item.childRoute
        mapChildRoute(childItem)
    }

    console.dir(globalRoutes)
}

// 再次循环: 没有 component 属性的对象中的 childRoute 数组
const mapChildRoute = (childRouteArr) => {
    for (let itemChildRoute of childRouteArr) {
        if (hasCompObj(itemChildRoute)) {
            globalRoutes.push(itemChildRoute) // 有 component, 无 childRoute
        } else {
            // console.dir(itemChildRoute) // "设备维保" => 无 component, 有 childRoute

            mapChildRoute(itemChildRoute.childRoute) // 将 带有 childRoute的对象, 只拿它的 childRoute 属性值(数组), 再次进入方法遍历
        }
    }
}

// 迭代 globalDir
mapItem(globalDir)

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
