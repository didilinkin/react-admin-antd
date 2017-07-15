// 共享计算值
import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// getters
import { getCountState } from '../store/getters'

const View = ({ countState }) => (
    <h3>
        <b> 目前计算器结果: </b>
        { countState }
    </h3>
)

// View.prototype = {
//     countState: PropTypes.number.isRequired
// }

const mapStateToProps = (state) => ({
    countState: getCountState(state)
})

export default connect(
    mapStateToProps
)(View)
