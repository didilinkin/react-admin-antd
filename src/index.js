// 根文件
import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider }                     from 'react-redux'          // 全局store
import { createLogger }                 from 'redux-logger'         // 开发阶段: 打印redux 日志
import thunk                            from 'redux-thunk'          // 异步

import rootReducer                      from './store/reducers'     // 根reducers

import Routes                           from './router'

const rootElement = document.getElementById('root')

// 开发环境下, 打印 redux日志
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

// 根store
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    rootElement
)
