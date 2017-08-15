// 物业费明细
import React from 'react'
import {Row, Col, Button, Icon, notification, Popconfirm} from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../../api'
import PropertyFeePaidComponent from '../../../components/PropertyFee/PropertyPaidConfirm'


class PropertyFeeDetailNoPaid extends React.Component {
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
    async initialRemarks () {
        this.setState({
            id: this.props.match.params.id
        })
        let resulData = await apiPost(
            '/propertyFee/getPropertyFeeById',
            { id: this.props.match.params.id}
        )
        if (Math.floor(resulData.data.days) === resulData.data.days) {
            this.setState({
                monthDay: resulData.data.days,
                data: resulData.data,
                fileList: []
            })
        } else {
            this.setState({
                monthDay: parseFloat(resulData.data.days).toFixed(5),
                data: resulData.data,
                fileList: []
            })
        }
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        this.props.history.push('/home/financial/propertyFeeDetails/PropertyFeeDetailNoLate/' + this.props.match.params.id)
        // location.href = '/financial/PropertyFeeDetailNoLate/' + this.props.match.params.id
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    handleUpdate = () => {
        this.setState({
            openUpdate: true,
            id: this.state.id
        })
    }
    invoiceProperty = async () => {
        await apiPost(
            '/propertyFee/updatePropertyFee',
            {id: this.props.match.params.id,
                invoicePropertyStatus: 1}
        )
        notification.open({
            message: '物业费开票成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.history.push('/home/financial/propertyFeeDetails/PropertyFeeDetailNoPaid/' + this.props.match.params.id)
        // location.href = '/financial/PropertyFeeDetailNoPaid/' + this.props.match.params.id
    }
    render () {
        return (
            <div style={this.props.style} className="contract">
                <PropertyFeePaidComponent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <spn ><input value={this.state.data.clientName} />&nbsp;&nbsp;物业服务费统计表</spn>
                <span>({this.state.data.startDate}～{this.state.data.endDate})</span>
                <Row>
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
                            <td>{this.state.data.pmUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.monthDay}</td>
                            <td>{this.state.data.pmFee}</td>
                        </tr>
                        <tr>
                            <td>电梯费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.elevUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.monthDay}</td>
                            <td>{this.state.data.elevatorFee}</td>
                        </tr>
                        <tr>
                            <td>空调费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.acUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.data.acUnitDay}/4</td>
                            <td>{this.state.data.airFee}</td>
                        </tr>
                        <tr>
                            <td>水费</td>
                            <td>{this.state.data.serviceArea}</td>
                            <td>*</td>
                            <td>{this.state.data.waterUnitPrice}</td>
                            <td>*</td>
                            <td>{this.state.monthDay}</td>
                            <td>{this.state.data.waterFee}</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{margin: '20px 0',
                    textAlign: 'right'}}
                >优惠金额  ¥{this.state.data.discountMoney} 本期应收 ¥{this.state.data.actualPaidMoney}</p>

                <div className="wrapbox">
                    <div className="main">
                        <p className="line" />
                        <h2>其他信息</h2>
                        <Row>
                            <Col span={8}><i>录入日期：</i>{this.state.data.createName}&nbsp;&nbsp;{this.state.data.createDate}</Col>
                            <Col span={16}><i>最后修改：</i>{this.state.data.undateName}&nbsp;&nbsp;{this.state.data.updateDate}</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>审核人：</b>{this.state.data.auditName}&nbsp;&nbsp;{this.state.data.auditDate}</Col>
                            <Col span={16}><b>审核说明：</b>{this.state.data.remark}</Col>
                        </Row>
                    </div>
                </div>
                <div className="wrapbox">
                    <Button type="primary" onClick={this.handleUpdate} >确认收款</Button>
                    {this.state.data.invoicePropertyStatus !== 1 &&
                    <Popconfirm title="确定开票吗?" onConfirm={this.invoiceProperty}>
                        <a>&nbsp; 物业费开票 </a>
                    </Popconfirm>}
                </div>
            </div>
        )
    }
}

export default PropertyFeeDetailNoPaid

