// 自定义新增页签触发器
import React from 'react'

import { isArray, isUndefined } from 'lodash'
import localStore from '../../../utils/LocalStore'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    constructor (props) {
        super(props)
        this.newTabIndex = 0
    }

    state = {
        activeKey: '',
        panes: []
    }

    select = (state) => {
        return state.router.location.pathname
    }

    // 将 Tabs 信息(数组) 存储到 LS
    setArrayTabs = (arrayTabs) => {
        localStore.set('arrayPreviousTabs', arrayTabs) // 存储信息
    }

    // 判断逻辑 / 存储逻辑
    handleChange = () => {
        let rootState = this.select(this.props.rootState) // 简短命名(返回值是经过筛选的 url值, 而不是rootState)
        let arrayTabs = localStore.get('arrayPreviousTabs') // 将本地LS的 Tabs数组获取出来

        // 判断: LS的arrayPreviousTabs是否是数组
        if (isArray(arrayTabs)) {
            // arrayTabs是 数组(存在信息) => 判断: LS的 Tabs数组信息是否存在 当前url
            if (
                isUndefined(arrayTabs.find((n) => n === rootState)
                )
            ) {
                // undefined => 无法找到这个字符串
                arrayTabs.push(rootState) // 存在数组中
                this.setArrayTabs(arrayTabs) // 保存到 LS 中

                // 此时 执行 actions事件, 将{ route, tabsProps } 拿出 => 将route, tabsProps 保存到 Redux
                // console.log(this.props)

                // 将{ route, tabsProps } 保存到一个对象中 => 执行 Redux actions事件 => 保存创建的对象
                let obj = {
                    route: this.props.route,
                    tabsProps: this.props.tabsProps
                }

                // console.log(obj)
                this.props.onAddPane(obj)
            } else {
                // 非 undefined => 能够找到 当前url字符串 => 无操作
                console.log('当前数组中 存在该url => 无操作')
                // console.dir(arrayTabs)
            }
        } else {
            // arrayTabs非 数组(无信息) => 存储信息
            let arr = [rootState] // 创建一个空数组, 存入当前地址信息
            this.setArrayTabs(arr)
        }
    }

    // render 渲染之前
    componentWillMount = () => {
        // console.log('渲染之前')
        // localStore.clear() // 清空本地状态 => 应该在全局第一次渲染的时候 执行清空. 此组件将重复多次 render => 在'关闭标签' 事件中, 删减LS数组
    }

    // render 渲染之后
    componentDidMount = () => {
        this.handleChange()
    }

    render () {
        const {
            route,
            tabsProps
            // render 内没有 以下 props 操作事件
            // ,
            // panesState, // Redux - panes state
            // onAddPane, // Redux - panes action - Add
            // onRemovePane // Redux - panes action - Remove
        } = this.props // route: 当前渲染组件信息; tabsProps: 当前路由信息

        let callback = (key) => {
            console.log(key)
        }

        // let testObj = {
        //     route: route,
        //     tabsPorps: tabsProps
        // }

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
