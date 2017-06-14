// 客户管理 - 客户回访
import React from 'react'
import { Link } from 'react-router-dom'

class ClientReview extends React.Component {
    render () {
        return (
            <div>
                <h1> 客户回访 </h1>
                <hr />
                <Link to="/upkeep/clientReviewDetails/id=A&name=B">
                    <span> 跳转详情页 </span>
                </Link>
            </div>
        )
    }
}

export default ClientReview
