import {Modal, Input, Form, notification, Icon, Steps, Button, Select, Row, Col,
    DatePicker, Radio, Checkbox, InputNumber, Spin   } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
const FormItem = Form.Item
const Step = Steps.Step
const Option = Select.Option
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group

class PropertyContractAdded extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            loading: false,
            current: 0,
            isFirst: true,
            ListBuildingInfo: [],
            listRoom: [],
            ListclientName: [],
            rooms: [],
            none1: '',
            none2: 'none'
        }
    }
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        json['contractSplit'] = 1
        json['startDate'] = json.fuzq[0].format('YYYY-MM-DD')
        json['endDate'] = json.fuzq[1].format('YYYY-MM-DD')
        json['leaseRooms'] = json.leaseRooms.toString()
        json['roomIdsEnergy'] = json.roomIdsEnergy.toString()
        json['signDate'] = json.signDate.format('YYYY-MM-DD')
        if (json.waterType.toString() === '1') {
            json['waterUnitPrice'] = json.waterUnitPrice1
        } else {
            json['waterUnitPrice'] = json.waterUnitPrice2
        }
        if (json.powerType.toString() === '1') {
            json['powerUnitPrice'] = json.powerUnitPrice1
        } else if (json.powerType.toString() === '2') {
            json['powerUnitPrice'] = json.powerUnitPrice2
            json['powerRatio'] = json.biaobi1
            json['powerLossRatio'] = json.sunhao1
        } else {
            json['powerUnitPrice'] = json.powerUnitPrice3
            json['powerRatio'] = json.biaobi2
            json['powerLossRatio'] = json.sunhao2
        }
        console.log(JSON.stringify(json))
        let map = await apiPost(
            '/contract/insertPmContract',
            json
        )
        notification.open({
            message: map.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({
            visible: false,
            isFirst: true,
            none1: '',
            none2: 'none',
            rooms: [],
            current: 0
        })
        this.props.refreshTable()
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            isFirst: true,
            none1: '',
            none2: 'none',
            rooms: [],
            current: 0
        })
        this.props.form.resetFields()
    }

    initialRemarks2 (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
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
    next = () => {
        let json = this.props.form.getFieldsValue()
        console.log(json)
        const current = this.state.current + 1
        if (current === 0) {
            this.setState({
                current: current,
                none1: '',
                none2: 'none'
            })
        } else if (current === 1) {
            this.setState({
                current: current,
                none1: 'none',
                none2: ''
            })
        }
    }
    prev= () => {
        const current = this.state.current - 1
        if (current === 0) {
            this.setState({
                current: current,
                none1: '',
                none2: 'none'
            })
        } else if (current === 1) {
            this.setState({
                current: current,
                none1: 'none',
                none2: ''
            })
        }
    }
    selectbuildId = async (value) => {
        this.setState({
            loading: true
        })
        let listRoom = await apiPost(
            '/contract/ListRoom',
            {BuildId: value}
        )
        listRoom = listRoom.data
        this.setState({
            listRoom: listRoom,
            loading: false
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
            if (value.toString() === client.clientName.toString()) {
                clientId = client.id
            }
            return ''
        })
        this.props.form.setFieldsValue({
            clientId: clientId
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
                <Spin spinning={this.state.loading}>
                    <Steps current={this.state.current}>
                        <Step key="合同信息" title="合同信息" />
                        <Step key="设置物业费" title="设置物业费" />
                    </Steps>
                    <Form layout="horizontal">
                        <div style={{display: this.state.none1}}>
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
                                    <FormItem label="减免面积:" labelCol={{ span: 6 }}
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
                                                onChange={this.selectClient}
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
                            <h2>能源管理押金</h2>
                            <Row>
                                <FormItem label="交款方式:" labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('isSublet', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择交款方式!'
                                        }]
                                    })(
                                        <RadioGroup style={{ width: 500 }}>
                                            <Radio value={1}>业主自交</Radio>
                                            <Radio value={0}>转租自交</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="应收金额:" labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('energy', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择交款方式!'
                                        }]
                                    })(
                                        <Input style={{ width: 500 }} />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <p style={{paddingLeft: '26px'}}>
                                业主自交房间:  （<span style={{color: 'red'}}>注意：若转租自交，请不要在此选择房间号</span>）
                                </p>
                                <FormItem
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('roomIdsEnergy')(
                                        <Checkbox.Group style={{ width: '100%' }}>
                                            <Row>
                                                {this.state.rooms.map((room, i) => {
                                                    return <Col key={i} offset="1" span={4}><Checkbox value={room}>{room}</Checkbox></Col>
                                                })}
                                            </Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Row>
                        </div>
                        <div style={{display: this.state.none2}}>
                            <h2>设置物业费</h2>
                            <Row>
                                <FormItem label="物业费单价:" labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('wyfdj', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择物业费单价!'
                                        }]
                                    })(
                                        <RadioGroup style={{ width: 700 }}>
                                            <Radio value={1}>每月单价
                                                {getFieldDecorator('pmUnitPrice')(
                                                    <Input style={{ width: 140,
                                                        marginLeft: '10px' }} addonAfter="元／㎡/月"
                                                    />
                                                )}
                                            </Radio><br />
                                            <Radio value={2}>年物业费
                                                {getFieldDecorator('yearPmPrice')(
                                                    <Input style={{ width: 140,
                                                        marginLeft: '10px' }} addonAfter="元"
                                                    />
                                                )}
                                            </Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="空调费单价:" labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('ktfdj', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择空调费单价!'
                                        }]
                                    })(
                                        <RadioGroup style={{ width: 700 }}>
                                            <Radio value={1}>每月单价
                                                {getFieldDecorator('acUnitDay')(
                                                    <Select
                                                        showSearch
                                                        style={{ width: 100,
                                                            marginLeft: '10px' }}
                                                        placeholder="请选择空调费类型"
                                                        optionFilterProp="children"
                                                    >
                                                        <Option key={227}>227</Option>
                                                        <Option key={299}>299</Option>
                                                    </Select>
                                                )}
                                                {getFieldDecorator('acUnitPrice')(
                                                    <Input style={{ width: 140,
                                                        marginLeft: '10px' }} addonAfter="元／㎡/天"
                                                    />
                                                )}
                                            </Radio><br />
                                            <Radio value={2}>年空调费
                                                {getFieldDecorator('yearAcPrice')(
                                                    <Input style={{ width: 140,
                                                        marginLeft: '10px' }} addonAfter="元"
                                                    />
                                                )}
                                            </Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="电梯费单价:" labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('dtfdj', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择电梯费单价!'
                                        }]
                                    })(
                                        <RadioGroup style={{ width: 700,
                                            marginLeft: '10px' }}
                                        >
                                            <Radio value={2}>固定单价
                                                {getFieldDecorator('elevUnitPrice')(
                                                    <Input style={{ width: 140,
                                                        marginLeft: '10px' }} addonAfter="元／㎡/月"
                                                    />
                                                )}
                                            </Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Row>
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
                                                {getFieldDecorator('waterUnitPrice1')(
                                                    <Input style={{ width: 140,
                                                        marginLeft: '10px' }} addonAfter=" 元／㎡"
                                                    />
                                                )}
                                            </Radio><br />
                                            <Radio value={2}>独立水表
                                                {getFieldDecorator('waterUnitPrice2')(
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
                            {getFieldDecorator('roomIds')(
                                <Input type="hidden" />
                            )}
                            {getFieldDecorator('clientId')(
                                <Input type="hidden"
                                />
                            )}
                        </div>
                    </Form>
                    <div className="steps-action">
                        {
                            this.state.current < 2 - 1 &&
                        <Button type="primary" onClick={() => this.next()}>下一步</Button>
                        }
                        {
                            this.state.current === 2 - 1 &&
                        <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                        }
                        {
                            this.state.current > 0 &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                        }
                    </div>
                </Spin>
            </Modal>
        )
    }
}
let PropertyContractAddedCom = Form.create()(PropertyContractAdded)

export default PropertyContractAddedCom
