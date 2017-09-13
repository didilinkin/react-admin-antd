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
        const strUrl = this.props.rootState.router.location.pathname // 保存 当前url
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
        // 逻辑描述:
        // 1. @parms: 要删除的 标签 key
        // 2. 通过筛选 => 获取到 key值不等于 targetKey 的数组
        // 3. 判断 要删除的 标签是否是当前展示的 activePane
        //      如果 是当前展示的 标签 => 获取到 当前的 index位置, 将它在数组中的前一个对象获取到, 然后 发起 action( @parms: 前一个对象, @parms: 筛选后的数组 ); 最后跳转 url
        //      如果 不是当前展示的 标签 => 直接发起 actions( @parms: 当前 state中的 activePane 对象, @parms: 筛选后的数组 ); 不需要跳转 url

        const currentActiveKey = this.state.activePane.key // 当前的 activeKey
        const currentPanes = this.state.panes.filter(pane => pane.key !== targetKey) // panes中 key值非 targetKey的 集合数组

        let currentIndex // 当前位置
        let currentPane // 当前的位置对象

        if (targetKey === currentActiveKey) { // 要 '关闭'的标签是 activeKey
            this.state.panes.forEach((pane, i) => { // 使用 pane, 获取i; 0 是数组第一个, 1 是数组第二个
                if (pane.key === targetKey) {
                    currentIndex = i
                    currentPane = currentPanes[currentIndex - 1] // 前一个对象

                    this.props.onAddPane({ // 发起 actions, 改变 redux 为最新的 activePane 与 panes
                        activePane: cloneDeep(currentPane),
                        panes: cloneDeep(currentPanes)
                    })

                    this.props.tabsProps.history.push(currentPane.path) // 跳转向 上一个对象的 path
                }
            })
        } else { // 要 '关闭'的标签 不是 activeKey; 只需修改 panes; activePane 对象不变; 不需 跳转 url
            this.props.onAddPane({
                activePane: cloneDeep(this.state.activePane),
                panes: cloneDeep(currentPanes)
            })
        }
    }

    // 深拷贝 对象; 配置一个当前状态的对象
    setCloneObj = () => {
        console.dir(this.props)

        let cloneObj = cloneDeep({
            key: this.props.rootState.router.location.pathname, // this.props.route.path 在 详情 url时, 获取不到 :id; 改为location.pathname
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
                    type="editable-card" // 页签的基本样式
                    onEdit={ this.onEdit } // 新增和删除页签的回调
                    onChange={ this.onChange } // 切换面板的回调
                    activeKey={ this.state.activePane.key } // 当前激活 tab 面板的 key
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
