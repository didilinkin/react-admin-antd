// 客户管理 - 合同管理 - 合同管理 [详情]
import React from 'react'
import { Row, Col, notification, Icon, Popconfirm, Button } from 'antd'
import '../../../style/test.less'
import { apiPost } from '../../../../../api'
import SubletAddUpCom from '../../../components/Contract/SubletAddUp'
import TerminationComponent from '../../../components/Contract/Termination'

class ContractDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            ListSublet: [],
            contract: {},
            id: 0,
            roomNum: '',
            SubletOpen: false,
            TerminationComponentOpen: false,
            title: ''
        }
    }
    async initialRemarks () {
        let contract = await apiPost(
            '/contract/getcontract', {
                'id': this.props.match.params.id,
                type: 1
            }
        )
        this.setState({
            roomNum: contract.data.roomNum,
            ListSublet: contract.data.subletInfoList,
            contract: contract.data.contract
        })
        console.log(contract.data.contract)
        console.log(contract.data.subletInfoList)
    }
    componentWillMount () {
        this.initialRemarks()
    }
    SubletOpen = (id) => {
        if (id > 0) {
            this.setState({
                id: id,
                SubletOpen: true,
                TerminationComponentOpen: false,
                title: '编辑转租信息'
            })
        } else {
            this.setState({
                id: id,
                SubletOpen: true,
                TerminationComponentOpen: false,
                title: '添加转租信息'
            })
        }
    }
    deleteSublet = async (id) => {
        let data = await apiPost(
            '/contract/deleteSublet',
            {'id': id}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    refresh = async () => {
        let contract = await apiPost(
            '/contract/getcontract',
            {'id': this.props.match.params.id,
                type: 1}
        )
        this.setState({
            ListSublet: contract.data.subletInfoList,
            contract: contract.data.contract,
            id: 0,
            SubletOpen: false,
            TerminationComponentOpen: false,
            title: ''
        })
    }
    TerminationComponent = () => {
        this.setState({
            SubletOpen: false,
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
                    <Col span={8}><b>房间编号：</b>{this.state.contract.leaseRooms} </Col>
                </Row>
                <div className="wrapbox">
                    <div className="title">
                        客户信息
                    </div>
                    <div className="main">
                        <h3>客户信息 <span onClick={this.SubletOpen.bind(this, 0)} className="blue">添加转租信息</span></h3>
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
                        {this.state.ListSublet.map((sublet, i) => {
                            return <div key={i}>
                                <p className="line" />
                                <h3>转租信息 <span onClick={this.SubletOpen.bind(this, sublet.id)} className="green">编辑</span>
                                    <Popconfirm key="1" title="确定删除吗?" onConfirm={this.deleteSublet.bind(this, sublet.id)}>
                                        <span className="red">删除</span>
                                    </Popconfirm>
                                </h3>
                                <Row>
                                    <Col span={8}><b>租户名称：</b>{sublet.tenant} </Col>
                                    <Col span={8}><b>联系人：</b>{sublet.contactPerson}</Col>
                                    <Col span={8}><b>行政电话：</b>{sublet.phoneAdmin}</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>财务电话：</b>{sublet.phoneFinance} </Col>
                                    <Col span={8}><b>经理电话：</b>{sublet.phoneManager}</Col>
                                    <Col span={8}><b>E-mail：</b>{sublet.email}</Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>转租周期：</b>{sublet.subletStartDate} ~ {sublet.subletEndDate} </Col>
                                    <Col span={16}><b>转租房间：</b>{sublet.roomNum} </Col>
                                </Row>
                                <Row>
                                    <Col span={8}><b>公司编号：</b>{sublet.tenantNum} </Col>
                                    <Col span={8} />
                                    <Col span={8} />
                                </Row>
                            </div>
                        })}
                    </div>
                </div>
                <div className="wrapbox">
                    <div className="title">
                        日期信息
                    </div>
                    <div className="main">
                        <Row>
                            <Col span={8}><b>服务周期：</b>{this.state.contract.startDate} ~ {this.state.contract.endDate}</Col>
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
                            {
                                this.state.contract.yearPmPrice > 0 &&
                                <Col span={8}><b>年物业费：</b><em className="color1">{this.state.contract.yearPmPrice}</em>元 </Col>
                            }
                            {
                                this.state.contract.pmUnitPrice > 0 &&
                                <Col span={8}><b>物业费单价：</b><em className="color1">{this.state.contract.pmUnitPrice}</em> 元／㎡/月</Col>
                            }
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
                                        单价
                                <em className="color1">{this.state.contract.powerUnitPrice}
                                </em> 元/度
                                <span style={{marginLeft: '20px'}}>
                                    变比
                                    <em className="color1">{this.state.contract.powerRatio}</em> 电损比
                                    <em className="color1">{this.state.contract.powerLossRatio}</em>%
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.contract.yearAcPrice > 0 &&
                                <Col span={8}><b>年空调费：</b><em className="color1">{this.state.contract.yearAcPrice}</em> 元</Col>
                            }
                            {this.state.contract.acUnitPrice > 0 &&
                            <Col span={8}><b>空调费单价：</b><em className="color1">{this.state.contract.acUnitPrice}</em> 元／㎡/天 （{this.state.contract.acUnitDay}天） </Col>
                            }
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
                        <Row>
                            <Col span={8}><b>电梯费单价：</b><em className="color1">{this.state.contract.elevUnitPrice}</em> 元／㎡/月 </Col>
                            <Col span={16}><b>能源管理押金：</b><em className="color1">{this.state.contract.energy}</em> 元 （
                                {this.state.contract.isSublet === 0 &&
                                <em className="color1">业主自交</em>
                                }
                                {this.state.contract.isSublet === 1 &&
                                <em>转租自交</em>
                                }
                                当前余额：{this.state.contract.currentBalance} 元）</Col>
                        </Row>
                        <ul>
                            <li>
                                <b>业主自交房间：</b>
                                {this.state.roomNum}
                            </li>
                        </ul>
                    </div>
                </div>
                {this.state.contract.contractStatus === 0 &&
                <div>
                    <Button size="large" className="btn-danger" type="danger" onClick={this.TerminationComponent}>终止合同</Button>
                </div>
                }
                <SubletAddUpCom
                    id={this.state.id}
                    refresh={this.refresh}
                    data={{
                        ListSublet: this.state.ListSublet,
                        contract: this.state.contract
                    }}
                    visible={this.state.SubletOpen}
                    title={this.state.title}
                />
                <TerminationComponent
                    id={this.props.match.params.id}
                    refreshTable={this.refresh}
                    visible={this.state.TerminationComponentOpen}
                />
            </div>
        )
    }
}

export default ContractDetail


