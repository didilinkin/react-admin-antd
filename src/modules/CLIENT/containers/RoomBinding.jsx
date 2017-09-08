// 客户管理 - 房间梆定
import React from 'react'
import {Table, Row, Col, DatePicker, Form, Button, Input, Popconfirm, notification, Icon} from 'antd'
import {apiPost} from '../../../api/api.dev'
import RoomBindingRemarks from '../components/RoomBinding/RoomBindingRemarks'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
class RoomBinding extends React.Component {
    state = {
        dataSource: [],
        columns: [],
        page: 1,
        pageSize: 30
    }
    componentDidMount () {
        this.props.form.validateFields()
        let unbind = this.unbind
        let remarks = this.remarks
        this.setState({
            columns: [
                {
                    title: '公司编号',
                    dataIndex: 'companyNum',
                    key: 'companyNum'
                }, {
                    title: '所属楼宇',
                    dataIndex: 'buildName',
                    key: 'buildName'
                }, {
                    title: '房间编号',
                    dataIndex: 'roomName',
                    key: 'roomName'
                }, {
                    title: '微信客户编号',
                    dataIndex: 'clientNum',
                    key: 'clientNum'
                }, {
                    title: '用户昵称',
                    dataIndex: 'clientName',
                    key: 'clientName'
                }, {
                    title: '备注',
                    dataIndex: 'remarks',
                    key: 'remarks'
                }, {
                    title: '绑定时间',
                    dataIndex: 'createDate',
                    key: 'createDate'
                }, {
                    title: '操作',
                    key: 'operation',
                    render: function (text, record, index) {
                        return (
                            <span>
                                <Popconfirm title="确定解除绑定吗?" onConfirm={() => unbind(record.id)}>
                                    <a>解除绑定</a>
                                </Popconfirm>
                                <a onClick={() => remarks(record.id)} style={{marginLeft: '20px'}}>备注</a>
                            </span>

                        )
                    }
                }
            ]
        })
        this.init()
    }
    // 初始化方法
    init = async () => {
        console.log('网络请求')
        let response = await apiPost(
            '/userWx/userWxList'
        )
        console.log(response)
        this.setState({dataSource: response.data.rows})
    }
    // 解除绑定
    unbind = async (id) => {
        console.log(id)
        let response = await apiPost(
            '/userWx/deleteUserWx',
            {'id': id}
        )
        notification.open({
            message: response.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        console.log(response)
    }
    // 备注
    remarks = async (id) => {
        console.log(id)
        // let response = await apiPost(
        //     '/userWx/updateUserWx',
        //     {'id': id,
        //         'remarks': 'dddd'}
        // )
        // notification.open({
        //     message: response.data,
        //     icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        // })
        // console.log(response)
        this.setState(
            {message: 'b'})
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
                                <FormItem label="公司编号" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
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
                <Table
                    onChange={this.refresh}
                    pagination={{total: this.state.total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        current: this.state.current,
                        pageSizeOptions: ['15', '30', '45'],
                        defaultPageSize: 30}}
                    scroll={{ x: 1600 }}
                    bordered
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
                <RoomBindingRemarks
                    visible={this.state.collectPenal}
                    id={this.state.id}
                    refresh={this.refresh}
                />
            </div>
        )
    }
}

const RoomBindingCom = Form.create()(RoomBinding)
export default RoomBindingCom
