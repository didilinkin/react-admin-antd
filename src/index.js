// 根文件
import React from 'react'
import { render } from 'react-dom'

// import { createDevTools }                       from 'redux-devtools'
// import LogMonitor                               from 'redux-devtools-log-monitor'
// import DockMonitor                              from 'redux-devtools-dock-monitor'

// import { createStore, combineReducers }         from 'redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import thunk                                    from 'redux-thunk'          // 异步

import DevTools                                 from './containers/DevTools' // redux-devtools 工具

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

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)


// redux-devtools
const enhancer = compose(
    // 你要使用的中间件，放在前面
    applyMiddleware(thunk),
    // 必须的！启用带有monitors（监视显示）的DevTools
    DevTools.instrument()
)

export default function createStoreWithMiddleware (initialState) {
    // 注意：仅仅只有redux>=3.1.0支持第三个参数
    const store = createStore(rootReducer, initialState, enhancer)
    return store
}


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
const store = createStore(
    combineReducers({
        ...rootReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
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
        <ConnectedRouter history={ history }>
            <div>
                <Route exact path="/" component={ App } />
                <Route path="/about" component={ Foo } />
                <Route path="/topics" component={ Bar } />
                <Route path="/home" component={ Home } />
            </div>
        </ConnectedRouter>
    </Provider>,
    rootElement
)
