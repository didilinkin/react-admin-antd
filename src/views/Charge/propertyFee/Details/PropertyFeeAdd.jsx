// 收费管理 - 物业费管理
import React from 'react'
import {Row, Col, Input, DatePicker, Select, Modal, Form} from 'antd'
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
    onChange1 = (date, dateString) =>{
    }
    onChange2 = (date, dateString) =>{}
    onChange3 = (date, dateString) =>{
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
                let area = 0
                let subletNum = ''
                let roomNumber = ''
                if (this.state.tenantList !== null) {
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
                    console.log(roomNumber)
                    this.props.form.setFieldsValue({
                        buildName: pmContract.buildName,
                        serviceArea: (pmContract.serviceArea - area),
                        roomNum: roomNumber,
                        yearPmPrice: pmContract.yearPmPrice,
                        yearAcPrice: pmContract.yearAcPrice,
                        printClientName: pmContract.clientName
                    })
                } else {
                    this.props.form.setFieldsValue({
                        buildName: pmContract.buildName,
                        serviceArea: pmContract.serviceArea,
                        roomNum: pmContract.leaseRooms,
                        yearPmPrice: pmContract.yearPmPrice,
                        yearAcPrice: pmContract.yearAcPrice,
                        printClientName: pmContract.clientName
                    })
                }
            }
        })
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
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
                    footer={null}
                    onCancel={this.handleCancel}
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
                        {getFieldDecorator('serviceArea')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('pmUnitPrice')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('acUnitPrice')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('elevUnitPrice')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('waterUnitPrice')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('pmFee')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('waterFee')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('elevatorFee')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('airFee')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('months')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('discountMoney')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('currentPeriodMoney')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('actualPaidMoney')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('printClientName')(
                            <Input type="hidden" />
                        )}
                    </Form>
                    <div className="bt">
                        <Input style={{ width: 520 }} value={this.props.form.getFieldValue('printClientName')} placeholder="这里默认显示付款通知单名，可修改，打印时读该名" /> 物业费统计表
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
                                <td>23</td>
                                <td>*</td>
                                <td>11</td>
                                <td>*</td>
                                <td>11</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>电梯费</td>
                                <td>23</td>
                                <td>*</td>
                                <td>11</td>
                                <td>*</td>
                                <td>11</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>空调费</td>
                                <td>23</td>
                                <td>*</td>
                                <td>11</td>
                                <td>*</td>
                                <td>11</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>水费</td>
                                <td>23</td>
                                <td>*</td>
                                <td>11</td>
                                <td>*</td>
                                <td>11</td>
                                <td>23</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style={{margin: '20px 0',
                        textAlign: 'right'}}
                    >优惠金额 &nbsp; <Input placeholder="" style={{ width: 120 }} /> &nbsp; 本期应收 ¥50,000.00</p>
                </Modal>
            </div>
        )
    }
}
let PropertyFeeAdd = Form.create()(propertyFeeAdd)
export default PropertyFeeAdd

