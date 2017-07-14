// 根文件
import React from 'react'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import thunk                                    from 'redux-thunk'          // 异步

// router
// import { Router, BrowserRouter }                from 'react-router'
import createHistory                            from 'history/createBrowserHistory'
import { Route }                                from 'react-router-dom'

// router-redux
// import { syncHistoryWithStore, routerReducer }  from 'react-router-redux'
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware
    // ,push
} from 'react-router-redux'

import rootReducer                              from './store/reducers'         // 根 reducers
// import Routes                                   from './router'                 // 根 路由配置

// 临时测试 子页面
import App from './containers/App'
import Foo from './containers/Foo'
import Bar from './containers/Bar'
import Home from './containers/Home'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// react-router-redux 4.x
// const reducer = combineReducers({
//     ...rootReducer,
//     routing: routerReducer
// })
// redux
// const store = createStore(
//     reducer,
//     DevTools.instrument()
// )

// react-router-redux 5.x
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
// 使用插件首先要导入compose，然后再使用compose将Middleware和插件调用组合起来
// let store

const store = createStore(
    combineReducers({
        ...rootReducer,
        router: routerReducer
    }),
    // applyMiddleware(middleware)
    compose(applyMiddleware(middleware), applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

// redux-devtools
// const DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//         <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//     </DockMonitor>
// )

// router
// const history = syncHistoryWithStore(BrowserRouter, store)

const rootElement = document.getElementById('root')

render(
    <Provider store={ store }>
        {/*
            <Router history={ history }>
                <Routes />
            </Router>
        */}
        <div>
            <ConnectedRouter history={ history }>
                <div>
                    <Route exact path="/" component={ App } />
                    <Route path="/about" component={ Foo } />
                    <Route path="/topics" component={ Bar } />
                    <Route path="/home" component={ Home } />
                </div>
            </ConnectedRouter>
        </div>
    </Provider>,
    rootElement
)
