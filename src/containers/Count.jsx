// 计算器
import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// actions
import { increment, decrement } from '../store/actions/count'

// getters
import { getCountState } from '../store/getters'


import Counter from './Counter'

const Count = ({ countState, increment, decrement }) => (
    <Counter
        value={ countState }
        onIncrement={ () => increment(countState) }
        onDecrement={ () => decrement(countState) }
    />
)

// Count.prototype = {
//     value: PropTypes.number.isRequired,
//     onIncrement: PropTypes.func.isRequired,
//     onDecrement: PropTypes.func.isRequired
// }

// 将 Store中的 state 状态 映射到 组件内
const mapStateToProps = (state) => ({
    countState: getCountState(state)
})

export default connect(
    mapStateToProps,
    {
        increment,
        decrement
    }
)(Count)
