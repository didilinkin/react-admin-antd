// 侧导航栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
    state = {
        collapsed: false
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
                    mode="inline"
                    defaultSelectedKeys={['1']}
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
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
