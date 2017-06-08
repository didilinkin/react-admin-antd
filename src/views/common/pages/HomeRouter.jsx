// 主页模版
import React from 'react'
// 测试antd
import { Button }   from 'antd'
// import 'antd/dist/antd.css'  // 可用; 但严重不推荐( 大大增加代码体积 )

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
