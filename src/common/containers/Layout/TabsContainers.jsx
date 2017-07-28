// 自定义新增页签触发器
import React from 'react'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    state = {
        title: ''
    }

    render () {
        const { route, tabsProps } = this.props // route: 当前渲染组件信息; tabsProps: 当前路由信息

        let callback = (key) => {
            console.log(key)
        }

        return (
            <Tabs
                onChange={ callback }
                type="card"
            >
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
