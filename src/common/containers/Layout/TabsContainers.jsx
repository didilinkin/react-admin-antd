// 自定义新增页签触发器
import React from 'react'
import { Route } from 'react-router-dom'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

// 负责 渲染传递进来的 compObj
const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        // <route.component { ...props } routes={ route.routes }>
        //     {
        //         console.log('1')
        //     }
        // </route.component>
        <div>
            <h1> { route.title } </h1>

            <route.component { ...props } routes={ route.routes }>
                {
                    // console.log(route)
                    console.log(props)
                }
            </route.component>
        </div>
    )}
    />
)


// 渲染内容
const MainContent = ({ route }) => (
    <div>
        {/* Main 内容 */}
        {
            route.routes.map((route, i) => (
                <RouteWithSubRoutes key={ i } { ...route } />
            ))
        }
    </div>
)

class TabsContainers extends React.Component {
    state = {
        title: ''
    }

    render () {
        const { route } = this.props

        let callback = (key) => {
            console.log(key)
        }

        return (
            <div>
                <Tabs onChange={ callback } type="card">
                    <TabPane tab="Tab 1" key="1">
                        <MainContent route={ route } />
                    </TabPane>

                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>


            </div>
        )
    }
}

export default TabsContainers
