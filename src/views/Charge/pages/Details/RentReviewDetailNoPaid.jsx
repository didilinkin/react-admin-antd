// 租金明细
import React from 'react'
import {Row, Col, Modal} from 'antd'
import '../../../../style/test.less'
import { apiPost  } from '../../../../api'


class RentReviewDetailNoPaid extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auditStatus: 2,
            visible: false,
            view: true,
            payPeriod: '',
            id: 0,
            remark: '',
            openUpdate: false,
            isFirst: true,
            data2: [],
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/collectRent/getCollectRentById',
                {id: nextProps.id}
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
                data2: result2.data,
                visible: nextProps.visible,
                isFirst: false,
                view: true
            })
            console.log(this.state.data2)
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        return (
            <div style={this.props.style} className="contract">
                <Modal maskClosable={false}
                    title= "租金明细"
                    style={{top: 20}}
                    width={900}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <div className="contract">
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
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RentReviewDetailNoPaid

