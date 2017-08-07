// 自定义新增页签触发器
import React from 'react'
import { cloneDeep } from 'lodash' // isArray
import { hasString } from '../../../utils'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    state = {
        activeKey: '', // 默认值: panes[0].key
        panes: [] // 默认值: [{ route, tabsProps, key }]
    }

    // 切换面板的回调 => 切换 state.activeKey
    onChange = (activeKey) => {
        this.setActiveKey(`${activeKey}`) // 优先切换 标签, 然后走路由

        // console.dir(this.props.tabsProps.history)

        let paneUrl = this.props.panesState.panes[activeKey - 1].path
        this.props.tabsProps.history.push(paneUrl)
    }

    // 新增和删除页签的回调
    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }

    // 判断 标签显示条件
    handleChange = () => {
        const arrayPanes = this.props.panesState.panes // 获取 store当中的 panes数组
        const strUrl = this.props.route.path // 根据当前路由状态 获取 url字符串
        const hasUrl = hasString(arrayPanes, 'path', strUrl)

        // 判断数组中是否有此 字符串
        if (hasUrl < 0) {
            console.log('无 当前url')

            // setState 配置
            let currentPanes = this.setCloneObj() // 单个
            this.setActions(`${arrayPanes.length + 1}`, currentPanes)
        } else {
            console.log('有 当前url')
            this.setActiveKey(`${hasUrl + 1}`) // 只需要修改 state.activeKey(字符串)
        }
    }

    // 配置 actions / 发起 actions
    setActions = (strKey, arrPanes) => {
        const previousState = cloneDeep([...this.props.panesState.panes, arrPanes]) // 深拷贝 => 将数组带入 addObj

        this.props.onAddPane({
            activeKey: strKey,
            panes: previousState
        })
    }

    // 配置 深拷贝的 cloneObj
    setCloneObj = () => {
        // 深拷贝 route 与 tabsPropss 组成的对象
        let cloneObj = cloneDeep({
            key: `${this.props.panesState.panes.length + 1}`,
            title: this.props.route.title,
            path: this.props.route.path
        })

        return cloneObj
    }

    // 配置 activeKey(设置显示 当前active 标签)
    setActiveKey = (strKey) => {
        this.props.onActivePane({
            activeKey: strKey
        })
    }

    // 删减 / 关闭 单个 Tabs标签 => 也应该修改 LS中的数组 & Redux 中的数据
    remove = (targetKey) => { // targetKey === key
        console.log('targetKey:' + targetKey)

        let activeKey = this.state.activeKey

        let lastIndex

        // 配置 lastIndex
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                // console.log(pane)
                lastIndex = i - 1
            }
        })

        // 返回一个符合条件的 数组
        const currentPanes = this.state.panes.filter(pane => pane.key !== targetKey) // targetKey: 要关闭的 key

        if (lastIndex >= 0 && activeKey === targetKey) { // 如果 lastIndex 大于等于 0, 并且 当前的 key = 要关闭的 key
            activeKey = currentPanes[lastIndex].key // 当前的 activeKey = 数组中 lastIndex下标的 key
        }

        // 设置 reducers
        this.props.onAddPane({
            activeKey: cloneDeep(activeKey),
            panes: cloneDeep(currentPanes)
        })

        // 更新一下路由
        let lastUrl = this.state.panes[lastIndex].path
        this.props.tabsProps.history.push(lastUrl)
    }

    // render 渲染之前
    componentWillMount = () => {
        this.handleChange()
    }

    // 当 props改变时 触发 => 调用 更改 setState的方法
    componentWillReceiveProps = (nextProps) => {
        console.log('store 发生改变')
        let currentState = cloneDeep(nextProps.panesState)
        this.setState(currentState)
    }

    render () {
        const { route, tabsProps } = this.props
        return (
            <Tabs
                hideAdd
                onChange={ this.onChange } // 切换面板的回调
                activeKey={ this.state.activeKey } // 当前激活 tab 面板的 key
                type="editable-card" // 页签的基本样式
                onEdit={ this.onEdit } // 新增和删除页签的回调
            >
                {/* 内容部分 与 state.panes数组无关系 */}
                {
                    this.state.panes.map((pane) => (
                        <TabPane
                            key={ pane.key } // this.state.activeKey // 与 store中的 panesState 绑定
                            tab={ pane.title }
                            path={ pane.path }
                        >
                            <route.component { ...tabsProps } routes={route.routes} />
                        </TabPane>
                    ))
                }
            </Tabs>
        )
    }
}

export default TabsContainers
