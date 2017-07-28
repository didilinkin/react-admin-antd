// 权限认证 重定向(是否登陆状态) ? 跳向 => 指定的页面(URL) : 跳向 => Login 页面
import React from 'react'
import { Redirect } from 'react-router-dom'

import { authenticate } from '../utils/LocalStore'

const authState = authenticate() // 是否有登录状态

// 测试
const PrivateRoute = ({ match }) => (
    <div>
        { console.log(match) }

        {
            authState ?
                (
                    <Redirect
                        to={{
                            pathname: '/home/index',
                            state: { from: match.params.id }
                        }}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: match.params.id }
                        }}
                    />
                )
        }
    </div>

)

const privateRoutes = [{
    path: '/',
    exact: true,
    component: PrivateRoute // 无其他信息; 不需要渲染组件
}]

export default privateRoutes
