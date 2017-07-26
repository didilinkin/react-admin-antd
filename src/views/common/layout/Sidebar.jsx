// 侧导航栏
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
    state = {
        mode: 'inline',
        collapsed: false, // 缩起内嵌菜单(使用)
        titleStyle: {
            display: 'inline'
        },
        current: '1', // 只展开父级:  当前选中的菜单项 key 数组
        openKeys: [] // 只展开父级: 当前展开的 SubMenu 菜单项 key 数组
    }

    // 判断是否 有折叠; 返回值(Boolean)
    hasChildRoute = (childItem) => childItem.hasOwnProperty('childRoute')

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

    // 只展开父级: 点击事件
    handleClick = (e) => {
        this.setState({ current: e.key })
    }

    // 只展开父级:
    onOpenChange = (openKeys) => {
        const state = this.state
        // 最后打开的 Key
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))

        // 最后关闭的 key
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

        // 新打开的 key
        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }

        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        this.setState({ openKeys: nextOpenKeys })
    }

    // 只展开父级: 获取祖先级 Key
    getAncestorKeys = (key) => {
        // let map = {} // 创建 map

        // // (调用者: 下面 迭代) 判断 item 内是否 需要 迭代; 如果不需要 => 保存对象
        // let setItemKey = (item) => {
        //     let itemArray = item.childRoute
        //     if (this.hasChildRoute(item)) {
        //         for (let item of itemArray) {
        //             let obj = item.key // 需要先保存一下 它的 key 与 ancestor
        //             map[obj] = item.ancestor

        //             setItemKey(item)
        //         }
        //     } else {
        //         let obj = item.key // key 从 字符串转换为 对象
        //         map[obj] = item.ancestor
        //     }
        // }

        // // 迭代 globalDir 中的 module 配置
        // for (let moduleItem of globalDir) {
        //     setItemKey(moduleItem)
        // }

        const map = {
            // sub3: ['sub2']
            // 静态配置(简略不需要的, 做最基本展示)
            // 客户管理:
            repairList: ['upkeep'],
            clientReview: ['upkeep'],
            upkeepList: ['upkeep'],
            rectification: ['upkeep'],
            // 仓库管理:
            receiveStatistics: ['warehouse'],
            materialManagement: ['warehouse'],
            inventoryManage: ['warehouse'],
            // 设备管理
            account: ['deviceMaintain'],
            computerRoom: ['deviceMaintain'],
            deviceMaintenance: ['deviceMaintain'],
            inspectionPlan: ['deviceMaintain', 'deviceMaintenance'],
            maintenancePlan: ['deviceMaintain', 'deviceMaintenance'],
            equipmentRepair: ['deviceMaintain', 'deviceMaintenance'],
            // 设备管理 - 设备巡检
            inspection: ['deviceMaintain'],
            electric: ['deviceMaintain', 'inspection'],
            distributionRoom: ['deviceMaintain', 'electric'],
            weakRoom: ['deviceMaintain', 'electric'],
            generatorLog: ['deviceMaintain', 'electric'],
            // 设备管理 - 设备巡检 - 电梯系统
            elevator: ['deviceMaintain', 'inspection'],
            elevatorRoom: ['deviceMaintain', 'inspection', 'elevator'],
            dailyInspection: ['deviceMaintain', 'inspection', 'elevator'],
            // 设备管理 - 设备巡检 - 空调系统
            airConditioning: ['deviceMaintain', 'inspection'],
            airConditioningRoom: ['deviceMaintain', 'inspection', 'airConditioning'],
            newWindRoom: ['deviceMaintain', 'inspection', 'airConditioning'],
            centralAirConditioning: ['deviceMaintain', 'inspection', 'airConditioning'],
            // 设备管理 - 设备巡检 - 水暖系统
            waterHeating: ['deviceMaintain', 'inspection'],
            heatExchange: ['deviceMaintain', 'inspection', 'waterHeating'],
            firePump: ['deviceMaintain', 'inspection', 'waterHeating'],
            plumbingPipeline: ['deviceMaintain', 'inspection', 'waterHeating'],
            plumbingInfrastructure: ['deviceMaintain', 'inspection', 'waterHeating'],
            solarEnergy: ['deviceMaintain', 'inspection', 'waterHeating'],
            heatTransferStation: ['deviceMaintain', 'inspection', 'waterHeating'],
            // 设备管理 - 设备巡检 - 消防系统
            firefighting: ['deviceMaintain', 'inspection'],
            waterTank: ['deviceMaintain', 'inspection', 'firefighting'],
            gasFireExtinguishing: ['deviceMaintain', 'inspection', 'firefighting'],
            maintenanceRecords: ['deviceMaintain', 'inspection', 'firefighting']
        }

        return map[key] || []
    }

    render () {
        return (
            <Sider
                trigger={ null }
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" />

                <Menu
                    theme="dark"
                    // defaultOpenKeys={['sub1']}                   // 初始展开的 SubMenu 菜单项 key 数组
                    mode={ this.state.mode }
                    // 只展开父级: 新加
                    openKeys={ this.state.openKeys } // 当前展开的 SubMenu 菜单项 key 数组
                    selectedKeys={ [this.state.current] } // 当前选中的菜单项 key 数组
                    onOpenChange={ this.onOpenChange } // SubMenu 展开/关闭的回调
                    onClick={ this.handleClick } // 点击事件
                >
                    {/* 首页 */}
                    <Menu.Item key="home/index">
                        <Link to="/home/index">
                            <Icon type="user" />
                            <span className="nav-text" style={ this.state.titleStyle }>首页</span>
                        </Link>
                    </Menu.Item>

                    {/* 测试 */}
                    {/*
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
                    */}

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
                        {/*
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
                        */}

                        <Menu.Item key="repairList">
                            <Link to="/upkeep/repairList">客户报修</Link>
                        </Menu.Item>

                        <Menu.Item key="clientReview">
                            <Link to="/upkeep/clientReview">客户回访</Link>
                        </Menu.Item>

                        <Menu.Item key="upkeepList">
                            <Link to="/upkeep/upkeepList">维修费设置</Link>
                        </Menu.Item>

                        <Menu.Item key="rectification">
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
                        <Menu.Item key="inventoryManage">
                            <Link to="/warehouse/inventoryManage">库存管理</Link>
                        </Menu.Item>

                        <Menu.Item key="receiveStatistics">
                            <Link to="/warehouse/receiveStatistics">领用统计</Link>
                        </Menu.Item>

                        <Menu.Item key="materialManagement">
                            <Link to="/warehouse/materialManagement">材料管理</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/* 设备维护 */}
                    <SubMenu
                        key="deviceMaintain"
                        title={
                            <span>
                                <Icon type="tool" />
                                <span className="nav-text" style={ this.state.titleStyle }>设备管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="account">
                            <Link to="/deviceMaintain/account">设备台帐</Link>
                        </Menu.Item>

                        <Menu.Item key="computerRoom">
                            <Link to="/deviceMaintain/computerRoom">机房编码</Link>
                        </Menu.Item>

                        <SubMenu key="deviceMaintenance" title={
                            <span>
                                <span className="nav-text">设备维保</span>
                            </span>
                        }
                        >
                            <Menu.Item key="inspectionPlan">
                                <Link to="/deviceMaintain/maintenance/inspectionPlan">巡检计划</Link>
                            </Menu.Item>

                            <Menu.Item key="maintenancePlan">
                                <Link to="/deviceMaintain/maintenance/maintenancePlan">保养记录</Link>
                            </Menu.Item>

                            <Menu.Item key="equipmentRepair">
                                <Link to="/deviceMaintain/maintenance/equipmentRepair">设备报修</Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="inspection" title={
                            <span>
                                <span className="nav-text">设备巡检</span>
                            </span>
                        }
                        >
                            <SubMenu key="electric" title={
                                <span>
                                    <p classID="nav-text">电器系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="distributionRoom">
                                    <Link to="/deviceMaintain/inspection/electric/distributionRoom">配电房巡查记录</Link>
                                </Menu.Item>

                                <Menu.Item key="weakRoom">
                                    <Link to="/deviceMaintain/inspection/electric/weakRoom">弱电间巡查记录</Link>
                                </Menu.Item>

                                <Menu.Item key="generatorLog">
                                    <Link to="/deviceMaintain/inspection/electric/generatorLog">发电机运行记录</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="elevator" title={
                                <span>
                                    <p classID="nav-text">电梯系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="elevatorRoom">
                                    <Link to="/deviceMaintain/inspection/elevator/elevatorRoom">电梯机房</Link>
                                </Menu.Item>

                                <Menu.Item key="dailyInspection">
                                    <Link to="/deviceMaintain/inspection/elevator/dailyInspection">日常检查</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="airConditioning" title={
                                <span>
                                    <p classID="nav-text">空调系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="airConditioningRoom">
                                    <Link to="/deviceMaintain/inspection/airConditioning/airConditioningRoom">空调机房</Link>
                                </Menu.Item>

                                <Menu.Item key="newWindRoom">
                                    <Link to="/deviceMaintain/inspection/airConditioning/newWindRoom">新风机房</Link>
                                </Menu.Item>

                                <Menu.Item key="centralAirConditioning">
                                    <Link to="/deviceMaintain/inspection/airConditioning/centralAirConditioning">中央空调</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="waterHeating" title={
                                <span>
                                    <p classID="nav-text">水暖系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="heatExchange">
                                    <Link to="/deviceMaintain/inspection/waterHeating/heatExchange">热交换设备巡检</Link>
                                </Menu.Item>

                                <Menu.Item key="firePump">
                                    <Link to="/deviceMaintain/inspection/waterHeating/firePump">消防水泵房巡检</Link>
                                </Menu.Item>

                                <Menu.Item key="plumbingPipeline">
                                    <Link to="/deviceMaintain/inspection/waterHeating/plumbingPipeline">水暖管道</Link>
                                </Menu.Item>

                                <Menu.Item key="plumbingInfrastructure">
                                    <Link to="/deviceMaintain/inspection/waterHeating/plumbingInfrastructure">水暖基建</Link>
                                </Menu.Item>

                                <Menu.Item key="solarEnergy">
                                    <Link to="/deviceMaintain/inspection/waterHeating/solarEnergy">太阳能</Link>
                                </Menu.Item>

                                <Menu.Item key="heatTransferStation">
                                    <Link to="/deviceMaintain/inspection/waterHeating/heatTransferStation">换热站巡检</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="firefighting" title={
                                <span>
                                    <p classID="nav-text">消防系统</p>
                                </span>
                            }
                            >
                                <Menu.Item key="waterTank">
                                    <Link to="/deviceMaintain/inspection/firefighting/waterTank">高位消防水箱</Link>
                                </Menu.Item>

                                <Menu.Item key="gasFireExtinguishing">
                                    <Link to="/deviceMaintain/inspection/firefighting/gasFireExtinguishing">气体灭火</Link>
                                </Menu.Item>

                                <Menu.Item key="maintenanceRecords">
                                    <Link to="/deviceMaintain/inspection/firefighting/maintenanceRecords">消防维保记录</Link>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </SubMenu>

                    {/* 收费管理 */}
                    {/*
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
                    */}

                    {/* 财务管理 */}
                    {/*
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
                            <Menu.Item key="/financial/propertyCostsReview">
                                <Link to="/financial/propertyCostsReview">物业费审核</Link>
                            </Menu.Item>
                        </SubMenu>
                    */}
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
