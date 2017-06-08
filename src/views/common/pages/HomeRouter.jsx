// 首页
import React from 'react'
// 测试antd
import { Button }   from 'antd'

class HomeRouter extends React.Component {
    render () {
        return (
            <div style={{ height: '100%' }}>
                {/* 主页( 将在此保存结构: 头, 侧栏, 内容 ) */}
                <h1> 主页 </h1>
                <Button type="primary"> Button </Button>
            </div>
        )
    }
}

export default HomeRouter
