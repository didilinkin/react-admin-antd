import {Form, Select, Input, Button, Row, Col, DatePicker  } from 'antd'
import React from 'react'
import WaterAddUpComponent from './WaterAddUp'
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker


class WaterBillHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none',
            openWaterAddUpComponent: false
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
            if (typeof (json.cxsj) !== 'undefined' && json.cxsj.length > 0) {
                json['startDate'] = json.cxsj[0].format('YYYY-MM-DD')
                json['endDate'] = json.cxsj[1].format('YYYY-MM-DD')
                json['cxsj'] = null
            }
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
    openWaterAddUpComponent = () => {
        this.setState({
            openWaterAddUpComponent: true
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { type, ListBuildingInfo } = this.props
        return (
            <div>
                <Form layout="horizontal">
                    <Row>
                        <Col span={6}>
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
                        <Col span={6}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('roomNumber')(
                                    <Input placeholder="请输入" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="客户名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('clientSubletName')(
                                    <Input placeholder="请输入" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{display: this.state.none}}>
                        <Col span={6}>
                            <FormItem label="查询依据" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('cycleClass')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="查询依据"
                                        optionFilterProp="children"
                                    >
                                        <Option key="2">实交日期</Option>
                                        <Option key="3">交费期限</Option>
                                        <Option key="1">抄表日期</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="查询时间" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('cxsj')(
                                    <RangePicker />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem label="收费状态" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('paymentState')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择收费状态"
                                        optionFilterProp="children"
                                    >
                                        <Option key="1">已收</Option>
                                        <Option key="2">未收</Option>
                                        <Option key="3">未收全</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="开票状态" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('billingState')(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择开票状态"
                                        optionFilterProp="children"
                                    >
                                        <Option key="1">已开票</Option>
                                        <Option key="2">未开票</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} >
                            {
                                type === 4 &&
                                <span>
                                    <Button >
                                批量打印
                                    </Button>
                            &nbsp;&nbsp;
                                    <Button >
                            导出
                                    </Button>
                                </span>
                            }
                            {
                                type === 1 &&
                            <span>
                                <Button onClick={this.openWaterAddUpComponent} type="primary">
                                添加水费
                                </Button>
                                &nbsp;&nbsp;
                                <Button type="primary">
                            提交财务
                                </Button>
                            </span>
                            }
                        </Col>
                        <Col span={8}>
                            <div style={{paddingLeft: '25%',
                                marginBottom: 10}}
                            >
                                <Button type="primary" onClick={this.handleSubmit}>
                        搜索
                                </Button>&nbsp;&nbsp;
                                { type === 4 &&
                            <span>
                                <Button
                                    onClick={this.handleReset}
                                >清除</Button>&nbsp;&nbsp;<Button onClick={this.open}>{this.state.open}</Button>
                            </span>
                                }
                            </div></Col>
                    </Row>
                </Form>
                <WaterAddUpComponent
                    title="添加水费"
                    refreshTable={this.handleSubmit}
                    visible={this.state.openWaterAddUpComponent}
                />
            </div>
        )
    }
}

let WaterBillHeadComponent = Form.create()(WaterBillHead)

export default WaterBillHeadComponent
