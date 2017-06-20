// '物业管理系统' 内容 - 路由模版
import React from 'react'
import { Layout } from 'antd'

import Sidebar          from '../layout/Sidebar'
import HeaderBar        from '../layout/HeaderBar'

import styled           from 'styled-components'
import { modularScale } from 'polished'

const { Content } = Layout

const ContentStyle = styled.div `
    padding: ${modularScale(1)};
    background: #FFF;
    min-height: 280px;
`

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
                    <Content>
                        <ContentStyle>
                            {this.props.children}
                        </ContentStyle>
                    </Content>

                    {/* 底部 */}
                </Layout>
            </Layout>
        )
    }
}

export default HomeTemplate
