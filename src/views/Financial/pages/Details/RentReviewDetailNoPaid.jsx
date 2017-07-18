// 租金明细
import React from 'react'
import {Row, Col, Button} from 'antd'
import '../../../../style/test.less'
import { apiPost  } from '../../../../api'
import CollectRentAuditComponent from '../components/CollectRentConfirm'


class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auditStatus: 2,
            payPeriod: '',
            id: 0,
            remark: '',
            openUpdate: false,
            data: {},
            data2: {}
        }
    }
        handleUpdate = () => {
            this.setState({
                openUpdate: true,
                id: this.state.id
            })
        }
        async initialRemarks () {
        this.setState({
            id: this.props.match.params.id
        })
        let resulData = await apiPost(
            '/collectRent/getCollectRentById',
            {id: this.props.match.params.id}
        )
        let result = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 0}
        )
        if (resulData.data.payCycle === 3) {
            this.setState({
                payPeriod: '季付'
            })
        } else if (resulData.data.payCycle === 6) {
            this.setState({
                payPeriod: '半年付'
            })
        } else {
            this.setState({
                payPeriod: '年付'
            })
        }
        this.setState({
            data: resulData.data,
            data2: result.data
        })
        console.log(this.state.data.rentClientName)
    }
        componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            '/collectRent/getCollectRentById',
            {id: this.props.match.params.id}
        )
        this.setState({
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    render () {
        let collectList = this.state.data2
        return (
            <div style={this.props.style} className="contract">
                <CollectRentAuditComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <h2>租户信息</h2>
                <Row>
                    <Col span={8}><b>客户名称：</b>{this.state.data.rentClientName} </Col>
                    <Col span={8}><b>租赁周期：</b>{this.state.data.periodContract}</Col>
                    <Col span={8}><b>租赁面积：</b>{this.state.data.leaseArea} </Col>
                </Row>
                <Row>
                    <Col span={8}><b>所属楼宇：</b>{this.state.data.buildName} </Col>
                    <Col span={16}><b>房间编号：</b>{this.state.data.roomNum} </Col>
                </Row>
                <div className="wrapbox">
                    <div className="title" />
                    <div className="main">
                        <h2>费用设置</h2>
                        <Row>
                            <Col span={8}><b>合同单价：</b>{this.state.data.unitPrice} 元/㎡/天</Col>
                            <Col span={8}><b>交费方式：</b>{this.state.payPeriod}</Col>
                            <Col span={8}><b>首年租金：</b>{this.state.data.firstYearRent}  元</Col>
                        </Row>
                        <Row>
                            <Col span={24}> {this.state.data.startIncNum} 年后租金每年递增 {this.state.data.rentIncrRate} % </Col>
                        </Row>
                        <p className="line" />
                        <h2>本期租金</h2>
                        <Row>
                            <Col span={8}><b>本期周期：</b>{this.state.data.periodRent}</Col>
                            <Col span={8}><b>交费期限：</b>{this.state.data.payDeadline}</Col>
                            <Col span={8}><b>本期租金：</b>{this.state.data.actualPaidMoney} 元  （已优惠 {this.state.data.discountMoney} 元）</Col>
                        </Row>
                        <p className="line" />
                        <h2>其他信息</h2>
                        <Row>
                            <Col span={8}><b>录入日期：</b>{this.state.data.createName}{this.state.data.createDate}</Col>
                            <Col span={16}><b>最后修改：</b>{this.state.data.updateName}{this.state.data.updateDate}</Col>
                        </Row>
                    </div>
                </div>
                <div className="wrapbox">
                    <div className="title">
                        收款信息
                    </div>
                    <div className="main">
                        <h2>确认收款</h2>
                        <Row>
                            <Col span={8}><b>应收金额：</b>{this.state.data.actualPaidMoney}</Col>
                            <Col span={16}><b>开票状态：</b>已开票</Col>
                        </Row>
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>时间</td>
                                    <td>实收金额</td>
                                    <td>未收收金额</td>
                                    <td>收款方式</td>
                                    <td>经手人</td>
                                </tr>
                                {collectList.map(collectRent => {
                                    return <tr>
                                        <td>{collectRent.receiptDate}</td>
                                        <td>{collectRent.paidMoney}</td>
                                        <td>{collectRent.unpaidMoney}</td>
                                        <td>{collectRent.paidWay}</td>
                                        <td>{collectRent.createBy}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Button type="primary" onClick={this.handleUpdate} >收租金</Button>
            </div>
        )
    }
}

export default App

