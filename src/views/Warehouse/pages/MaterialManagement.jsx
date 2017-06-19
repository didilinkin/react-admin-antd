// 材料管理
import React from 'react'
import WarehouseAddUpComponent from './common/WarehouseAddUp'

class MaterialManagement extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: false
        }
    }
    showModal = () => {
        this.setState({
            open: true
        })
    }
    render () {
        return (
            <div>
                <WarehouseAddUpComponent
                    visible={this.state.open}
                />
                <h1 onClick={this.showModal}> 材料管理 </h1>
            </div>
        )
    }
}

export default MaterialManagement
