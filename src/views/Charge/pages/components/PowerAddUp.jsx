import React from 'react'
import {Modal, Form, Row, Col, Input, Button, DatePicker, Select} from 'antd'
import { apiPost } from '../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item
const {RangePicker} = DatePicker
const Option = Select.Option
class PowerAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        ClientList: [],
        PowerRecordlList: [],
        subletList: [],
        roomNumberOne: [],
        meterReader: [],
        Contract: {},
        waterLossRatio: 0,
        totalPower: 0,
        totalMoney: 0
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    componentDidMount () {
        this.getClientListAndUser()
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
        this.props.refreshTable()
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            this.setState({
                visible: nextProps.visible,
                isFirst: false,
                WaterRecordlList: [],
                waterLossRatio: 0,
                totalWater: 0,
                totalMoney: 0,
                Contract: {},
                subletList: [],
                roomNumberOne: []
            })
        }
    }
    async getClientListAndUser () {
        let ClientList = await apiPost(
            '/propertyFee/getPmContractList',
            {contractStatus: 0}
        )
        let meterReader = await apiPost(
            '/water/getchaobiaouser',
            {code: 'chaobiaoren'}
        )
        this.setState({
            ClientList: ClientList.data,
            meterReader: meterReader.data
        })
    }
    complement (arr1, arr2) {
        const arr = arr1.toString().split(',')
        let j = 0
        arr1.forEach((a, i) => {
            arr2.forEach((b) => {
                if (a === b) {
                    arr.splice(i - j, 1)
                    j = j + 1
                }
            })
        })
        return arr
    }
    // 选择客户名称 参数：客户id
    chooseClient = (clientId) => {
        this.state.ClientList.map(async (contract) => {
            let formName = ''
            if (clientId.toString() === contract.id.toString()) {
                formName = contract.clientName
                let PowerRecord = await apiPost(
                    '/ElectricityFees/LastTimeDate',
                    {contractId: clientId,
                        clientId: contract.clientId,
                        clientType: 2}
                )
                let subletList = await apiPost(
                    '/ElectricityFees/LastTimeNumber',
                    {id: clientId}
                )
                let roomNumber = contract.leaseRooms.split(',')
                let roomIds = contract.roomIds.split(',')
                subletList = subletList.data
                if (!subletList) {
                    subletList = []
                }
                if (subletList.length > 0) {
                    subletList.map(sublet => {
                        roomNumber = this.complement(roomNumber, sublet.leaseRooms.split(','))
                        roomIds = this.complement(roomIds, sublet.roomNum.split(','))
                        return ''
                    })
                }
                this.setState({
                    Contract: contract,
                    subletList: subletList,
                    roomNumberOne: roomNumber,
                    waterLossRatio: contract.waterLossRatio
                })
                let sfzq = PowerRecord.data ? [moment(PowerRecord.data.meterDate)] : null
                console.log(sfzq)
                this.props.form.setFieldsValue({
                    roomId: roomIds.toString(),
                    sfzq: sfzq,
                    roomNumber: roomNumber.toString(),
                    formName: formName,
                    waterUnitPrice: contract.waterUnitPrice,
                    subletId: null,
                    roomNumberOne: null,
                    preMeterRead: null
                })
            }
        })
    }
    readIdOne = (value) => {
        this.props.form.setFieldsValue({
            readId: value
        })
    }
    subletList = (value) => {
        this.state.subletList.forEach(async sub => {
            let formName = ''
            if (value.toString() === sub.clientId.toString()) {
                formName = sub.clientName
                let WaterRecord = await apiPost(
                    '/ElectricityFees/LastTimeDate',
                    {subletId: value,
                        id: this.props.id}
                )
                this.setState({
                    roomNumberOne: sub.leaseRooms.split(',')
                })
                let sfzq = WaterRecord.data ? [moment(WaterRecord.data.meterDate)] : null
                this.props.form.setFieldsValue({
                    roomNumber: sub.leaseRooms.toString(),
                    roomId: sub.roomNum.toString(),
                    subletName: sub.clientName,
                    formName: formName,
                    subletId: value,
                    roomNumberOne: null,
                    preMeterRead: null,
                    sfzq: sfzq
                })
            }
        })
    }
    chooseRoomNumber = async (value) => {
        let WaterRecord = await apiPost(
            '/water/getLastTime',
            {roomNumberOne: value,
                waterFeeId: this.props.id}
        )
        WaterRecord = WaterRecord.data
        if (WaterRecord !== null && WaterRecord !== '' && typeof (WaterRecord) !== 'undefined') {
            this.props.form.setFieldsValue({
                preMeterRead: WaterRecord.meterRead
            })
        }
    }
    Water = () => {
        let json = this.props.form.getFieldsValue()
        json['preMeterRead'] = json.preMeterRead ? json.preMeterRead : 0
        json['meterRead'] = json.meterRead ? json.meterRead : 0
        this.props.form.setFieldsValue({
            waterCount: json.meterRead - json.preMeterRead
        })
    }
    // 添加违约金
    addLiquidatedDamages = () => {
        console.log('添加违约金')
        let json = this.props.form.getFieldsValue()
        let jsonTwo = {}
        jsonTwo['money'] = json.liquidatedDamagesMoney
        jsonTwo['name'] = json.liquidatedDamagesName
        jsonTwo['uuid'] = new Date().getTime()
        let PowerRecordlList = this.state.PowerRecordlList
        PowerRecordlList.push(jsonTwo)
        this.setState({
            totalPower: (parseFloat(this.state.totalPower) + parseFloat(jsonTwo.power)).toFixed(2),
            totalMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsonTwo.money)).toFixed(2),
            PowerRecordlList: PowerRecordlList
        })
        this.props.form.setFieldsValue({
            receivableMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsonTwo.money)).toFixed(2)
        })
    }
    // 添加上月差额
    addBalance = () => {
        let json = this.props.form.getFieldsValue()
        let jsonTwo = {}
        jsonTwo['price'] = json.unitPriceBalance
        jsonTwo['money'] = json.balance
        jsonTwo['name'] = '上月差额'
        jsonTwo['uuid'] = new Date().getTime()
        let PowerRecordlList = this.state.PowerRecordlList
        PowerRecordlList.push(jsonTwo)
        this.setState({
            totalPower: (parseFloat(this.state.totalPower) + parseFloat(jsonTwo.power)).toFixed(2),
            totalMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsonTwo.money)).toFixed(2),
            PowerRecordlList: PowerRecordlList
        })
        this.props.form.setFieldsValue({
            receivableMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsonTwo.money)).toFixed(2)
        })
    }
    // 添加条目
    add = () => {
        console.log('呵呵')
        let json = this.props.form.getFieldsValue()
        console.log(json)
        let jsontwo = {}
        jsontwo['room'] = json.room
        jsontwo['name'] = json.name
        jsontwo['lastMeterNumber'] = json.lastMeterNumber ? json.lastMeterNumber : 0
        jsontwo['meterNumber'] = json.meterNumber ? json.meterNumber : 0
        jsontwo['useNumber'] = (json.meterNumber - json.lastMeterNumber) ? json.meterNumber - json.lastMeterNumber : 0
        jsontwo['chenge'] = json.chenge ? json.chenge : 0
        jsontwo['price'] = json.price ? json.price : 0
        jsontwo['electricalLoss'] = jsontwo.chenge * jsontwo.useNumber
        jsontwo['power'] = jsontwo.useNumber * jsontwo.chenge + jsontwo.electricalLoss
        jsontwo['money'] = (jsontwo.power * jsontwo.price) ? (jsontwo.power * jsontwo.price) : 0
        jsontwo['note'] = json.note
        jsontwo['lastMouthUnitPrice'] = json.lastMouthUnitPrice
        jsontwo['lastMouthTotalDosage'] = json.lastMouthTotalDosage
        jsontwo['unitPriceBalance'] = json.unitPriceBalance
        jsontwo['lastMouthTotalDosage'] = json.lastMouthTotalDosage
        jsontwo['Balance'] = json.Balance
        jsontwo['uuid'] = new Date().getTime()
        let PowerRecordlList = this.state.PowerRecordlList
        PowerRecordlList.push(jsontwo)
        this.setState({
            totalPower: (parseFloat(this.state.totalPower) + parseFloat(jsontwo.power)).toFixed(2),
            totalMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsontwo.money)).toFixed(2),
            PowerRecordlList: PowerRecordlList
        })
        this.props.form.setFieldsValue({
            receivableMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsontwo.money)).toFixed(2)
        })
    }
    // 删除条目
    delete = (uuid) => {
        console.log(uuid)
        let PowerRecordlList = this.state.PowerRecordlList
        PowerRecordlList.map((PowerRecord, i) => {
            if (PowerRecord.uuid.toString() === uuid.toString()) {
                PowerRecordlList.splice(i, 1)
                this.setState({
                    totalPower: (parseFloat(this.state.totalPower) - parseFloat(PowerRecordlList.power)).toFixed(2),
                    totalMoney: (parseFloat(this.state.totalMoney) - parseFloat(PowerRecordlList.money)).toFixed(2),
                    WaterRecordlList: PowerRecordlList
                })
                this.props.form.setFieldsValue({
                    receivableMoney: (parseFloat(this.state.totalMoney) - parseFloat(PowerRecord.money)).toFixed(2)
                })
            }
            return ''
        })
    }
    amountReceivable = (e) => {
        let num = e.target.value
        this.props.form.setFieldsValue({
            receivableMoney: (parseFloat(this.state.totalMoney) - parseFloat(num ? num : 0)).toFixed(2)
        })
    }
    // 本次抄表数
    currentMeterReading = () => {
        let json = this.props.form.getFieldsValue()
        json['meterNumber'] = json.meterNumber ? json.meterNumber : 0
        json['lastMeterNumber'] = json.lastMeterNumber ? json.lastMeterNumber : 0
        this.props.form.setFieldsValue({
            useNumber: (json.meterNumber - json.lastMeterNumber).toFixed(2)
        })
    }
    // 差额
    balanceMoney = () => {
        let json = this.props.form.getFieldsValue()
        json['lastMouthUnitPrice'] = json.lastMouthUnitPrice ? json.lastMouthUnitPrice : 0
        json['currentMouthUnitPrice'] = json.currentMouthUnitPrice ? json.currentMouthUnitPrice : 0
        json['lastMouthTotalDosage'] = json.lastMouthTotalDosage ? json.lastMouthTotalDosage : 0
        this.props.form.setFieldsValue({
            unitPriceBalance: (json.currentMouthUnitPrice - json.lastMouthUnitPrice).toFixed(2),
            balance: ((json.currentMouthUnitPrice - json.lastMouthUnitPrice) * json.lastMouthTotalDosage).toFixed(2)
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 14,
                    offset: 6
                }
            }
        }

        const titleLayout = {
            color: '#ffffff',
            height: 48,
            backgroundColor: '#0099EB',
            textAlign: 'center',
            fontSize: 16,
            lineHeight: '48px'
        }

        const greenButtonStyle = {
            backgroundColor: '#1FCA3E',
            borderColor: '#1FCA3E'
        }
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width="1100px"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <div style={{background: '#f7f7f7',
                        width: 900,
                        marginBottom: 20,
                        paddingTop: '22px'}}
                    >
                        <Row>
                            <Col span={8}>
                                <FormItem label="客户名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('clientName', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择客户名称!'
                                        }]
                                    })(
                                        <Select
                                            showSearch
                                            style={{ width: 200,
                                                marginRight: '10px' }}
                                            placeholder="请选择客户名称"
                                            optionFilterProp="children"
                                            onChange={this.chooseClient}
                                        >
                                            {this.state.ClientList.map(Contract => {
                                                return <Option key={Contract.id}>{Contract.clientName + '(' + Contract.leaseRooms + ')'}</Option>
                                            })}
                                        </Select>)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="转租客户" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('subletIdOne')(
                                        <Select
                                            showSearch
                                            style={{ width: 200,
                                                marginRight: '10px' }}
                                            placeholder="请选择转租客户"
                                            optionFilterProp="children"
                                            onChange={this.subletList}
                                        >
                                            {this.state.subletList.map((sub, i) => {
                                                return <Option key={sub.clientId}>{sub.clientName}</Option>
                                            })}
                                        </Select>)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="房间编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('roomNumber')(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="本次周期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('sfzq', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择本次周期!'
                                        }]
                                    })(<RangePicker />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="交费期限" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('overdueDate', {
                                        rules: [ {
                                            required: true,
                                            message: '请填写交费期限!'
                                        }]
                                    })(<DatePicker />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="抄表人员" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('readIdOne', {
                                        rules: [ {
                                            required: true,
                                            message: '请选择抄表人员!'
                                        }]
                                    })(
                                        <Select
                                            showSearch
                                            style={{ width: 200,
                                                marginRight: '10px' }}
                                            placeholder="请选择抄表人员"
                                            optionFilterProp="children"
                                            onChange={this.readIdOne}
                                        >
                                            {this.state.meterReader.map(user => {
                                                return <Option key={user.id}>{user.loginName}</Option>
                                            })}
                                        </Select>)}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <span style={{textAlign: 'center',
                        display: 'block'}}
                    >
                        {getFieldDecorator('eee')(<Input style={{width: '300px'}} />)}
                        <span>电量统计表</span>
                    </span>
                    <br />
                    <div style={{marginBottom: 20}}>
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>电费名称</td>
                                    <td>上次抄表数</td>
                                    <td>本次抄表数</td>
                                    <td>本次用电量</td>
                                    <td>变比</td>
                                    <td>电损</td>
                                    <td>总电量</td>
                                    <td>峰谷比例</td>
                                    <td>单价</td>
                                    <td>金额</td>
                                    <td>备注</td>
                                    <td>操作</td>
                                </tr>
                                {this.state.PowerRecordlList.map((PowerRecord, i) => <tr key={i}>
                                    <td>{PowerRecord.name}</td>
                                    <td>{PowerRecord.lastMeterNumber}</td>
                                    <td>{PowerRecord.meterNumber}</td>
                                    <td>{PowerRecord.useNumber}</td>
                                    <td>{PowerRecord.chenge}</td>
                                    <td>{PowerRecord.electricalLoss}</td>
                                    <td>{PowerRecord.power}</td>
                                    <td>{PowerRecord.fenggubili}</td>
                                    <td>{PowerRecord.price}</td>
                                    <td>{PowerRecord.money}</td>
                                    <td>{PowerRecord.note}</td>
                                    <td><Button onClick={() => this.delete(PowerRecord.uuid)}>删除</Button></td></tr>)}
                                <tr>
                                    <td>合计</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>{this.state.totalPower}</td>
                                    <td />
                                    <td />
                                    <td>{this.state.totalMoney}</td>
                                    <td />
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Row>
                        <Col span={12} />
                        <Col span={6}>
                            <FormItem label="本期应收" labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('receivableMoney', {
                                    rules: [ {
                                        required: true,
                                        message: '请填写本期应收!'
                                    }]
                                })(<Input style={{width: '100px'}} addonBefore="￥" />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="优惠金额" labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('amountReceivable')(<Input onChange={this.amountReceivable} style={{width: '100px'}} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={32}>
                        <Col span={8}>
                            <div style={{border: '1px solid #EBEBEB'}}>
                                <div style={titleLayout}>抄表录入</div>
                                <div style={{marginTop: 20}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="房间编号"
                                    >{getFieldDecorator('room')(
                                            <Select
                                                showSearch
                                                style={{ width: 200}}
                                                placeholder="请选择房间编号"
                                                optionFilterProp="children"
                                                onChange={this.chooseRoomNumber}
                                            >
                                                {this.state.roomNumberOne.map((roomNumber, i) => {
                                                    return <Option key={roomNumber}>{roomNumber}</Option>
                                                })}
                                            </Select>)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="费用名称"
                                    >{getFieldDecorator('name')(<Input placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="上次抄表数"
                                    >{getFieldDecorator('lastMeterNumber')(<Input id="lastMeterNumber" onBlur={this.currentMeterReading} placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="本次抄表数"
                                    >{getFieldDecorator('meterNumber')(<Input id="meterNumber" onBlur={this.currentMeterReading} placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="本次用电量"
                                    >{getFieldDecorator('useNumber')(<Input addonAfter="Kwh" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="变比"
                                    >{getFieldDecorator('chenge')(<Input placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="单价"
                                    >{getFieldDecorator('price')(<Input placeholder="请输入内容" addonAfter="元/度" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="备注"
                                    >{getFieldDecorator('note')(<Input type="textarea" rows={6} />)
                                        }
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button onClick={this.add} type="primary" htmlType="submit" style={greenButtonStyle} >增加本条记录</Button>
                                    </FormItem>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{border: '1px solid #EBEBEB'}}>
                                <div style={titleLayout}>调差</div>
                                <div onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="本月单价："
                                    >{getFieldDecorator('currentMouthUnitPrice')(<Input id="currentMouthUnitPrice" onBlur={this.balanceMoney} placeholder="请输入内容" addonAfter="元/度" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="上月单价："
                                    >{getFieldDecorator('lastMouthUnitPrice')(<Input id="lastMouthUnitPrice" onBlur={this.balanceMoney} placeholder="请输入内容" addonAfter="元/度" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="单价差额："
                                    >{getFieldDecorator('unitPriceBalance')(<Input addonAfter="元/度" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="上月总用量："
                                    >{getFieldDecorator('lastMouthTotalDosage')(<Input id="lastMouthTotalDosage" onBlur={this.balanceMoney} placeholder="请输入内容" addonAfter="Kwh" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="差额："
                                    >{getFieldDecorator('balance')(<Input addonAfter="元" />)
                                        }
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button onClick={this.addBalance} type="primary" htmlType="submit" style={greenButtonStyle} >增加本条记录</Button>
                                    </FormItem>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{border: '1px solid #EBEBEB'}}>
                                <div style={titleLayout}>录入违约金</div>
                                <div onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="违约金名称："
                                    >{getFieldDecorator('liquidatedDamagesName')(<Input placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="违约金金额："
                                    >{getFieldDecorator('liquidatedDamagesMoney')(<Input placeholder="请输入内容" addonAfter="元" />)
                                        }
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button onClick={this.addLiquidatedDamages} type="primary" htmlType="submit" style={greenButtonStyle} >增加本条记录</Button>
                                    </FormItem>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

let PowerAddUpComponent = Form.create()(PowerAddUp)
export default PowerAddUpComponent
