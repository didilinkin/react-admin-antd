import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware }     from 'redux'
import { Provider }                         from 'react-redux'          // 供应store 组件(全局共享store)
import thunk                                from 'redux-thunk'
import { createLogger }                     from 'redux-logger'         // 实现打印日志 功能

import { getAllProducts }                   from './store/actions'      // 获取所有产品
import reducer                              from './store/reducers'

import App                                  from './containers'         // 容器型 根组件
import 'animate.css'

const rootElement = document.getElementById('root')

// 创建中间件
const middleware = [ thunk ]

// 判断构建环境, 如果不是上线环境 则 => 输出中间件的log日志
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

console.log(process.env.NODE_ENV)                                       // 测试输出环境

// 创建一个 Redux store 来以存放应用中所有的 state
const store = createStore(
    reducer,                                                            // reducer: 接收两个参数, 分别是当前的 state 树和要处理的 action, 返回新的 state 树
    applyMiddleware(...middleware)                                      // Middleware 只是包装了 store 的 dispatch 方法
)

store.dispatch(getAllProducts())                                        // store.dispatch执行 => 获取所有产品

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    rootElement
)
