// 权限页面路由
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import globalDir from '../utils/globalDir'

class ProtectedRoute extends Component {
    // 判断是否 有折叠; 返回值(Boolean)
    hasChildRoute = (childItem) => childItem.hasOwnProperty('childRoute')

    // 渲染 路由映射(根据 globalDir 文件)
    renderChildRoute = (obj) => {
        let childHtml
        let childArray = obj.childRoute

        if (obj.hasOwnProperty('childRoute')) {
            childHtml = childArray.map((item) => {
                return this.renderChildRoute(item)
            })
        } else {
            return (
                <div>
                    { childHtml }
                </div>
            )
        }
    }

    render () {
        const renderRoute = globalDir.map((childItem) => {
            if (this.hasChildRoute(childItem)) {
                return this.renderChildRoute(childItem)
            } else {
                return (
                    <Route
                        path={ childItem.routePath }
                        component={ childItem.compObj }
                    />
                )
            }
        })

        console.log()

        return (
            <div>
                <Route
                    path="/equipment/account"
                    component={ require('../modules/EQUIPMENT/containers/Account.jsx') }
                />
                { renderRoute }
            </div>
        )
    }
}

export default ProtectedRoute
