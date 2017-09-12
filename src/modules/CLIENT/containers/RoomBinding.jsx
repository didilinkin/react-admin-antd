// 客户管理 - 房间绑定
import React from 'react'
import {Table, Row, Col, DatePicker, Form, Button, Input, Modal, Popconfirm, notification, Icon} from 'antd'
import {apiPost, verification} from '../../../api/api.dev'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
class RoomBinding extends React.Component {
    state = {
        dataSource: [],
        columns: [],
        total: 0,
        current: 1,
        visible: false,
        id: 0
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
                    width: 150,
                    fixed: 'right',
                    render: function (text, record, index) {
                        return (
                            <span>
                                {verification('Unbound') &&
                                <Popconfirm title="确定解除绑定吗?" onConfirm={() => unbind(record.id)}>
                                    <a>解除绑定</a>
                                </Popconfirm>
                                }
                                <a onClick={() => remarks(record.id, record.remarks)} style={{marginLeft: '20px'}}>备注</a>
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
        this.refresh(null, null, null)
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
    remarks = async (id, remarks) => {
        console.log(id, remarks)
        this.setState(
            {visible: true,
                id: id
            })
        this.props.form.setFieldsValue({
            remarks: remarks
        })
    }
    refresh = async (pagination, filters, sorter) => {
        if (filters === null || typeof (filters) === 'undefined') {
            filters = []
        }
        let json = this.props.form.getFieldsValue()
        if (typeof (json.bindingDate) !== 'undefined' && json.bindingDate.length > 0) {
            filters['startDate'] = json.bindingDate[0].format('YYYY-MM-DD')
            filters['endDate'] = json.bindingDate[1].format('YYYY-MM-DD')
        }
        if (pagination === null) {
            filters['page'] = 1
            filters['pageSize'] = 30
        } else {
            filters['page'] = pagination.current
            filters['pageSize'] = pagination.pageSize
        }
        let response = await apiPost(
            '/userWx/userWxList',
            filters
        )
        console.log(response)
        this.setState({
            dataSource: response.data.rows,
            total: response.data.total,
            current: pagination ? pagination.current : 1
        })
    }
    handleSubmit = async () => {
        let response = await apiPost(
            '/userWx/updateUserWx',
            {id: this.state.id,
                remarks: this.props.form.getFieldValue('remarks')
            }
        )
        notification.open({
            message: response.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({
            id: 0,
            visible: false
        })
        this.props.form.setFieldsValue({
            remarks: ''
        })
        this.refresh(null, null, null)
    }
    handleCancel = () => {
        this.setState({
            id: 0,
            visible: false
        })
        this.props.form.setFieldsValue({
            remarks: ''
        })
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
                                <Button type="primary" onClick={this.refresh}>查询</Button>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        onChange={this.refresh}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            current: this.state.current,
                            pageSizeOptions: ['15', '30', '45'],
                            defaultPageSize: 30}}
                        scroll={{ x: 1400 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                    <Modal maskClosable={false}
                        title="编辑备注"
                        style={{top: 50}}
                        width="500px"
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                    >
                        <div>
                            <Row>
                                <Col span={24} >
                                    <FormItem label="编辑备注" labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}>
                                        {getFieldDecorator('remarks')(
                                            <Input type="textarea" rows={4} />)}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                </Form>
            </div>
        )
    }
}

const RoomBindingCom = Form.create()(RoomBinding)
export default RoomBindingCom
