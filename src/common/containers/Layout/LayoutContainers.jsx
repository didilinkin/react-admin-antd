// 布局
import React from 'react'
import { Route } from 'react-router-dom'

// import elf from '../../../elf'

import SiderContainers from './SiderContainers'
// import HeaderContainers from './HeaderContainers'
import TabsBox from './TabsBox'

// Antd 布局组件
// import { Layout } from 'antd'
// const { Header, Sider, Content, Footer } = Layout

// 负责 渲染传递进来的 compObj
const RouteWithSubRoutes = (route) => (
    <Route path={ route.path } render={ props => (
        // 把自路由向下传递来达到嵌套。
        <TabsBox
            route={ route }
            tabsProps={ props }
        />
    )}
    />
)

// 渲染内容
const MainContent = ({ route }) => (
    <div>
        {
            route.routes.map((route, i) => (
                <RouteWithSubRoutes key={ i } { ...route } />
            ))
        }
    </div>
)

class LayoutContainers extends React.Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render () {
        const { route } = this.props

        return (
            <div
                style={{
                    background: '#FFF',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {/* 侧导航栏 */}
                <div
                    style={{
                        flex: '0 0 240px'
                    }}
                >
                    <div className="logo" />
                    <SiderContainers />
                </div>

                {/* 内容 */}
                <div>
                    <h1> 右侧内容 </h1>
                    <MainContent route={ route } />
                </div>
            </div>
        )
    }
}

export default LayoutContainers
