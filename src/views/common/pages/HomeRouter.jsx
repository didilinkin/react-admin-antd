// '物业管理系统' 内容 - 路由模版
import React from 'react'

import { Route } from 'react-router-dom'

// 测试antd
import { Button }   from 'antd'

class HomeRouter extends React.Component {
    render () {
        return (
            <div style={{ height: '100%' }}>
                {/* 主页( 将在此保存结构: 头, 侧栏, 内容 ) */}
                <h1> 主页 </h1>
                <Button type="primary"> Button </Button>

                // 路由内容
                {
                    routes.map((route, index) => (
                            // 像上面这样在一个给定的路径下渲染多个 <Route> ，而且每个
                            // <Route> 的 component 属性都不相同。
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        )
                    )
                }
            </div>
        )
    }
}

export default HomeRouter
