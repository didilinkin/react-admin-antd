/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-06 02:17:06
 * @modify date 2017-09-12 04:59:31
 * @desc 自定义新增页签触发器
*/
import React from 'react'
import cloneDeep from 'lodash/cloneDeep' // isArray
import { hasString } from '../../../utils'

import { Tabs } from 'antd' // Button
const TabPane = Tabs.TabPane

class TabsContainers extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activePane: props.panesState.activePane,
            panes: props.panesState.panes
        }
    }

    // render 渲染前
    componentWillMount = () => {
        this.handleChange()
    }

    // 处理变化; 根据url 判断显示内容;
    handleChange = () => {
        const arrPanes = this.props.panesState.panes // 保存 Redux.paneState 中数组
        const strUrl = this.props.route.path // 保存 当前url
        const hasUrlIndex = hasString(arrPanes, 'path', strUrl) // 在 arrPanes数组中查找, 返回当前url的位置(如果无 => 0)
        const isHomeUrl = strUrl === '/home/index' // 判断 当前url是否是 '首页'

        if (!isHomeUrl) { // 判断 是否是首页; 如果是, 取反 => 返回 true
            if (hasUrlIndex < 1) { // 无 当前url
                let currentPane = this.setCloneObj()

                this.setPanes(currentPane)
            } else { // 当前url 已打开过
                let currentPane // 当前 pane标签对象

                arrPanes.forEach((pane) => { // 遍历 state中的 panes数组
                    if (pane.path === strUrl) {
                        currentPane = pane // 如果匹配 path, 将 此 pane 存入 currentPane 对象中
                    }
                })

                this.setActivePane(currentPane)
            }
        } else {
            if (this.state.panes.length > 1) { // 标签不止一个
                this.setActivePane(this.setCloneObj())
            }
        }
    }

    // 切换面板的回调 => 切换 state.activeKey
    onChange = (activeKey) => {
        let activeObj
        this.state.panes.forEach((pane) => {
            if (pane.key === activeKey) {
                activeObj = pane
            }
        })

        this.props.tabsProps.history.push(activeObj.path) // 切换标签时, 不处理redux, 由 willMount来触发
    }

    // 新增和删除页签的回调
    onEdit = (targetKey, action) => {
        this[action](targetKey) // targetKey[string]: 删除的key; action[string]: 操作类型(只考虑remove 类型)
    }

    // 关闭 单个 Tab标签 => 修改 Redux 中数据
    remove = (targetKey) => {
        const currentActiveKey = this.state.activePane.key // 当前的 activeKey
        const currentPanes = this.state.panes.fillter(pane => pane.key !== targetKey) // panes中 key值非 targetKey的 集合数组

        let currentIndex // 当前位置

        if (targetKey === currentActiveKey) { // 要 '关闭'的标签是 activeKey
            this.state.panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    currentIndex = i
                    console.log(i)
                }
            })
        } else { // 要 '关闭'的标签 不是 activeKey

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

    // 设置 panes数组 => 更新 redux - panes数组
    setPanes = (objPane) => {
        const allPanes = cloneDeep([ // 配置完整的 panes
            ...this.props.panesState.panes,
            objPane
        ])

        // 使用actions 修改 redux
        this.props.onAddPane({ // 使用 props传入的 actions方法 => 将url状态保存
            activePane: objPane,
            panes: allPanes
        })
    }

    // 设置 activePane(显示标签的对象)
    setActivePane = (objActive) => {
        this.props.onActivePane({ objActive }) // 发起 actions, 修改 redux
    }

    // 当 props(redux)改变时, 触发 nextPorps
    componentWillReceiveProps = (nextProps) => {
        // 改变 this.state
        this.setState({
            activePane: nextProps.panesState.activePane,
            panes: nextProps.panesState.panes
        })
    }

    render () {
        return (
            <div>
                <Tabs
                    hideAdd
                    activeKey={ this.state.activePane.key } // 当前激活 tab 面板的 key
                    onChange={ this.onChange } // 切换面板的回调
                    onEdit={ this.onEdit } // 新增和删除页签的回调
                    type="editable-card" // 页签的基本样式
                >
                    {
                        this.state.panes.map((pane) => (
                            <TabPane
                                closable={ pane.closable }
                                key={ pane.key }
                                tab={ pane.title }
                                path={ pane.path }
                            />
                        ))
                    }
                </Tabs>
            </div>
        )
    }
}

export default TabsContainers
