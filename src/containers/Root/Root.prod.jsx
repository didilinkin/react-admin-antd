import React from 'react'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux' // push

// 路由
import Routes from '../../router'

class Root extends React.Component {
    render () {
        const { store } = this.props
        const { history } = this.props

        return (
            <Provider store={store}>
                <ConnectedRouter history={ history }>
                    <div>
                        <Routes />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default Root
