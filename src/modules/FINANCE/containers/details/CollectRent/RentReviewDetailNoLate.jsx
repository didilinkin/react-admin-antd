// 租金明细
import React from 'react'
import {Row, Col, Button, notification, Icon, Popconfirm} from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../../api'
import CollectRentAuditComponent from '../../../components/CollectRent/CollectRentConfirm'


class RentReviewDetailNoLate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auditStatus: 2,
            payPeriod: '',
            invoiceRentStatus: '',
            id: 0,
            remark: '',
            openUpdate: false,
            data2: [],
            data: {}
        }
    }
    handleUpdate = () => {
        this.setState({
            openUpdate: true,
            id: this.state.id
        })
    }
    invoiceRent = async () => {
        await apiPost(
            '/collectRent/updateCollectRentVoByInvoiceRent',
            {id: this.props.match.params.id,
                invoiceRentStatus: 1}
        )
        notification.open({
            message: '租金开票成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        // location.href = '/financial/RentReviewDetailNoLate/' + this.props.match.params.id
        location.href = '/home/financial/collectRentDetails/RentReviewDetailNoLate/' + this.props.match.params.id
    }
    async initialRemarks () {
        this.setState({
            id: this.props.match.params.id
        })
        let resulData = await apiPost(
            '/collectRent/getCollectRentById',
            {id: this.props.match.params.id}
        )
        let result2 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 0}
        )
        if (resulData.data.invoiceRentStatus === 0) {
            this.setState({
                invoiceRentStatus: '未开票'
            })
        } else if (resulData.data.invoiceRentStatus === 1) {
            this.setState({
                invoiceRentStatus: '已开票'
            })
        }
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
            data2: result2.data
        })
        console.log(this.state.data2)
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        this.props.history.push('/home/financial/collectRentDetails/RentReviewDetailNoLate/' + this.props.match.params.id)
        // location.href = '/financial/RentReviewDetailNoLate/' + this.props.match.params.id
    }
    render () {
        let chargeList = this.state.data2
        return (
            <div style={this.props.style} className="contract">
                <CollectRentAuditComponent
                    id={this.state.id}
                    pro={this.props}
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
                    <div className="title">租金信息</div>
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
                        <Row>
                            <Col span={8}><b>审核人：</b>{this.state.data.auditName}{this.state.data.auditDate}</Col>
                            <Col span={16}><b>审核说明：</b>{this.state.data.remark}</Col>
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
                            <Col span={8}><b>应收金额：</b>{this.state.data.actualPaidMoney} 元</Col>
                            <Col span={16}><b>开票状态：</b>{this.state.invoiceRentStatus}</Col>
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
                                {chargeList.map(collectRent => {
                                    if (collectRent.paidWay === 0) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>银行转账</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 1) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>支付宝</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 2) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>微信</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 3) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>支票</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 4) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>现金</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 5) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>其他</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    }
                                    return ''
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Button type="primary" onClick={this.handleUpdate} >收租金</Button>
                {this.state.data.invoiceRentStatus !== 1 &&
                <Popconfirm title="确定开票吗?" onConfirm={this.invoiceRent}>
                    <a className="btnred ant-btn">&nbsp; 租金开票 </a>
                </Popconfirm>}
            </div>
        )
    }
}

export default RentReviewDetailNoLate

