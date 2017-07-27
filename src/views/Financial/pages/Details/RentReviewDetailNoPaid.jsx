// 租金明细
import React from 'react'
import {Row, Col, Button, Icon, notification, Popconfirm} from 'antd'
import '../../../../style/test.less'
import { apiPost  } from '../../../../api'
import CollectRentAuditComponent from '../components/CollectRentConfirm'


class RentReviewDetailNoPaid extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auditStatus: 2,
            payPeriod: '',
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
            '/collectRent/collectRentList',
            {auditStatus: 2}
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
            data2: result2.data
        })
        console.log(this.state.data2)
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
                <Button type="primary" onClick={this.handleUpdate} >确认收款</Button>
                <Popconfirm title="确定修改吗?" onConfirm={this.invoiceRent}>
                    <a href="javascript:" >&nbsp; 租金开票 </a>
                </Popconfirm>
            </div>
        )
    }
}

export default RentReviewDetailNoPaid

