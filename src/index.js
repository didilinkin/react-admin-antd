import React                from 'react'
import ReactDOM             from 'react-dom'

import { createStore }      from 'redux'
import pmsApp               from './store/reducers'

// import { Counter }          from './router/index'
import { AuthTest }         from './router/index'

import 'animate.css'

const store = createStore(pmsApp)
const rootElement = document.getElementById('root')

// const render = () => ReactDOM.render(
//     <Counter
//         value={ store.getState() }
//         onIncrement={ () => store.dispatch({ type: 'INCREMENT' }) }
//         onDecrement={ () => store.dispatch({ type: 'DECREMENT' }) }
//     />,
//     rootElement
// )

const render = () => ReactDOM.render(
    <AuthTest
        value={ store.getState() }
        signIn={ () => store.dispatch({ type: 'SIGN_IN' }) }
        signOut={ () => store.dispatch({ type: 'SIGN_OUT' }) }
    />,
    rootElement
)

render()
store.subscribe(render)
