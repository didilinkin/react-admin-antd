// 收费管理 - 物业费管理
import React from 'react'
import {Row, Col, Input, DatePicker, Select, Modal, Form, Icon, notification} from 'antd'
import '../../../../style/test.less'
import { apiPost  } from '../../../../api'
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker
class propertyFeeAdd extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            accountList: [],
            tenantList: [],
            pmContractList: [],
            openAdd: false,
            isFirst: true,
            data2: [],
            json1: {},
            PropertyFeeList: [],
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        let accountList = await apiPost(
            '/collectRent/getAccountList'
        )
        let pmContractList = await apiPost(
            '/propertyFee/getPmContractList'
        )
        this.setState({accountList: accountList.data,
            pmContractList: pmContractList.data})
        if (this.state.isFirst && nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
                isFirst: false,
                view: true,
                fileList: []
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    startDate = null
    endDate = null
    onChange1 = (date, dateString) =>{
        this.startDate = date[0].format('YYYY-MM-DD')
        this.endDate = date[1].format('YYYY-MM-DD')
        let json = this.state.json1
        json['startDate'] = this.startDate
        json['endDate'] = this.endDate
    }
    payDeadline = null
    onChange2 = (date, dateString) =>{
        let json = this.state.json1
        this.payDeadline = date.format('YYYY-MM-DD HH:MM:SS')
        json['payDeadline'] = this.payDeadline
    }
    printDate = null
    onChange3 = (date, dateString) =>{
        this.printDate = date.format('YYYY-MM-DD HH:MM:SS')
        let json = this.state.json1
        json['printDate'] = this.printDate
    }
    mGetDate (year, month) {
        let d = new Date(year, month, 0)
        return d.getDate()
    }
    handleChange1= async (value) =>{
        let tenantList = await apiPost(
            '/propertyFee/getSubletByPmId',
            {id: value}
        )
        this.setState({tenantList: tenantList.data})
        this.state.pmContractList.map(pmContract =>{
            let id = pmContract.id.toString()
            if (value === id) {
                let json = this.state.json1
                json['yearPmPrice'] = pmContract.yearPmPrice
                json['yearAcPrice'] = pmContract.yearAcPrice
                json['printClientName'] = pmContract.clientName
                json['pmUnitPrice'] = pmContract.pmUnitPrice
                json['acUnitPrice'] = pmContract.acUnitPrice
                json['elevUnitPrice'] = pmContract.elevUnitPrice
                json['waterUnitPrice'] = pmContract.waterUnitPrice
                json['acUnitDay'] = pmContract.acUnitDay
                json['waterType'] = pmContract.waterType
                json['clientType'] = 1
                let area = 0
                let serviceArea = pmContract.serviceArea
                let subletNum = ''
                let roomNumber = ''
                if (this.state.tenantList.length !== 0) {
                    alert(1111)
                    this.state.tenantList.map(tenant => {
                        area += tenant.serviceArea
                        subletNum = subletNum + (tenant.leaseRooms + ',')
                        return ''
                    })
                    roomNumber = pmContract.leaseRooms + ','
                    let subletNumberarr = subletNum.split(',')
                    let roomNumberarr = roomNumber.split(',')
                    for (let i = 0; i < subletNumberarr.length; i++) {
                        for (let j = 0; j < roomNumberarr.length; j++) {
                            if (roomNumberarr[j] === subletNumberarr[i]) {
                                roomNumberarr.splice(j, 1)
                                j = j - 1
                            }
                        }
                    }
                    roomNumber = roomNumberarr
                    json['roomNum'] = roomNumber
                    json['serviceArea'] = serviceArea - area
                    this.props.form.setFieldsValue({
                        buildName: pmContract.buildName,
                        serviceArea: serviceArea - area,
                        roomNum: roomNumber,
                        yearPmPrice: pmContract.yearPmPrice,
                        yearAcPrice: pmContract.yearAcPrice
                    })
                } else {
                    json['roomNum'] = pmContract.leaseRooms
                    json['serviceArea'] = serviceArea
                    this.props.form.setFieldsValue({
                        buildName: pmContract.buildName,
                        serviceArea: serviceArea,
                        roomNum: pmContract.leaseRooms,
                        yearPmPrice: pmContract.yearPmPrice,
                        yearAcPrice: pmContract.yearAcPrice
                    })
                }
                let sd = this.startDate
                let ed = this.endDate
                let startDate = new Date(sd)
                let endDate = new Date(ed)
                let startDay = startDate.getDate()
                let startMonth = startDate.getMonth()
                let startYear = startDate.getFullYear()
                let endYear = endDate.getFullYear()
                let endMonth = endDate.getMonth()
                let endDay = endDate.getDate()
                if (startDay === 1) {
                    let month = (endMonth - startMonth)
                    let lastDay = this.mGetDate(endYear, endMonth + 1)
                    if ((endDay / lastDay) === 1) {
                        json['months'] = (month + endDay / lastDay)
                    } else {
                        json['months'] = parseFloat(month + endDay / lastDay).toFixed(5)
                    }

                    let airFee = parseFloat((pmContract.acUnitDay) / 12 * month * serviceArea * (pmContract.acUnitPrice) + (pmContract.acUnitDay) / 12 * endDay / lastDay * serviceArea * (pmContract.acUnitPrice)).toFixed(1)
                    let pmFee = parseFloat(month * serviceArea * (pmContract.pmUnitPrice) + endDay / lastDay * serviceArea * (pmContract.pmUnitPrice)).toFixed(1)
                    let waterFee = 0
                    if (pmContract.waterType === 0) {
                        waterFee = parseFloat(month * serviceArea * (pmContract.waterUnitPrice) + endDay / lastDay * serviceArea * (pmContract.waterUnitPrice)).toFixed(1)
                        json['waterFee'] = waterFee
                    } else {
                        json['waterFee'] = 0.0
                    }
                    let elevatorFee = parseFloat(month * serviceArea * (pmContract.elevUnitPrice) + endDay / lastDay * serviceArea * (pmContract.elevUnitPrice)).toFixed(1)
                    // alert(yearAcPrice);
                    json['elevatorFee'] = elevatorFee
                    if (pmContract.yearPmPrice !== 0 || pmContract.yearAcPrice !== 0) {
                        // alert(1111);
                        pmFee = pmContract.yearPmPrice
                        airFee = pmContract.yearAcPrice
                    }
                    json['airFee'] = airFee
                    json['pmFee'] = pmFee
                    let currentPeriodMoney = parseFloat(pmFee) + parseFloat(waterFee) + parseFloat(elevatorFee) + parseFloat(airFee)
                    json['currentPeriodMoney'] = currentPeriodMoney
                    json['actualPaidMoney'] = parseFloat(currentPeriodMoney).toFixed(1)
                } else { // 起始日期不完整
                    let waterFee = 0
                    let month = (endMonth - startMonth)
                    let lastDay = this.mGetDate(startYear, startMonth + 1)
                    if (((lastDay - startDay + 1) / lastDay) === 1) {
                        json['months'] = month + (lastDay - startDay + 1) / lastDay
                    } else {
                        json['months'] = parseFloat(month + (lastDay - startDay + 1) / lastDay).toFixed(5)
                    }
                    let pmFee = parseFloat((month * serviceArea * (pmContract.pmUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (pmContract.pmUnitPrice)).toFixed(1)
                    let airFee = parseFloat(((pmContract.acUnitDay) / 12 * month * serviceArea * (pmContract.acUnitPrice)) + (pmContract.acUnitDay) / 12 * (lastDay - startDay + 1) / lastDay * serviceArea * (pmContract.acUnitPrice)).toFixed(1)
                    if (pmContract.waterType === 0) {
                        let waterFee = parseFloat((month * serviceArea * (pmContract.waterUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (pmContract.waterUnitPrice)).toFixed(1)
                        json['waterFee'] = waterFee
                    } else {
                        json['waterFee'] = 0.0
                    }
                    let elevatorFee = parseFloat((month * serviceArea * (pmContract.elevUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (pmContract.elevUnitPrice)).toFixed(1)
                    json['elevatorFee'] = elevatorFee
                    if (pmContract.yearPmPrice !== 0 || pmContract.yearAcPrice !== 0) {
                        // alert(1111);
                        pmFee = pmContract.yearPmPrice
                        airFee = pmContract.yearAcPrice
                    }
                    json['airFee'] = airFee
                    json['pmFee'] = pmFee
                    let currentPeriodMoney = parseFloat(pmFee) + parseFloat(waterFee) + parseFloat(elevatorFee) + parseFloat(airFee)
                    json['currentPeriodMoney'] = currentPeriodMoney
                    json['actualPaidMoney'] = parseFloat(currentPeriodMoney).toFixed(1)
                }
                json['clientId'] = pmContract.clientId
                json['clientName'] = pmContract.clientName
                json['contractId'] = pmContract.id
            }
        })
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        await apiPost(
            'propertyFee/savePropertyFee',
            this.state.json1
        )
        notification.open({
            message: '添加成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true })
    }
    sumMoney = (e) => {
        let discountMoney = e.target.value
        let money = this.state.json1.currentPeriodMoney
        let json = this.state.json1
        json['discountMoney'] = parseFloat(discountMoney).toFixed(1)
        if (typeof (discountMoney) === 'undefined') {
            discountMoney = 0
        }
        if (typeof (money) === 'undefined') {
            money = 0
        }
        if (discountMoney > money) {
            this.props.form.setFieldsValue({
                discountMoney: 0})
            notification.open({
                message: '优惠金额不能大于本期物业费',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
        } else {
            json['actualPaidMoney'] = parseFloat(money - discountMoney).toFixed(1)
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let pmContractList = this.state.pmContractList
        let tenantList = this.state.tenantList
        return (
            <div className="property">
                <Modal maskClosable={false}
                    title= "物业费添加"
                    style={{top: 20}}
                    width={700}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={12}>
                                <FormItem label="本次周期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('re')(
                                        <RangePicker onChange={this.onChange1} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('buildName')(
                                        <Input style={{ width: 120 }} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="交费期限" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('payDeadline')(
                                        <DatePicker onChange={this.onChange2} style={{width: 220}} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="房间编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('roomNum')(
                                        <Input style={{ width: 120 }} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="客户名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('clientName')(
                                        <Select placeholder="请选择客户"
                                            showSearch style={{ width: 220 }}
                                            onChange={this.handleChange1}
                                            optionFilterProp="children"
                                        >
                                            {pmContractList.map(pmContract => {
                                                return <Option key={pmContract.id}>{pmContract.clientName}：{pmContract.leaseRooms}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="房间面积" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('serviceArea')(
                                        <Input style={{ width: 120 }} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="转租客户" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('tenant')(
                                        <Select placeholder="请选择转租客户"
                                            onChange={this.handleChange2}
                                            optionFilterProp="children"
                                            showSearch style={{ width: 220 }}
                                        >
                                            {tenantList.map(tenant => {
                                                return <Option key={tenant.clientId}>{tenant.clientName}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="年物业费" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('yearPmPrice')(
                                        <Input style={{ width: 120 }} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="下单日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('printDate')(
                                        <DatePicker onChange={this.onChange3}style={{width: 220}} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="年空调费" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('yearAcPrice')(
                                        <Input style={{ width: 120 }} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} />
                        </Row>
                    </Form>
                    <div className="bt">
                        <Input style={{ width: 520 }} value={this.state.json1.printClientName} placeholder="这里默认显示付款通知单名，可修改，打印时读该名" /> 物业费统计表
                    </div>

                    <table className="tb">
                        <tbody>
                            <tr className="hd">
                                <td>费用项目</td>
                                <td>面积</td>
                                <td />
                                <td>单价</td>
                                <td />
                                <td>月份</td>
                                <td>金额</td>
                            </tr>
                            <tr>
                                <td>物业管理费</td>
                                <td>{this.state.json1.serviceArea}</td>
                                <td>*</td>
                                <td>{this.state.json1.yearPmPrice === 0 ? this.state.json1.pmUnitPrice : '--'}</td>
                                <td>*</td>
                                <td>{this.state.json1.months}</td>
                                <td>{this.state.json1.yearPmPrice === 0 ? this.state.json1.pmFee : this.state.json1.yearPmPrice}</td>
                            </tr>
                            <tr>
                                <td>电梯费</td>
                                <td>{this.state.json1.serviceArea}</td>
                                <td>*</td>
                                <td>{this.state.json1.elevUnitPrice}</td>
                                <td>*</td>
                                <td>{this.state.json1.months}</td>
                                <td>{this.state.json1.elevatorFee}</td>
                            </tr>
                            <tr>
                                <td>空调费</td>
                                <td>{this.state.json1.serviceArea}</td>
                                <td>*</td>
                                <td>{this.state.json1.yearAcPrice === 0 ? this.state.json1.acUnitPrice : '--'}</td>
                                <td>*</td>
                                <td>{this.state.json1.months}</td>
                                <td>{this.state.json1.yearAcPrice === 0 ? this.state.json1.airFee : this.state.json1.yearAcPrice}</td>
                            </tr>
                            {
                                <tr>
                                    <td>水费</td>
                                    <td>{this.state.json1.serviceArea}</td>
                                    <td>*</td>
                                    <td>{this.state.json1.waterType === 0 ? this.state.json1.waterUnitPrice : '--'}</td>
                                    <td>*</td>
                                    <td>{this.state.json1.months}</td>
                                    <td>{this.state.json1.waterType === 0 ? this.state.json1.waterFee : '--'}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <p style={{margin: '20px 0',
                        textAlign: 'right'}}
                    >优惠金额 &nbsp; <Input onBlur={this.sumMoney} style={{ width: 120 }} /> &nbsp; 本期应收 ¥{this.state.json1.actualPaidMoney}</p>
                </Modal>
            </div>
        )
    }
}
let PropertyFeeAdd = Form.create()(propertyFeeAdd)
export default PropertyFeeAdd

