import React from 'react'
import {Row, Col, Table, Button, Popconfirm, notification, Icon} from 'antd'
import { apiPost } from '../../../../api/index'
import PrincipalCollectionPower from '../components/PrincipalCollectionPower'
class CollectionPowerDetails extends React.Component {
    state = {
        map: {
            list: [],
            receipt: [],
            liquidatedDamagesList: [],
            electricityFees: {}
        },
        mainColumns: []
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = () => {
        this.initialRemarks()
        this.setState({
            openPrincipalCollection: false,
            openDefaultCollection: false
        })
    }
    initialRemarks = async () => {
        let electricityFeeInfo = await apiPost(
            '/ElectricityFees/ElectricityFeeInfo',
            {id: this.props.match.params.id}
        )
        electricityFeeInfo = electricityFeeInfo.data
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
        if (electricityFeeInfo.electricityFees.wattHourType.toString() === '0') {
            mainColumn.splice(6, 0, {
                title: '电损0%',
                dataIndex: 'electricLoss'
            })
        } else if (electricityFeeInfo.electricityFees.wattHourType.toString() === '1') {
            mainColumn.splice(6, 0, {
                title: '电损' + electricityFeeInfo.electricityFees.powerLossRatio + '%',
                dataIndex: 'electricLoss'
            })
        } else {
            mainColumn.splice(6, 0, {
                title: '电损' + electricityFeeInfo.electricityFees.powerLossRatio + '%',
                dataIndex: 'electricLoss'
            })
            mainColumn.splice(8, 0, {
                title: '峰谷比例',
                dataIndex: 'valleysProportion'
            })
        }
        this.setState({
            map: {
                list: electricityFeeInfo.list,
                receipt: electricityFeeInfo.receipt,
                liquidatedDamagesList: electricityFeeInfo.liquidatedDamagesList,
                electricityFees: electricityFeeInfo.electricityFees
            },
            mainColumns: mainColumn
        })
    }
    openPrincipalCollection = () => {
        this.setState({
            openPrincipalCollection: true,
            openDefaultCollection: false,
            id: this.props.match.params.id
        })
    }
    penalBilling = async () => {
        let Principal = await apiPost(
            '/WaterBill/PrincipalBilling',
            {id: this.props.match.params.id,
                principalDamagesBilling: 1}
        )
        notification.open({
            message: Principal.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    render () {
        const dangerButtonStyle = {
            color: '#fff',
            backgroundColor: '#f04134',
            borderColor: '#f04134',
            marginLeft: 20
        }
        const lightGrayStyle = {
            color: '#989898'
        }
        let feesInfo = this.state.map.electricityFees
        return (
            <div>
                <div>
                    <Row style={{marginTop: 50}}>
                        <Col>
                            <div style={{textAlign: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                lineHeight: '40px'}}
                            >
                                <span>{feesInfo.clientName}</span>
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
                                （ {feesInfo.cycle} ）
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
                                >{feesInfo.roomNumber}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span style={lightGrayStyle} >所在楼宇：</span>
                                <span style={{color: '#666',
                                    marginLeft: '20px'}}
                                >{feesInfo.buildName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span style={lightGrayStyle} >缴费期限：</span>
                                <span style={{color: '#666',
                                    marginLeft: '20px'}}
                                >{feesInfo.wattDate}</span>
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
                                <span>&nbsp;￥{feesInfo.principalDiscount}</span>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <span>本期应收：</span>
                                <span style={{fontSize: '18px'}}>&nbsp;{feesInfo.thisReceivable}</span>
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
                                <span style={{fontWeight: 'bold'}}>&nbsp;{feesInfo.propertyMoney}</span>
                                <span>({feesInfo.isPropertyMoney === 1 ? '已含' : '未包含'})</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span>当前未交电费违约金：</span>
                                <span style={{fontWeight: 'bold'}}>&nbsp;{feesInfo.electricMoney}</span>
                                <span>({feesInfo.isElectricMoney === 1 ? '已含' : '未包含'})</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span>当前未交水费违约金：</span>
                                <span style={{fontWeight: 'bold'}}>&nbsp;{feesInfo.waterMoney}</span>
                                <span>({feesInfo.isWaterMoney === 1 ? '已含' : '未包含'})</span>
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
                                        <span>&nbsp;{feesInfo.createName}&nbsp;{feesInfo.createDate}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <span style={lightGrayStyle}>最后修改：</span>
                                        <span>&nbsp;{feesInfo.updateBy ? feesInfo.updateBy : feesInfo.createName}&nbsp;{feesInfo.updateDate ? feesInfo.updateDate : feesInfo.createDate}</span>
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
                                        <span>&nbsp;{feesInfo.auditName}&nbsp;{feesInfo.auditDate}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <span style={lightGrayStyle}>审核状态：</span>
                                        <span>&nbsp;{feesInfo.auditExplain}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <ExamineSuccessState
                        stateChange={this.stateChange}
                        fees={feesInfo}
                        receipt={this.state.map.receipt}
                        liquidatedDamagesList={this.state.map.liquidatedDamagesList}
                    />
                    <hr style={{marginTop: 20}} />
                    <div style={{marginTop: 20,
                        marginBottom: 50
                    }}
                    >
                        {feesInfo.principalPaymentStatus !== 1 &&
                            <Button type="primary" style={{marginLeft: 20}} onClick={this.openPrincipalCollection}>确认收款</Button>
                        }
                        {feesInfo.principalPrincipalBilling !== 1 && <Popconfirm title="确认开票吗?" onConfirm={this.PrincipalBilling}>
                            <Button type="danger" style={dangerButtonStyle} >确认开票</Button>
                        </Popconfirm>
                        }
                        {(feesInfo.liquidatedDamages > feesInfo.liquidatedDamagesReceived) &&
                            <span>
                                <Button type="primary" style={{marginLeft: 20}} >确认违约金收款</Button>
                                {!this.state.ChargeRecord6.length > 0 &&
                                <Popconfirm title="确认放入下月电费吗?" onConfirm={this.penalBilling}>
                                    <a>放入下月电费</a>
                                </Popconfirm>
                                }
                            </span>
                        }
                        {feesInfo.principalDamagesBilling !== 1 &&
                            <Popconfirm title="确认违约金开票?" onConfirm={this.DefaultBilling}>
                                <Button type="danger" style={dangerButtonStyle} >确认违约金开票</Button>
                            </Popconfirm>
                        }
                    </div>
                </div>
                <PrincipalCollectionPower
                    visible={this.state.openPrincipalCollection}
                    id={this.state.id}
                    refresh={this.refresh}
                >
                    <Button type="primary" style={{marginLeft: 20}} onClick={this.openPrincipalCollection}>确认收款</Button>
                </PrincipalCollectionPower>
            </div>
        )
    }
}

export default CollectionPowerDetails

function ExamineSuccessState (props) {
    const lightGrayStyle = {
        color: '#989898'
    }

    const blueBlodStyle = {
        color: '#09F',
        fontWeight: 'bold'
    }
    // 确认收款
    const confirmReceipt = [{
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
    }]
    // 确认违约金
    const confirmLiquidatedDamages = [{
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
    if (props.fees.principalPaymentStatus === 1) {
        return <div style={{
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
                                >{props.fees.thisReceivable}</span>
                                <span>&nbsp;元</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span style={lightGrayStyle}>开票状态：&nbsp;</span>
                                <span>{props.fees.principalPrincipalBilling === 1 ? '已开票' : '未开票'}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop: 10}}>
                    <Table
                        columns={confirmReceipt}
                        dataSource={props.receipt}
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
                                >{props.fees.days ? props.fees.days : 0}</span>
                                <span>&nbsp;天</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span style={lightGrayStyle}>违约金额：&nbsp;</span>
                                <span
                                    style={blueBlodStyle}
                                >{props.fees.liquidatedDamages ? props.fees.liquidatedDamages : 0}</span>
                                <span>&nbsp;元</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div>
                                <span style={lightGrayStyle}>开票状态：&nbsp;</span>
                                <span>{props.fees.principalDamagesBilling === 1 ? '已开票' : '未开票'}</span>
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
                        columns={confirmLiquidatedDamages}
                        dataSource={props.liquidatedDamagesList}
                        bordered
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    } else {
        return null
    }
}

