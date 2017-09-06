// 客户管理 - 房间梆定
import React from 'react'
import {Table, Row, Col, DatePicker, Form, Button, Input} from 'antd'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
class RoomBinding extends React.Component {
    state = {
        dataSource: [],
        columns: [{
            title: '公司编号',
            dataIndex: 'companyNumber',
            key: 'companyNumber'
        }, {
            title: '所属楼宇',
            dataIndex: 'buildingName',
            key: 'buildingName'
        }, {
            title: '房间编号',
            dataIndex: 'roomNumber',
            key: 'roomNumber'
        }, {
            title: '微信客户编号',
            dataIndex: 'wechatNumber',
            key: 'wechatNumber'
        }, {
            title: '用户昵称',
            dataIndex: 'wechatName',
            key: 'wechatName'
        }, {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks'
        }, {
            title: '手机编号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        }, {
            title: '绑定时间',
            dataIndex: 'bindingDate',
            key: 'bindingDate'
        }, {
            title: '操作',
            key: 'operation',
            render: function (text, record, index) {
                index++
                return (
                    <span>
                        <a>解除绑定</a>
                        <a>备注</a>
                    </span>

                )
            }
        }]
    }
    componentDidMount () {
        // To disabled submit button at the beginning.
        this.props.form.validateFields()
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form>
                    <div>
                        <Row>
                            <Col span={8} >
                                <FormItem label="绑定日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('bindingDate')(
                                        <RangePicker />)}
                                </FormItem>
                            </Col>
                            <Col span={8} >
                                <FormItem label="公司编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('companyNumber')(
                                        <Input />)}
                                </FormItem>
                            </Col>
                            <Col span={8} >
                                <Button type="primary">查询</Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
                <Table dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    bordered
                />
            </div>
        )
    }
}

const RoomBindingCom = Form.create()(RoomBinding)
export default RoomBindingCom
