import {Form, Select, Input, Button, Row, Col, DatePicker, notification, Icon} from 'antd'
import React from 'react'
import PropertyAddComponent from '../../components/PropertyFee/PropertyFeeAdd'
import { apiPost } from '../../../../api'
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker


class CollectRentHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none',
            openPropertyAdd: false,
            openState: false
        }
    }
    // 清除
    handleReset = () => {
        this.props.form.resetFields()
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            openPropertyAdd: true
        })
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
    close = async () => {
        this.setState({
            openPropertyAdd: false
        })
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
    BatchAuditPropertyFee = async () => {
        if (this.props.RowKeys !== null && this.props.RowKeys !== '') {
            await apiPost(
                '/propertyFee/BatchAuditProperty',
                {ids: this.props.RowKeys.toString(),
                    auditStatus: 1}
            )
            notification.open({
                message: '提交成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.handleSubmit()
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { type, ListBuildingInfo} = this.props
        let fourOpen = (this.props.type === 2) && this.state.openState
        let spanEight = fourOpen ? 8 : 6
        return (
            <div>
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
                                {getFieldDecorator('clientName')(
                                    <Input placeholder="请输入客户名称" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={spanEight}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                                {getFieldDecorator('roomNum')(
                                    <Input placeholder="请输入房间编号" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        {!this.state.openState &&
                        <Col span={spanEight}>
                            <div>
                                <Button style={{marginRight: '10px'}} type="primary" onClick={this.handleSubmit}>搜索</Button>
                                <Button onClick={this.handleReset}>清除</Button>
                                {type === 2 &&
                                <a style={{marginLeft: '10px'}} onClick={this.open}>{this.state.open}</a>
                                }
                            </div>
                        </Col>
                        }
                        {fourOpen &&
                        <div>
                            <Col span={spanEight}>
                                <FormItem label="开票状态" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('invoicePropertyStatus')(
                                        <Select
                                            showSearch
                                            allowClear
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
                                            allowClear
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
                                            allowClear
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
                                <FormItem label="查询类型" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('dateSelect')(
                                        <Select
                                            showSearch
                                            allowClear
                                            style={{ width: 200 }}
                                            placeholder="请选择查询类型"
                                            optionFilterProp="children"
                                        >
                                            <Option key="0">实交日期</Option>
                                            <Option key="1">交费期限</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={spanEight}>
                                <FormItem label="查询日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 13 }}
                                >
                                    <RangePicker style={{ width: 200 }} onChange={this.getDate} />
                                </FormItem>
                            </Col>
                        </div>
                        }
                    </Row>
                    <Row style={{marginBottom: '10px'}}>
                        <Col span={16} >
                            {
                                type === 2 &&
                                <span>
                                    <Button style={{marginRight: '10px'}}
                                        onClick={() => {
                                            window.open('http://192.168.5.24:18082/propertyFee/print?ids=' + this.props.RowKeys + '&source=' + 1)
                                        }}
                                    >批量打印</Button>
                                    <Button >导出</Button>
                                </span>
                            }
                            {
                                type === 0 &&
                                <span>
                                    <Button style={{marginRight: '10px'}} onClick={this.showModal} type="primary">添加物业费</Button>
                                    <Button onClick={this.BatchAuditPropertyFee} type="primary">提交财务</Button>
                                </span>
                            }
                        </Col>
                        {fourOpen &&
                        <Col span={8}>
                            <div style={{paddingLeft: '25%'}}>
                                <Button style={{marginRight: '10px'}} type="primary" onClick={this.handleSubmit}>搜索</Button>
                                <Button style={{marginRight: '10px'}} onClick={this.handleReset}>清除</Button>
                                <a onClick={this.open}>{this.state.open}</a>
                            </div>
                        </Col>
                        }
                    </Row>
                </Form>
                <PropertyAddComponent
                    id={null}
                    close={this.close}
                    refreshTable={this.handleSubmit}
                    visible={this.state.openPropertyAdd}
                />
            </div>
        )
    }
}

let ContractHeadComponent = Form.create()(CollectRentHead)

export default ContractHeadComponent
