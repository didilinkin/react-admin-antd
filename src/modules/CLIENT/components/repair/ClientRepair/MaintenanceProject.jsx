// 维修项目 - 详情
import React from 'react'
import '../../../style/test.less'
import { apiPost } from '../../../../../api/index'
import {Modal} from 'antd'
class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {},
            visible: false,
            isFirst: true
        }
    }
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.state.isFirst && nextProps.visible) {
                let resulData = await apiPost(
                    'upkeep/getRepair',
                    {'id': nextProps.id}
                )
                let Repair = resulData.data
                let j = 0
                Repair['repairProjectList'] = Repair.repairProjectList.map(RepairProject => {
                    if (RepairProject !== null) {
                        j++
                        let roomType = '自有'
                        if (RepairProject.roomType === 1) {
                            roomType = '出售'
                        }
                        return <tr key={j}>
                            <td>{roomType}</td>
                            <td>{RepairProject.materialName}</td>
                            <td>{RepairProject.number}</td>
                            <td>{RepairProject.money}</td>
                        </tr>
                    } else {
                        return null
                    }
                })
                this.setState({
                    data: Repair,
                    visible: nextProps.visible,
                    isFirst: false
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    handleCancel = () => {
        this.setState({
            data: [],
            visible: false,
            isFirst: true
        })
        this.props.refreshTable()
    }
    render () {
        return (
            <Modal maskClosable={false}
                title="维修项目"
                style={{top: 20}}
                width="800"
                footer={null}
                visible={this.state.visible}
                onCancel={this.handleCancel}
            >
                <div className="box3">
                    <h2>维修项目</h2>
                    <p>
                        <b>发起人：</b>{this.state.data.repairedMan}
                    </p>
                    <p>
                        <b>发起日期：</b>{this.state.data.startDate}
                    </p>
                    <table className="tb">
                        <tbody>
                            <tr className="hd">
                                <td>房屋性质</td>
                                <td>材料名称</td>
                                <td>数量</td>
                                <td>收费小计</td>
                            </tr>
                            {this.state.data.repairProjectList}
                        </tbody>
                    </table>
                    <p>
                        <b>应收金额：</b> {this.state.data.amountMoney} 元
                    </p>
                </div>
            </Modal>
        )
    }
}
export default App

