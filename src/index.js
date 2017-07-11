// 根文件
import React from 'react'
import { render } from 'react-dom'

// import {
//     createStore,
//     combineReducers,
//     applyMiddleware
// }    from 'redux'
// import { Provider }         from 'react-redux'          // 全局store

// import createBrowserHistory from 'history/createBrowserHistory'
// import {
//     ConnectedRouter,
//     routerReducer,
//     routerMiddleware
//     // ,push
// } from 'react-router-redux'

// import rootReducer from './store/reducers'      // 根reducers

// import Routes from './router'

// const history = createBrowserHistory()          // 创建您选择的历史记录（在这种情况下，我们使用浏览器历史记录）
// /*
//  * 当浏览器不支持 HTML5 的 history API 时强制刷新页面;
//  * 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true
//  */
// const supportsHistory = 'pushState' in window.history
// const middleware = routerMiddleware(history)    // 构建 拦截 和 调度导航 actions的中间件 / 日志

// const rootElement = document.getElementById('root')

// // 根store
// const store = createStore(
//     combineReducers({
//         ...rootReducer,             // 在 'route' 标签上将 'reducer' 添加到 全局store上
//         router: routerReducer       // 为 导航 应用 中间件
//     }),
//     applyMiddleware(middleware)
// )

// // Now you can dispatch navigation actions from anywhere!
// // store.dispatch(push('/foo'))
// render(
//     <Provider store={store}>
//         { /* ConnectedRouter 将自动提供 store */ }
//         <ConnectedRouter history={history} forceRefresh={!supportsHistory}>
//             <Routes />
//         </ConnectedRouter>
//     </Provider>,
//     rootElement
// )

import Routes from './router'
const rootElement = document.getElementById('root')

render(
    <Routes />,
    rootElement
)
