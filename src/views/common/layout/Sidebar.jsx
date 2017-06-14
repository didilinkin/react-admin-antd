// 侧导航栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',     // 切换模式
        current: '1',       // 最近
        openKeys: ''        // 打开的keys
    }

    // 记录路径
    // componentDidMount () {
    //     const _path = this.props.path
    //     this.setState({
    //         openKey: _path.substr(0, _path.lastIndexOf('/')),
    //         selectedKey: _path
    //     })
    // }

    // 记录状态( 切换导航栏模式 )
    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
        this.onCollapse(nextProps.collapsed)
    }

    // 当 collapsed状态改变, 执行此事件
    onCollapse = (collapsed) => {
        console.log(collapsed)
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        })
    }

    // 操作点击
    handleClick = (e) => {
        console.log('Clicked: ', e)
        this.setState({ current: e.key })
    }

    // 开启时 - 改变
    onOpenChange = (openKeys) => {
        const state = this.state
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        this.setState({ openKeys: nextOpenKeys })
    }

    // 获取父级key
    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2']
        }
        return map[key] || []
    }

    render () {
        return (
            <Sider
                trigger={ null }
                collapsible
                collapsed={this.props.collapsed}
                onCollapse={this.onCollapse}
                style={{overflowY: 'auto'}}
                breakpoint="lg"
            >
                <div className="logo" />

                <Menu
                    theme="dark"
                    mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                >
                    {/* 首页 */}
                    <Menu.Item key="/home/index">
                        <Link to="/home/index">
                            <Icon type="user" />
                            <span className="nav-text">首页</span>
                        </Link>
                    </Menu.Item>

                    {/* 测试 */}
                    <SubMenu
                        key="/test"
                        title={
                            <span>
                                <Icon type="schedule" />
                                <span className="nav-text">测试</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/test/table">
                            <Link to="/test/table">测试-异步表格</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* 客户管理 */}
                    <SubMenu
                        key="/upkeep"
                        title={
                            <span>
                                <Icon type="idcard" />
                                <span className="nav-text">客户管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/upkeep/repairList">
                            <Link to="/upkeep/repairList">客户报修</Link>
                        </Menu.Item>

                        <Menu.Item key="/upkeep/clientReview">
                            <Link to="/upkeep/clientReview">客户回访</Link>
                        </Menu.Item>

                        <Menu.Item key="/upkeep/upkeepList">
                            <Link to="/upkeep/upkeepList">维修费设置</Link>
                        </Menu.Item>

                        <Menu.Item key="/upkeep/rectification">
                            <Link to="/upkeep/rectification">整改通知</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* 仓库管理 */}
                    <SubMenu
                        key="/warehouse"
                        title={
                            <span>
                                <Icon type="database" />
                                <span className="nav-text">仓库管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/warehouse/inventoryManage">
                            <Link to="/warehouse/inventoryManage">库存管理</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/receiveStatistics">
                            <Link to="/warehouse/receiveStatistics">领用统计</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/materialManagement">
                            <Link to="/warehouse/materialManagement">材料管理</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* 设备维护 */}
                    <SubMenu
                        key="/deviceMaintain"
                        title={
                            <span>
                                <Icon type="tool" />
                                <span className="nav-text">设备维护</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/warehouse/account">
                            <Link to="/warehouse/account">设备台帐</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/maintenance">
                            <Link to="/warehouse/maintenance">设备维保</Link>
                        </Menu.Item>

                        <SubMenu key="/warehouse/inspection" title={
                                <span>
                                    <span className="nav-text">设备巡检</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/warehouse/inspection/electric">
                                <Link to="/warehouse/inspection/electric">电器系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/warehouse/inspection/elevator">
                                <Link to="/warehouse/inspection/elevator">电梯系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/warehouse/inspection/airConditioning">
                                <Link to="/warehouse/inspection/airConditioning">空调系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/warehouse/inspection/waterheating">
                                <Link to="/warehouse/inspection/waterheating">水暖系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/warehouse/inspection/firefighting">
                                <Link to="/warehouse/inspection/firefighting">消防系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/warehouse/inspection/elevatorRoom">
                                <Link to="/warehouse/inspection/elevatorRoom">电梯间系统</Link>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
