import React from 'react'
import { Modal, Button, Row, Col, Table} from 'antd'
class PowerInfomation extends React.Component {
    state = {
        visible: false,
        WaterRecordlList: [{
            name: 'hehe',
            lastMeterNumber: 1,
            meterNumber: 2,
            useNumber: 1,
            change: 1,
            electricalLoss: 1,
            power: 1,
            price: 0.5,
            money: 0.5,
            note: 'just note'
        }, {
            name: 'hehe2',
            lastMeterNumber: 3,
            meterNumber: 6,
            useNumber: 3,
            change: 1,
            electricalLoss: 0,
            power: 3,
            price: 0.5,
            money: 1.5,
            note: 'just note too'
        }],
        mainColumns: [{
            title: '房间编号',
            dataIndex: 'name'
        }, {
            title: '上次抄表数',
            dataIndex: 'lastMeterNumber'
        }, {
            title: '本次抄表数',
            dataIndex: 'meterNumber'
        }, {
            title: '电量（Kwh）',
            dataIndex: 'useNumber'
        }, {
            title: '变比',
            dataIndex: 'change'
        }, {
            title: '损耗10%',
            dataIndex: 'electricalLoss'
        }, {
            title: '总电量',
            dataIndex: 'power'
        }, {
            title: '单价',
            dataIndex: 'price'
        }, {
            title: '金额',
            dataIndex: 'money'
        }, {
            title: '备注',
            dataIndex: 'note'
        }],
        // 确认收款
        confirmReceipt: [{
            title: '时间',
            dataIndex: 'time'
        }, {
            title: '实收金额',
            dataIndex: 'chargeMoney'
        }, {
            title: '未收金额',
            dataIndex: 'noChargeMoney'
        }, {
            title: '收款方式',
            dataIndex: 'paymentMethod'
        }, {
            title: '经手人',
            dataIndex: 'person'
        }],
        // 确认违约金
        confirmLiquidatedDamages: [{
            title: '时间',
            dataIndex: 'time'
        }, {
            title: '优惠金额',
            dataIndex: 'discountAmount'
        }, {
            title: '实收金额',
            dataIndex: 'chargeMoney'
        }, {
            title: '未收金额',
            dataIndex: 'noChargeMoney'
        }, {
            title: '收款方式',
            dataIndex: 'paymentMethod'
        }, {
            title: '经手人',
            dataIndex: 'person'
        }],
        liquidatedDamagesList: [{
            time: '2016-09-05 15:00',
            discountAmount: '50.00',
            chargeMoney: '2000.00',
            noChargeMoney: '600.00',
            paymentMethod: '你猜',
            person: '李狗蛋'
        }, {
            time: '2016-10-05 14:00',
            discountAmount: '55.00',
            chargeMoney: '2340.00',
            noChargeMoney: '650.00',
            paymentMethod: '打劫',
            person: '张三'
        }],
        receipt: [{
            time: '2016-09-05 15:00',
            chargeMoney: '2000.00',
            noChargeMoney: '600.00',
            paymentMethod: '你猜',
            person: '李狗蛋'
        }, {
            time: '2016-10-05 14:00',
            chargeMoney: '2340.00',
            noChargeMoney: '650.00',
            paymentMethod: '打劫',
            person: '张三'
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
        const lightGrayStyle = {
            color: '#989898'
        }

        const blueBlodStyle = {
            color: '#09F',
            fontWeight: 'bold'
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>电费详情</Button>
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
                                <div style={{textAlign: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    lineHeight: '40px'}}
                                >
                                    <span>青岛石大胜华贸易有限公司</span>
                                    <span>&ensp;&ensp;电量统计表</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{color: '#666',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    lineHeight: '18px'}}
                                >
                                    （ 2015-09-10 ~ 2015-10-10 ）
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 30,
                            fontSize: '12px'}}
                        >
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >房间编号：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >2401/2402/2403</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >所在楼宇：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >长江中心A座</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >缴费期限：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >2017-07-10</span>
                                </div>
                            </Col>
                        </Row>
                        <div style={{marginTop: 10}}>
                            <Table
                                columns={this.state.mainColumns}
                                dataSource={this.state.WaterRecordlList}
                                bordered
                                pagination={false}
                            />
                        </div>
                        <Row type="flex" justify="end" style={{marginTop: 20,
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: '#666'}}
                        >
                            <Col span={6}>
                                <div>
                                    <span>优惠金额：</span>
                                    <span>&ensp;￥500.00</span>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <span>本期应收：</span>
                                    <span style={{fontSize: '18px'}}>&ensp;￥5000.00</span>
                                </div>
                            </Col>
                        </Row>
                        <hr style={{marginTop: 20,
                            color: '#EBEBEB' }}
                        />
                        <div style={{marginTop: 10,
                            fontSize: '14px',
                            padding: '0 20px'}}
                        >
                            <Row>
                                <Col>
                                    <div style={{fontWeight: 'bold',
                                        lineHeight: '21px',
                                        color: '#666'}}
                                    >
                                        <span>其他信息</span>
                                    </div>
                                </Col>
                            </Row>
                            <div style={{marginTop: 20,
                                lineHeight: '18px',
                                color: '#363636',
                                fontFamily: '\'Microsoft YaHei Regular\', \'Microsoft YaHei\''}}
                            >
                                <Row>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>录入日期：</span>
                                            <span>王小明 2016-09-26 12:12:12</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>最后修改：</span>
                                            <span>王小明 2016-09-26 12:12:12</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 20,
                                    lineHeight: '18px',
                                    color: '#363636'}}
                                >
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>审核人：</span>
                                            <span>李某明 2016-09-27 12:12:12</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>审核状态：</span>
                                            <span>不通过，某某原因某某原因某某原因某某原因某某原因某某原因</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div style={{marginTop: 20,
                            border: '1px solid #EBEBEB'}}
                        >
                            <div style={{backgroundColor: '#EBEBEB',
                                height: '44px',
                                fontSize: '14px',
                                lineHeight: '44px'}}
                            >
                                <span style={{marginLeft: '20px'}}>收款信息</span>
                            </div>
                            <div style={{padding: '0 20px',
                                fontSize: '14px'}}
                            >
                                <div style={{fontWeight: 'bold',
                                    marginTop: 10}}
                                >
                                    <div style={{fontWeight: 'bold'}}>确认收款</div>
                                    <Row style={{marginTop: 10,
                                        backgroundColor: '#F3F3F3',
                                        height: '32px',
                                        lineHeight: '32px',
                                        paddingLeft: '10px',
                                        fontWeight: 'normal'}}
                                    >
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>应收金额：&ensp;</span>
                                                <span style={blueBlodStyle}
                                                >1,234</span>
                                                <span>&ensp;元</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>开票状态：&ensp;</span>
                                                <span>已开票</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop: 10}}>
                                    <Table
                                        columns={this.state.confirmReceipt}
                                        dataSource={this.state.receipt}
                                        bordered
                                        pagination={false}
                                    />
                                </div>
                                <hr style={{marginTop: 20}} />
                                <div style={{fontWeight: 'bold',
                                    marginTop: 10}}
                                >
                                    <div style={{fontWeight: 'bold'}}>确认违约金</div>
                                    <Row style={{marginTop: 10,
                                        backgroundColor: '#F3F3F3',
                                        height: '32px',
                                        lineHeight: '32px',
                                        paddingLeft: '10px',
                                        fontWeight: 'normal'}}
                                    >
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>逾期天数：&ensp;</span>
                                                <span style={blueBlodStyle}>1</span>
                                                <span>&ensp;天</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>违约金额：&ensp;</span>
                                                <span style={blueBlodStyle}>1,234</span>
                                                <span>&ensp;元</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>开票状态：&ensp;</span>
                                                <span>已开票</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop: 10,
                                    marginBottom: 20}}
                                >
                                    <Table
                                        columns={this.state.confirmLiquidatedDamages}
                                        dataSource={this.state.liquidatedDamagesList}
                                        bordered
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PowerInfomation
