// 回访详情
import React from 'react'
import { Timeline, Rate } from 'antd'
import '../../../../style/test.less'
import { apiPost } from '../../../../api'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            'upkeep/getRepair',
            {'id': this.props.match.params.id}
        )
        let Repair = resulData.data
        if (Repair.ratedStatus === 0) {
            Repair['ratedStatus'] = <p>未评价</p>
        } else {
            Repair['ratedStatus'] = <div><Rate disabled defaultValue={Repair.star} /><p>{Repair.ratedContent}</p></div>
        }
        Repair['repairProjectList'] = Repair.repairProjectList.map(RepairProject => {
            if (RepairProject !== null) {
                return <tr><td>{RepairProject.id}</td><td>{RepairProject.materialName}</td> <td>{RepairProject.number}</td><td>{RepairProject.money}</td></tr>
            } else {
                return null
            }
        })
        Repair['repairedPic'] = Repair.repairedPic.split('#').map(img => {
            if (img !== '') {
                return <img src={'storage/files/' + img} alt=""/>
            } else {
                return '无'
            }
        })
        this.setState({
            data: Repair
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div className="box2">
                <Timeline>
                    <Timeline.Item color="green"><h2>提交报修单</h2>受理人： {this.state.data.pieMan}</Timeline.Item>
                    <Timeline.Item color="green"><h2>已派单</h2>维修人： {this.state.data.repairedMan}</Timeline.Item>
                    <Timeline.Item color="red">
                        <h2>完工登记</h2>
                        <p>{this.state.data.repairedContent}</p>
                        <table className="tb">
                            <tr className="hd">
                                <td>序号</td>
                                <td>材料名称</td>
                                <td>数量</td>
                                <td>收费小计</td>
                            </tr>
                            {this.state.data.repairProjectList}
                        </table>
                        <p>维修费： <span className="red">{this.state.data.amountMoney}</span> 元</p>
                        <p>维修人： {this.state.data.repairedMan}</p>
                        <p>协作人： {this.state.data.withMan}</p>
                        <ul>
                            <li>
                                {this.state.data.repairedPic}
                            </li>
                        </ul>
                    </Timeline.Item>
                    <Timeline.Item>
                        <h2>客户评价</h2>
                        {this.state.data.ratedStatus}
                    </Timeline.Item>
                    <Timeline.Item>
                        <h2>客服回访</h2>
                        <p>回访日期：{this.state.data.visitDate}</p>
                        <p>回访人： {this.state.data.visitMan}</p>
                        <p>{this.state.data.visitContent}</p>
                    </Timeline.Item>
                </Timeline>

            </div>
        )
    }
}

export default App

