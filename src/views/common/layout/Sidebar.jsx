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

                        <Menu.Item key="/test/echarts">
                            <Link to="/test/echarts">测试 echarts组建(简单例子)</Link>
                        </Menu.Item>

                        <Menu.Item key="/test/recharts">
                            <Link to="/test/recharts">Recharts组件(饼状图)</Link>
                        </Menu.Item>

                        <Menu.Item key="/test/simpleBarChart">
                            <Link to="/test/simpleBarChart">测试 Recharts组件(柱状图)</Link>
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
                        <SubMenu key="/upkeep/contractManagement" title={
                            <span>
                                <span className="nav-text">合同管理</span>
                            </span>
                        }
                        >
                            <Menu.Item key="/upkeep/contractManagement/leaseContract">
                                <Link to="/upkeep/contractManagement/leaseContract">租赁合同</Link>
                            </Menu.Item>

                            <Menu.Item key="/upkeep/contractManagement/propertyContract">
                                <Link to="/upkeep/contractManagement/propertyContract">物业合同</Link>
                            </Menu.Item>
                        </SubMenu>

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

                        <Menu.Item key="/deviceMaintain/computerRoom">
                            <Link to="/deviceMaintain/computerRoom">机房编码</Link>
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
                            <SubMenu key="/deviceMaintain/inspection/electric" title={
                                <span>
                                    <p classID="nav-text">电器系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="/deviceMaintain/inspection/electric/distributionRoom">
                                    <Link to="/deviceMaintain/inspection/electric/distributionRoom">配电房巡查记录</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/electric/weakRoom">
                                    <Link to="/deviceMaintain/inspection/electric/weakRoom">弱电间巡查记录</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/electric/generatorLog">
                                    <Link to="/deviceMaintain/inspection/electric/generatorLog">发电机运行记录</Link>
                                </Menu.Item>
                            </SubMenu>

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

                            <SubMenu key="/deviceMaintain/inspection/airConditioning" title={
                                <span>
                                    <p classID="nav-text">空调系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="/deviceMaintain/inspection/airConditioning/airConditioningRoom">
                                    <Link to="/deviceMaintain/inspection/airConditioning/airConditioningRoom">空调机房</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/airConditioning/newWindRoom">
                                    <Link to="/deviceMaintain/inspection/airConditioning/newWindRoom">新风机房</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/airConditioning/centralAirConditioning">
                                    <Link to="/deviceMaintain/inspection/airConditioning/centralAirConditioning">中央空调</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="/deviceMaintain/inspection/waterHeating" title={
                                <span>
                                    <p classID="nav-text">水暖系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="/deviceMaintain/inspection/waterHeating/heatExchange">
                                    <Link to="/deviceMaintain/inspection/waterHeating/heatExchange">热交换设备巡检</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/waterHeating/firePump">
                                    <Link to="/deviceMaintain/inspection/waterHeating/firePump">消防水泵房巡检</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/waterHeating/plumbingPipeline">
                                    <Link to="/deviceMaintain/inspection/waterHeating/plumbingPipeline">水暖管道</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/waterHeating/plumbingInfrastructure">
                                    <Link to="/deviceMaintain/inspection/waterHeating/plumbingInfrastructure">水暖基建</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/waterHeating/solarEnergy">
                                    <Link to="/deviceMaintain/inspection/waterHeating/solarEnergy">太阳能</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/waterHeating/heatTransferStation">
                                    <Link to="/deviceMaintain/inspection/waterHeating/heatTransferStation">换热站巡检</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="/deviceMaintain/inspection/firefighting" title={
                                <span>
                                    <p classID="nav-text">消防系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="/deviceMaintain/inspection/firefighting/waterTank">
                                    <Link to="/deviceMaintain/inspection/firefighting/waterTank">高位消防水箱</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/firefighting/gasFireExtinguishing">
                                    <Link to="/deviceMaintain/inspection/firefighting/gasFireExtinguishing">气体灭火</Link>
                                </Menu.Item>

                                <Menu.Item key="/deviceMaintain/inspection/firefighting/maintenanceRecords">
                                    <Link to="/deviceMaintain/inspection/firefighting/maintenanceRecords">消防维保记录</Link>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </SubMenu>

                    {/* 收费管理 */}
                    <SubMenu
                        key="charge"
                        title={
                            <span>
                                <Icon type="database" />
                                <span className="nav-text" style={ this.state.titleStyle }>收费管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/charge/receivableRent">
                            <Link to="/charge/receivableRent">应收租金</Link>
                        </Menu.Item>

                        <Menu.Item key="/charge/propertyManagement">
                            <Link to="/charge/propertyManagement">物业费管理</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* 财务管理 */}
                    <SubMenu
                        key="financial"
                        title={
                            <span>
                                <Icon type="database" />
                                <span className="nav-text" style={ this.state.titleStyle }>财务管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/financial/rentReview">
                            <Link to="/financial/rentReview">租金审核</Link>
                        </Menu.Item>
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
