// 根文件
import React from 'react'
import { render } from 'react-dom'

// Redux 状态
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store from './store/configureStore'

// Router 路由
import { Route } from 'react-router-dom'
// import Routes from './router'                 // 根 路由配置

// 临时测试 子页面
import App from './containers/App'
import Foo from './containers/Foo'
import Bar from './containers/Bar'
import Home from './containers/Home'

const rootElement = document.getElementById('root')

render(
    <Provider store={ store }>
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
