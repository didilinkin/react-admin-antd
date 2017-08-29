import React from 'react'
import { apiPost } from '../../../../api/index'
import { Modal, Row, Col, Table, Radio, Input, Button, notification, Icon } from 'antd'
const RadioGroup = Radio.Group
class WaterInfomation extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        value: 2,
        text: '',
        map: {
            WaterRecordList: [],
            waterBill: {},
            pmContract: {}
        },
        ChargeRecord5: [],
        ChargeRecord6: []
    }
    handleOk = async (e) => {
        console.log(e)
        this.setState({
            value: 2,
            text: '',
            isFirst: true,
            visible: false
        })
        if (this.props.Finance > 0 && this.state.map.waterBill.examineState === 1) {
            let data = await apiPost(
                '/WaterBill/examine',
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
    handleCancel = (e) => {
        console.log(e)
        this.setState({
            value: 2,
            text: '',
            visible: false,
            isFirst: true
        })
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            let map = await apiPost(
                '/propertyFee/getWaterBill',
                {id: nextProps.id}
            )
            map = map.data
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
            this.setState({
                ChargeRecord5: ChargeRecord5.data,
                ChargeRecord6: ChargeRecord6.data,
                map: {
                    WaterRecordList: map.list,
                    waterBill: map.waterBill,
                    pmContract: map.pmContract
                },
                visible: nextProps.visible,
                isFirst: false
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    onChange = (e) => {
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
        const columns = [{
            title: '房间编号',
            dataIndex: 'roomNumberOne'
        }, {
            title: '上次抄表数',
            dataIndex: 'preMeterRead'
        }, {
            title: '本次抄表数',
            dataIndex: 'meterRead'
        }, {
            title: '本次用水量',
            dataIndex: 'waterCount'
        }, {
            title: '损耗10%',
            dataIndex: 'meterLoss'
        }, {
            title: '总用水量',
            dataIndex: 'sumWater'
        }, {
            title: '单价',
            dataIndex: 'waterUnitPrice'
        }, {
            title: '金额',
            dataIndex: 'money'
        }, {
            title: '备注',
            dataIndex: 'remarks'
        }]
        const columns5 = [{
            title: '时间',
            dataIndex: 'receiptDate'
        }, {
            title: '实收金额',
            dataIndex: 'paidMoney'
        }, {
            title: '未收金额',
            dataIndex: 'unpaidMoney'
        }, {
            title: '收款方式',
            dataIndex: 'paidWayString'
        }, {
            title: '经手人',
            dataIndex: 'createName'
        }]
        const columns6 = [{
            title: '时间',
            dataIndex: 'receiptDate'
        }, {
            title: '优惠金额',
            dataIndex: 'discountMoney'
        }, {
            title: '实收金额',
            dataIndex: 'paidMoney'
        }, {
            title: '未收金额',
            dataIndex: 'unpaidMoney'
        }, {
            title: '收款方式',
            dataIndex: 'paidWayString'
        }, {
            title: '经手人',
            dataIndex: 'createName'
        }]

        const lightGrayStyle = {
            color: '#989898'
        }

        return (
            <div>
                <Modal
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
                                    <span>{this.state.map.waterBill.formName}</span>
                                    <span>水量统计表</span>
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
                                    （ {this.state.map.waterBill.preMeterDate} ~ {this.state.map.waterBill.meterDate} ）
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
                                    >{this.state.map.waterBill.roomNumber}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >所在楼宇：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >{this.state.map.waterBill.buildName}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <span style={lightGrayStyle} >缴费期限：</span>
                                    <span style={{color: '#666',
                                        marginLeft: '20px'}}
                                    >{this.state.map.waterBill.overdueDate}</span>
                                </div>
                            </Col>
                        </Row>
                        <div style={{marginTop: 10}}>
                            <Table
                                columns={columns}
                                dataSource={this.state.map.WaterRecordList}
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
                                    <span>{this.state.map.waterBill.amountReceivable}</span>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <span>本期应收：</span>
                                    <span style={{fontSize: '18px'}}>￥{this.state.map.waterBill.receivableMoney}</span>
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
                                            <span>{this.state.map.waterBill.createName} {this.state.map.waterBill.createDate}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>最后修改：</span>
                                            <span>{this.state.map.waterBill.createName} {this.state.map.waterBill.createDate}</span>
                                        </div>
                                    </Col>
                                </Row>
                                {this.state.map.waterBill.examineState !== 0 && this.state.map.waterBill.examineState !== 1 &&
                                <Row style={{
                                    marginTop: 20,
                                    lineHeight: '18px',
                                    color: '#363636'
                                }}
                                >
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>审核人：</span>
                                            <span>{this.state.map.waterBill.auditName} {this.state.map.waterBill.auditDate}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={lightGrayStyle}>审核状态：</span>
                                            <span>{this.state.map.waterBill.examineState === 2 ? '审核通过' : '审核失败'} {this.state.map.waterBill.auditExplain}</span>
                                        </div>
                                    </Col>
                                </Row>
                                }
                            </div>
                        </div>
                        {this.state.map.waterBill.examineState === 2 &&
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
                                        height: '44px',
                                        lineHeight: '44px',
                                        paddingLeft: '10px',
                                        fontWeight: 'normal'
                                    }}
                                    >
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>应收金额：</span>
                                                <span style={{
                                                    color: 'red',
                                                    fontWeight: 'bold'
                                                }}
                                                >{this.state.map.waterBill.receivableMoney}</span>
                                                <span>元</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>开票状态：</span>
                                                <span>{this.state.map.waterBill.billingState === 1 ? '已开票' : '未开票'}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop: 10}}>
                                    {this.state.map.waterBill.paidMoney > 0 &&
                                    < Table
                                        columns={columns5}
                                        dataSource={this.state.ChargeRecord5}
                                        bordered
                                        pagination={false}
                                    />
                                    }
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
                                        height: '44px',
                                        lineHeight: '44px',
                                        paddingLeft: '10px',
                                        fontWeight: 'normal'
                                    }}
                                    >
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>违约金额：</span>
                                                <span style={{
                                                    color: 'red',
                                                    fontWeight: 'bold'
                                                }}
                                                >{this.state.map.waterBill.penaltyTotalMoney}</span>
                                                <span>元</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span style={lightGrayStyle}>开票状态：</span>
                                                <span>{this.state.map.waterBill.principalDamagesBilling === 1 ? '已开票' : '未开票'}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{marginTop: 10}}>
                                    {this.state.map.waterBill.penaltyPaidMoney > 0 &&
                                    <Table
                                        columns={columns6}
                                        dataSource={this.state.ChargeRecord6}
                                        bordered
                                        pagination={false}
                                    />
                                    }
                                </div>
                            </div>
                        </div>
                        }
                        {this.props.Finance > 0 && this.state.map.waterBill.examineState === 1 &&
                        <div>
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
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={2}>审批通过</Radio>
                                    <Radio value={3}>审批不通过</Radio>
                                </RadioGroup>
                            </div>
                            <div style={{
                                marginTop: '20px',
                                lineHeight: '18px'
                            }}
                            >
                                <Input onChange={this.text} type="textarea" rows={1} placeholder="请输入审批意见" />
                            </div>
                            <div style={{
                                marginTop: '30px',
                                textAlign: 'center'
                            }}
                            >
                                <Button type="primary" size="large" onClick={this.handleOk}>确认</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button size="large" onClick={this.handleCancel}>取消</Button>
                            </div>
                        </div>
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

export default WaterInfomation
