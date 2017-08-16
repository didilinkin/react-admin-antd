import React from 'react'
import { Modal, Row, Col, Table} from 'antd'
import { apiPost } from '../../../../api/index'
class PowerInfomation extends React.Component {
    state = {
        map: {
            list: [],
            receipt: [],
            liquidatedDamagesList: [],
            electricityFees: {}
        },
        isFirst: true,
        visible: false,
        mainColumns: [],
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
            dataIndex: 'principalMethod'
        }, {
            title: '经手人',
            dataIndex: 'person'
        }],
        // 确认违约金
        confirmLiquidatedDamages: [{
            title: '时间',
            dataIndex: 'liquidatedDamagesDate'
        }, {
            title: '优惠金额',
            dataIndex: 'discountAmount'
        }, {
            title: '实收金额',
            dataIndex: 'liquidatedDamagesReceived'
        }, {
            title: '未收金额',
            dataIndex: 'noChargeMoney'
        }, {
            title: '收款方式',
            dataIndex: 'damagesMethod'
        }, {
            title: '经手人',
            dataIndex: 'person'
        }]
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            let electricityFeeInfo = await apiPost(
                '/ElectricityFees/ElectricityFeeInfo',
                {id: nextProps.id}
            )
            electricityFeeInfo = electricityFeeInfo.data
            let ChargeRecord5 = await apiPost(
                '/collectRent/getChargeRecordById',
                {feeId: nextProps.id,
                    feeType: 5}
            )
            let ChargeRecord6 = await apiPost(
                '/collectRent/getChargeRecordById',
                {feeId: nextProps.id,
                    feeType: 6}
            )
            let mainColumn = [{
                title: '房间编号',
                dataIndex: 'roomNumberOne'
            }, {
                title: '上次抄表数',
                dataIndex: 'lastSurfaceNumber'
            }, {
                title: '本次抄表数',
                dataIndex: 'surfaceNumber'
            }, {
                title: '电量（Kwh）',
                dataIndex: 'needElectricity'
            }, {
                title: '变比',
                dataIndex: 'ratio'
            }, {
                title: '总电量',
                dataIndex: 'sumElectricity'
            }, {
                title: '单价',
                dataIndex: 'unitPrice'
            }, {
                title: '金额',
                dataIndex: 'singleMoney'
            }, {
                title: '备注',
                dataIndex: 'remarks'
            }]
            if (this.state.map.electricityFees.wattHourType !== 0) {
                mainColumn.splice(5, 0, {
                    title: '电损10%',
                    dataIndex: 'electricLoss'
                })
            }
            this.setState({
                ChargeRecord5: ChargeRecord5.data,
                ChargeRecord6: ChargeRecord6.data,
                map: {
                    list: electricityFeeInfo.list,
                    electricityFees: electricityFeeInfo.electricityFees
                },
                visible: nextProps.visible,
                isFirst: false,
                mainColumns: mainColumn
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    handleOk = async (e) => {
        console.log(e)
        this.setState({
            value: 2,
            text: '',
            isFirst: true,
            visible: false
        })
    }
    handleCancel = (e) => {
        console.log(e)
        this.setState({
            value: 2,
            text: '',
            visible: false,
            isFirst: true
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
                <Modal maskClosable={false}
                    footer={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="1000px"
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
                                    <span>{this.state.map.electricityFees.clientName}</span>
                                    <span>&nbsp;&nbsp;电量统计表</span>
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
                                    （ {this.state.map.electricityFees.cycle} ）
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
                                    >{this.state.map.electricityFees.roomNumber}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >所在楼宇：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >{this.state.map.electricityFees.buildName}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >缴费期限：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >{this.state.map.electricityFees.wattDate}</span>
                                </div>
                            </Col>
                        </Row>
                        <div style={{marginTop: 10}}>
                            <Table
                                columns={this.state.mainColumns}
                                dataSource={this.state.map.list}
                                bordered
                                pagination={false}
                            />
                        </div>
                        <Row type="flex" justify="end" style={{marginTop: 20,
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: '#666',
                            textAlign: 'right',
                            marginRight: '20px'}}
                        >
                            <Col span={6}>
                                <div>
                                    <span>优惠金额：</span>
                                    <span>&nbsp;￥{this.state.map.electricityFees.principalDiscount}</span>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <span>本期应收：</span>
                                    <span style={{fontSize: '18px'}}>&nbsp;{this.state.map.electricityFees.thisReceivable}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" style={{marginTop: 20,
                            fontSize: '13px',
                            lineHeight: '18px',
                            color: '#108EE9',
                            textAlign: 'center'}}
                        >
                            <Col span={8}>
                                <div>
                                    <span>当前未交物业费违约金：</span>
                                    <span style={{fontWeight: 'bold'}}>&nbsp;{this.state.map.electricityFees.propertyMoney}</span>
                                    <span>({this.state.map.electricityFees.isPropertyMoney === 1 ? '已含' : '未包含'})</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>当前未交电费违约金：</span>
                                    <span style={{fontWeight: 'bold'}}>&nbsp;{this.state.map.electricityFees.electricMoney}</span>
                                    <span>({this.state.map.electricityFees.isElectricMoney === 1 ? '已含' : '未包含'})</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>当前未交水费违约金：</span>
                                    <span style={{fontWeight: 'bold'}}>&nbsp;{this.state.map.electricityFees.waterMoney}</span>
                                    <span>({this.state.map.electricityFees.isWaterMoney === 1 ? '已含' : '未包含'})</span>
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
                                            <span>&nbsp;{this.state.map.electricityFees.createName}&nbsp;{this.state.map.electricityFees.createDate}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>最后修改：</span>
                                            <span>&nbsp;{this.state.map.electricityFees.updateName ? this.state.map.electricityFees.updateName : this.state.map.electricityFees.createName}&nbsp;{this.state.map.electricityFees.updateDate ? this.state.map.electricityFees.updateDatethis.state.map.electricityFees.updateDate : this.state.map.electricityFees.createDate}</span>
                                        </div>
                                    </Col>
                                </Row>
                                {this.state.map.electricityFees.examineState !== 0 &&
                                <Row style={{marginTop: 20,
                                    lineHeight: '18px',
                                    color: '#363636'}}
                                >
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>审核人：</span>
                                            <span>&nbsp;{this.state.map.electricityFees.auditName}&nbsp;{this.state.map.electricityFees.auditDate}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>审核状态：</span>
                                            <span>&nbsp;{this.state.map.electricityFees.auditExplain}</span>
                                        </div>
                                    </Col>
                                </Row>
                                }
                            </div>
                        </div>
                        {this.state.map.electricityFees.examineState !== 0 &&
                        <div style={{
                            marginTop: 20,
                            border: '1px solid #EBEBEB'
                        }}
                        >
                            <div style={{
                                backgroundColor: '#EBEBEB',
                                height: '44px',
                                fontSize: '14px',
                                lineHeight: '44px'
                            }}
                            >
                                <span style={{marginLeft: '20px'}}>收款信息</span>
                            </div>
                            <div style={{
                                padding: '0 20px',
                                fontSize: '14px'
                            }}
                            >
                                <div style={{
                                    fontWeight: 'bold',
                                    marginTop: 10
                                }}
                                >
                                    <div style={{fontWeight: 'bold'}}>确认收款</div>
                                    <Row style={{
                                        marginTop: 10,
                                        backgroundColor: '#F3F3F3',
                                        height: '32px',
                                        lineHeight: '32px',
                                        paddingLeft: '10px',
                                        fontWeight: 'normal'
                                    }}
                                    >
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>应收金额：&nbsp;</span>
                                                <span
                                                    style={blueBlodStyle}
                                                >{this.state.map.electricityFees.thisReceivable}</span>
                                                <span>&nbsp;元</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>开票状态：&nbsp;</span>
                                                <span>{this.state.map.electricityFees.principalPrincipalBilling === 1 ? '已开票' : '未开票'}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop: 10}}>
                                    <Table
                                        columns={this.state.confirmReceipt}
                                        dataSource={this.state.map.receipt}
                                        bordered
                                        pagination={false}
                                    />
                                </div>
                                <hr style={{marginTop: 20}} />
                                <div style={{
                                    fontWeight: 'bold',
                                    marginTop: 10
                                }}
                                >
                                    <div style={{fontWeight: 'bold'}}>确认违约金</div>
                                    <Row style={{
                                        marginTop: 10,
                                        backgroundColor: '#F3F3F3',
                                        height: '32px',
                                        lineHeight: '32px',
                                        paddingLeft: '10px',
                                        fontWeight: 'normal'
                                    }}
                                    >
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>逾期天数：&nbsp;</span>
                                                <span
                                                    style={blueBlodStyle}
                                                >{this.state.map.electricityFees.days}</span>
                                                <span>&nbsp;天</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>违约金额：&nbsp;</span>
                                                <span
                                                    style={blueBlodStyle}
                                                >{this.state.map.electricityFees.liquidatedDamages}</span>
                                                <span>&nbsp;元</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>开票状态：&nbsp;</span>
                                                <span>{this.state.map.electricityFees.principalDamagesBilling === 1 ? '已开票' : '未开票'}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{
                                    marginTop: 10,
                                    marginBottom: 20
                                }}
                                >
                                    <Table
                                        columns={this.state.confirmLiquidatedDamages}
                                        dataSource={this.state.map.liquidatedDamagesList}
                                        bordered
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PowerInfomation
