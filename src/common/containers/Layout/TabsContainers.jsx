// 自定义新增页签触发器
import React from 'react'

import { isArray, cloneDeep } from 'lodash'
import localStore from '../../../utils/LocalStore'
import { hasString } from '../../../utils'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            activeKey: '', // 默认值: panes[0].key
            panes: props.panesState.panes // 格式: [{ route, tabsProps, key }]
        }
    }

    // 切换面板的回调 => 切换 state.activeKey
    onChange = (activeKey) => {
        this.setState({ activeKey })
    }

    // 新增和删除页签的回调
    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }

    // 获取 rootState 中的 url信息
    select = (state) => {
        return state.router.location.pathname
    }

    // 将 Tabs 信息(数组) 存储到 LS的方法
    setArrayTabs = (arrayTabs) => {
        localStore.set('arrayPreviousTabs', arrayTabs)
    }

    // 将 Tabs Key(数值) 存储到 LS的方法
    setKeyNum = (key) => {
        localStore.set('numTabsKey', key)
    }

    // 判断 标签显示条件
    handleChange = () => {
        let currentUrl = this.select(this.props.rootState) // 当前的 url地址: 字符串
        let arrLocalTabs = localStore.get('arrayPreviousTabs') // 获取本地LS中的 Tabs数组

        if (isArray(arrLocalTabs)) { // 判断 LS中 arrayPreviousTabs是否是'Array'
            if (hasString(arrLocalTabs, currentUrl)) { // Array(存在信息) => 判断 arrayPreviousTabs信息中是否存在 当前url
                // 无法找到 该url => 保存 当前url到 LS
                this.setArrayTabs([
                    ...arrLocalTabs,
                    currentUrl
                ])
                // 设置 Key
                let currentKey = localStore.get('numTabsKey')
                this.setKeyNum(currentKey + 1)

                // 触发 Actions事件
                this.setPanes()
            } else {
                // 此 url 已存在
                console.log('当前数组中存在该 url') // 是否需要 setState, 待定; 不需要配置 key => key统一在 保存url 时执行;
            }
        } else { // 非 Array(无信息) => 保存 当前url
            this.setArrayTabs([currentUrl]) // 此时应该也触发一次 actions
            this.setKeyNum(0) // 初始化为 0
            this.setPanes()
        }
    }

    // 发起 Action / 配置 Key
    setPanes = () => {
        let previousKey = localStore.get('numTabsKey') // 获取 LS中的 key

        let actionsObj = cloneDeep({
            route: this.props.route,
            tabsProps: this.props.tabsProps,
            key: previousKey + 1
        })

        this.props.onAddPane(actionsObj) // 发起 Actions

        // console.log(actionsObj)
        console.dir(this.state)
    }

    // 删减 / 关闭 单个 Tabs标签 => 也应该修改 LS中的数组 & Redux 中的数据
    remove = (targetKey) => {
        console.log('关闭 Tabs')
    }

    // render 渲染之前
    componentWillMount = () => {
        this.handleChange()
    }

    // render 渲染之后
    componentDidMount = () => {
        // this.handleChange()
        console.log('Did, render之后')
        console.dir(this.props.rootState)
    }

    render () {
        return (
            <Tabs
                hideAdd
                onChange={ this.onChange } // 切换面板的回调
                activeKey={ this.state.activeKey } // 当前激活 tab 面板的 key
                type="editable-card" // 页签的基本样式
                onEdit={ this.onEdit } // 新增和删除页签的回调
            >
                {
                    this.state.panes.map((pane) =>(
                        <TabPane
                            tab={ pane.route.title }
                            key={ pane.key }
                        >
                            <pane.route.component { ...pane.tabsProps } routes={ pane.route.routes } />
                        </TabPane>
                    ))
                }
            </Tabs>
        )
    }
}

export default TabsContainers

// ToDo:
// 1. 考虑将 Tabs 标签, 只保留 Title, 点击事件触发 路由跳转. 不再储存内容对象
// 2. 当actions 触发之后, 依然无法获取 最新的 state. 需要再发起一次action改变 state后 才能获取到
