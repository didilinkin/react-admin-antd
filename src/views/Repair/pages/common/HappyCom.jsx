import {Modal, Input, Form, notification, Icon, Select, Row, Col,
    DatePicker, InputNumber, Button, Table, Popconfirm   } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import EditableCell from './EditableCell'
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker

class Happy extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            isFirst: true,
            ListBuildingInfo: [],
            listRoom: [],
            MapDict: {},
            ListclientName: [],
            columns: [],
            dataSource: []
        }
    }
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
            json['startDate'] = json.fuzq[0].format('YYYY-MM-DD')
            json['endDate'] = json.fuzq[1].format('YYYY-MM-DD')
            json['fuzq'] = []
            json['leaseRooms'] = json.leaseRooms.toString()
            json['signDate'] = json.signDate.format('YYYY-MM-DD')
            if (json.payCycle.toString() === '季付') {
                json['payCycle'] = 3
            } else if (json.payCycle.toString() === '半年付') {
                json['payCycle'] = 6
            } else {
                json['payCycle'] = 12
            }
            json['contractSplit'] = 2
            if (this.props.id > 0) {
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                let date = await apiPost(
                    '/contract/insertrentContractInfo',
                    json
                )
                notification.open({
                    message: date.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            }
            this.setState({
                visible: false,
                isFirst: true
            })
            this.props.refreshTable()
        }
    }
    handleCancel = async () => {
        this.setState({
            visible: false,
            isFirst: true,
            dataSource: []
        })
        await apiPost(
            '/contract/delectContractInfo',
        )
        // this.props.form.resetFields()
    }

    async initialRemarks2 (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            if (nextProps.id > 0) {
                this.setState({
                    isFirst: false,
                    ListBuildingInfo: nextProps.map.ListBuildingInfo,
                    ListclientName: nextProps.map.ListCustomerInfo,
                    MapDict: nextProps.map.MapDict,
                    visible: nextProps.visible
                })
            } else {
                this.setState({
                    isFirst: false,
                    ListBuildingInfo: nextProps.map.ListBuildingInfo,
                    ListclientName: nextProps.map.ListCustomerInfo,
                    MapDict: nextProps.map.MapDict,
                    visible: nextProps.visible
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks2(nextProps)
    }
    selectbuildId = async (value) => {
        let listRoom = await apiPost(
            '/contract/ListRoom',
            {BuildId: value}
        )
        listRoom = listRoom.data
        this.props.form.setFieldsValue({
            buildId: value
        })
        this.setState({
            listRoom: listRoom
        })
    }
    selectRoom = (value) => {
        let leaseArea = 0
        let roomIds = []
        value.map(roomnun => {
            this.state.listRoom.map(room => {
                if (roomnun.toString() === room.roomNum.toString()) {
                    leaseArea = leaseArea + room.roomArea
                    roomIds.push(room.id)
                }
                return ''
            })
            return ''
        })
        this.props.form.setFieldsValue({
            leaseArea: leaseArea.toFixed(2),
            roomIds: roomIds.toString()
        })
        this.setState({
            rooms: value
        })
    }
    reliefArea = (value) => {
        let leaseArea = 0
        this.props.form.getFieldValue('leaseRooms').map(roomnun => {
            this.state.listRoom.map(room => {
                if (roomnun.toString() === room.roomNum.toString()) {
                    leaseArea = leaseArea + room.roomArea
                }
                return ''
            })
            return ''
        })
        if (typeof (value) === 'undefined') {
            value = 0
        }
        if (typeof (leaseArea) === 'undefined') {
            leaseArea = 0
        }
        this.props.form.setFieldsValue({
            leaseArea: leaseArea - value
        })
    }
    selectClient = (value) => {
        let clientId = 0
        this.state.ListclientName.map(client => {
            if (value.toString() === client.rentClientName.toString()) {
                clientId = client.id
            }
            return ''
        })
        this.props.form.setFieldsValue({
            clientId: clientId
        })
    }
    generate = async () => {
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
            json['startDate'] = json.fuzq[0].format('YYYY-MM-DD')
            json['endDate'] = json.fuzq[1].format('YYYY-MM-DD')
            json['leaseRooms'] = json.leaseRooms.toString()
            json['signDate'] = json.signDate.format('YYYY-MM-DD')
            if (json.payCycle.toString() === '季付') {
                json['payCycle'] = 3
            } else if (json.payCycle.toString() === '半年付') {
                json['payCycle'] = 6
            } else {
                json['payCycle'] = 12
            }
            let list = await apiPost(
                '/contract/InsertRentContractInfo',
                json
            )
            this.setState({
                columns: [
                    {
                        title: '租赁开始时间',
                        dataIndex: 'startDate',
                        render: (text, record, index) => (
                            <EditableCell
                                name={'startDate'}
                                value={text}
                                record={record}
                                type={'DatePicker'}
                                callback = {this.callback}
                                style={{width: '150px'}}
                            />
                        )
                    },
                    {
                        title: '租赁结束时间',
                        dataIndex: 'endDate',
                        render: (text, record, index) => (
                            <EditableCell
                                name={'endDate'}
                                value={text}
                                record={record}
                                type={'DatePicker'}
                                callback = {this.callback}
                                style={{width: '150px'}}
                            />
                        )
                    },
                    {
                        title: '交费期限',
                        dataIndex: 'payDeadline',
                        render: (text, record, index) => (
                            <EditableCell
                                name={'payDeadline'}
                                value={text}
                                record={record}
                                type={'DatePicker'}
                                callback = {this.callback}
                                style={{width: '150px'}}
                            />
                        )
                    },
                    {
                        title: '金额',
                        dataIndex: 'currentPeriodMoney',
                        render: (text, record, index) => (
                            <EditableCell
                                name={'currentPeriodMoney'}
                                value={text}
                                record={record}
                                type={'Input'}
                                callback = {this.callback}
                                style={{width: '150px'}}
                            />
                        )
                    },
                    {
                        title: '优惠金额',
                        dataIndex: 'discountMoney',
                        render: (text, record, index) => (
                            <EditableCell
                                name={'discountMoney'}
                                value={text}
                                record={record}
                                type={'Input'}
                                callback = {this.callback}
                                style={{width: '150px'}}
                            />
                        )
                    },
                    {
                        title: '实际应收',
                        dataIndex: 'actualPaidMoney'
                    },
                    {
                        title: '操作',
                        dataIndex: 'opt',
                        render: (text, record, index) => {
                            return (
                                <Popconfirm title="确认删除码?" onConfirm={() => this.onDelete(record.id)}>
                                    <a href="javascript:void(0)">删除</a>
                                </Popconfirm>
                            )
                        }
                    }
                ],
                dataSource: list.data
            })
        }
    }
    onDelete = async (id) => {
        let data = await apiPost(
            '/contract/delectRentContractInfoId',
            {id: id}
        )
        this.setState({ dataSource: data.data })
    }
    callback = (list) => {
        this.setState({
            dataSource: list
        })
    }
    Calculation = (data) => {
        let json = this.props.form.getFieldsValue(['leaseArea', 'unitPrice'])
        let unitPrice = json.unitPrice ? json.unitPrice : 0
        let leaseArea = json.leaseArea ? json.leaseArea : 0
        this.props.form.setFieldsValue({
            firstYearRent: (unitPrice * leaseArea * 365).toFixed(2)
        })
    }
    render () {
        const {getFieldDecorator} = this.props.form
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width={800}
                footer={null}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <h2>房源信息</h2>
                    <Row>
                        <Col span={12}>
                            <FormItem label="所在房间:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                {getFieldDecorator('buildIdOne', {
                                    rules: [ {
                                        required: true,
                                        message: '请选择所属楼宇!'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200,
                                            marginRight: '10px' }}
                                        placeholder="请选择所属楼宇"
                                        onChange={this.selectbuildId}
                                        optionFilterProp="children"
                                    >
                                        {this.state.ListBuildingInfo.map(Building => {
                                            return <Option key={Building.id}>{Building.buildName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            {getFieldDecorator('leaseRooms', {
                                rules: [ {
                                    required: true,
                                    message: '请选择所属房间!'
                                }]
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: 200 }}
                                    placeholder="请选择所属房间"
                                    onChange={this.selectRoom}
                                    optionFilterProp="children"
                                    onBlur={this.Calculation}
                                >
                                    {this.state.listRoom.map(room => {
                                        return <Option key={room.roomNum}>{room.roomNum}</Option>
                                    })}
                                </Select>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="服务面积:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('leaseArea', {
                                    rules: [{
                                        required: true,
                                        message: '请填写服务面积!'
                                    }]
                                }
                                )(
                                    <Input style={{ width: 200 }} disabled />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="减免面积:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15}}
                            >
                                {getFieldDecorator('reliefArea')(
                                    <InputNumber onBlur={this.Calculation} onChange={this.reliefArea} style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <h2>合同信息</h2>
                    <Row>
                        <Col span={12}>
                            <FormItem label="签约日期:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('signDate', {
                                    rules: [ {
                                        required: true,
                                        message: '请选择签约日期!'
                                    }]
                                })(
                                    <DatePicker style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="租赁合同编号:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('contractCode', {
                                    rules: [ {
                                        required: true,
                                        message: '请填写物业合同编号!'
                                    }]
                                })(
                                    <Input style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="租赁周期:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('fuzq', {
                                    rules: [ {
                                        required: true,
                                        message: '请选择服务周期!'
                                    }]
                                })(
                                    <RangePicker style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="租赁客户名称:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('clientName', {
                                    rules: [ {
                                        required: true,
                                        message: '请选择物业客户名称!'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择物业客户名称"
                                        onChange={this.selectClient}
                                        optionFilterProp="children"
                                    >
                                        {this.state.ListclientName.map(clientName => {
                                            return <Option key={clientName.rentClientName}>{clientName.rentClientName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="管理押金:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('depositMoney', {
                                    rules: [{
                                        required: true,
                                        message: '请填写管理押金!'
                                    }]
                                }
                                )(
                                    <Input style={{ width: 200 }} addonAfter="元" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <h2>设置租金</h2>
                    <Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="合同单价:" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('unitPrice', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入合同单价!'
                                        }]
                                    })(
                                        <Input onBlur={this.Calculation} style={{ width: 200 }} addonAfter="元／㎡/天" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <span> 递增情况:</span>
                                {getFieldDecorator('startIncNum')(
                                    <Input style={{ width: 40 }} />
                                )}
                                <span> 年后开始递增，递增比&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {getFieldDecorator('rentIncrRate', {
                                    initialValue: this.state.MapDict.percentage
                                })(
                                    <Input style={{ width: 80 }} addonAfter="%" />
                                )}
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="交费周期:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('payCycle', {
                                    initialValue: '半年付',
                                    rules: [ {
                                        required: true,
                                        message: '请选择交费周期!'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择交费周期"
                                        optionFilterProp="children"
                                    >
                                        <Option key="季付">季付</Option>
                                        <Option key="半年付">半年付</Option>
                                        <Option key="年付">年付</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="首年服务费:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('firstYearRent')(
                                    <Input style={{ width: 200 }} addonAfter="元" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <span style={{color: 'red'}}>注意： 请在下方租金明细中修改</span>
                        </Col>
                    </Row>
                    {getFieldDecorator('roomIds')(
                        <Input type="hidden" />
                    )}
                    {getFieldDecorator('clientId')(
                        <Input type="hidden" />
                    )}
                    {getFieldDecorator('buildId')(
                        <Input type="hidden" />
                    )}
                </Form>
                <Button onClick={this.generate}>生成每期租金</Button>
                <div>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </div>
                <Button onClick={this.handleSubmit}>保存</Button>
            </Modal>
        )
    }
}
let HappyCom = Form.create()(Happy)

export default HappyCom
