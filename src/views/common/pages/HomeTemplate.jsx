// '物业管理系统' 内容 - 路由模版
import React from 'react'
import { Layout, Menu, Icon }   from 'antd'
// import Sidebar      from '../layout/Sidebar'
// import HeaderCustom from '../layout/HeaderCustom'

const { Header, Content, Sider } = Layout

const SubMenu = Menu.SubMenu


class HomeTemplate extends React.Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render () {
        return (
            <Layout style={{ height: '100%' }}>
                {/* 侧导航栏 */}
                {/*
                    <Sidebar
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    />
                */}

                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.SubMenu key="1" title={
                                <span>
                                    <Icon type="user" />
                                    <span className="nav-text">首页</span>
                                </span>
                            }
                        />

                        <SubMenu key="2" title={
                                <span>
                                    <Icon type="video-camera" />
                                    <span className="nav-text">测试</span>
                                </span>
                            }
                        >
                            <Menu.Item key="21">异步表格</Menu.Item>
                        </SubMenu>

                        <SubMenu key="3" title={
                                <span>
                                    <Icon type="upload" />
                                    <span>维修</span>
                                </span>
                            }
                        >
                            <Menu.Item key="31">表格</Menu.Item>
                        </SubMenu>

                        <SubMenu key="4" title={
                                <span>
                                    <Icon type="mail" />
                                    <span>仓库管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="41">库存汇总</Menu.Item>
                            <Menu.Item key="42">入库管理</Menu.Item>
                            <Menu.Item key="43">出库管理</Menu.Item>
                            <Menu.Item key="44">领用统计</Menu.Item>
                            <Menu.Item key="44">材料管理</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>

                {/* 内容 */}
                <Layout>
                    {/* 顶部 */}
                    <Header style={{
                        background: '#fff',
                        padding: 0 }}
                    >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>

                    {/* 内容 */}
                    <Content style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280 }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default HomeTemplate
