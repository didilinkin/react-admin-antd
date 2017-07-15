// getters
import * as fromCount from '../reducers/count'

const getCount = state => fromCount.getCount(state.count)

export const getCountState = state =>
    getCount(state)
