import React                from 'react'
import ReactDOM             from 'react-dom'

import { createStore }      from 'redux'
import pmsApp               from './store/reducers'

import { Counter }          from './router/index'

import 'animate.css'

// alert(process.env.BABEL_ENV)

const store = createStore(pmsApp)
const rootElement = document.getElementById('root')

const render = () => ReactDOM.render(
    <Counter
        value={ store.getState() }
        onIncrement={ () => store.dispatch({ type: 'INCREMENT' }) }
        onDecrement={ () => store.dispatch({ type: 'DECREMENT' }) }
    />,
    rootElement
)

render()
store.subscribe(render)
