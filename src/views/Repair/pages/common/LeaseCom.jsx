import {Modal, Input, Form, notification, Icon, Select, Row, Col,
    DatePicker, InputNumber, Button   } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker

class Lease extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            isFirst: true,
            ListBuildingInfo: [],
            listRoom: [],
            MapDict: {},
            ListclientName: []
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
            if (this.props.id > 0) {
                console.log(json)
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                console.log(json)
                notification.open({
                    message: '添加成功',
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
    handleCancel = () => {
        this.setState({
            visible: false,
            isFirst: true
        })
        this.props.form.resetFields()
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
        let serviceArea = 0
        let roomIds = []
        value.map(roomnun => {
            this.state.listRoom.map(room => {
                if (roomnun.toString() === room.roomNum.toString()) {
                    serviceArea = serviceArea + room.roomArea
                    roomIds.push(room.id)
                }
                return ''
            })
            return ''
        })
        this.props.form.setFieldsValue({
            serviceArea: serviceArea.toFixed(2),
            roomIds: roomIds.toString()
        })
        this.setState({
            rooms: value
        })
    }
    reliefArea = (value) => {
        let serviceArea = 0
        this.props.form.getFieldValue('leaseRooms').map(roomnun => {
            this.state.listRoom.map(room => {
                if (roomnun.toString() === room.roomNum.toString()) {
                    serviceArea = serviceArea + room.roomArea
                }
                return ''
            })
            return ''
        })
        if (typeof (value) === 'undefined') {
            value = 0
        }
        if (typeof (serviceArea) === 'undefined') {
            serviceArea = 0
        }
        this.props.form.setFieldsValue({
            serviceArea: serviceArea - value
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
    generate = () => {
        alert('生成租金')
    }
    Calculation = (data) => {
        let json = this.props.form.getFieldsValue(['serviceArea', 'fuzq', 'unitPrice', 'mzq'])
        let unitPrice = json.unitPrice ? json.unitPrice : 0
        let serviceArea = json.serviceArea ? json.serviceArea : 0
        // let fuzq = json.fuzq[1] - json.fuzq[0]
        // console.log(unitPrice)
        console.log(typeof (data[0]))
        // console.log(fuzq / 24 / 60 / 60 / 1000)
        let freeStartDate = json.mzq ? json.mzq[0] : 0
        let freeEndDate = json.mzq ? json.mzq[1] : 0
        if (typeof (data[0]) !== 'undefined' && typeof (data[0]) === 'object') {
            freeStartDate = data[0]
            freeEndDate = data[1]
        }
        this.props.form.setFieldsValue({
            firstYearRent: (unitPrice * serviceArea * 365).toFixed(2),
            freeRent: (unitPrice * serviceArea * (freeEndDate - freeStartDate) / (24 * 60 * 60 * 1000)).toFixed(2)
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
                                {getFieldDecorator('serviceArea', {
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
                                            return <Option key={clientName.id}>{clientName.rentClientName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="租赁保证金:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('depositMoney', {
                                    rules: [{
                                        required: true,
                                        message: '请填写租赁保证金!'
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
                            <FormItem label="收租方式:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('payType', {
                                    rules: [ {
                                        required: true,
                                        message: '请选择收租方式!'
                                    }],
                                    initialValue: '按首年租金递增'
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择收租方式"
                                        optionFilterProp="children"
                                    >
                                        <Option key="按首年租金递增">按首年租金递增</Option>
                                        <Option key="按单价递增">按单价递增</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="免租期:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('mzq')(
                                    <RangePicker onChange={this.Calculation} style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
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
                            <FormItem label="免租金额:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('freeRent')(
                                    <Input style={{ width: 200 }} addonAfter="元" disabled />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem label="首年租金:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('firstYearRent')(
                                    <Input style={{ width: 200 }} addonAfter="元" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <span style={{color: 'red'}}>注意： 请在下方租金明细中减去免租期内的金额</span>
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
                    暂无数据
                </div>
                <Button onClick={this.handleSubmit}>保存</Button>
            </Modal>
        )
    }
}
let LeaseCom = Form.create()(Lease)

export default LeaseCom
