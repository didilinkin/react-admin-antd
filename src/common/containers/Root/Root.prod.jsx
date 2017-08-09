import React from 'react'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux' // push

import { renderRoutes } from 'react-router-config'

import rootRoutes from '../../../router'

class Root extends React.Component {
    render () {
        const { store } = this.props
        const { history } = this.props
        // const { isAuthenticate } = this.props

        return (
            <Provider store={store}>
                <ConnectedRouter history={ history }>
                    <div style={{ height: '100%' }}>
                        { renderRoutes(rootRoutes) }
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default Root
