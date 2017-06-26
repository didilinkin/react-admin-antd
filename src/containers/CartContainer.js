// 购物车详情 - 容器组件
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { checkout } from '../store/actions'                     // 结账
import { getTotal, getCartProducts } from '../store/reducers'   // 获取合计总数, 获取购物车商品

import Cart from '../components/Cart'                           // '购物车' 组件

// 创建 '购物车详情' 容器组件 = 需要( 商品, 合计总数, 结账 ); 返回 'Cart'组件
const CartContainer = ({ products, total, checkout }) => (
    <Cart
        products={products}
        total={total}
        onCheckoutClicked={() => checkout(products)}            // 点击'结账'按钮
    />
)

// propTypes 约束
CartContainer.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({               // '商品' 约束
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    total: PropTypes.string,                                    // '合计总数' 约束
    checkout: PropTypes.func.isRequired                         // '结账' 约束
}

const mapStateToProps = (state) => ({
    products: getCartProducts(state),                           // 获取 '购物车'商品
    total: getTotal(state)                                      // 获取 '合计总数'
})

export default connect(
    mapStateToProps,
    { checkout }
)(CartContainer)                                                // 暴露 '购物车' 容器组件
