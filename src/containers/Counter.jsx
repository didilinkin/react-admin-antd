// 计算器 组件(components)
import React from 'react'
import PropTypes from 'prop-types'

class Counter extends React.Component {
    render () {
        const { value, onIncrement, onDecrement } = this.props

        return (
            <p>
                Clicked: { value } times

                <button onClick={ onIncrement }> + </button>

                <button onClick={ onDecrement }> - </button>
            </p>
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

export default Counter
