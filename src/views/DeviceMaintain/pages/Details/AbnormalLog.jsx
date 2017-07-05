// 设备维护 - 设备巡检 - 电梯系统 - 异常记录 - [ 详情页 ]
import React from 'react'

class AbnormalLog extends React.Component {
    render () {
        return (
            <div>
                <h1> 设备维护 - 设备巡检 - 电梯系统 - 异常记录(详情页) </h1>
                <h1> 异常记录-详情ID: { this.props.match.params.id } </h1>
            </div>
        )
    }
}

export default AbnormalLog
