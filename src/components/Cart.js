import React from 'react'
import PropTypes from 'prop-types'

import Product from './Product'

const Cart = ({ products, total, onCheckoutClicked }) => {
    const hasProducts = products.length > 0
    const nodes = hasProducts ? (
        products.map(product =>
            <Product
                title={product.title}
                price={product.price}
                quantity={product.quantity}
                key={product.id}
            />
        )
    ) : (
        <em>请添加一些商品到购物车当中.</em>
    )

    return (
        <div>
            <h3>你的购物车</h3>
            <div>{nodes}</div>
            <p>Total: &#36;{total}</p>
            <button onClick={onCheckoutClicked}
                disabled={hasProducts ? '' : 'disabled'}
            >
                Checkout
            </button>
        </div>
    )
}

Cart.propTypes = {
    products: PropTypes.array,
    total: PropTypes.string,
    onCheckoutClicked: PropTypes.func
}

export default Cart
