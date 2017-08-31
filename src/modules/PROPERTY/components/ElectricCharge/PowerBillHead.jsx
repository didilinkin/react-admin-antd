import {Form, Select, Input, Button, Row, Col, DatePicker, notification, Icon} from 'antd'
import React from 'react'
import PowerAddUpComponent from './PowerAddUp'
import { apiPost } from '../../../../api'
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker


class PowerBillHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none',
            openPowerAddUpComponent: false,
            openPowerInfomationComponent: false
        }
    }
    // 清除
    handleReset = () => {
        this.props.form.resetFields()
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.order.toString() !== nextProps.type.toString()) {
            this.props.form.resetFields()
        }
    }
    // 单击确定按钮提交表单q
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
            json['type'] = this.props.type
            this.setState({
                openPowerAddUpComponent: false
            })
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
    openPowerAddUpComponent = () => {
        this.setState({
            openPowerAddUpComponent: true
        })
    }
    BatchAuditWaterBill = async () => {
        let data = await apiPost(
            '/ElectricityFees/updateAuditList',
            {ids: this.props.RowKeys.toString()}
        )
        notification.open({
            message: data.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.handleSubmit()
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { type, ListBuildingInfo } = this.props
        return (
            <div>
                <Form layout="horizontal">
                    <Row>
                        <Col span={8}>
                            <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
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
                        <Col span={8}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('roomNumber')(
                                    <Input placeholder="请输入" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
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
                        <Col span={8}>
                            <FormItem label="查询依据" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('cycleClass')(
                                    <Select
                                        showSearch
                                        allowClear
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
                        <Col span={8}>
                            <FormItem label="查询时间" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('cxsj')(
                                    <RangePicker />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={8}>
                            <FormItem label="收费状态" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('paymentState')(
                                    <Select
                                        allowClear
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
                        <Col span={8}>
                            <FormItem label="开票状态" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('billingState')(
                                    <Select
                                        showSearch
                                        allowClear
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
                                    <Button onClick={this.openPowerAddUpComponent} type="primary">
                                        添加电费
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button type="primary" onClick={this.BatchAuditWaterBill}>
                                        提交财务
                                    </Button>
                                </span>
                            }
                        </Col>
                        <Col span={8}>
                            <div style={{paddingLeft: '25%',
                                marginBottom: 10}}
                            >
                                <Button type="primary" onClick={this.handleSubmit}>搜索</Button>&nbsp;&nbsp;
                                <Button onClick={this.handleReset}>清除</Button>&nbsp;&nbsp;
                                { type === 4 &&
                                <Button onClick={this.open}>{this.state.open}</Button>
                                }
                            </div></Col>
                    </Row>
                </Form>
                <PowerAddUpComponent
                    title="添加电费"
                    refreshTable={this.handleSubmit}
                    visible={this.state.openPowerAddUpComponent}
                />
            </div>
        )
    }
}

let PowerBillHeadComponent = Form.create()(PowerBillHead)

export default PowerBillHeadComponent
