/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-06 02:17:06
 * @modify date 2017-09-09 02:31:13
 * @desc 自定义新增页签触发器
*/
import React from 'react'
import cloneDeep from 'lodash/cloneDeep' // isArray
import { hasString } from '../../../utils'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    state = {
        activeKey: '/home/index', // 展示的标签 key; [string]
        panes: [{ // 展示的所有标签; [array]
            closable: false,
            key: '首页',
            path: '/home/index',
            title: '首页'
        }]
    }

    // render 渲染前
    componentWillMount = () => {
        this.handleChange()
    }

    // 处理变化; 根据url 判断显示内容;
    handleChange = () => {
        const arrPanes = this.state.panes // 保存 state中数组
        const strUrl = this.props.route.path // 保存 当前url
        const hasUrlIndex = hasString(arrPanes, 'path', strUrl) // 在 arrPanes数组中查找, 返回当前url的位置(如果无 => 0)
        const isHomeUrl = strUrl === '/home/index' // 判断 当前url是否是 '首页'

        if (!isHomeUrl) { // 判断 是否是首页; 如果是, 取反 => 返回 true
            if (hasUrlIndex < 1) { // 无 当前url
                let currentPane = this.setCloneObj()
                this.setPanes(currentPane.key, currentPane)
            } else { // 当前url 已打开过
                let currentKey // 当前 key

                arrPanes.forEach((pane) => { // 遍历 state中的 panes数组
                    if (pane.path === strUrl) {
                        currentKey = pane.key // 如果匹配 path, 将 此 pane.key 存入 currentKey
                    }
                })

                this.setActiveKey(currentKey)
            }
        }
    }

    // 深拷贝 对象; 配置一个当前状态的对象
    setCloneObj = () => {
        let cloneObj = cloneDeep({
            key: this.props.route.path,
            title: this.props.route.title,
            path: this.props.tabsProps.match.url
        })

        return cloneObj
    }

    // 设置 panes数组 => 更新state
    setPanes = (strKey, objPane) => {
        const allPanes = cloneDeep([ // 配置完整的 panes
            ...this.state.panes,
            objPane
        ])

        this.setState({
            activeKey: strKey,
            panes: allPanes
        })
    }

    // 设置 activeKey(显示标签的key)
    setActiveKey = (strKey) => {
        this.setState({
            activeKey: strKey
        })
    }

    shouldComponentUpdate = () => {
        return false
    }

    render () {
        const { route, tabsProps } = this.props

        // console.log(this.state)

        // debugger

        console.log('render次数')

        return (
            <Tabs
                hideAdd
                type="editable-card" // 页签的基本样式
            >
                {/* 内容部分 与 state.panes数组无关系 */}
                {
                    this.state.panes.map((pane) => (
                        <TabPane
                            closable={pane.closable}
                            key={pane.key} // this.state.activeKey // 与 store中的 panesState 绑定
                            tab={pane.title}
                            path={pane.path}
                        >
                            <route.component { ...tabsProps } routes={ route.routes } />
                            {
                                console.log(this.state)
                            }
                        </TabPane>
                    ))
                }
            </Tabs>
        )
    }
}

export default TabsContainers
