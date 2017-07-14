import {Modal, Input, Form, notification, Icon, Select, Row, Col,
    DatePicker, Radio, InputNumber, Button   } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group

class HydropowerContractAddition extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            isFirst: true,
            ListBuildingInfo: [],
            listRoom: [],
            ListclientName: []
        }
    }
    handleSubmit = () => {
        this.props.refreshTable()
        notification.open({
            message: '添加成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({
            visible: false,
            isFirst: true
        })
        this.props.form.resetFields()
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            isFirst: true
        })
        this.props.form.resetFields()
    }

    initialRemarks2 (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.setState({
                isFirst: false,
                visible: nextProps.visible
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks2(nextProps)
    }
    async initialRemarks () {
        let map = await apiPost(
            '/contract/ListBuildingInfo'
        )
        map = map.data
        this.setState({
            ListBuildingInfo: map.ListBuildingInfo,
            ListclientName: map.ListCustomerInfo
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    selectbuildId = async (value) => {
        let listRoom = await apiPost(
            '/contract/ListRoom',
            {BuildId: value}
        )
        listRoom = listRoom.data
        this.setState({
            listRoom: listRoom
        })
    }
    selectRoom = (value) => {
        let serviceArea = 0
        value.map(roomnun => {
            this.state.listRoom.map(room => {
                if (roomnun.toString() === room.roomNum.toString()) {
                    serviceArea = serviceArea + room.roomArea
                }
                return ''
            })
            return ''
        })
        this.props.form.setFieldsValue({
            serviceArea: serviceArea.toFixed(2)
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
                                {getFieldDecorator('buildId', {
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
                            <FormItem label="减免:" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15}}
                            >
                                {getFieldDecorator('reliefArea')(
                                    <InputNumber onChange={this.reliefArea} style={{ width: 200 }} />
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
                            <FormItem label="物业合同编号:" labelCol={{ span: 6 }}
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
                            <FormItem label="服务周期:" labelCol={{ span: 6 }}
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
                            <FormItem label="物业客户名称:" labelCol={{ span: 6 }}
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
                                        optionFilterProp="children"
                                    >
                                        {this.state.ListclientName.map(clientName => {
                                            return <Option key={clientName.clientName}>{clientName.clientName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <h2>设置物业费</h2>
                    <Row>
                        <FormItem label="收水费方式:" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('waterType', {
                                rules: [ {
                                    required: true,
                                    message: '请选择收水费方式!'
                                }]
                            })(
                                <RadioGroup style={{ width: 700,
                                    marginLeft: '10px' }}
                                >
                                    <Radio value={1}>按面积
                                        {getFieldDecorator('waterUnitPrice')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter=" 元／㎡"
                                            />
                                        )}
                                    </Radio><br />
                                    <Radio value={2}>独立水表
                                        {getFieldDecorator('waterUnitPriceTwo')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="元/立方米"
                                            />
                                        )}
                                        {getFieldDecorator('waterLossRatio')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter=" % 损耗"
                                            />
                                        )}
                                    </Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="收电费方式:" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('powerType', {
                                rules: [ {
                                    required: true,
                                    message: '请选择收电费方式!'
                                }]
                            })(
                                <RadioGroup style={{ width: 700 }}>
                                    <Radio value={1}>固定单价
                                        {getFieldDecorator('powerUnitPrice1')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="元／㎡"
                                            />
                                        )}
                                    </Radio>
                                    <Radio value={2}>差额单价
                                        {getFieldDecorator('powerUnitPrice2')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="元/度"
                                            />
                                        )}
                                        {getFieldDecorator('sunhao1')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="% 损耗"
                                            />
                                        )}
                                        {getFieldDecorator('biaobi1')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="变比"
                                            />
                                        )}
                                    </Radio>
                                    <Radio value={3}>功峰平谷
                                        {getFieldDecorator('powerUnitPrice3')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="元/度"
                                            />
                                        )}
                                        {getFieldDecorator('sunhao2')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="% 损耗"
                                            />
                                        )}
                                        {getFieldDecorator('biaobi2')(
                                            <Input style={{ width: 140,
                                                marginLeft: '10px' }} addonAfter="变比"
                                            />
                                        )}
                                    </Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Row>
                </Form>
                <Button onClick={this.handleSubmit}>保存</Button>
            </Modal>
        )
    }
}
let HydropowerContractAdditionCom = Form.create()(HydropowerContractAddition)

export default HydropowerContractAdditionCom
