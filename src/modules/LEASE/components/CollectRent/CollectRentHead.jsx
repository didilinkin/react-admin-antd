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
            none: 'none'
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
                none: ''
            })
        } else {
            this.setState({
                open: '展开',
                none: 'none'
            })
        }
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        if (dateString[1] > 0) {
            this.endDate = dateString[1] + ' 23:59:59'
        } else {
            this.endDate = dateString[1]
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let {type, ListBuildingInfo} = this.props
        return (
            <Form layout="horizontal">
                <Row>
                    <Col span={6}>
                        <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('buildId')(
                                <Select
                                    showSearch
                                    style={{ width: 150 }}
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
                    <Col span={6}>
                        <FormItem label="客户名称" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('rentClientName')(
                                <Input placeholder="请输入客户名称" style={{ width: 150 }} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="房间编号" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('roomNum')(
                                <Input placeholder="请输入房间编号" style={{ width: 150 }} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="交费周期" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('periodStatus')(
                                <Select
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder="请选择交费周期"
                                    optionFilterProp="children"
                                >
                                    <Option key="3">季付</Option>
                                    <Option key="6">半年付</Option>
                                    <Option key="12">年付</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {type === 2 &&
                <Row style={{display: this.state.none}}>
                    <Col span={8}>
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
                </Row>}
                {type === 2 &&
                <Row style={{display: this.state.none}}>
                    <Col span={8}>
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
                    <Col span={8}>
                        <FormItem label="" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <RangePicker onChange={this.getDate} />
                        </FormItem>
                    </Col>
                </Row>}
                <Row>
                    <Col span={16} />
                    <Col span={8}>
                        <div style={{paddingLeft: '25%',
                            marginBottom: 10}}
                        >
                            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>&nbsp;&nbsp;
                            <Button onClick={this.handleReset}>清除</Button>&nbsp;&nbsp;
                            {type === 2 &&
                            <Button onClick={this.open}>{this.state.open}</Button>}
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}

let ContractHeadComponent = Form.create()(CollectRentHead)

export default ContractHeadComponent
