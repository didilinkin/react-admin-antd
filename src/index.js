import React from 'react'
import ReactDOM from 'react-dom'
import 'animate.css'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

// 引入组件
import App          from './components/App'
import Page         from './components/Page'
import BasicTable   from './components/Tables/BasicTables'

// 引入路由
const routes =
    <Route path={'/'} components={ Page }>
        <IndexRedirect to="/app" />
        <Route path={'app'} component={ App }>
            <Route path={'table'}>
                <Route path={'basicTable'} component={ BasicTable } />
            </Route>
        </Route>
    </Route>

ReactDOM.render(
    <Router history={hashHistory}>
        {routes}
    </Router>,
    document.getElementById('root')
)
