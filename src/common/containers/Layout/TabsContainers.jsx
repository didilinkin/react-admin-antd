/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-06 02:17:06
 * @modify date 2017-09-22 06:26:26
 * @desc 自定义新增页签触发器(完整注释查看 commit: 4b24e5fd6a4ec91727d3043c4403919fdff94fd3)
*/
import React from 'react'
import cloneDeep from 'lodash/cloneDeep' // isArray
import { hasString } from '../../../utils'

import { Tabs, Row, Col, Menu, Dropdown, Icon, message } from 'antd' // Button
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

        this.setActivePane(activeObj) // 修改 redux activePane; 检查是否二次渲染

        this.props.tabsProps.history.push(activeObj.path) // 如果是详情, 只跳转; 内容无更新
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

    // 右侧下拉 功能按钮 - 按钮点击事件
    handleButtonClick = (e) => {
        message.info('关闭全部选项卡')
        console.log('click left button', e)
    }

    // 右侧下拉 功能按钮 - 菜单点击事件
    handleMenuClick = (e) => {
        message.info('关闭其他选项卡')
        console.log('click', e)
    }

    menu = (
        <Menu onClick={ this.handleMenuClick }>
            <Menu.Item key="1"> 关闭全部选项卡 </Menu.Item>
            <Menu.Item key="2"> 关闭其他选项卡 </Menu.Item>
        </Menu>
    )

    render () {
        return (
            <Row>
                <Col span={ 22 }>
                    <Tabs
                        hideAdd
                        type="editable-card"
                        onEdit={this.onEdit}
                        onChange={this.onChange}
                        activeKey={this.state.activePane.key}
                    >
                        {
                            this.state.panes.map((pane) => (
                                <TabPane
                                    closable={pane.closable}
                                    key={pane.key}
                                    tab={pane.title}
                                    path={pane.path}
                                />
                            ))
                        }
                    </Tabs>
                </Col>
                <Col
                    span={ 2 }
                    style={{
                        textAlign: 'center',
                        lineHeight: 2
                    }}
                >
                    <Dropdown
                        overlay={ this.menu }
                        trigger={['click']}
                    >
                        <a className="ant-dropdown-link" href="#">
                            关闭操作 <Icon type="down" />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        )
    }
}

export default TabsContainers
