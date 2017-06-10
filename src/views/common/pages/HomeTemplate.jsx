// '物业管理系统' 内容 - 路由模版
import React from 'react'
import { Layout }   from 'antd'

// import HeaderCustom from '../layout/HeaderCustom'
// import SiderCustom  from '../layout/SiderCustom'

// const { Content, Footer } = Layout

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
                {/* 主页( 将在此保存结构: 头, 侧栏, 内容 ) */}
                <h2> 这是模板 </h2>

                {this.props.children}
            </Layout>
        )
    }
}

export default HomeTemplate
