// 客户管理 - 合同管理 - 电费详情 [详情]
import React from 'react'
import { Row, Col } from 'antd'
import '../../../style/test.less'
import { apiPost } from '../../../../../api'
import TerminationComponent from '../../../components/Contract/Termination'

class ElectricityDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            TerminationComponentOpen: false,
            contract: {}
        }
    }
    async initialRemarks () {
        let contract = await apiPost(
            '/contract/getcontract',
            {'id': this.props.match.params.id,
                type: 1}
        )
        this.setState({
            contract: contract.data.contract
        })
        console.log(contract.data.contract)
    }
    componentWillMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        let contract = await apiPost(
            '/contract/getcontract',
            {'id': this.props.match.params.id,
                type: 1}
        )
        this.setState({
            contract: contract.data.contract,
            TerminationComponentOpen: false
        })
    }
    TerminationComponent = () => {
        this.setState({
            TerminationComponentOpen: true
        })
    }
    render () {
        return (
            <div className="contract">
                <h2>房源信息</h2>
                <Row>
                    <Col span={8}><b>所属楼宇：</b>{this.state.contract.buildName} </Col>
                    <Col span={8}><b>服务面积：</b>{this.state.contract.serviceArea} &nbsp;㎡</Col>
                    <Col span={8} />
                </Row>
                <Row>
                    <Col span={24}><b>房间编号：</b>{this.state.contract.leaseRooms} </Col>
                </Row>
                <div className="wrapbox">
                    <div className="title">
                        客户信息
                    </div>
                    <div className="main">
                        <h3>客户信息</h3>
                        <Row>
                            <Col span={8}><b>物业客户名称：</b>{this.state.contract.clientName} </Col>
                            <Col span={8}><b>联系人：</b>{this.state.contract.contactPerson}</Col>
                            <Col span={8}><b>经理电话：</b>{this.state.contract.phoneManager}</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>行政电话：</b>{this.state.contract.phoneAdmin} </Col>
                            <Col span={8}><b>财务电话：</b>{this.state.contract.phoneFinance} </Col>
                            <Col span={8}><b>E-mail：</b>{this.state.contract.email}</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>签约日期：</b>{this.state.contract.signDate} </Col>
                            <Col span={8}><b>公司编号：</b>{this.state.contract.clientNum} </Col>
                            <Col span={8} />
                        </Row>
                    </div>
                </div>
                <div className="wrapbox">
                    <div className="title">
                        日期信息
                    </div>
                    <div className="main">
                        <Row>
                            <Col span={8}><b>服务周期：</b>{this.state.contract.startDate} -- {this.state.contract.endDate}</Col>
                            <Col span={16}><b>录入时间：</b>{this.state.contract.createName} {this.state.contract.createDate}</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>合同编号：</b>{this.state.contract.contractCode} </Col>
                            <Col span={16}><b>最后修改：</b>{this.state.contract.updateName} {this.state.contract.updateDate}</Col>
                        </Row>
                        {this.state.contract.contractStatus === 1 &&
                        <div>
                            <p className="line" />
                            <Row>
                                <Col span={16}><b>终止原因：</b>{this.state.contract.remark}</Col>
                                <Col span={8} />
                            </Row>
                        </div>
                        }
                    </div>
                </div>

                <div className="wrapbox">
                    <div className="title">
                        物业费设置
                    </div>
                    <div className="main">
                        <Row>
                            <Col span={16}><b>电费收费方式：</b>
                                {this.state.contract.powerType === 0 &&
                                <em className="color1">
                                    固定单价
                                </em>}
                                {this.state.contract.powerType === 1 &&
                                <em className="color1">
                                    差额单价
                                </em>}
                                {this.state.contract.powerType === 2 &&
                                <em className="color1">
                                    功峰平谷
                                </em>}
                                单价 <em className="color1">{this.state.contract.powerUnitPrice}</em> 元/度  变比 <em className="color1">{this.state.contract.powerRatio}</em> 电损比 <em className="color1">{this.state.contract.powerLossRatio}</em>%</Col>
                        </Row>
                        <Row>
                            <Col span={16}><b>水费收费方式：</b>
                                {this.state.contract.waterType === 0 &&
                                <em className="color1">按面积</em>
                                }
                                {this.state.contract.waterType === 1 &&
                                <em className="color1">独立水表</em>
                                }
                                单价 <em className="color1">{this.state.contract.waterUnitPrice}</em> 元/立方米
                                {this.state.contract.waterType === 1 &&
                                <span>耗损比 <em className="color1">{this.state.contract.waterLossRatio}</em>%</span>
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
                {this.state.contract.contractStatus === 0 &&
                <div onClick={this.TerminationComponent} className="submit">
                    终止合同
                </div>
                }
                <TerminationComponent
                    id={this.props.match.params.id}
                    refreshTable={this.refresh}
                    visible={this.state.TerminationComponentOpen}
                />
            </div>
        )
    }
}

export default ElectricityDetail

