import {Form, Select, Input, Button, Row, Col  } from 'antd'
import React from 'react'
const Option = Select.Option
const FormItem = Form.Item


class ContractHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none'
        }
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
            this.props.refresh(null, json, null)
        }
    }
    open = () => {
        if (this.state.open === '展开') {
            this.setState({
                open: '收起搜索',
                none: ''
            })
        } else {
            this.setState({
                open: '展开',
                none: 'none'
            })
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { ListBuildingInfo } = this.props
        return (
            <Form layout="inline">
                <Row>
                    <Col span={8}>
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
                    <Col span={8}>
                        <FormItem label="客户名称" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('clientName')(
                                <Input placeholder="请输入" style={{ width: 200 }} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="房间编号" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('roomNum')(
                                <Input placeholder="请输入" style={{ width: 200 }} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{display: this.state.none}}>
                    <Col span={8}>
                        <FormItem label="租金是否开票" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('invoiceRentStatus')(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择租金是否开票"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">未开票</Option>
                                    <Option key="1">已开票</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="收费状态" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('whetherRentPaid')(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择收费状态"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">未收款</Option>
                                    <Option key="1">已收全</Option>
                                    <Option key="2">未收全</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="打印状态" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('whetherPrinted')(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择打印状态"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">未打印</Option>
                                    <Option key="1">已打印</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Button onClick={this.handleSubmit}>搜索</Button>
                <Button onClick={this.open}>{this.state.open}</Button>
            </Form>
        )
    }
}

let ContractHeadComponent = Form.create()(ContractHead)

export default ContractHeadComponent
