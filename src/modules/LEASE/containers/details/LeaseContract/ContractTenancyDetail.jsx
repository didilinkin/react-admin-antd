// 客户管理 - 合同管理 - 合同管理 [详情]
import React from 'react'
import { Row, Col, Table } from 'antd' // Button
import '../../../style/test.less'
import styled from 'styled-components'
import elf from '../../../../../elf'
import { apiPost } from '../../../../../api'
import TerminationComponent from '../../../components/LeaseContract/Termination'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            TerminationComponentOpen: false,
            contract: {},
            dataSource: [],
            columns: [
                {
                    title: '租赁开始时间',
                    dataIndex: 'startDate'
                }, {
                    title: '租赁结束时间',
                    dataIndex: 'endDate'
                }, {
                    title: '交费期限',
                    dataIndex: 'payDeadline'
                }, {
                    title: '金额',
                    dataIndex: 'currentPeriodMoney'
                }, {
                    title: '优惠金额',
                    dataIndex: 'discountMoney'
                }, {
                    title: '实际应收',
                    dataIndex: 'actualPaidMoney'
                }, {
                    title: '未收租金',
                    dataIndex: 'unpaidMoney'
                }
            ]
        }
    }
    async initialRemarks () {
        let contract = await apiPost(
            '/contract/getcontract', {
                'id': this.props.match.params.id,
                type: 2
            }
        )
        this.setState({
            dataSource: contract.data.list,
            contract: contract.data.contract
        })
        console.log(contract.data.contract)
        console.log(contract.data.subletInfoList)
    }
    componentWillMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        let contract = await apiPost(
            '/contract/getcontract', {
                'id': this.props.match.params.id,
                type: 2
            }
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
                {/* 因特殊需求, 暂时隐藏此标题内容; 不确定后期是否要改回: start */}
                {/*
                    <h2>房源信息</h2>
                    <Row>
                        <Col span={ 8 }><b>所属楼宇：</b>{ this.state.contract.buildName } </Col>
                        <Col span={ 8 }><b>服务面积：</b>{ this.state.contract.leaseArea } &nbsp;㎡</Col>
                        <Col span={ 8 }><b>房间编号：</b>{ this.state.contract.leaseRooms }</Col>
                    </Row>
                */}
                {/* 因特殊需求, 暂时隐藏此标题内容; 不确定后期是否要改回: end */}

                {/* 测试修改 wrapbox: start */}
                <div className="wrapbox">
                    <div className="title"> 房源信息 </div>
                    <div className="main">
                        <Row>
                            <Col span={8}><b>所属楼宇：</b>{this.state.contract.buildName} </Col>
                            <Col span={8}><b>服务面积：</b>{this.state.contract.leaseArea} &nbsp;㎡</Col>
                            <Col span={8}><b>房间编号：</b>{this.state.contract.leaseRooms}</Col>
                        </Row>
                    </div>
                </div>
                {/* 测试修改 wrapbox: end */}

                <div className="wrapbox">
                    <div className="title">
                        客户信息
                    </div>
                    <div className="main">
                        <Row>
                            <Col span={8}><b>租赁客户名称：</b>{this.state.contract.rentClientName}</Col>
                            <Col span={8}><b>联系人：</b>{this.state.contract.contactPerson}</Col>
                            <Col span={8}><b>经理电话：</b>{this.state.contract.phoneManager}</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>行政电话：</b>{this.state.contract.phoneAdmin} </Col>
                            <Col span={8}><b>财务电话：</b>{this.state.contract.phoneFinance}</Col>
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
                            <Col span={8}><b>租赁周期：</b>{this.state.contract.startDate}  ~ {this.state.contract.endDate} </Col>
                            <Col span={16}><b>录入时间：</b>{this.state.contract.createName} ({this.state.contract.createDate})</Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>合同编号：</b>{this.state.contract.contractCode} </Col>
                            <Col span={16}><b>最后修改：</b>{this.state.contract.updateName} ({this.state.contract.updateDate})</Col>
                        </Row>
                        {this.state.contract.contractStatus === 1 &&
                        <Row>
                            <Col span={8}><b>终止日期：</b>{this.state.contract.updateName}  ({this.state.contract.updateDate})</Col>
                            <Col span={16}><b>终止原因：</b>{this.state.contract.remark}</Col>
                        </Row>
                        }
                    </div>
                </div>
                <div className="wrapbox">
                    <div className="title">
                        租赁费用
                    </div>
                    <div className="main">
                        <Row>
                            <Col span={8}>
                                <b>收费方式：</b>
                                <span className="color1">
                                    {this.state.contract.payType === 1 && '按单价递增'}
                                    {this.state.contract.payType === 0 && '按首年递增'}
                                </span>
                            </Col>
                            <Col span={8}><b>合同单价：</b><span className="color1">{this.state.contract.unitPrice}</span> 元/㎡/天</Col>
                            <Col span={8}><b>首年租金：</b><span className="color1">{this.state.contract.firstYearRent}</span> 元 </Col>
                        </Row>
                        <Row>
                            <Col span={8}><b>交费周期：</b>
                                <span className="color1">
                                    {this.state.contract.payCycle === 1 ? '月付' : this.state.contract.payCycle === 3 ? '季付' : this.state.contract.payCycle === 6 ? '半年付' : '年付' }
                                </span>
                            </Col>
                            <Col span={8}><b>免租期：</b>{this.state.contract.freeStartDate} - {this.state.contract.freeEndDate}</Col>
                            <Col span={8}><b>免租金额：</b><span className="color1">{this.state.contract.freeRent}</span> 元</Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <span className="color1">{this.state.contract.startIncNum}</span> 年后租金每年递增 <span className="color1">{this.state.contract.rentIncrRate}</span> %
                            </Col>
                            <Col span={16}>
                                <b>租赁保证金：</b>
                                <span className="color1"> {this.state.contract.depositMoney} </span> 元(当前余额：<span className="color1">{this.state.contract.currentBalance}</span>元) &nbsp;
                            </Col>
                        </Row>
                        <p className="line" />
                        <Table
                            bordered
                            dataSource={this.state.dataSource}
                            columns={this.state.columns}
                        />
                        <ButtonBox>
                            {
                                this.state.contract.contractStatus === 0 &&
                                <TerminationBtn
                                    className="termination"
                                    onClick={this.TerminationComponent}
                                >
                                    {
                                        console.dir(this)
                                    }
                                    终止合同
                                </TerminationBtn>
                            }
                            <style>
                                {`
                                    .termination :hover {
                                        background-color: #FFF;
                                        color: red;
                                    }
                                `}
                            </style>
                        </ButtonBox>
                    </div>
                </div>
                <TerminationComponent
                    id={this.props.match.params.id}
                    type="2"
                    refreshTable={this.refresh}
                    visible={this.state.TerminationComponentOpen}
                />
            </div>
        )
    }
}

// style
const ButtonBox = styled.div `
    ${elf.m.flexCenter}
`

const TerminationBtn = styled.button `
    background-color: red;
    color: #FFF;
`

// background-color: ${props => props.active ? 'red' : 'yellow'}; // hover状态

export default App


