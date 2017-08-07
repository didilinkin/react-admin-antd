// 水费
import {Modal, Input, Form, DatePicker, Button, Row, Col, Select } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import '../../../../style/test.less'
import moment from 'moment'
const { RangePicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option
class WaterAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        subletList: [],
        roomNumberOne: [],
        PmContract: [],
        users: [],
        WaterRecordlList: [],
        Contract: {},
        waterLossRatio: 0,
        totalWater: 0,
        totalMoney: 0
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            if (nextProps.id > 0) {
                debugger
                let map = await apiPost(
                    '/propertyFee/getWaterBill',
                    {id: nextProps.id}
                )
                let waterBill = map.data.waterBill
                let subletList = await apiPost(
                    '/propertyFee/getSubletByPmId',
                    {id: waterBill.contractId}
                )
                subletList = subletList.data
                let list = map.data.list
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    WaterRecordlList: list,
                    waterLossRatio: map.data.pmContract.waterLossRatio,
                    totalWater: waterBill.totalWater,
                    totalMoney: waterBill.totalMoney,
                    Contract: map.data.pmContract,
                    subletList: subletList,
                    roomNumberOne: waterBill.roomNumber.split(',')
                })
                this.props.form.setFieldsValue({
                    clientName: waterBill.clientName,
                    subletId: waterBill.subletId,
                    subletIdOne: waterBill.subletName,
                    roomNumber: waterBill.roomNumber,
                    sfzq: [moment(waterBill.preMeterDate), moment(waterBill.meterDate)],
                    overdueDate: moment(waterBill.overdueDate),
                    readIdOne: waterBill.readName,
                    readId: waterBill.readId,
                    formName: waterBill.formName,
                    receivableMoney: waterBill.receivableMoney,
                    amountReceivable: waterBill.amountReceivable,
                    subletName: waterBill.subletName,
                    roomId: waterBill.roomId
                })
            } else {
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
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    async initialRemarks2 () {
        let PmContract = await apiPost(
            '/propertyFee/getPmContractList',
            {contractStatus: 0}
        )
        let users = await apiPost(
            '/water/getchaobiaouser',
            {code: 'chaobiaoren'}
        )
        this.setState({
            PmContract: PmContract.data,
            users: users.data
        })
    }
    componentDidMount () {
        this.initialRemarks2()
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
            console.log(json)
            console.log(this.state.Contract)
            console.log(this.state.WaterRecordlList)
            for (let item in this.state.Contract) {
                json[item] = this.state.Contract[item]
            }
            json['preMeterDate'] = json.sfzq[0].format('YYYY-MM-DD')
            json['meterDate'] = json.sfzq[1].format('YYYY-MM-DD')
            json['overdueDate'] = json.overdueDate.format('YYYY-MM-DD')
            let list = JSON.stringify(this.state.WaterRecordlList)
            json['list'] = list
            json['totalWater'] = this.state.totalWater
            json['totalMoney'] = this.state.totalMoney
            if (this.props.id > 0) {
                json['oldId'] = this.props.id
                await apiPost(
                    '/water/updatewaterBill',
                    json
                )
            } else {
                await apiPost(
                    '/water/insertwaterBill',
                    json
                )
            }
            this.setState({visible: false,
                isFirst: true })
            this.props.refreshTable()
        }
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
        this.props.refreshTable()
    }

    delect = async (uuid) => {
        let WaterRecordlList = this.state.WaterRecordlList
        WaterRecordlList.map((WaterRecordl, i) => {
            if (WaterRecordl.uuid.toString() === uuid.toString()) {
                WaterRecordlList.splice(i, 1)
                this.setState({
                    totalWater: (parseFloat(this.state.totalWater) - parseFloat(WaterRecordl.sumWater)).toFixed(2),
                    totalMoney: (parseFloat(this.state.totalMoney) - parseFloat(WaterRecordl.money)).toFixed(2),
                    WaterRecordlList: WaterRecordlList
                })
                this.props.form.setFieldsValue({
                    receivableMoney: (parseFloat(this.state.totalMoney) - parseFloat(WaterRecordl.money) - parseFloat(this.props.form.getFieldValue('amountReceivable') ? this.props.form.getFieldValue('amountReceivable') : 0)).toFixed(2)
                })
            }
            return ''
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
    PmContract = (value) => {
        this.state.PmContract.map(async (contract) => {
            let formName = ''
            if (value.toString() === contract.id.toString()) {
                formName = contract.clientName
                let WaterRecord = await apiPost(
                    '/water/LastDate',
                    {contractId: value,
                        id: this.props.id,
                        clientId: contract.clientId,
                        subletId: 0}
                )
                let subletList = await apiPost(
                    '/propertyFee/getSubletByPmId',
                    {id: value}
                )
                let roomNumber = contract.leaseRooms.split(',')
                let roomIds = contract.roomIds.split(',')
                subletList = subletList.data
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
                let sfzq = WaterRecord.data ? [moment(WaterRecord.data.meterDate)] : null
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
                    '/water/LastDate',
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
    roomNumber = async (value) => {
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
    add = () => {
        let json = this.props.form.getFieldsValue()
        let jsontwo = {}
        jsontwo['chargeName'] = json.chargeName
        jsontwo['preMeterRead'] = json.preMeterRead
        jsontwo['meterRead'] = json.meterRead
        jsontwo['waterCount'] = json.waterCount
        jsontwo['meterLoss'] = parseFloat((this.state.waterLossRatio * json.waterCount / 100).toFixed(2))
        jsontwo['sumWater'] = (parseFloat(jsontwo.meterLoss) + parseFloat(json.waterCount)).toFixed(2)
        jsontwo['waterUnitPrice'] = json.waterUnitPrice
        jsontwo['money'] = (jsontwo.waterUnitPrice * jsontwo.sumWater).toFixed(2)
        jsontwo['remark'] = jsontwo.remark
        jsontwo['uuid'] = new Date().getTime()
        jsontwo['roomNumberOne'] = json.roomNumberOne
        jsontwo['metertype'] = json.metertype
        let WaterRecordlList = this.state.WaterRecordlList
        WaterRecordlList.push(jsontwo)
        this.setState({
            totalWater: (parseFloat(this.state.totalWater) + parseFloat(jsontwo.sumWater)).toFixed(2),
            totalMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsontwo.money)).toFixed(2),
            WaterRecordlList: WaterRecordlList
        })
        this.props.form.setFieldsValue({
            receivableMoney: (parseFloat(this.state.totalMoney) + parseFloat(jsontwo.money) - parseFloat(this.props.form.getFieldValue('amountReceivable') ? this.props.form.getFieldValue('amountReceivable') : 0)).toFixed(2)
        })
    }
    amountReceivable = (e) => {
        this.props.form.setFieldsValue({
            receivableMoney: (parseFloat(this.state.totalMoney) - parseFloat(e.target.value ? e.target.value : 0)).toFixed(2)
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width="950px"
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
                                            onChange={this.PmContract}
                                        >
                                            {this.state.PmContract.map(Contract => {
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
                                            {this.state.users.map(user => {
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
                        {getFieldDecorator('formName')(<Input style={{width: '300px'}} />)}
                        <span>&nbsp;&nbsp;用水统计表</span>
                    </span>
                    <br />
                    <div style={{width: 900,
                        marginBottom: 20}}
                    >
                        <table className="tb">
                            <tbody>
                                <tr className="hd">
                                    <td>水费名称</td>
                                    <td>上次表读数 m³</td>
                                    <td>本次表读数 m³</td>
                                    <td>本次用水量 m³</td>
                                    <td>损耗 {this.state.waterLossRatio}%</td>
                                    <td>总用水量m³</td>
                                    <td>单价</td>
                                    <td>金额</td>
                                    <td>备注</td>
                                    <td>操作</td>
                                </tr>
                                {this.state.WaterRecordlList.map((WaterRecordl, i) => <tr key={i}>
                                    <td>{WaterRecordl.chargeName}</td>
                                    <td>{WaterRecordl.preMeterRead}</td>
                                    <td>{WaterRecordl.meterRead}</td>
                                    <td>{WaterRecordl.waterCount}</td>
                                    <td>{WaterRecordl.meterLoss}</td>
                                    <td>{WaterRecordl.sumWater}</td>
                                    <td>{WaterRecordl.waterUnitPrice}</td>
                                    <td>{WaterRecordl.money}</td>
                                    <td>{WaterRecordl.remark}</td>
                                    <td><Button onClick={() => this.delect(WaterRecordl.uuid)}>删除</Button></td></tr>)}
                                <tr>
                                    <td>合计</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>{this.state.totalWater}</td>
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
                    <Row>
                        <Col span={24} >
                            <span style={{textAlign: 'center',
                                display: 'block',
                                backgroundColor: '#2788ce',
                                color: 'aliceblue',
                                width: 900,
                                marginBottom: 20,
                                height: '30px',
                                fontSize: '20px'
                            }}
                            >抄表录入</span>
                        </Col>
                    </Row>
                    <div style={{textAlign: 'center',
                        display: 'block',
                        width: 900,
                        marginBottom: 20,
                        paddingTop: '22px'
                    }}
                    >
                        <Row>
                            <Col span={8}>
                                <FormItem label="水费名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('chargeName')(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="房间编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('roomNumberOne')(
                                        <Select
                                            showSearch
                                            style={{ width: 200,
                                                marginRight: '10px' }}
                                            placeholder="请选择房间编号"
                                            optionFilterProp="children"
                                            onChange={this.roomNumber}
                                        >
                                            {this.state.roomNumberOne.map((roomNumber, i) => {
                                                return <Option key={roomNumber}>{roomNumber}</Option>
                                            })}
                                        </Select>)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="表计类型" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('meterType')(
                                        <Select
                                            showSearch
                                            style={{ width: 200,
                                                marginRight: '10px' }}
                                            placeholder="请选择表计类型"
                                            optionFilterProp="children"
                                        >
                                            <Option key="1">自来水</Option>
                                            <Option key="2">热水</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="上次抄表数" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('preMeterRead')(<Input onBlur={this.Water} />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="本次抄表数" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('meterRead')(<Input onBlur={this.Water} />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="本次用水量" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('waterCount')(<Input addonAfter="m³" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="水费单价" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('waterUnitPrice')(<Input addonAfter="元/m³" />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="备注" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('remark')(<textarea style={{width: '500px'}} />)}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <Button type="primary" onClick={this.add}>添加一条记录</Button>
                    {getFieldDecorator('roomId')(<Input type="hidden" />)}
                    {getFieldDecorator('subletId')(<Input type="hidden" />)}
                    {getFieldDecorator('readId')(<Input type="hidden" />)}
                    {getFieldDecorator('subletName')(<Input type="hidden" />)}
                </Form>
            </Modal>
        )
    }
}

let WaterAddUpComponent = Form.create()(WaterAddUp)

export default WaterAddUpComponent
