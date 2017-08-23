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
    render () {
        const { getFieldDecorator } = this.props.form
        let { ListBuildingInfo} = this.props
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
                            <FormItem label="客户名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('sublietName')(
                                    <Input placeholder="请输入客户名称" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('roomNum')(
                                    <Input placeholder="请输入房间编号" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} />
                        <Col span={8}>
                            <div style={{paddingLeft: '25%',
                                marginBottom: 10}}
                            >
                                <Button type="primary" onClick={this.handleSubmit}>搜索</Button>&nbsp;&nbsp;
                                <Button onClick={this.handleReset}>清除</Button>&nbsp;&nbsp;
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

let ContractHeadComponent = Form.create()(CollectRentHead)

export default ContractHeadComponent
