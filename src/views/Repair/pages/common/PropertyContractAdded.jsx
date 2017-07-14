import {Modal, Input, Form, notification, Icon, Steps, Button, Select, Row, Col,
    DatePicker, Radio, Checkbox  } from 'antd'
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
            current: 0,
            isFirst: true,
            ListBuildingInfo: [],
            listRoom: [],
            ListclientName: [],
            isSublet: 1,
            rooms: [],
            none1: '',
            none2: 'none',
            none3: 'none'
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
            isFirst: true,
            none1: '',
            none2: 'none',
            none3: 'none',
            current: 0
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            isFirst: true,
            none1: '',
            none2: 'none',
            none3: 'none',
            current: 0
        })
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
    next = () => {
        let json = this.props.form.getFieldsValue()
        console.log(json)
        const current = this.state.current + 1
        if (current === 0) {
            this.setState({
                current: current,
                none1: '',
                none2: 'none',
                none3: 'none'
            })
        } else if (current === 1) {
            this.setState({
                current: current,
                none1: 'none',
                none2: '',
                none3: 'none'
            })
        } else {
            this.setState({
                current: current,
                none1: 'none',
                none2: 'none',
                none3: ''
            })
        }
    }
    prev= () => {
        const current = this.state.current - 1
        if (current === 0) {
            this.setState({
                current: current,
                none1: '',
                none2: 'none',
                none3: 'none'
            })
        } else if (current === 1) {
            this.setState({
                current: current,
                none1: 'none',
                none2: '',
                none3: 'none'
            })
        } else {
            this.setState({
                current: current,
                none1: 'none',
                none2: 'none',
                none3: ''
            })
        }
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
        this.setState({
            rooms: value
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
                                <FormItem label="减免:" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15}}
                                >
                                    {getFieldDecorator('reliefArea')(
                                        <Input style={{ width: 200 }} />
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
                                                    marginLeft: '10px' }} addonAfter="元／㎡/月" />
                                            )}
                                        </Radio><br />
                                        <Radio value={2}>年物业费
                                            {getFieldDecorator('yearPmPrice')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="元" />
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
                                                    marginLeft: '10px' }} addonAfter="元／㎡/天" />
                                            )}
                                        </Radio><br />
                                        <Radio value={2}>年空调费
                                            {getFieldDecorator('yearAcPrice')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="元" />
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
                                        marginLeft: '10px' }}>
                                        <Radio value={2}>固定单价
                                            {getFieldDecorator('elevUnitPrice')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="元／㎡/月" />
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
                                        marginLeft: '10px' }}>
                                        <Radio value={1}>按面积
                                            {getFieldDecorator('waterUnitPrice')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter=" 元／㎡" />
                                            )}
                                        </Radio><br />
                                        <Radio value={2}>独立水表
                                            {getFieldDecorator('waterUnitPriceTwo')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="元/立方米" />
                                            )}
                                            {getFieldDecorator('waterLossRatio')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter=" % 损耗" />
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
                                                    marginLeft: '10px' }} addonAfter="元／㎡" />
                                            )}
                                        </Radio>
                                        <Radio value={2}>差额单价
                                            {getFieldDecorator('powerUnitPrice2')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="元/度" />
                                            )}
                                            {getFieldDecorator('sunhao1')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="% 损耗" />
                                            )}
                                            {getFieldDecorator('biaobi1')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="变比" />
                                            )}
                                        </Radio>
                                        <Radio value={3}>功峰平谷
                                            {getFieldDecorator('powerUnitPrice3')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="元/度" />
                                            )}
                                            {getFieldDecorator('sunhao2')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="% 损耗" />
                                            )}
                                            {getFieldDecorator('biaobi2')(
                                                <Input style={{ width: 140,
                                                    marginLeft: '10px' }} addonAfter="变比" />
                                            )}
                                        </Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Row>
                    </div>
                    <div style={{display: this.state.none3}}>
                        <h2>完成</h2>
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
            </Modal>
        )
    }
}
let PropertyContractAddedCom = Form.create()(PropertyContractAdded)

export default PropertyContractAddedCom
