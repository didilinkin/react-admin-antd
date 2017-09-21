/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-06 02:17:06
 * @modify date 2017-09-13 04:36:32
 * @desc 自定义新增页签触发器(完整注释查看 commit: 4b24e5fd6a4ec91727d3043c4403919fdff94fd3)
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

    componentWillMount = () => {
        this.handleChange()
    }

    handleChange = () => {
        // console.log('检查当前url')
        // console.dir(this)
        const arrPanes = this.props.panesState.panes
        const strUrl = this.props.rootState.router.location.pathname
        const hasUrlIndex = hasString(arrPanes, 'path', strUrl)
        const isHomeUrl = strUrl === '/home/index'

        if (!isHomeUrl) {
            if (hasUrlIndex < 1) {
                let currentPane = this.setCloneObj()

                this.setPanes(currentPane)
            } else {
                let currentPane

                arrPanes.forEach((pane) => {
                    if (pane.path === strUrl) {
                        currentPane = pane
                    }
                })

                this.setActivePane(currentPane)
            }
        } else {
            if (this.state.panes.length > 1) {
                this.setActivePane(this.setCloneObj())
            }
        }
    }

    onChange = (activeKey) => {
        let activeObj
        this.state.panes.forEach((pane) => {
            if (pane.key === activeKey) {
                activeObj = pane
            }
        })

        // console.log('activeObj')
        // console.dir(activeObj)

        this.props.tabsProps.history.push(activeObj.path) // 如果是详情, 只跳转; 内容无更新

        this.setActivePane(activeObj)
        // location.href = activeObj.path // 会导致丢失 redux数据
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }

    remove = (targetKey) => {
        const currentActiveKey = this.state.activePane.key
        const currentPanes = this.state.panes.filter(pane => pane.key !== targetKey)

        let currentIndex
        let currentPane

        if (targetKey === currentActiveKey) {
            this.state.panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    currentIndex = i
                    currentPane = currentPanes[currentIndex - 1]

                    this.props.onAddPane({
                        activePane: cloneDeep(currentPane),
                        panes: cloneDeep(currentPanes)
                    })

                    this.props.tabsProps.history.push(currentPane.path)
                }
            })
        } else {
            this.props.onAddPane({
                activePane: cloneDeep(this.state.activePane),
                panes: cloneDeep(currentPanes)
            })
        }
    }

    setCloneObj = () => {
        let cloneObj = cloneDeep({
            key: this.props.rootState.router.location.pathname,
            title: this.props.route.title,
            path: this.props.tabsProps.match.url
        })

        return cloneObj
    }

    setPanes = (objPane) => {
        const allPanes = cloneDeep([
            ...this.props.panesState.panes,
            objPane
        ])

        this.props.onAddPane({
            activePane: objPane,
            panes: allPanes
        })
    }

    setActivePane = (objActive) => {
        this.props.onActivePane({ objActive })
    }

    componentWillReceiveProps = (nextProps) => {
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
                    type="editable-card"
                    onEdit={ this.onEdit }
                    onChange={ this.onChange }
                    activeKey={ this.state.activePane.key }
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
