import React from 'react'
import { Modal, Row, Col, Table, Radio, Input, Button, Icon, notification} from 'antd'
import { apiPost } from '../../../../api/index'
const RadioGroup = Radio.Group
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
        mainColumns: []
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            let electricityFeeInfo = await apiPost(
                '/ElectricityFees/ElectricityFeeInfo',
                {id: nextProps.id}
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
                    electricityFees: electricityFeeInfo.electricityFees
                },
                visible: nextProps.visible,
                isFirst: false,
                mainColumns: mainColumn
            })
        }
    }
    // props 更新
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    handleOk = async () => {
        this.setState({
            value: 2,
            text: '',
            isFirst: true,
            visible: false
        })
        if (this.props.Finance > 0 && this.state.map.electricityFees.examineState === 1) {
            let data = await apiPost(
                '/ElectricityFees/updateAudit',
                {id: this.props.id,
                    examineState: this.state.value,
                    auditExplain: this.state.text}
            )
            notification.open({
                message: data.data,
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.refresh()
        }
    }
    handleCancel = () => {
        this.setState({
            value: 2,
            text: '',
            visible: false,
            isFirst: true
        })
    }
    stateChange = (e) => {
        this.setState({
            value: e.target.value
        })
        console.log(e.target.value)
    }
    text = (e) => {
        this.setState({
            text: e.target.value
        })
        console.log(e.target.value)
    }
    render () {
        const lightGrayStyle = {
            color: '#989898'
        }
        let fees = this.state.map.electricityFees
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
                                    <span>{fees.clientName}</span>
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
                                    （ {fees.cycle} ）
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
                                    >{fees.roomNumber}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >所在楼宇：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >{fees.buildName}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >缴费期限：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >{fees.wattDate}</span>
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
                                    <span>&nbsp;￥{fees.principalDiscount}</span>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <span>本期应收：</span>
                                    <span style={{fontSize: '18px'}}>&nbsp;{fees.thisReceivable}</span>
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
                                    <span style={{fontWeight: 'bold'}}>&nbsp;{fees.propertyMoney}</span>
                                    <span>({fees.isPropertyMoney === 1 ? '已含' : '未包含'})</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>当前未交电费违约金：</span>
                                    <span style={{fontWeight: 'bold'}}>&nbsp;{fees.electricMoney}</span>
                                    <span>({fees.isElectricMoney === 1 ? '已含' : '未包含'})</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span>当前未交水费违约金：</span>
                                    <span style={{fontWeight: 'bold'}}>&nbsp;{fees.waterMoney}</span>
                                    <span>({fees.isWaterMoney === 1 ? '已含' : '未包含'})</span>
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
                                            <span>&nbsp;{fees.createName}&nbsp;{fees.createDate}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>最后修改：</span>
                                            <span>&nbsp;{fees.updateBy ? fees.updateBy : fees.createName}&nbsp;{fees.updateDate ? fees.updateDate : fees.createDate}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Middle fees={fees} financial = {this.props.Finance}/>
                            </div>
                        </div>
                        <Bottom
                            stateChange={this.stateChange}
                            stateValue={this.state.value}
                            textInput={this.text}
                            handleOk={this.handleOk}
                            handleCancel={this.handleCancel}
                            financial = {this.props.Finance}
                            fees={fees}
                            receipt={this.state.map.receipt}
                            liquidatedDamagesList={this.state.map.liquidatedDamagesList}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PowerInfomation

// 进行选择
function Middle (props) {
    const lightGrayStyle = {
        color: '#989898'
    }
    if (props.fees.examineState > 1) {
        return <Row style={{marginTop: 20,
            lineHeight: '18px',
            color: '#363636'}}
        >
            <Col span={12}>
                <div>
                    <span style={lightGrayStyle}>审核人：</span>
                    <span>&nbsp;{props.fees.auditName}&nbsp;{props.fees.auditDate}</span>
                </div>
            </Col>
            <Col span={12}>
                <div>
                    <span style={lightGrayStyle}>审核状态：</span>
                    <span>&nbsp;{props.fees.auditExplain}</span>
                </div>
            </Col>
        </Row>
    } else {
        return null
    }
}

function ExaminingState (props) {
    return <div>
        <hr style={{
            marginTop: 20,
            color: '#EBEBEB'
        }}
        />
        <div style={{
            marginTop: '20px',
            lineHeight: '18px'
        }}
        >
            <span>审批意见：</span>
            <RadioGroup onChange={props.stateChange} value={props.stateValue}>
                <Radio value={2}>审批通过</Radio>
                <Radio value={3}>审批不通过</Radio>
            </RadioGroup>
        </div>
        <div style={{
            marginTop: '20px',
            lineHeight: '18px'
        }}
        >
            <Input onChange={props.textInput} type="textarea" rows={1} placeholder="请输入审批意见" />
        </div>
        <div style={{
            marginTop: '30px',
            textAlign: 'center'
        }}
        >
            <Button type="primary" size="large" onClick={props.handleOk}>确认</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button size="large" onClick={props.handleCancel}>取消</Button>
        </div>
    </div>
}
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
}
function ExamineFailureState () {
    return null
}
// 进行选择
function Bottom (props) {
    if (props.fees.examineState === 0) {
        return null
    } else if (props.fees.examineState === 1) {
        return props.financial ? <ExaminingState stateChange={props.stateChange} stateValue={props.stateValue} textInput={props.textInput} handleOk={props.handleOk} handleCancel={props.handleCancel}/> : null
    } else if (props.fees.examineState === 2) {
        return <ExamineSuccessState fees={props.fees} receipt={props.receipt} liquidatedDamagesList={props.liquidatedDamagesList}/>
    } else {
        return <ExamineFailureState />
    }
}
