// 出库
import {Modal, Input, Form, Row, notification, Col, Icon, Select } from 'antd'
import React from 'react'
import PicturesWall from './PicturesWall'
import { apiPost } from '../../../../api/index'
import '../../../../style/test.less'
const FormItem = Form.Item
const Option = Select.Option
class WarehouseAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        warehouseDate: '',
        warehouseId: '',
        amount: '',
        number: '',
        unitPrice: '',
        voucherNo: '',
        purchase: '',
        acceptor: '',
        recipient: '',
        WarehouseDetailList: [],
        data: {userArr: []},
        material: []
    }

    isFirst = true
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/warehouse/getUser',
            )
            this.props.form.resetFields()
            this.setState({
                visible: nextProps.visible,
                material: resulData.data,
                warehouseId: nextProps.warehouseId,
                amount: nextProps.amount,
                number: nextProps.number,
                unitPrice: nextProps.unitPrice,
                data: {userArr: resulData.data},
                isFirst: false,
                view: true,
                fileList: []
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        json['fileUrl'] = this.imgUrl
        json['warehouseType'] = 1
        json['warehouseId'] = this.state.warehouseId
        let result = await apiPost(
            '/warehouse/updateWarehouse',
            json
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    imgUrl = ''
    Callback = (url) => {
        this.imgUrl = url
    }
    getUser = (value) => {
        this.state.data.userArr.map(d => {
            if (d.id.toString() === value) {
                this.props.form.setFieldsValue({
                    recipient: d.id,
                    recipientName: d.loginName
                })
            }
            return ''
        })
    }
    sumMoney = (e) => {
        let sum = e.target.value
        let num = this.state.number
        if (sum > num) {
            this.props.form.setFieldsValue({
                number: 0})
            notification.open({
                message: '出库不能大于库存数量',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
        } else {
            let amount = this.state.amount
            let unitPrice = this.state.unitPrice
            if (typeof (sum) === 'undefined') {
                sum = 0
            }
            if (typeof (num) === 'undefined') {
                num = 0
            }
            if (typeof (amount) === 'undefined') {
                amount = 0
            }
            if (typeof (unitPrice) === 'undefined') {
                unitPrice = 0
            }
            this.props.form.setFieldsValue({
                amount: (parseFloat(unitPrice) * parseFloat(sum)).toFixed(0)})
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title="出库"
                style={{top: 20}}
                width={600}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <Row>
                        <Col span={12}>
                            <FormItem label="凭证号" labelCol={{ span: 5 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('voucherNo'
                                )(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="领用人" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                                {getFieldDecorator('recipientId', {
                                    rules: [ {
                                        required: true,
                                        message: '请输入'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择领用人"
                                        optionFilterProp="children"
                                        onChange={this.getUser}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {this.state.data.userArr.map(d => <Option key={d.id}>{d.loginName}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="数量" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                                {getFieldDecorator('number', {
                                    rules: [ {
                                        required: true,
                                        message: ''
                                    }]
                                })(
                                    <Input min="0" onKeyUp={this.sumMoney} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="上传图片" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                    >
                        {getFieldDecorator('fileUrl'
                        )(
                            <PicturesWall fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                        )}
                    </FormItem>
                    {getFieldDecorator('amount')(
                        <Input type="hidden" />
                    )}
                    {getFieldDecorator('number')(
                        <Input type="hidden" />
                    )}
                    {getFieldDecorator('recipient')(
                        <Input type="hidden" />
                    )}
                    {getFieldDecorator('recipientName')(
                        <Input type="hidden" />
                    )}
                </Form>
            </Modal>
        )
    }
}

let WarehouseUpdateComponent = Form.create()(WarehouseAddUp)

export default WarehouseUpdateComponent
