// '物业管理系统' 内容 - 路由模版
import React from 'react'
import { Layout }   from 'antd'

import Sidebar      from '../layout/Sidebar'
import HeaderBar    from '../layout/HeaderBar'

const { Content } = Layout

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
            <Layout className="ant-layout-has-sider" style={{ height: '100%' }}>
                {/* 侧导航栏 */}
                <Sidebar collapsed={this.state.collapsed} />
                {/* 内容 */}
                <Layout>
                    <HeaderBar toggle={this.toggle} />
                    <Content style={{
                        padding: 24,
                        background: '#fff',
                        minHeight: 280 }}
                    >
                        {this.props.children}
                    </Content>

                    {/* 底部 */}
                </Layout>
            </Layout>
        )
    }
}

export default HomeTemplate
