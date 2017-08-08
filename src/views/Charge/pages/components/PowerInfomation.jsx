import React from 'react'
import { Modal, Button, Row, Col } from 'antd'
class PowerInfomation extends React.Component {
    state = {
        visible: false,
        PowerRecordlList: [{
            name: 'hehe',
            lastMeterNumber: 1,
            meterNumber: 2,
            useNumber: 1,
            chenge: 1,
            electricalLoss: 0,
            power: 1,
            price: 0.5,
            money: 0.5,
            note: 'just note'
        }, {
            name: 'hehe2',
            lastMeterNumber: 3,
            meterNumber: 6,
            useNumber: 3,
            chenge: 1,
            electricalLoss: 0,
            power: 3,
            price: 0.5,
            money: 1.5,
            note: 'just note too'
        }]
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        console.log(e)
        this.setState({
            visible: false
        })
    }
    handleCancel = (e) => {
        console.log(e)
        this.setState({
            visible: false
        })
    }
    render () {
        const titleStyle = {
            fontsize: 'xx-large',
            webkitTextSizeAdjust: false
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Open</Button>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="1200"
                    style={{top: 20}}
                >
                    <div>
                        <Row style={{marginTop: 50}}>
                            <Col>
                                <div style={{height: 50,
                                    textAlign: 'center'}}
                                >
                                    <span style={{fontsize: 40 }}>青岛石大胜华贸易有限公司</span>
                                    <span style={titleStyle}>&ensp;&ensp;&ensp;&ensp;电量统计表</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{fontsize: 40,
                                    textAlign: 'center'}}
                                >
                                    （ 2015-09-10 ~ 2015-10-10 ）
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col span={8}>
                                <div>
                                    <span>房间编号：2401/2402/2403</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>所在楼宇：长江中心A座</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>缴费期限：2017-07-10</span>
                                </div>
                            </Col>
                        </Row>
                        <table className="tb" style={{marginTop: 20,
                            textAlign: 'center'}}
                        >
                            <tbody>
                                <tr className="hd">
                                    <td>房间编号</td>
                                    <td>上次抄表数</td>
                                    <td>本次抄表数</td>
                                    <td>电量（Kwh）</td>
                                    <td>变比10%</td>
                                    <td>电损</td>
                                    <td>总电量</td>
                                    <td>单价</td>
                                    <td>金额</td>
                                    <td>备注</td>
                                </tr>
                                {this.state.PowerRecordlList.map((PowerRecord, i) => <tr key={i}>
                                    <td>{PowerRecord.name}</td>
                                    <td>{PowerRecord.lastMeterNumber}</td>
                                    <td>{PowerRecord.meterNumber}</td>
                                    <td>{PowerRecord.useNumber}</td>
                                    <td>{PowerRecord.chenge}</td>
                                    <td>{PowerRecord.electricalLoss}</td>
                                    <td>{PowerRecord.power}</td>
                                    <td>{PowerRecord.price}</td>
                                    <td>{PowerRecord.money}</td>
                                    <td>{PowerRecord.note}</td></tr>)}
                                <tr>
                                    <td>合计</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>{this.state.totalPower}</td>
                                    <td />
                                    <td>{this.state.totalMoney}</td>
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                        <Row type="flex" justify="end" style={{marginTop: 20}}>
                            <Col span={6}>
                                <div>
                                    <span>优惠金额：</span>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <span>本期应收：</span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col span={8}>
                                <div>
                                    <span>未交物业费违约金： 10  (不包含)</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>未交电费违约金： 10  (已含)</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>未交水费违约金： 10  (不包含)</span>
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Row style={{marginTop: 20}}>
                            <Col>
                                <div>
                                    <span>其他信息</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div>
                                    <span>录入日期：王小明      2016-09-26    12:12:12</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <span>最后修改：王小明      2016-09-26    12:12:12</span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col span={12}>
                                <div>
                                    <span>审核人:李某明      2016-09-27    12:12:12</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <span>审核状态: 不通过，某某原因某某原因某某原因某某原因某某原因某某原因</span>
                                </div>
                            </Col>
                        </Row>
                        <div style={{marginTop: 20,
                            border: '1px solid #EBEBEB'}}
                        >
                            <div style={{backgroundColor: '#EBEBEB',
                                height: 37}}
                            >收款信息</div>
                            <Row style={{marginTop: 20}}>
                                <Col>
                                    <div>
                                        <span>确认收款</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={12}>
                                    <div>
                                        <span>应收金额：1,234  元</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <span>开票状态：已开票</span>
                                    </div>
                                </Col>
                            </Row>
                            <table className="tb" style={{marginTop: 20,
                                textAlign: 'center'}}>
                                <tbody>
                                    <tr className="hd">
                                        <td>时间</td>
                                        <td>实收金额</td>
                                        <td>未收金额</td>
                                        <td>收款方式</td>
                                        <td>经手人</td>
                                    </tr>
                                    {this.state.PowerRecordlList.map((PowerRecord, i) => <tr key={i}>
                                        <td>{PowerRecord.name}</td>
                                        <td>{PowerRecord.lastMeterNumber}</td>
                                        <td>{PowerRecord.meterNumber}</td>
                                        <td>{PowerRecord.useNumber}</td>
                                        <td>{PowerRecord.chenge}</td>
                                    </tr>)}
                                    <tr>
                                        <td>合计</td>
                                        <td />
                                        <td />
                                        <td />
                                        <td />
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <Row style={{marginTop: 20}}>
                                <Col>
                                    <div>
                                        <span>确认收款</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={12}>
                                    <div>
                                        <span>应收金额：1,234  元</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <span>开票状态：已开票</span>
                                    </div>
                                </Col>
                            </Row>
                            <table className="tb" style={{marginTop: 20,
                                textAlign: 'center'}}>
                                <tbody>
                                    <tr className="hd">
                                        <td>时间</td>
                                        <td>优惠金额</td>
                                        <td>实收金额</td>
                                        <td>未收金额</td>
                                        <td>收款方式</td>
                                        <td>经手人</td>
                                    </tr>
                                    {this.state.PowerRecordlList.map((PowerRecord, i) => <tr key={i}>
                                        <td>{PowerRecord.name}</td>
                                        <td>{PowerRecord.lastMeterNumber}</td>
                                        <td>{PowerRecord.lastMeterNumber}</td>
                                        <td>{PowerRecord.meterNumber}</td>
                                        <td>{PowerRecord.useNumber}</td>
                                        <td>{PowerRecord.chenge}</td>
                                    </tr>)}
                                    <tr>
                                        <td>合计</td>
                                        <td />
                                        <td />
                                        <td />
                                        <td />
                                        <td />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PowerInfomation
