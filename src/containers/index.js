import React from 'react'
import ProductsContainer from './ProductsContainer' // '商品' 容器
import CartContainer from './CartContainer'         // 购物车 容器

const App = () => (
    <div>
        <h2>购物车案例</h2>
        <hr />
        <ProductsContainer />
        <hr />
        <CartContainer />
    </div>
)

export default App
