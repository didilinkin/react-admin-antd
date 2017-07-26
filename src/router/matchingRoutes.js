// 映射 路由配置表(项目逻辑)
import React from 'react'

// 布局组件
import { Layout } from '../common/containers'

// 将 globalDir 中的映射处理好
import globalDir from '../utils/globalDir'

const Spicy = () => <h3>辣条</h3>
const Chips = () => <h3>薯片</h3>

// 判断是否 有 compObj; 返回值(Boolean)
const hasCompObj = (obj) => obj.hasOwnProperty('compObj')

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

// 判断 / 保存到数组: 传入的item 方法
// const setCompObj = (obj) => {
//     // 判断 item 内是否有 'compObj'对象
//     if (hasCompObj(obj)) {
//         return globalRoutes.push(obj) // 如果有 compObj
//     } else {
//         // 迭代 item 中的 childRoute 数组对象
//         // console.log(obj)
//         mapItem(obj)
//     }
// }

// 迭代
const mapItem = (obj) => {
    obj.map((item) => {
        item.childRoute.map((itemChildRoute) => {
            // console.log(itemChildRoute) // 返回一个对象

            if (hasCompObj(itemChildRoute)) { // 判断是否有 childRoute 属性
                // globalRoutes.concat(itemChildRoute) // 不好用

                // let b = globalRoutes.push(itemChildRoute) // globalRoutes 用于保存的数组
                // console.log(b)

                globalRoutes = globalRoutes.push(itemChildRoute)
                console.log(globalRoutes)
            } else {
                console.log('无 compObj')
            }

            return {}
        })
        return {}
    })

    console.log(globalRoutes)
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
