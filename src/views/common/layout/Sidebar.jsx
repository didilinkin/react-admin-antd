// 侧导航栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
    state = {
        mode: 'inline',
        titleStyle: {
            display: 'inline'
        },
        current: '1',
        openKeys: []
    }

    componentWillReceiveProps (nextProps) {
        this.onCollapse(nextProps.collapsed)
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
            titleStyle: collapsed ? { display: 'none' } : { display: 'inline' }
        })
    }

    handleClick = (e) => {
        console.log('Clicked: ', e)
        this.setState({ current: e.key })
    }

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

    getAncestorKeys = (key) => {
        const map = {
            deviceMaintain: ['/warehouse/inspection']
        }
        return map[key] || []
    }

    render () {
        return (
            <Sider
                trigger={ null }
                collapsible
                collapsed={this.props.collapsed}
                // onCollapse={this.onCollapse}
                // style={{overflowY: 'auto'}}
                // breakpoint="lg"
            >
                <div className="logo" />

                <Menu
                    theme="dark"
                    // defaultOpenKeys={['sub1']}                   // 初始展开的 SubMenu 菜单项 key 数组
                    mode={ this.state.mode }
                    onClick={ this.handleClick }
                    // onOpenChange= this.onOpenChange              // SubMenu 展开/关闭的回调
                    // selectedKeys={[this.state.current]}          // 当前选中的菜单项 key 数组
                    // openKeys={ this.state.openKeys }             // 当前展开的 SubMenu 菜单项 key 数组
                >
                    {/* 首页 */}
                    <Menu.Item key="home/index">
                        <Link to="/home/index">
                            <Icon type="user" />
                            <span className="nav-text" style={ this.state.titleStyle }>首页</span>
                        </Link>
                    </Menu.Item>

                    {/* 测试 */}
                    <SubMenu
                        key="test"
                        title={
                            <span>
                                <Icon type="schedule" />
                                <span className="nav-text" style={ this.state.titleStyle }>测试</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/test/table">
                            <Link to="/test/table">测试-异步表格</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* 客户管理 */}
                    <SubMenu
                        key="upkeep"
                        title={
                            <span>
                                <Icon type="idcard" />
                                <span className="nav-text" style={ this.state.titleStyle }>客户管理</span>
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
                        key="warehouse"
                        title={
                            <span>
                                <Icon type="database" />
                                <span className="nav-text" style={ this.state.titleStyle }>仓库管理</span>
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
                        key="deviceMaintain"
                        title={
                            <span>
                                <Icon type="tool" />
                                <span className="nav-text" style={ this.state.titleStyle }>设备维护</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/deviceMaintain/account">
                            <Link to="/deviceMaintain/account">设备台帐</Link>
                        </Menu.Item>

                        <SubMenu key="/deviceMaintain/deviceMaintenance" title={
                            <span>
                                <span className="nav-text">设备维保</span>
                            </span>
                        }
                        >
                            <Menu.Item key="/deviceMaintain/maintenance/inspectionPlan">
                                <Link to="/deviceMaintain/maintenance/inspectionPlan">巡检计划</Link>
                            </Menu.Item>

                            <Menu.Item key="/deviceMaintain/maintenance/maintenancePlan">
                                <Link to="/deviceMaintain/maintenance/maintenancePlan">保养记录</Link>
                            </Menu.Item>

                            <Menu.Item key="/deviceMaintain/maintenance/equipmentRepair">
                                <Link to="/deviceMaintain/maintenance/equipmentRepair">设备报修</Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="/warehouse/inspection" title={
                            <span>
                                <span className="nav-text">设备巡检</span>
                            </span>
                        }
                        >
                            <Menu.Item key="/deviceMaintain/inspection/electric">
                                <Link to="/deviceMaintain/inspection/electric">电器系统</Link>
                            </Menu.Item>

                            {/*
                                <Menu.Item key="/deviceMaintain/inspection/elevator">
                                    <Link to="/deviceMaintain/inspection/elevator">电梯系统</Link>
                                </Menu.Item>
                            */}
                            <SubMenu key="/deviceMaintain/inspection/elevator" title={
                                <span>
                                    <p classID="nav-text">电梯系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="/deviceMaintain/inspection/elevator/elevatorRoom">
                                    <Link to="/deviceMaintain/inspection/elevator/elevatorRoom">电梯机房</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/elevator/dailyInspection">
                                    <Link to="/deviceMaintain/inspection/elevator/dailyInspection">日常检查</Link>
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item key="/deviceMaintain/inspection/airConditioning">
                                <Link to="/deviceMaintain/inspection/airConditioning">空调系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/deviceMaintain/inspection/waterHeating">
                                <Link to="/deviceMaintain/inspection/waterHeating">水暖系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/deviceMaintain/inspection/firefighting">
                                <Link to="/deviceMaintain/inspection/firefighting">消防系统</Link>
                            </Menu.Item>

                            <Menu.Item key="/deviceMaintain/inspection/elevatorRoom">
                                <Link to="/deviceMaintain/inspection/elevatorRoom">电梯间系统</Link>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
                {/* 样式描述 */}
                <style>{`
                    .ant-menu-vertical >div >span >span.nav-text {
                        display: none;
                    }
                `}</style>
            </Sider>
        )
    }
}

export default Sidebar
