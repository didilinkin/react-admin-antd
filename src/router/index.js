// 路由根组件
import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import { withRouter } from 'react-router'

import {
    Home,
    Count,
    View,
    TestRoute
} from '../containers'

import Link from 'react-router-redux-dom-link'

// const Routes = () => (
//     <Router>
//         <div>
//             <ul>
//                 <li><Link to="/" replace> 首页 </Link></li>
//                 <li><Link to="/count" replace> 计算器 </Link></li>
//                 <li><Link to="/view" replace> 共享计算值 </Link></li>
//                 <li><Link to="/testRoute" replace> 测试路由页面 </Link></li>
//             </ul>

//             <hr />

//             <Route exact path="/" component={ Home } />
//             <Route path="/count" component={ Count } />
//             <Route path="/view" component={ View } />
//             <Route path="/testRoute" component={ TestRoute } />
//         </div>
//     </Router>
// )

class Routes extends React.Component {
    render () {
        const { history } = this.props

        return (
            <Router history={ history }>
                <div>
                    <ul>
                        <li><Link to="/" replace> 首页 </Link></li>
                        <li><Link to="/count" replace> 计算器 </Link></li>
                        <li><Link to="/view" replace> 共享计算值 </Link></li>
                        <li><Link to="/testRoute" replace> 测试路由页面 </Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={ Home } />
                    <Route path="/count" component={ Count } />
                    <Route path="/view" component={ View } />
                    <Route path="/testRoute" component={ TestRoute } />
                </div>
            </Router>
        )
    }
}

const RoutesWithRouter = withRouter(Routes)

export default RoutesWithRouter
