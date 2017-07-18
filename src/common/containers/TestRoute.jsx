// 用于测试 react-router-redux的 跳转页面
import React from 'react'

const localStore = require('../../utils/LocalStore').default

class TestRoute extends React.Component {
    // 保存 登录状态
    setLocal = () => {
        localStore.set('isAuthenticate', true)
    }

    // 读取 登录状态
    getLocal = () => {
        let isAuthenticate = localStore.get('isAuthenticate')
        console.log(isAuthenticate)
    }

    // 清空 登录状态
    removeLocal = () => {
        localStore.remove('isAuthenticate')
    }

    // 清空 全部状态
    clearLocal = () => {
        localStore.clearAll()
    }

    render () {
        return (
            <div>
                <h1> 测试路由页面 </h1>
                <button onClick={ this.setLocal }> 保存 登录状态 </button>
                <hr />
                <button onClick={ this.getLocal }>  读取 登录状态 </button>
                <hr />
                <button onClick={ this.removeLocal }> 清空 登录状态 </button>
                <hr />
                <button onClick={ this.clearLocal }> 清空 全部状态 </button>
            </div>
        )
    }
}

export default TestRoute
