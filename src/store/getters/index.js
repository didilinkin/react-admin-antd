// getters
import * as fromCount from '../reducers/count'

const getCount = state => fromCount(state.count)

export const getCountState = state =>
    getCount(state)
