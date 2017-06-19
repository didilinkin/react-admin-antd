// 出入库详情
import React from 'react'

class WarehouseDetail extends React.Component {
    render () {
        return (
            <div>
                <h1> 出入库详情: { this.props.match.params.id } </h1>
            </div>
        )
    }
}

export default WarehouseDetail
