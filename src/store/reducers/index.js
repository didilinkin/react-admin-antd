import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'
import auth, * as fromAuth  from './auth'

export default combineReducers({
    cart,
    products,
    auth
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

// 获取全部
export const getTotal = state =>
    getAddedIds(state).reduce((total, id) =>
        total + getProduct(state, id).price * getQuantity(state, id), 0).toFixed(2)

// 获取 购物车商品
export const getCartProducts = state =>
    getAddedIds(state).map(id => ({
        ...getProduct(state, id),
        quantity: getQuantity(state, id)
    }))

// 获取 权限信息
export const getAuthInfo = state =>
    getAuth(state).reduce()
