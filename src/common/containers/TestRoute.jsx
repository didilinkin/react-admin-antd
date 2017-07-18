// 用于测试 react-router-redux的 跳转页面
import React from 'react'

const localStore = require('../../utils/LocalStore').default

class TestRoute extends React.Component {
    // 保存 登录状态: 成功
    setLocalT = () => {
        localStore.set('isAuthenticate', true)
    }

    // 保存 登录状态: 失败
    setLocalF = () => {
        localStore.set('isAuthenticate', false)
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
                <button onClick={ this.setLocalT }> 保存 登录状态: 成功 </button>
                <hr />
                <button onClick={ this.setLocalF }> 保存 登录状态: 失败 </button>
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
