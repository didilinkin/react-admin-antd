// 收款
import React from 'react'
import { apiPost } from '../../../../../api/index'
import { Row, Col, Table, Button, Popconfirm, notification, Icon } from 'antd'
import PrincipalCollectionCom from '../../../components/WaterFee/PrincipalCollection'
import PenaltyCom from '../../../components/WaterFee/Penalty'
class CollectionDetails extends React.Component {
    state = {
        map: {
            WaterRecordList: [],
            waterBill: {},
            pmContract: {}
        },
        ChargeRecord5: [],
        ChargeRecord6: [],
        openPrincipalCollection: false,
        openDefaultCollection: false,
        id: 0
    }
    async initialRemarks (nextProps) {
        let map = await apiPost(
            '/propertyFee/getWaterBill',
            {id: this.props.match.params.id}
        )
        map = map.data
        let ChargeRecord5 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 5}
        )
        let ChargeRecord6 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 6}
        )
        this.setState({
            ChargeRecord5: ChargeRecord5.data,
            ChargeRecord6: ChargeRecord6.data,
            map: {
                WaterRecordList: map.list,
                waterBill: map.waterBill,
                pmContract: map.pmContract
            }
        })
    }

    componentDidMount () {
        this.initialRemarks()
    }
    openPrincipalCollection = () => {
        this.setState({
            openPrincipalCollection: true,
            openDefaultCollection: false,
            id: this.props.match.params.id
        })
    }
    penalty = () => {
        this.setState({
            openPrincipalCollection: false,
            openDefaultCollection: true,
            id: this.props.match.params.id
        })
    }
    refresh = async () => {
        let map = await apiPost(
            '/propertyFee/getWaterBill',
            {id: this.props.match.params.id}
        )
        map = map.data
        let ChargeRecord5 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 5}
        )
        let ChargeRecord6 = await apiPost(
            '/collectRent/getChargeRecordById',
            {feeId: this.props.match.params.id,
                feeType: 6}
        )
        this.setState({
            ChargeRecord5: ChargeRecord5.data,
            ChargeRecord6: ChargeRecord6.data,
            openPrincipalCollection: false,
            openDefaultCollection: false,
            map: {
                WaterRecordList: map.list,
                waterBill: map.waterBill,
                pmContract: map.pmContract
            }
        })
    }
    PrincipalBilling = async () => {
        let Principal = await apiPost(
            '/WaterBill/PrincipalBilling',
            {id: this.props.match.params.id,
                billingState: 1}
        )
        notification.open({
            message: Principal.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    DefaultBilling = async () => {
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
    nextMonth = async () => {
        let data = await apiPost(
            '/WaterBill/nextMonth',
            {id: this.props.match.params.id}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
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
        const dangerButtonStyle = {
            color: '#fff',
            backgroundColor: '#f04134',
            borderColor: '#f04134',
            marginLeft: 20
        }
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
                        fontSize: '14px'}}
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
                                <span style={lightGrayStyle} >交费期限：</span>
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
                        fontSize: '14px',
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
                                <span style={{fontSize: '18px',
                                    color: 'red'}}
                                >￥{this.state.map.waterBill.receivableMoney}</span>
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
                                {(this.state.map.waterBill.penaltyPaidMoney > 0 || this.state.map.waterBill.penaltyType === 1) &&
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
                    <div>
                        <hr style={{
                            marginTop: 20,
                            color: '#EBEBEB'
                        }}
                        />
                        <div style={{
                            margin: '20px 0',
                            textAlign: 'center'
                        }}
                        >
                            {this.state.map.waterBill.paymentState !== 1 &&
                            <Button type="primary" size="normal" onClick={this.openPrincipalCollection}>确认收款</Button>
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {this.state.map.waterBill.billingState === 2 &&
                            <Popconfirm title="确认开票吗?" onConfirm={this.PrincipalBilling}>
                                <Button type="danger" style={dangerButtonStyle} size="normal">确认开票</Button>
                            </Popconfirm>
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {this.state.map.waterBill.paymentState === 1 && this.state.map.waterBill.defaultPaymentStatus !== 1 && this.state.map.waterBill.penaltyTotalMoney > 0 &&
                            <span>
                                {!this.state.ChargeRecord6.length > 0 &&
                                <Popconfirm title="请选择违约金交费方式?" onConfirm={this.penalty} onCancel={this.nextMonth} okText="实收违约金" cancelText="延期下月电费">
                                    <Button type="primary" size="normal">确认违约金</Button>
                                </Popconfirm>
                                }
                            </span>
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {this.state.map.waterBill.paymentState === 1 && this.state.map.waterBill.penaltyTotalMoney > 0 && this.state.map.waterBill.principalDamagesBilling === 2 &&
                            <Popconfirm title="确认违约金开票?" onConfirm={this.DefaultBilling}>
                                <Button type="danger" style={dangerButtonStyle} size="normal">确认违约金开票</Button>
                            </Popconfirm>
                            }
                        </div>
                    </div>

                </div>
                <PrincipalCollectionCom
                    visible={this.state.openPrincipalCollection}
                    id={this.state.id}
                    refresh={this.refresh}
                />
                <PenaltyCom
                    visible={this.state.openDefaultCollection}
                    id={this.state.id}
                    refresh={this.refresh}
                />
            </div>
        )
    }
}

export default CollectionDetails
