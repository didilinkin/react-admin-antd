// 用于测试 react-router-redux的 跳转页面
import React from 'react'

const localStore = require('../../utils/LocalStore').default

class TestRoute extends React.Component {
    // 保存 值
    setLocal = () => {
        console.log(localStore)
        localStore.set('user', {
            name: 'test'
        })
    }

    // 读取 值
    getLocal = () => {
        let user = localStore.get('user')
        console.log(user)
    }

    // 保存 session值
    setSession = () => {
        sessionStorage.setItem('testKey', 'value')
    }

    render () {
        return (
            <div>
                <h1> 测试路由页面 </h1>
                <button onClick={ this.setLocal }> 保存 local值 </button>
                <hr />
                <button onClick={ this.getLocal }> 获取 local值 </button>
                <hr />
                <button onClick={ this.setSession }> 保存 session值 </button>
            </div>
        )
    }
}

export default TestRoute
