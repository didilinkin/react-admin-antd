import React from 'react'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux' // push

import Routes from '../../../router'

class Root extends React.Component {
    render () {
        const { store } = this.props
        const { history } = this.props
        const { isAuthenticate } = this.props

        return (
            <Provider store={store}>
                <ConnectedRouter history={ history }>
                    <div>
                        <Routes isAuthenticate={ isAuthenticate } />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default Root
