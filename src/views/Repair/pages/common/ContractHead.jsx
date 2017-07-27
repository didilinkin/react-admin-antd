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
        let { type, ListBuildingInfo } = this.props
        console.log(ListBuildingInfo)
        let contractSplit = []
        if (type === 1) {
            contractSplit = [<Option key="1">正常</Option>, <Option key="2">水电</Option>]
        } else {
            contractSplit = [<Option key="1">正常</Option>, <Option key="2">欢乐颂</Option>]
        }
        return (
            <Form layout="horizontal">
                <Row>
                    <Col span={8}>
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
                            {getFieldDecorator('leaseRooms')(
                                <Input placeholder="请输入" style={{ width: 200 }} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{display: this.state.none}}>
                    <Col span={8}>
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
                                    <Option key="0">正常</Option>
                                    <Option key="1">终止</Option>
                                    <Option key="2">未开始</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
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
                </Row>
                <Row>
                    <Col span={16}/>
                    <Col span={8}><div style={{paddingLeft: '25%',
                        marginBottom: 10}}><Button type="primary" onClick={this.handleSubmit}>搜索</Button>&nbsp;&nbsp;<Button onClick={this.handleReset}>清除</Button>&nbsp;&nbsp;<Button onClick={this.open}>{this.state.open}</Button></div></Col>
                </Row>


            </Form>
        )
    }
}

let ContractHeadComponent = Form.create()(ContractHead)

export default ContractHeadComponent
