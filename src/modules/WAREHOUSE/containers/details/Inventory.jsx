// 仓库管理 - 库存管理[详情]
import React from 'react'

class Inventory extends React.Component {
    componentWillMount = () => {
        console.dir(this.props.match.params.id)
    }

    render () {
        const { match } = this.props

        return (
            <h1>
                详情页: { match.params.id }
            </h1>
        )
    }
}

export default Inventory
