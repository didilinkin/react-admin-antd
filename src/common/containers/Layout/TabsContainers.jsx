// 自定义新增页签触发器
import React from 'react'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    constructor (props) {
        super(props)
        this.newTabIndex = 0

        const panes = [] // 多标签 数据

        this.state = {
            activeKey: panes[0],
            panes
        }
    }

    render () {
        const { route, tabsProps } = this.props // route: 当前渲染组件信息; tabsProps: 当前路由信息

        let callback = (key) => {
            console.log(key)
        }

        let testObj = {
            route: route,
            tabsPorps: tabsProps
        }

        return (
            <Tabs
                onChange={ callback }
                type="card"
            >
                {
                    console.dir(testObj)
                }
                <TabPane
                    tab={ route.title }
                    key={ route.path } // 无法获取 key
                    style={{ marginBottom: 0 }}
                >
                    <route.component { ...tabsProps } routes={ route.routes } />
                </TabPane>
            </Tabs>
        )
    }
}

export default TabsContainers
