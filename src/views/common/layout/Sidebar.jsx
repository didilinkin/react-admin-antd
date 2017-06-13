// 侧导航栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
    state = {
        collapsed: false,
        current: '1',       // 最近
        openKeys: []        // 打开的keys
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
                breakpoint="lg"
            >
                <div className="logo" />

                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"                           // 设置只有一个打开
                    openKeys={this.state.openKeys}          // 设置只有一个打开
                    selectedKeys={[this.state.current]}     // 设置只有一个打开
                    onOpenChange={this.onOpenChange}        // 设置只有一个打开
                    onClick={this.handleClick}              // 设置只有一个打开
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

                    {/* 维修 */}
                    <SubMenu
                        key="/upkeep"
                        title={
                            <span>
                                <Icon type="tool" />
                                <span className="nav-text">维修</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/upkeep/list">
                            <Link to="/upkeep/list">维修-表格</Link>
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
                        <Menu.Item key="/warehouse/inventorySummary">
                            <Link to="/warehouse/inventorySummary">库存汇总</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/intoWarehouse">
                            <Link to="/warehouse/intoWarehouse">入库管理</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/outWarehouse">
                            <Link to="/warehouse/outWarehouse">出库管理</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/receiveStatistics">
                            <Link to="/warehouse/receiveStatistics">领用统计</Link>
                        </Menu.Item>

                        <Menu.Item key="/warehouse/materialManagement">
                            <Link to="/warehouse/materialManagement">材料管理</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/*  */}
                </Menu>
                <style>
                    {`
                        #nprogress .spinner{
                            left: ${this.state.collapsed ? '70px' : '206px'};
                            right: 0 !important;
                        }
                    `}
                </style>
            </Sider>
        )
    }
}

export default Sidebar
