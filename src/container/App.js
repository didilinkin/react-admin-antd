import React from 'react'
import { Link, browserHistory } from 'react-router'

const App = ({ children }) => (
    <div>
        <header>
            Links:
            {' '}
            <Link to="/">Home</Link>
            {' '}
            <Link to="/foo">Foo</Link>
            {' '}
            <Link to="/bar">Bar</Link>
        </header>
        <div>
            <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
        </div>
        <div style={{ marginTop: '1.5em' }}>
            {children}
        </div>
    </div>
)

export default App
