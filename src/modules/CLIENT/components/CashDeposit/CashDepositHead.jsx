import {Form, Select, Input, Button, Row, Col} from 'antd'
import React from 'react'
const Option = Select.Option
const FormItem = Form.Item


class CollectRentHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none',
            openPropertyAdd: false
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
    close = async () => {
        this.setState({
            openPropertyAdd: false
        })
    }
    enterKey = (event) => {
        if (event.keyCode === 13) { // enter 键
            this.handleSubmit()
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { ListBuildingInfo} = this.props
        return (
            <div onKeyDown={this.enterKey}>
                <Form layout="horizontal">
                    <Row>
                        <Col span={5}>
                            <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 10 }}
                            >
                                {getFieldDecorator('buildId')(
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 140 }}
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
                                {getFieldDecorator('sublietName')(
                                    <Input placeholder="请输入客户名称" style={{ width: 140 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('roomNum')(
                                    <Input placeholder="请输入房间编号" style={{ width: 140 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Button type="primary" onClick={this.handleSubmit}>搜索</Button>&nbsp;&nbsp;
                        <Button onClick={this.handleReset}>清除</Button>&nbsp;&nbsp;
                    </Row>
                </Form>
            </div>
        )
    }
}

let ContractHeadComponent = Form.create()(CollectRentHead)

export default ContractHeadComponent
