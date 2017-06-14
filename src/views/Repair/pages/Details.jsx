// 详情页面
import React from 'react'

class RepairDetails extends React.Component {
    render ({ match }) {
        return (
            <div>
                <h1> 客户管理详情 </h1>
                <p> ID: {match.params.id} </p>
            </div>
        )
    }
}

export default RepairDetails
