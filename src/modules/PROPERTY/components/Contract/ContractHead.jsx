import {Form, Select, Input, Button, Row, Col } from 'antd'
import React from 'react'
const Option = Select.Option
const FormItem = Form.Item


class ContractHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none',
            openState: false
        }
    }
    // 清除
    handleReset = () => {
        this.props.form.resetFields()
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let adopt = false
        this.props.form.validateFields(
            (err) => {
                if (err) {
                    adopt = false
                } else {
                    adopt = true
                }
            },
        )
        if (adopt) {
            let json = this.props.form.getFieldsValue()
            for (let key in json) {
                if (json[key] === '') {
                    json[key] = null
                }
            }
            this.props.refresh(null, json, null)
        }
    }
    open = () => {
        if (this.state.open === '展开') {
            this.setState({
                open: '收起搜索',
                none: '',
                openState: true
            })
        } else {
            this.setState({
                open: '展开',
                none: 'none',
                openState: false
            })
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { type, ListBuildingInfo } = this.props
        console.log(ListBuildingInfo)
        let contractSplit = []
        if (type === 1) {
            contractSplit = [<Option key="1">范本合同</Option>, <Option key="2">仅水电合同</Option>]
        } else {
            contractSplit = [<Option key="1">范本合同</Option>, <Option key="2">欢乐颂合同</Option>]
        }
        let spanNumber = this.state.openState ? 8 : 6
        return (
            <Form layout="horizontal">
                <Row>
                    <Col span={spanNumber}>
                        <FormItem label="合同类型" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('contractSplit')(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择合同类型"
                                    optionFilterProp="children"
                                >
                                    {contractSplit}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={spanNumber}>
                        <FormItem label="客户名称" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('clientName')(
                                <Input placeholder="请输入" style={{ width: 200 }} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={spanNumber}>
                        <FormItem label="房间编号" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('leaseRooms')(
                                <Input placeholder="请输入" style={{ width: 200 }} />
                            )}
                        </FormItem>
                    </Col>
                    {this.state.openState ||
                <Col span={spanNumber}>
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
                        <Button style={{margin: '0 10px'}} onClick={this.handleReset}>清除</Button>
                        <a onClick={this.open}>{this.state.open}</a>
                    </div>
                </Col>
                    }
                    {this.state.openState &&
                    <div>
                        <Col span={spanNumber}>
                            <FormItem label="合同状态" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('contractStatus')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择合同状态"
                                        optionFilterProp="children"
                                    >
                                        <Option key="0">执行中</Option>
                                        <Option key="1">已终止</Option>
                                        <Option key="2">未开始</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={spanNumber}>
                            <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('buildId')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择所属楼宇"
                                        optionFilterProp="children"
                                    >
                                        {ListBuildingInfo.map(BuildingInfo => {
                                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={spanNumber}>
                            <FormItem label="临期查询" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('Advent')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择临期查询"
                                        optionFilterProp="children"
                                    >
                                        <Option key="1">一个月</Option>
                                        <Option key="3">一个季度</Option>
                                        <Option key="6">半年</Option>
                                        <Option key="12">一年</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </div>
                    }
                </Row>
                {this.state.openState &&
                <Row>
                    <Col span={16} />
                    <Col span={8}>
                        <div style={{paddingLeft: '25%',
                            marginBottom: 10}}
                        >
                            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
                            <Button style={{margin: '0 10px'}} onClick={this.handleReset}>清除</Button>
                            <a onClick={this.open}>{this.state.open}</a>
                        </div>
                    </Col>
                </Row>
                }
            </Form>
        )
    }
}

let ContractHeadComponent = Form.create()(ContractHead)

export default ContractHeadComponent
