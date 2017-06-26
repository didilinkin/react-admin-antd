// 商品列表 - 容器组件
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { addToCart } from '../store/actions'                        // 添加到购物车
import { getVisibleProducts } from '../store/reducers/products'     // 获取现有的商品 - 商品 reducers

import ProductItem from '../components/ProductItem'                 // 商品 单个商品组件 - 展示组件
import ProductsList from '../components/ProductsList'               // 商品 列表组件 - 展示组件

const ProductsContainer = ({ products, addToCart }) => (
    <ProductsList title="商品列表">
        {products.map(product =>
            <ProductItem
                key={product.id}
                product={product}
                onAddToCartClicked={() => addToCart(product.id)}
            />
        )}
    </ProductsList>
)

// propTypes 约束
ProductsContainer.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
    })).isRequired,
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    products: getVisibleProducts(state.products)                    // 获取现有商品
})

export default connect(
    mapStateToProps,
    { addToCart }
)(ProductsContainer)                                                // 暴露 '商品详情' 容器组件
