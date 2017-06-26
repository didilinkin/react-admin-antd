import shop from '../../api'
import * as types from '../../constants/ActionTypes'

// 接收商品信息
const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products: products
})

// 获取全部产品(无参数)
export const getAllProducts = () => dispatch => {
    shop.getProducts(products => {                  // 获取产品
        dispatch(receiveProducts(products))
    })
}

const addToCartUnsafe = productId => ({
    type: types.ADD_TO_CART,
    productId
})

export const addToCart = productId => (dispatch, getState) => {
    if (getState().products.byId[productId].inventory > 0) {
        dispatch(addToCartUnsafe(productId))
    }
}

export const checkout = products => (dispatch, getState) => {
    const { cart } = getState()

    dispatch({
        type: types.CHECKOUT_REQUEST
    })
    shop.buyProducts(products, () => {
        dispatch({
            type: types.CHECKOUT_SUCCESS,
            cart
        })
        // Replace the line above with line below to rollback on failure:
        // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    })
}
