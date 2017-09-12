// 收费管理 - 物业费管理
import React from 'react'
import {Row, Col, Input, DatePicker, Select, Modal, Form, Icon, notification} from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../api'
import moment from 'moment'
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
        let accountList = await apiPost(
            '/propertyFee/getAccountList'
        )
        let pmContractList = await apiPost(
            '/propertyFee/getPmContractList',
            {contractStatus: 0}
        )
        this.setState({accountList: accountList.data,
            pmContractList: pmContractList.data})
        if (nextProps.id !== null) {
            let json = this.state.json1
            if (this.state.isFirst && nextProps.visible) {
                let propertyFee = await apiPost(
                    '/propertyFee/getPropertyFeeById',
                    {id: nextProps.id}
                )
                json['pmUnitPrice'] = propertyFee.data.pmUnitPrice
                json['auditStatus'] = 0
                json['printClientName'] = propertyFee.data.printClientName
                json['id'] = nextProps.id
                json['acUnitPrice'] = propertyFee.data.acUnitPrice
                json['elevUnitPrice'] = propertyFee.data.elevUnitPrice
                json['waterUnitPrice'] = propertyFee.data.waterUnitPrice
                json['acUnitDay'] = propertyFee.data.acUnitDay
                json['waterType'] = propertyFee.data.waterType
                json['clientType'] = propertyFee.data.clientType
                json['serviceArea'] = parseFloat(propertyFee.data.serviceArea).toFixed(2)
                json['yearPmPrice'] = propertyFee.data.yearPmPrice
                json['yearAcPrice'] = propertyFee.data.yearAcPrice
                json['months'] = propertyFee.data.months
                json['pmFee'] = propertyFee.data.pmFee
                json['elevatorFee'] = propertyFee.data.elevatorFee
                json['airFee'] = propertyFee.data.airFee
                json['waterFee'] = propertyFee.data.waterFee
                json['clientId'] = propertyFee.data.clientId
                json['clientName'] = propertyFee.data.clientName
                json['contractId'] = propertyFee.data.contractId
                json['actualPaidMoney'] = propertyFee.data.actualPaidMoney
                this.props.form.setFieldsValue({
                    buildName: propertyFee.data.buildName,
                    serviceArea: propertyFee.data.serviceArea,
                    roomNum: propertyFee.data.roomNum,
                    printClientName: propertyFee.data.printClientName,
                    yearPmPrice: propertyFee.data.yearPmPrice,
                    yearAcPrice: propertyFee.data.yearAcPrice,
                    periodDate: [moment(propertyFee.data.startDate), moment(propertyFee.data.endDate)],
                    payDeadline: moment(propertyFee.data.payDeadline),
                    printDate: moment(propertyFee.data.printDate),
                    clientName: propertyFee.data.clientName,
                    tenant: propertyFee.data.tenant,
                    accountId: propertyFee.data.accountName,
                    actualPaidMoney: propertyFee.data.actualPaidMoney,
                    discountMoney: propertyFee.data.discountMoney
                })
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        } else {
            let json = this.state.json1
            if (this.state.isFirst && nextProps.visible) {
                json['pmUnitPrice'] = ''
                json['acUnitPrice'] = ''
                json['elevUnitPrice'] = ''
                json['waterUnitPrice'] = ''
                json['acUnitDay'] = ''
                json['serviceArea'] = ''
                json['months'] = ''
                json['pmFee'] = ''
                json['elevatorFee'] = ''
                json['airFee'] = ''
                json['waterFee'] = ''
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    startDate = null
    endDate = null
    onChange1 = (date, dateString) =>{
        if (date[0] !== null && date[1] !== null) {
            this.startDate = date[0].format('YYYY-MM-DD')
            this.endDate = date[1].format('YYYY-MM-DD')
            let json = this.state.json1
            json['startDate'] = this.startDate
            json['endDate'] = this.endDate

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

                let airFee = parseFloat((json.acUnitDay) / 12 * month * json.serviceArea * (json.acUnitPrice) + (json.acUnitDay) / 12 * endDay / lastDay * json.serviceArea * (json.acUnitPrice)).toFixed(1)
                let pmFee = parseFloat(month * json.serviceArea * (json.pmUnitPrice) + endDay / lastDay * json.serviceArea * (json.pmUnitPrice)).toFixed(1)
                let waterFee = 0
                if (json.waterType === 0) {
                    waterFee = parseFloat(month * json.serviceArea * (json.waterUnitPrice) + endDay / lastDay * json.serviceArea * (json.waterUnitPrice)).toFixed(1)
                    json['waterFee'] = waterFee
                } else {
                    json['waterFee'] = 0.0
                }
                let elevatorFee = parseFloat(month * json.serviceArea * (json.elevUnitPrice) + endDay / lastDay * json.serviceArea * (json.elevUnitPrice)).toFixed(1)
                // alert(yearAcPrice);
                json['elevatorFee'] = elevatorFee
                if (json.yearPmPrice !== 0 || json.yearAcPrice !== 0) {
                    // alert(1111);
                    pmFee = json.yearPmPrice
                    airFee = json.yearAcPrice
                }
                json['airFee'] = airFee
                json['pmFee'] = pmFee
                let currentPeriodMoney = parseFloat(pmFee) + parseFloat(waterFee) + parseFloat(elevatorFee) + parseFloat(airFee)
                json['currentPeriodMoney'] = currentPeriodMoney
                json['actualPaidMoney'] = parseFloat(currentPeriodMoney).toFixed(1)
                this.props.form.setFieldsValue({
                    actualPaidMoney: parseFloat(currentPeriodMoney).toFixed(1)
                })
            } else { // 起始日期不完整
                let waterFee = 0
                let month = (endMonth - startMonth)
                let lastDay = this.mGetDate(startYear, startMonth + 1)
                if (((lastDay - startDay + 1) / lastDay) === 1) {
                    json['months'] = month + (lastDay - startDay + 1) / lastDay
                } else {
                    json['months'] = parseFloat(month + (lastDay - startDay + 1) / lastDay).toFixed(5)
                }
                let pmFee = parseFloat((month * json.serviceArea * (json.pmUnitPrice)) + (lastDay - startDay + 1) / lastDay * json.serviceArea * (json.pmUnitPrice)).toFixed(1)
                let airFee = parseFloat(((json.acUnitDay) / 12 * month * json.serviceArea * (json.acUnitPrice)) + (json.acUnitDay) / 12 * (lastDay - startDay + 1) / lastDay * json.serviceArea * (json.acUnitPrice)).toFixed(1)
                if (json.waterType === 0) {
                    waterFee = parseFloat((month * json.serviceArea * (json.waterUnitPrice)) + (lastDay - startDay + 1) / lastDay * json.serviceArea * (json.waterUnitPrice)).toFixed(1)
                    json['waterFee'] = waterFee
                } else {
                    json['waterFee'] = 0.0
                }
                let elevatorFee = parseFloat((month * json.serviceArea * (json.elevUnitPrice)) + (lastDay - startDay + 1) / lastDay * json.serviceArea * (json.elevUnitPrice)).toFixed(1)
                json['elevatorFee'] = elevatorFee
                if (json.yearPmPrice !== 0 || json.yearAcPrice !== 0) {
                    // alert(1111);
                    pmFee = json.yearPmPrice
                    airFee = json.yearAcPrice
                }
                json['airFee'] = airFee
                json['pmFee'] = pmFee
                let currentPeriodMoney = parseFloat(pmFee) + parseFloat(waterFee) + parseFloat(elevatorFee) + parseFloat(airFee)
                json['currentPeriodMoney'] = currentPeriodMoney
                json['actualPaidMoney'] = parseFloat(currentPeriodMoney).toFixed(1)
                this.props.form.setFieldsValue({
                    actualPaidMoney: parseFloat(currentPeriodMoney).toFixed(1)
                })
            }
            json['clientId'] = json.clientId
            json['clientName'] = json.clientName
            json['contractId'] = json.contractId
        }
    }
    payDeadline = null
    onChange2 = (date, dateString) =>{
        if (date !== null) {
            let json = this.state.json1
            this.payDeadline = date.format('YYYY-MM-DD HH:MM:SS')
            json['payDeadline'] = this.payDeadline
        }
    }
    printDate = null
    onChange3 = (date, dateString) =>{
        if (date !== null) {
            this.printDate = date.format('YYYY-MM-DD HH:MM:SS')
            let json = this.state.json1
            json['printDate'] = this.printDate
        }
    }
    mGetDate (year, month) {
        let d = new Date(year, month, 0)
        return d.getDate()
    }
    handleChange1= async (value) =>{
        this.props.form.setFieldsValue({
            tenant: null
        })
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
                    // alert(1111)
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
                    roomNumber = roomNumberarr.join(',')
                    // console.log(roomNumber)
                    json['roomNum'] = roomNumber
                    json['serviceArea'] = parseFloat(serviceArea - area).toFixed(2)
                    serviceArea = serviceArea - area
                    this.props.form.setFieldsValue({
                        buildName: pmContract.buildName,
                        serviceArea: parseFloat(serviceArea).toFixed(2),
                        roomNum: roomNumber,
                        printClientName: pmContract.clientName,
                        yearPmPrice: pmContract.yearPmPrice,
                        yearAcPrice: pmContract.yearAcPrice
                    })
                } else {
                    json['roomNum'] = pmContract.leaseRooms
                    json['serviceArea'] = parseFloat(serviceArea).toFixed(2)
                    this.props.form.setFieldsValue({
                        buildName: pmContract.buildName,
                        serviceArea: parseFloat(serviceArea).toFixed(2),
                        roomNum: pmContract.leaseRooms,
                        printClientName: pmContract.clientName,
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
                    this.props.form.setFieldsValue({
                        actualPaidMoney: parseFloat(currentPeriodMoney).toFixed(1)
                    })
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
                        waterFee = parseFloat((month * serviceArea * (pmContract.waterUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (pmContract.waterUnitPrice)).toFixed(1)
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
                    this.props.form.setFieldsValue({
                        actualPaidMoney: parseFloat(currentPeriodMoney).toFixed(1)
                    })
                }
                json['clientId'] = pmContract.clientId
                json['clientName'] = pmContract.clientName
                json['contractId'] = pmContract.id
                json['tenant'] = null
            }
            return ''
        })
    }
    handleChange2 = (value) =>{
        this.state.tenantList.map(pmContract =>{
            let id = pmContract.clientId.toString()
            if (value === id) {
                this.props.form.setFieldsValue({
                    serviceArea: parseFloat(pmContract.serviceArea).toFixed(2),
                    printClientName: pmContract.clientName,
                    roomNum: pmContract.leaseRooms
                })
                let json = this.state.json1
                json['printClientName'] = pmContract.clientName
                json['roomNum'] = pmContract.leaseRooms
                json['serviceArea'] = parseFloat(pmContract.serviceArea).toFixed(2)
                json['clientType'] = 2
                let serviceArea = pmContract.serviceArea

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

                    let airFee = parseFloat((json.acUnitDay) / 12 * month * serviceArea * (json.acUnitPrice) + (json.acUnitDay) / 12 * endDay / lastDay * serviceArea * (json.acUnitPrice)).toFixed(1)
                    let pmFee = parseFloat(month * serviceArea * (json.pmUnitPrice) + endDay / lastDay * serviceArea * (json.pmUnitPrice)).toFixed(1)
                    let waterFee = 0
                    if (json.waterType === 0) {
                        waterFee = parseFloat(month * serviceArea * (json.waterUnitPrice) + endDay / lastDay * serviceArea * (json.waterUnitPrice)).toFixed(1)
                        json['waterFee'] = waterFee
                    } else {
                        json['waterFee'] = 0.0
                    }
                    let elevatorFee = parseFloat(month * serviceArea * (json.elevUnitPrice) + endDay / lastDay * serviceArea * (json.elevUnitPrice)).toFixed(1)
                    // alert(yearAcPrice);
                    json['elevatorFee'] = elevatorFee
                    if (json.yearPmPrice !== 0 || json.yearAcPrice !== 0) {
                        // alert(1111);
                        pmFee = json.yearPmPrice
                        airFee = json.yearAcPrice
                    }
                    json['airFee'] = airFee
                    json['pmFee'] = pmFee
                    let currentPeriodMoney = parseFloat(pmFee) + parseFloat(waterFee) + parseFloat(elevatorFee) + parseFloat(airFee)
                    json['currentPeriodMoney'] = currentPeriodMoney
                    json['actualPaidMoney'] = parseFloat(currentPeriodMoney).toFixed(1)
                    this.props.form.setFieldsValue({
                        actualPaidMoney: parseFloat(currentPeriodMoney).toFixed(1)
                    })
                } else { // 起始日期不完整
                    let waterFee = 0
                    let month = (endMonth - startMonth)
                    let lastDay = this.mGetDate(startYear, startMonth + 1)
                    if (((lastDay - startDay + 1) / lastDay) === 1) {
                        json['months'] = month + (lastDay - startDay + 1) / lastDay
                    } else {
                        json['months'] = parseFloat(month + (lastDay - startDay + 1) / lastDay).toFixed(5)
                    }
                    let pmFee = parseFloat((month * serviceArea * (json.pmUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (json.pmUnitPrice)).toFixed(1)
                    let airFee = parseFloat(((json.acUnitDay) / 12 * month * serviceArea * (json.acUnitPrice)) + (json.acUnitDay) / 12 * (lastDay - startDay + 1) / lastDay * serviceArea * (json.acUnitPrice)).toFixed(1)
                    if (json.waterType === 0) {
                        waterFee = parseFloat((month * serviceArea * (json.waterUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (json.waterUnitPrice)).toFixed(1)
                        json['waterFee'] = waterFee
                    } else {
                        json['waterFee'] = 0.0
                    }
                    let elevatorFee = parseFloat((month * serviceArea * (json.elevUnitPrice)) + (lastDay - startDay + 1) / lastDay * serviceArea * (json.elevUnitPrice)).toFixed(1)
                    json['elevatorFee'] = elevatorFee
                    if (json.yearPmPrice !== 0 || json.yearAcPrice !== 0) {
                        // alert(1111);
                        pmFee = json.yearPmPrice
                        airFee = json.yearAcPrice
                    }
                    json['airFee'] = airFee
                    json['pmFee'] = pmFee
                    let currentPeriodMoney = parseFloat(pmFee) + parseFloat(waterFee) + parseFloat(elevatorFee) + parseFloat(airFee)
                    json['currentPeriodMoney'] = currentPeriodMoney
                    json['actualPaidMoney'] = parseFloat(currentPeriodMoney).toFixed(1)
                    this.props.form.setFieldsValue({
                        actualPaidMoney: parseFloat(currentPeriodMoney).toFixed(1)
                    })
                }
                json['clientId'] = pmContract.clientId
                json['tenant'] = pmContract.clientName
            }
            return ''
        })
    }
    handleCancel = (e) => {
        this.props.close()
        this.setState({ visible: false,
            isFirst: true})
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
            if (this.props.id > 0) {
                await apiPost(
                    'propertyFee/updatePropertyFee',
                    this.state.json1
                )
                notification.open({
                    message: '操作成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                // this.state.json1.tenant = null
                this.props.close()
                this.props.refreshTable()
                this.setState({
                    visible: false,
                    isFirst: true
                })
            } else {
                await apiPost(
                    'propertyFee/savePropertyFee',
                    this.state.json1
                )
                notification.open({
                    message: '添加成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                // this.state.json1.tenant = null
                this.props.close()
                this.props.refreshTable()
                this.setState({
                    visible: false,
                    isFirst: true
                })
            }
        }
    }
    handleChange3 = (e) =>{
        let json = this.state.json1
        json['accountId'] = e
    }
    sumMoney = (e) => {
        let discountMoney = e.target.value
        let money = this.state.json1.actualPaidMoney
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
            this.props.form.setFieldsValue({
                actualPaidMoney: parseFloat(money - discountMoney).toFixed(1)
            })
        }
    }
    printClientName = ''
    entryNameOnChange = (e) => {
        this.printClientName = e.target.value
        let json = this.state.json1
        json['printClientName'] = this.printClientName
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let pmContractList = this.state.pmContractList
        let tenantList = this.state.tenantList
        let accountList = this.state.accountList
        return (
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
                                {getFieldDecorator('periodDate', {
                                    rules: [ {
                                        required: true,
                                        message: '本次周期不能为空'
                                    }]
                                })(
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
                                {getFieldDecorator('payDeadline', {
                                    rules: [ {
                                        required: true,
                                        message: '交费期限不能为空'
                                    }]
                                })(
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
                                {getFieldDecorator('clientName', {
                                    rules: [ {
                                        required: true,
                                        message: '客户不能为空'
                                    }]
                                })(
                                    <Select placeholder="请选择客户"
                                        showSearch style={{ width: 220 }}
                                        onSelect={this.handleChange1}
                                        allowClear
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
                                        onSelect={this.handleChange2}
                                        allowClear
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
                                {getFieldDecorator('printDate', {
                                    rules: [ {
                                        required: true,
                                        message: '下单日期不能为空'
                                    }]
                                })(
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
                        <Col span={12}>
                            <FormItem label="付款帐号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('accountId', {
                                    rules: [ {
                                        required: true,
                                        message: '付款帐号不能为空'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 220 }}
                                        placeholder="请选择付款帐号"
                                        optionFilterProp="children"
                                        onChange={this.handleChange3}
                                    >
                                        {accountList.map(Account => {
                                            return <Option key={Account.accountId}>{Account.accountName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{marginTop: 50}}>
                        <Col>
                            <div style={{textAlign: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                lineHeight: '40px'}}
                            >
                                <span>
                                    <input style={{width: '300px',
                                        height: '25px'}} value={this.state.json1.printClientName} onChange={this.entryNameOnChange}
                                    /></span>
                                <span style={{marginLeft: '20px'}}>物业服务费统计表</span>
                            </div>
                        </Col>
                    </Row>
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
                                <td>{this.state.json1.acUnitDay}/4</td>
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
                        textAlign: 'right',
                        lineHeight: '28px'}}
                    >优惠金额: &nbsp;&nbsp;{getFieldDecorator('discountMoney')(
                            <Input onKeyUp={this.sumMoney} addonBefore="￥" addonAfter="元" style={{ width: 120 }} />
                        )}&nbsp;&nbsp;本期应收:&nbsp;&nbsp;{getFieldDecorator('actualPaidMoney')(
                            <Input style={{ width: 120 }} disabled addonBefore="￥" addonAfter="元" />
                        )}</p>
                </Form>
            </Modal>
        )
    }
}
let PropertyFeeAdd = Form.create()(propertyFeeAdd)
export default PropertyFeeAdd

