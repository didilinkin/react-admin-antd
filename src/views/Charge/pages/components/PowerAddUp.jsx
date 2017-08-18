import React from 'react'
import {Modal, Form, Row, Col, Input, Button, DatePicker, Select, Table, Tag} from 'antd'
import { apiPost } from '../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item
const {RangePicker} = DatePicker
const Option = Select.Option
const { CheckableTag } = Tag
class sumElectricityAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        ClientList: [],
        sumElectricityRecordlList: [],
        subletList: [],
        roomNumberOne: [],
        meterReader: [],
        Contract: {},
        sumElectricity: 0,
        thisReceivable: 0,
        powerType: 0,
        bili: [],
        balanceUUID: 0,
        isPropertyMoney: false,
        isWaterMoney: false,
        isElectricMoney: false,
        propertyMoney: 0,
        waterMoney: 0,
        electricMoney: 0,
        amountReceivable: 0

    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    componentDidMount () {
        this.getClientListAndUser()
        this.setTableColunms()
    }
    handleSubmit = async () => {
        let adopt = false
        this.props.form.validateFields(
            (err) => {
                adopt = !err
            }
        )
        if (adopt) {
            let json = this.props.form.getFieldsValue()
            for (let item in this.state.Contract) {
                json[item] = this.state.Contract[item]
            }
            json['wattHourType'] = this.state.Contract.wattHourType ? this.state.Contract.wattHourType : (this.state.Contract.powerType ? this.state.Contract.powerType : 0)
            json['buildingId'] = json.buildId
            delete json['id']
            json['preWattDate'] = json.sfzq[0].format('YYYY-MM-DD')
            json['wattDate'] = json.sfzq[1].format('YYYY-MM-DD')
            json['overdueDate'] = json.overdueDate.format('YYYY-MM-DD')
            json['sumElectricity'] = this.state.sumElectricity
            json['thisReceivable'] = this.state.thisReceivable
            json['conteractId'] = this.state.Contract.id

            json['isPropertyMoney'] = this.state.isPropertyMoney === true ? 1 : 2
            json['isWaterMoney'] = this.state.isWaterMoney === true ? 1 : 2
            json['isElectricMoney'] = this.state.isElectricMoney === true ? 1 : 2
            json['propertyMoney'] = this.state.propertyMoney
            json['waterMoney'] = this.state.waterMoney
            json['electricMoney'] = this.state.electricMoney

            json['amountReceivable'] = this.state.amountReceivable

            json['roomId'] = this.state.roomId
            json['peakValleyRatio'] = this.state.peakValleyRatio

            let elecList = this.state.sumElectricityRecordlList.slice()
            elecList.pop()
            elecList.map((record, i) => {
                record['lastSurfaceDate'] = json.sfzq[0].format('YYYY-MM-DD')
                record['surfaceDate'] = json.sfzq[1].format('YYYY-MM-DD')
                record['readingId'] = json.readId
                record['buildingIdOne'] = this.state.Contract.buildId
                if (record.uuid.toString() === this.state.balanceUUID.toString()) {
                    json['differentialPrice'] = record.unitPrice
                    json['difference'] = record.singleMoney
                    elecList.splice(i, 1)
                }
            })
            let list = JSON.stringify(elecList)
            json['list'] = list
            console.log(json)
            if (this.props.id > 0) {
                json['idOld'] = this.props.id
                await apiPost(
                    '/ElectricityFees/addElectricityFee',
                    json
                )
            } else {
                await apiPost(
                    '/ElectricityFees/addElectricityFee',
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
    setTableColunms = (contract, powerType) => {
        debugger
        let deleteRecord = this.deleteRecord
        let tableColumns = [{
            title: '电费名称',
            dataIndex: 'electricCostName'
        }, {
            title: '房间编号',
            dataIndex: 'roomNumberOne'
        }, {
            title: '上次抄表数',
            dataIndex: 'lastSurfaceNumber'
        }, {
            title: '本次抄表数',
            dataIndex: 'surfaceNumber'
        }, {
            title: '本次用电量',
            dataIndex: 'needElectricity'
        }, {
            title: '变比',
            dataIndex: 'ratio'
        }, {
            title: '总电量',
            dataIndex: 'sumElectricity'
        }, {
            title: '单价(1.0685)',
            dataIndex: 'unitPrice'
        }, {
            title: '金额',
            dataIndex: 'singleMoney',
            render: function (text) {
                return (
                    parseFloat(text).toFixed(2)
                )
            }
        }, {
            title: '备注',
            dataIndex: 'remarks'
        }, {
            title: '操作',
            render: function (text, record, index) {
                return (
                    record.uuid ?
                        <a onClick={() => deleteRecord(record.uuid)}>删除</a> :
                        null
                )
            }
        }]
        if (contract) {
            if (contract[powerType].toString() === '0') {
                tableColumns.splice(6, 0, {
                    title: '电损0%',
                    dataIndex: 'electricLoss'
                })
            } else if (contract[powerType].toString() === '1') {
                tableColumns.splice(6, 0, {
                    title: '电损' + contract.powerLossRatio + '%',
                    dataIndex: 'electricLoss'
                })
            } else {
                tableColumns.splice(6, 0, {
                    title: '电损' + contract.powerLossRatio + '%',
                    dataIndex: 'electricLoss'
                })
                tableColumns.splice(8, 0, {
                    title: '峰谷比例',
                    dataIndex: 'valleysProportion'
                })
                // 查询峰谷比利
                this.searchBili(contract.clientId)
            }
        }

        this.setState({tableColumns: tableColumns})
    }
    // 查询峰谷比利
    searchBili = async (clientId) => {
        let bili = await apiPost(
            '/ElectricityFees/AverageElectricityFee',
            {id: clientId}
        )
        this.setState({
            bili: bili.data
        })
    }
    // 获取上次抄表记录
    lastTimeRecord = async (contractId, clientId, clientType, isNew) => {
        let lastTimeData = await apiPost(
            '/ElectricityFees/LastTimeDate',
            {contractId: contractId,
                clientId: clientId,
                clientType: clientType}
        )
        if (lastTimeData.data.electricityFees) {
            this.props.form.setFieldsValue({
                lastMouthUnitPrice: lastTimeData.data.electricityFees.powerUnitPrice ? lastTimeData.data.electricityFees.powerUnitPrice : 0,
                lastMouthTotalDosage: lastTimeData.data.electricityFees.sumElectricity ? lastTimeData.data.electricityFees.sumElectricity : 0
            })
            if (isNew) {
                let sfzq = lastTimeData.data ? [moment(lastTimeData.data.wattDate)] : null
                this.props.form.setFieldsValue({sfzq: sfzq})
                this.setState({
                    isPropertyMoney: lastTimeData.data.electricityFees.isPropertyMoney === 1,
                    isWaterMoney: lastTimeData.data.electricityFees.isWaterMoney === 1,
                    isElectricMoney: lastTimeData.data.electricityFees.isElectricMoney === 1,
                    propertyMoney: lastTimeData.data.electricityFees.propertyMoney ? lastTimeData.data.electricityFees.propertyMoney : 0,
                    waterMoney: lastTimeData.data.electricityFees.waterMoney ? lastTimeData.data.electricityFees.waterMoney : 0,
                    electricMoney: lastTimeData.data.electricityFees.electricMoney ? lastTimeData.data.electricityFees.electricMoney : 0,
                    peakValleyRatio: lastTimeData.data.electricityFees.peakValleyRatio ? lastTimeData.data.electricityFees.peakValleyRatio : 0
                })
            }
        }
    }
    // 获取转租客户
    getSubletList = async (contractId) => {
        let subletList = await apiPost(
            '/propertyFee/getSubletByPmId',
            {id: contractId}
        )
        this.setState({subletList: subletList.data ? subletList.data : []})
    }
    // nextProps改变时候调用
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            if (nextProps.id > 0) {
                // 获取电费详情 和 列表
                let map = await apiPost(
                    '/ElectricityFees/ElectricityFeeInfo',
                    {id: nextProps.id}
                )
                // 电费详情
                let electricChargeInfo = map.data.electricityFees
                let currentContract = null
                this.state.ClientList.map(contract => {
                    if (contract.id === electricChargeInfo.conteractId) {
                        currentContract = contract
                        this.setState({Contract: contract})
                    }
                })
                // 设置表格标题
                this.setTableColunms(electricChargeInfo, 'wattHourType')
                this.lastTimeRecord(currentContract.id, currentContract.clientId, 1, false)
                this.getSubletList(electricChargeInfo.contractId)
                let uuid = new Date().getTime()
                let list = map.data.list
                list.map(record => {
                    record.uuid = uuid += 1
                    console.log(record.uuid)
                })
                if (electricChargeInfo.differentialPrice || electricChargeInfo.difference) {
                    let balanceUUID = new Date().getTime()
                    list.push({
                        unitPrice: electricChargeInfo.differentialPrice,
                        singleMoney: electricChargeInfo.difference,
                        electricCostName: '上月差额',
                        uuid: balanceUUID})
                    this.setState({balanceUUID: balanceUUID})
                }
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    sumElectricityRecordlList: list,
                    ratio: electricChargeInfo.ratio,
                    sumElectricity: electricChargeInfo.sumElectricity,
                    thisReceivable: electricChargeInfo.thisReceivable,
                    roomNumberOne: electricChargeInfo.roomNumber.split(','),
                    isPropertyMoney: electricChargeInfo.isPropertyMoney === 1,
                    isWaterMoney: electricChargeInfo.isWaterMoney === 1,
                    isElectricMoney: electricChargeInfo.isElectricMoney === 1,
                    propertyMoney: electricChargeInfo.propertyMoney ? electricChargeInfo.propertyMoney : 0,
                    waterMoney: electricChargeInfo.waterMoney ? electricChargeInfo.waterMoney : 0,
                    electricMoney: electricChargeInfo.electricMoney ? electricChargeInfo.electricMoney : 0,
                    peakValleyRatio: electricChargeInfo.peakValleyRatio
                })
                this.addTotalColunm()
                this.props.form.setFieldsValue({
                    clientName: electricChargeInfo.clientName,
                    subletIdOne: electricChargeInfo.subletName,
                    subletId: electricChargeInfo.subletId,
                    sfzq: [moment(electricChargeInfo.preWattDate), moment(electricChargeInfo.wattDate)],
                    overdueDate: moment(electricChargeInfo.overdueDate),
                    formName: electricChargeInfo.formName,
                    actualReceivable: electricChargeInfo.actualReceivable,
                    principalDiscount: electricChargeInfo.principalDiscount,
                    subletName: electricChargeInfo.subletName,
                    roomId: electricChargeInfo.roomId,
                    roomNumber: electricChargeInfo.roomNumber,
                    readIdOne: electricChargeInfo.readName,
                    readId: electricChargeInfo.readId,
                    unitPrice: currentContract.powerUnitPrice,
                    ratio: currentContract.powerRatio,
                    currentMouthUnitPrice: currentContract.powerUnitPrice
                })
            } else {
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    sumElectricityRecordlList: [],
                    ratio: 0,
                    sumElectricity: 0,
                    thisReceivable: 0,
                    Contract: {},
                    subletList: [],
                    roomNumberOne: []
                })
            }
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
    chooseClient = (contractId) => {
        this.props.form.resetFields()
        this.setState({
            sumElectricityRecordlList: []
        })
        this.state.ClientList.map(async (contract) => {
            let formName = ''
            if (contractId.toString() === contract.id.toString()) {
                formName = contract.clientName
                this.lastTimeRecord(contractId, contract.clientId, 1, true)
                this.getSubletList(contractId)
                this.setTableColunms(contract, 'powerType')
                let roomNumber = contract.leaseRooms.split(',')
                let roomIds = contract.roomIds.split(',')
                this.state.subletList.map(sublet => {
                    roomNumber = this.complement(roomNumber, sublet.leaseRooms.split(','))
                    roomIds = this.complement(roomIds, sublet.roomNum.split(','))
                    return ''
                })
                this.setState({
                    Contract: contract,
                    roomNumberOne: roomNumber,
                    powerType: contract.powerType
                })
                this.props.form.setFieldsValue({
                    unitPrice: contract.powerUnitPrice,
                    currentMouthUnitPrice: contract.powerUnitPrice,
                    roomNumber: roomNumber.toString(),
                    formName: formName,
                    ratio: contract.powerRatio
                })
            }
        })
    }
    readIdOne = (value) => {
        this.props.form.setFieldsValue({
            readId: value
        })
    }
    // 点击选择转租客户的事件
    chooseSublet = (value) => {
        this.state.subletList.forEach(async sublet => {
            let formName = ''
            if (value.toString() === sublet.clientId.toString()) {
                formName = sublet.clientName
                this.lastTimeRecord(sublet.contractId, sublet.clientId, 2, true)
                this.setState({
                    roomNumberOne: sublet.leaseRooms.split(',')
                })
                this.props.form.setFieldsValue({
                    roomNumber: sublet.leaseRooms.toString(),
                    formName: formName,
                    subletName: sublet.clientName,
                    subletId: value
                })
            }
        })
    }
    // 添加违约金
    addLiquidatedDamages = () => {
        this.deleteTotalColunm()
        let json = this.props.form.getFieldsValue()
        let jsonTwo = {}
        jsonTwo['singleMoney'] = json.liquidatedDamagessingleMoney
        jsonTwo['electricCostName'] = json.liquidatedDamagesName
        jsonTwo['uuid'] = new Date().getTime()
        jsonTwo['surfaceType'] = 3
        let sumElectricityRecordlList = this.state.sumElectricityRecordlList
        sumElectricityRecordlList.push(jsonTwo)
        this.setState({
            sumElectricityRecordlList: sumElectricityRecordlList
        })
        this.addTotalColunm()
    }
    // 添加上月差额
    addBalance = () => {
        this.deleteTotalColunm()
        if (this.state.balanceUUID) {
            let recordList = this.state.sumElectricityRecordlList
            recordList.map((record, i) => {
                if (record.uuid.toString() === this.state.balanceUUID.toString()) {
                    recordList.splice(i, 1)
                    this.setState({
                        sumElectricityRecordlList: recordList
                    })
                }
            })
        }
        let json = this.props.form.getFieldsValue()
        let jsonTwo = {}
        jsonTwo['uuid'] = new Date().getTime()
        jsonTwo['unitPrice'] = json.unitPriceBalance ? json.unitPriceBalance : 0
        jsonTwo['singleMoney'] = json.balance ? json.balance : 0
        jsonTwo['electricCostName'] = '上月差额'
        let sumElectricityRecordlList = this.state.sumElectricityRecordlList
        sumElectricityRecordlList.push(jsonTwo)
        this.setState({
            sumElectricityRecordlList: sumElectricityRecordlList,
            balanceUUID: jsonTwo.uuid
        })
        this.addTotalColunm()
    }
    // 添加条目
    add = () => {
        this.deleteTotalColunm()
        let json = this.props.form.getFieldsValue()
        let jsonTwo = {}
        jsonTwo['uuid'] = new Date().getTime()
        jsonTwo['roomNumberOne'] = json.roomNumberOne
        jsonTwo['lastSurfaceNumber'] = json.lastSurfaceNumber ? json.lastSurfaceNumber : 0
        jsonTwo['surfaceNumber'] = json.surfaceNumber ? json.surfaceNumber : 0
        jsonTwo['ratio'] = json.ratio ? json.ratio : 0
        if (this.state.powerType === 2) {
            this.state.bili.map(type => {
                if (type.name === json.moneyType) {
                    jsonTwo['electricCostName'] = json.moneyType
                    jsonTwo['valleysProportion'] = type.value
                }
            })
        } else {
            jsonTwo['electricCostName'] = json.electricCostName
        }
        console.log(this.state.Contract)
        jsonTwo['surfaceType'] = this.state.Contract.powerType
        jsonTwo['unitPrice'] = json.unitPrice ? json.unitPrice : 0
        jsonTwo['needElectricity'] = (json.surfaceNumber - json.lastSurfaceNumber) ? json.surfaceNumber - json.lastSurfaceNumber : 0
        jsonTwo['remarks'] = json.remarks
        // 电损比例
        let powerLossRatio = this.state.Contract.powerLossRatio ? this.state.Contract.powerLossRatio / 100 : 0

        if (this.state.powerType === 0) {
            jsonTwo['electricLoss'] = this.state.Contract.powerLossRatio ? jsonTwo.needElectricity * jsonTwo.ratio * powerLossRatio : 0
            jsonTwo['sumElectricity'] = (jsonTwo.needElectricity * json.ratio) ? (json.needElectricity * json.ratio) : 0
        } else {
            jsonTwo['electricLoss'] = this.state.Contract.powerLossRatio ? jsonTwo.needElectricity * jsonTwo.ratio * powerLossRatio : 0
            jsonTwo['sumElectricity'] = jsonTwo.needElectricity * jsonTwo.ratio + jsonTwo['electricLoss']
        }
        jsonTwo['singleMoney'] = (jsonTwo.sumElectricity * jsonTwo.unitPrice) ? (jsonTwo.sumElectricity * jsonTwo.unitPrice) : 0
        let sumElectricityRecordlList = this.state.sumElectricityRecordlList
        sumElectricityRecordlList.push(jsonTwo)
        this.setState({
            sumElectricityRecordlList: sumElectricityRecordlList
        })
        this.addTotalColunm()
    }
    // 删除条目
    deleteRecord = (uuid) => {
        this.deleteTotalColunm()
        let recordList = this.state.sumElectricityRecordlList
        recordList.map((record, i) => {
            if (record.uuid.toString() === uuid.toString()) {
                recordList.splice(i, 1)
                this.setState({
                    sumElectricityRecordlList: recordList
                })
            }
            return ''
        })
        this.addTotalColunm()
    }
    // 删除合计行
    deleteTotalColunm = () => {
        let sumElectricityRecordlList = this.state.sumElectricityRecordlList
        sumElectricityRecordlList.pop()
    }
    // 添加合计行
    addTotalColunm = () => {
        let sumElectricityRecordlList = this.state.sumElectricityRecordlList
        let sumElec = 0
        let sumSingeMoney = 0
        sumElectricityRecordlList.map((record) => {
            if (record.sumElectricity) {
                sumElec += record.sumElectricity
                sumSingeMoney += (record.sumElectricity * record.unitPrice)
            } else {
                sumSingeMoney += Number(record.singleMoney)
            }
        })
        let json = {}
        json['electricCostName'] = '合计'
        json['sumElectricity'] = sumElec
        json['singleMoney'] = sumSingeMoney.toFixed(2)
        sumElectricityRecordlList.push(json)
        this.props.form.setFieldsValue({
            actualReceivable: (parseFloat(sumSingeMoney) - parseFloat(this.state.amountReceivable ? this.state.amountReceivable : 0)).toFixed(2)
        })
        this.setState({
            sumElectricity: sumElec,
            thisReceivable: sumSingeMoney.toFixed(2)
        })
    }

    // 优惠金额
    amountReceivable = (e) => {
        let num = e.target.value
        this.setState({amountReceivable: e.target.value})
        this.props.form.setFieldsValue({
            actualReceivable: (parseFloat(this.state.thisReceivable) - parseFloat(num ? num : 0)).toFixed(2)
        })
    }
    // 本次抄表数
    currentMeterReading = () => {
        let json = this.props.form.getFieldsValue()
        json['surfaceNumber'] = json.surfaceNumber ? json.surfaceNumber : 0
        json['lastSurfaceNumber'] = json.lastSurfaceNumber ? json.lastSurfaceNumber : 0
        this.props.form.setFieldsValue({
            needElectricity: (json.surfaceNumber - json.lastSurfaceNumber).toFixed(2)
        })
    }
    // 差额
    balancesingleMoney = () => {
        let json = this.props.form.getFieldsValue()
        json['lastMouthUnitPrice'] = json.lastMouthUnitPrice ? json.lastMouthUnitPrice : 0
        json['currentMouthUnitPrice'] = json.currentMouthUnitPrice ? json.currentMouthUnitPrice : 0
        json['lastMouthTotalDosage'] = json.lastMouthTotalDosage ? json.lastMouthTotalDosage : 0
        this.props.form.setFieldsValue({
            unitPriceBalance: (json.currentMouthUnitPrice - json.lastMouthUnitPrice).toFixed(5),
            balance: ((json.currentMouthUnitPrice - json.lastMouthUnitPrice) * json.lastMouthTotalDosage).toFixed(2)
        })
    }
    // 选择房间编号
    chooseRoomNumber = async (value) => {
        // 查询上次抄表数
        let lastTimeData = await apiPost(
            '/ElectricityFees/LastTimeNumber',
            {
                roomNumberOne: value,
                buildingIdOne: this.state.Contract.buildId
            }
        )
        lastTimeData = lastTimeData.data
        if (lastTimeData !== null && lastTimeData !== '' && typeof (lastTimeData) !== 'undefined') {
            this.props.form.setFieldsValue({
                lastSurfaceNumber: lastTimeData.surfaceNumber
            })
        }
    }
    // 点击选择功峰平谷的点击事件
    chooseMoneyType = (value) => {
        this.state.bili.map((type) => {
            if (value === type.name) {
                let json = this.props.form.getFieldsValue()
                this.props.form.setFieldsValue({
                    unitPrice: (parseFloat(type.value) * parseFloat(json.unitPrice)).toFixed(5)
                })
            }
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
        const tagStyle = {
            marginLeft: '50px',
            marginBottom: '20px'}
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
                        width: 1050,
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
                                            onChange={this.chooseSublet}
                                        >
                                            {this.state.subletList.map(sub => {
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
                        {getFieldDecorator('formName')(<Input style={{width: '300px'}} />)}
                        <span style={{marginLeft: '20px'}}>电量统计表</span>
                    </span>
                    <br />
                    <div style={{marginBottom: 20}}>
                        <Table
                            columns={this.state.tableColumns}
                            dataSource={this.state.sumElectricityRecordlList}
                            bordered
                            pagination={false}
                        />
                    </div>
                    <Row>
                        <Col span={12} />
                        <Col span={6}>
                            <FormItem label="本期应收" labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('actualReceivable', {
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
                                {getFieldDecorator('principalDiscount')(<Input onChange={this.amountReceivable} style={{width: '100px'}} />)}
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
                                    >{getFieldDecorator('roomNumberOne')(
                                            <Select
                                                showSearch
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
                                    {this.state.powerType === 2 ?
                                        <FormItem
                                            {...formItemLayout}
                                            label="费用名称"
                                        >{getFieldDecorator('moneyType')(
                                                <Select
                                                    showSearch
                                                    placeholder="请选择费用名称"
                                                    optionFilterProp="children"
                                                    onChange={this.chooseMoneyType}
                                                >
                                                    {this.state.bili.map((type) => {
                                                        return <Option key={type.name}>{type.name}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem> :
                                        <FormItem
                                            {...formItemLayout}
                                            label="费用名称"
                                        >{getFieldDecorator('electricCostName')(<Input placeholder="请输入内容" />)
                                            }
                                        </FormItem>
                                    }
                                    <FormItem
                                        {...formItemLayout}
                                        label="上次抄表数"
                                    >{getFieldDecorator('lastSurfaceNumber')(<Input id="lastSurfaceNumber" onBlur={this.currentMeterReading} placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="本次抄表数"
                                    >{getFieldDecorator('surfaceNumber')(<Input id="surfaceNumber" onBlur={this.currentMeterReading} placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="变比"
                                    >{getFieldDecorator('ratio')(<Input placeholder="请输入内容" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="单价"
                                    >{getFieldDecorator('unitPrice')(<Input placeholder="请输入内容" addonAfter="元/度" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="本次用电量"
                                    >{getFieldDecorator('needElectricity')(<Input addonAfter="Kwh" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="备注"
                                    >{getFieldDecorator('remarks')(<Input type="textarea" rows={6} />)
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
                                <div style={{marginTop: 20}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="本月单价："
                                    >{getFieldDecorator('currentMouthUnitPrice')(<Input id="currentMouthUnitPrice" onBlur={this.balancesingleMoney} placeholder="请输入内容" addonAfter="元/度" />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="上月单价："
                                    >{getFieldDecorator('lastMouthUnitPrice')(<Input id="lastMouthUnitPrice" onBlur={this.balancesingleMoney} placeholder="请输入内容" addonAfter="元/度" />)
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
                                    >{getFieldDecorator('lastMouthTotalDosage')(<Input id="lastMouthTotalDosage" onBlur={this.balancesingleMoney} placeholder="请输入内容" addonAfter="Kwh" />)
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
                                    >{getFieldDecorator('liquidatedDamagessingleMoney')(<Input placeholder="请输入内容" addonAfter="元" />)
                                        }
                                    </FormItem>
                                    <CheckableTag onChange={(state) => {
                                        this.setState({isPropertyMoney: state})
                                    }} checked={this.state.isPropertyMoney} style={tagStyle}
                                    >确认已收{this.state.propertyMoney}元物业违约金欠费</CheckableTag>
                                    <CheckableTag onChange={(state) => {
                                        this.setState({isElectricMoney: state})
                                    }} checked={this.state.isElectricMoney} style={tagStyle}
                                    >确认已收{this.state.electricMoney}元电费违约金欠费</CheckableTag>
                                    <CheckableTag onChange={(state) => {
                                        this.setState({isWaterMoney: state})
                                    }} checked={this.state.isWaterMoney} style={tagStyle}
                                    >确认已收{this.state.waterMoney}元水费违约金欠费</CheckableTag>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button onClick={this.addLiquidatedDamages} type="primary" htmlType="submit" style={greenButtonStyle} >增加本条记录</Button>
                                    </FormItem>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {getFieldDecorator('roomId')(<Input type="hidden" />)}
                    {getFieldDecorator('subletId')(<Input type="hidden" />)}
                    {getFieldDecorator('readId')(<Input type="hidden" />)}
                    {getFieldDecorator('subletName')(<Input type="hidden" />)}
                </Form>
            </Modal>
        )
    }
}

let sumElectricityAddUpComponent = Form.create()(sumElectricityAddUp)
export default sumElectricityAddUpComponent
