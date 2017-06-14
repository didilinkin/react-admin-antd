// 详情页面
import React from 'react'

class ClientReviewDetails extends React.Component {
    render () {
        return (
            <div>
                <h1> 客户回访-详情ID: { this.props.match.params.id } </h1>
            </div>
        )
    }
}

export default ClientReviewDetails
