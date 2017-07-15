import React from 'react'
import { Provider } from 'react-redux'

// 路由
import Routes from './router'

class Root extends React.Component {
    render () {
        const { store } = this.props

        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}

export default Root
