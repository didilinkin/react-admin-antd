// 根文件
import React from 'react'
import { render } from 'react-dom'

// 状态
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'

// 路由
import Routes from './router'

// react-router-redux

render(
    <div>
        <Routes />
    </div>,
    document.getElementById('root')
)
