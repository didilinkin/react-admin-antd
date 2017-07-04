import { SIGN_IN, SIGN_OUT } from '../../constants/ActionTypes'

const initialState = false

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return true
        case SIGN_OUT:
            return false
        default:
            return false
    }
}

export default auth
