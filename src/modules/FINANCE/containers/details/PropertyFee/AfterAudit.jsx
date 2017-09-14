// 财务管理 - 物业费明细( 审核失败 )
import React from 'react'
import { Row, Col, Modal} from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../../api'


class AfterAudit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            auditStatus: 2,
            payPeriod: '',
            remark: '',
            view: true,
            monthDay: 0,
            isFirst: true,
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/propertyFee/getPropertyFeeById',
                {id: nextProps.id}
            )
            if (Math.floor(resulData.data.days) === resulData.data.days) {
                this.setState({
                    monthDay: resulData.data.days,
                    visible: nextProps.visible,
                    data: resulData.data,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            } else {
                this.setState({
                    monthDay: parseFloat(resulData.data.days).toFixed(5),
                    visible: nextProps.visible,
                    data: resulData.data,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    onChange = (e) => {
        this.setState({
            auditStatus: e.target.value
        })
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        return (
            <Modal maskClosable={false}
                title= "物业费明细"
                style={{top: 20}}
                width={900}
                visible={this.state.visible}
                footer={null}
                onCancel={this.handleCancel}
            >
                <Row style={{marginTop: 0}}>
                    <Col>
                        <div style={{textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            lineHeight: '40px'}}
                        >
                            <span>{this.state.data.printClientName}</span>
                            <span>物业服务费统计表</span>
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
                            （ {this.state.data.startDate} ~ {this.state.data.endDate} ）
                        </div>
                    </Col>
                </Row>
                <Row style={{margin: '10px 0'}}>
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
                            <td>{this.state.data.yearPmPrice === 0 ? this.state.data.pmUnitPrice : '--'}</td>
                            <td>*</td>
                            <td>{this.state.data.months}</td>
                            <td>{this.state.data.yearPmPrice === 0 ? this.state.data.pmFee : this.state.data.yearPmPrice}</td>
                        </tr>
                        <tr>
                            <td>电梯费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.elevUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.data.months}</td>
                            <td>{this.state.data.elevatorFee}</td>
                        </tr>
                        <tr>
                            <td>空调费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.yearAcPrice === 0 ? this.state.data.acUnitPrice : '--'}</td>
                            <td>*</td>
                            <td>{this.state.data.acUnitDay}/4</td>
                            <td>{this.state.data.yearAcPrice === 0 ? this.state.data.airFee : this.state.data.yearAcPrice}</td>
                        </tr>
                        <tr>
                            <td>水费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.waterType === 0 ? this.state.data.waterUnitPrice : '--'}</td>
                            <td>*</td>
                            <td>{this.state.data.months}</td>
                            <td>{this.state.data.waterType === 0 ? this.state.data.waterFee : '--'}</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{margin: '20px 0',
                    textAlign: 'right',
                    color: '#666666'}}
                >优惠金额：¥{this.state.data.discountMoney}&nbsp;&nbsp;&nbsp;&nbsp;本期应收：
                    <span style={{color: 'red',
                        fontSize: '18px'}}
                    >¥{this.state.data.actualPaidMoney}</span></p>
                <div className="other">
                    <div className="main">
                        <p className="line" />
                        <h2>其他信息</h2>
                        <Row style={{marginBottom: '10px'}}>
                            <Col span={10}><i>录入日期：</i>{this.state.data.createName}&nbsp;&nbsp;{this.state.data.createDate}</Col>
                            <Col span={14}><i>最后修改：</i>{this.state.data.updateName}&nbsp;&nbsp;{this.state.data.updateDate}</Col>
                        </Row>
                        {this.state.data.auditStatus !== 0 && this.state.data.auditStatus !== 1 &&
                        <Row>
                            <Col span={10}><b>审核人：</b>{this.state.data.auditName}&nbsp;&nbsp;{this.state.data.auditDate}</Col>
                            <Col span={14}><b>审核说明：</b>{this.state.data.auditStatus === 2 && '审核成功'}{this.state.data.auditStatus === 3 && '审核失败'}&nbsp;&nbsp;{this.state.data.remark}</Col>
                        </Row>}</div>
                </div>
            </Modal>
        )
    }
}

export default AfterAudit

