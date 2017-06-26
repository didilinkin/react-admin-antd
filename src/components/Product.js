// 产品
import React from 'react'
import PropTypes from 'prop-types'

// '商品'组件 接收参数: 价格, 数量, 标题
const Product = ({ price, quantity, title }) => (
    <div>
        {/* 加入有数量, 则渲染 '价格' * '数量' */}
        {title} - &#36;{price}{
            quantity ? ` x ${quantity}` : null
        }
    </div>
)

Product.propTypes = {
    price: PropTypes.number,
    quantity: PropTypes.number,
    title: PropTypes.string
}

export default Product
