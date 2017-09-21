import {Form, Select, Input, Button, Row, Col, DatePicker } from 'antd'
import React from 'react'
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker


class CollectRentHead extends React.Component {
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
            json['startDate'] = this.startDate
            json['endDate'] = this.endDate
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
    startDate = null
    endDate = null
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        if (dateString[1] > 0) {
            this.endDate = dateString[1] + ' 23:59:59'
        } else {
            this.endDate = dateString[1]
        }
    }
    enter = (event) => {
        if (event.keyCode === 13) { // enter 键
            this.handleSubmit()
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let {type, ListBuildingInfo} = this.props
        let spanEight = this.state.openState ? 8 : 6
        return (
            <div onKeyDown={this.enter}>
                <Form layout="horizontal">
                    <Row>
                        <Col span={spanEight}>
                            <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 10 }}
                            >
                                {getFieldDecorator('buildId')(
                                    <Select
                                        showSearch
                                        allowClear
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
                        <Col span={spanEight}>
                            <FormItem label="客户名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('rentClientName')(
                                    <Input placeholder="请输入客户名称" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={spanEight}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('roomNum')(
                                    <Input placeholder="请输入房间编号" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        {this.state.openState ||
                    <Col span={spanEight}>
                        <Button style={{marginRight: '10px'}} type="primary" onClick={this.handleSubmit}>搜索</Button>
                        <Button onClick={this.handleReset}>清除</Button>
                        {type === 2 &&
                        <a style={{marginLeft: '10px'}} onClick={this.open}>{this.state.open}</a>
                        }
                    </Col>
                        }
                        {this.state.openState &&
                    <div>
                        <Col span={spanEight}>
                            <FormItem label="开票状态" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('invoiceRentStatus')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择开票状态"
                                        optionFilterProp="children"
                                    >
                                        <Option key="0">未开票</Option>
                                        <Option key="1">已开票</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={spanEight}>
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
                        <Col span={spanEight}>
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
                        <Col span={spanEight}>
                            <FormItem label="查询依据" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('dateSelect')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择查询依据"
                                        optionFilterProp="children"
                                    >
                                        <Option key="0">实交日期</Option>
                                        <Option key="1">交费期限</Option>
                                        <Option key="2">费用周期</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={spanEight}>
                            <FormItem label="查询日期" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 13 }}
                            >
                                <RangePicker onChange={this.getDate} />
                            </FormItem>
                        </Col>
                    </div>
                        }
                    </Row>
                    {this.state.openState &&
                <Row style={{marginBottom: '10px'}}>
                    <Col span={16} />
                    {this.state.openState &&
                    <Col span={8}>
                        <div style={{paddingLeft: '25%'}}>
                            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
                            <Button style={{margin: '0 10px'}} onClick={this.handleReset}>清除</Button>
                            <a onClick={this.open}>{this.state.open}</a>
                        </div>
                    </Col>
                    }
                </Row>
                    }
                </Form>
            </div>
        )
    }
}

let ContractHeadComponent = Form.create()(CollectRentHead)

export default ContractHeadComponent
