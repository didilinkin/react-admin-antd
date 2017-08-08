// 物业费明细
import React from 'react'
import {Row, Col, Button, Icon, notification, Popconfirm} from 'antd'
import '../../../../style/test.less'
import { apiPost  } from '../../../../api'
import PropertyFeeLateComponent from '../components/PropertyLateConfirm'


class PropertyFinishAndLate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auditStatus: 2,
            payPeriod: '',
            id: 0,
            remark: '',
            openUpdate: false,
            invoicePropertyStatus: '',
            invoiceLateStatus: '',
            data2: [],
            data3: [],
            data: {}
        }
    }
    async initialRemarks () {
        this.setState({
            id: this.props.match.params.id
        })
        let resulData = await apiPost(
            '/propertyFee/getPropertyFeeById',
            { id: this.props.match.params.id}
        )
        if (resulData.data.invoicePropertyStatus === 0) {
            this.setState({
                invoicePropertyStatus: '未开票'
            })
        } else if (resulData.data.invoicePropertyStatus === 1) {
            this.setState({
                invoicePropertyStatus: '已开票'
            })
        }
        if (resulData.data.invoiceLateStatus === 0) {
            this.setState({
                invoiceLateStatus: '未开票'
            })
        } else if (resulData.data.invoiceLateStatus === 1) {
            this.setState({
                invoiceLateStatus: '已开票'
            })
        }
        let result2 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 3}
        )
        let result1 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 4}
        )
        if (Math.floor(resulData.data.days) === resulData.data.days) {
            this.setState({
                monthDay: resulData.data.days,
                data: resulData.data,
                data2: result2.data,
                data3: result1.data,
                fileList: []
            })
        } else {
            this.setState({
                monthDay: parseFloat(resulData.data.days).toFixed(5),
                data: resulData.data,
                data2: result2.data,
                data3: result1.data,
                fileList: []
            })
        }
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        location.href = '/financial/PropertyFinishAndLate/' + this.props.match.params.id
    }
    invoiceProperty = async () => {
        await apiPost(
            '/propertyFee/updatePropertyFee',
            {id: this.props.match.params.id,
                invoicePropertyFeeStatus: 1}
        )
        notification.open({
            message: '物业费开票成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    invoiceLate = async () => {
        await apiPost(
            '/propertyFee/updatePropertyFee',
            {id: this.props.match.params.id,
                invoiceLateStatus: 1}
        )
        notification.open({
            message: '违约金开票成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    delayNext = async () => {
        await apiPost(
            '/propertyFee/updatePropertyFeeByNext',
            {id: this.props.match.params.id,
                invoiceLateStatus: 1,
                unpaidLateMoney: 0,
                unpaidMoney: 0,
                paidMoney: this.state.data.lateMoney,
                latePaidWay: 6,
                paidWay: 6,
                whetherLatePaid: 1}
        )
        notification.open({
            message: '操作成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        location.href = '/financial/PropertyFinishAndLate/' + this.props.match.params.id
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    handleUpdate = () => {
        this.setState({
            openUpdate: true,
            id: this.state.id
        })
    }
    render () {
        let chargeList = this.state.data2
        let chargeList2 = this.state.data3
        return (
            <div style={this.props.style} className="contract">
                <PropertyFeeLateComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <spn ><input value={this.state.data.clientName} />&nbsp;&nbsp;物业服务费统计表</spn>
                <span>({this.state.data.startDate}～{this.state.data.endDate})</span>
                <Row>
                    <Col span={8}><i>房间编号：</i>{this.state.data.roomNum} </Col>
                    <Col span={8}><i>所在楼宇：</i>{this.state.data.buildName} </Col>
                    <Col span={8}><i>交费期限：</i>{this.state.data.payDeadline} </Col>
                </Row>
                <table className="tb">
                    <tbody>
                        <tr className="hd">
                            <td>费用项目</td>
                            <td>面积</td>
                            <td />
                            <td>单价</td>
                            <td />
                            <td>月份</td>
                            <td>金额</td>
                        </tr>
                        <tr>
                            <td>物业管理费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.pmUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.monthDay}</td>
                            <td>{this.state.data.pmFee}</td>
                        </tr>
                        <tr>
                            <td>电梯费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.elevUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.monthDay}</td>
                            <td>{this.state.data.elevatorFee}</td>
                        </tr>
                        <tr>
                            <td>空调费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.acUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.data.acUnitDay}/4</td>
                            <td>{this.state.data.airFee}</td>
                        </tr>
                        <tr>
                            <td>水费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.waterUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.monthDay}</td>
                            <td>{this.state.data.waterFee}</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{margin: '20px 0',
                    textAlign: 'right'}}
                >优惠金额  ¥{this.state.data.discountMoney} 本期应收 ¥{this.state.data.actualPaidMoney}</p>

                <div className="wrapbox">
                    <div className="main">
                        <p className="line" />
                        <h2>其他信息</h2>
                        <Row>
                            <Col span={8}><i>录入日期：</i>{this.state.data.createName}&nbsp;&nbsp;{this.state.data.createDate}</Col>
                            <Col span={16}><i>最后修改：</i>{this.state.data.undateName}&nbsp;&nbsp;{this.state.data.updateDate}</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>审核人：</b>{this.state.data.auditName}&nbsp;&nbsp;{this.state.data.auditDate}</Col>
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
                            <Col span={8}><i>应收金额：</i>{this.state.data.actualPaidMoney}元</Col>
                            <Col span={16}><i>开票状态：</i>{this.state.invoicePropertyStatus}</Col>
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
                                {chargeList.map(propertyFee => {
                                    if (propertyFee.paidWay === 0) {
                                        return <tr>
                                            <td>{propertyFee.receiptDate}</td>
                                            <td>{propertyFee.paidMoney}</td>
                                            <td>{propertyFee.unpaidMoney}</td>
                                            <td>银行转账</td>
                                            <td>{propertyFee.createName}</td>
                                        </tr>
                                    } else if (propertyFee.paidWay === 1) {
                                        return <tr>
                                            <td>{propertyFee.receiptDate}</td>
                                            <td>{propertyFee.paidMoney}</td>
                                            <td>{propertyFee.unpaidMoney}</td>
                                            <td>支付宝</td>
                                            <td>{propertyFee.createName}</td>
                                        </tr>
                                    } else if (propertyFee.paidWay === 2) {
                                        return <tr>
                                            <td>{propertyFee.receiptDate}</td>
                                            <td>{propertyFee.paidMoney}</td>
                                            <td>{propertyFee.unpaidMoney}</td>
                                            <td>微信</td>
                                            <td>{propertyFee.createName}</td>
                                        </tr>
                                    } else if (propertyFee.paidWay === 3) {
                                        return <tr>
                                            <td>{propertyFee.receiptDate}</td>
                                            <td>{propertyFee.paidMoney}</td>
                                            <td>{propertyFee.unpaidMoney}</td>
                                            <td>支票</td>
                                            <td>{propertyFee.createName}</td>
                                        </tr>
                                    } else if (propertyFee.paidWay === 4) {
                                        return <tr>
                                            <td>{propertyFee.receiptDate}</td>
                                            <td>{propertyFee.paidMoney}</td>
                                            <td>{propertyFee.unpaidMoney}</td>
                                            <td>现金</td>
                                            <td>{propertyFee.createName}</td>
                                        </tr>
                                    } else if (propertyFee.paidWay === 5) {
                                        return <tr>
                                            <td>{propertyFee.receiptDate}</td>
                                            <td>{propertyFee.paidMoney}</td>
                                            <td>{propertyFee.unpaidMoney}</td>
                                            <td>其他</td>
                                            <td>{propertyFee.createName}</td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                        <p className="line" />
                        <h2>确认违约金</h2>
                        <Row>
                            <Col span={8}><i>违约金额：</i>{this.state.data.lateMoney}  元 </Col>
                            <Col span={8}><i>开票状态：</i>{this.state.invoiceLateStatus}</Col>
                        </Row>
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>时间</td>
                                    <td>实收金额</td>
                                    <td>未收收金额</td>
                                    <td>优惠金额</td>
                                    <td>收款方式</td>
                                    <td>经手人</td>
                                </tr>
                                {chargeList2.map(collectRent => {
                                    if (collectRent.paidWay === 0) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>{collectRent.discountMoney}</td>
                                            <td>银行转账</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 1) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>{collectRent.discountMoney}</td>
                                            <td>支付宝</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 2) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>{collectRent.discountMoney}</td>
                                            <td>微信</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 3) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>{collectRent.discountMoney}</td>
                                            <td>支票</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 4) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>{collectRent.discountMoney}</td>
                                            <td>现金</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    } else if (collectRent.paidWay === 5) {
                                        return <tr>
                                            <td>{collectRent.receiptDate}</td>
                                            <td>{collectRent.paidMoney}</td>
                                            <td>{collectRent.unpaidMoney}</td>
                                            <td>{collectRent.discountMoney}</td>
                                            <td>其他</td>
                                            <td>{collectRent.createName}</td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="wrapbox">
                    <Button type="primary" onClick={this.handleUpdate} >实收违约金</Button>
                    <Popconfirm title="确定违约金延期下月电费吗?" onConfirm={this.delayNext}>
                        <a href="javascript:" >&nbsp; 延期下月电费 </a>
                    </Popconfirm>
                    <Popconfirm title="确定开票吗?" onConfirm={this.invoiceProperty}>
                        <a className="btnred ant-btn" href="javascript:" >&nbsp; 物业费开票 </a>
                    </Popconfirm>
                    <Popconfirm title="确定开票吗?" onConfirm={this.invoiceLate}>
                        <a className="btnred ant-btn" href="javascript:" >&nbsp; 违约金开票 </a>
                    </Popconfirm>
                </div>
            </div>
        )
    }
}

export default PropertyFinishAndLate

