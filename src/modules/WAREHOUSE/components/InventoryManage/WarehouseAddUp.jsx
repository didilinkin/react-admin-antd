// 入库
<<<<<<< HEAD:src/modules/WAREHOUSE/components/InventoryManage/WarehouseAddUp.jsx
=======
import {Modal, Input, Form, DatePicker, Button, Row, notification, Col, Icon, Select, InputNumber } from 'antd'
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a:src/views/Warehouse/pages/common/WarehouseAddUp.jsx
import React from 'react'

import { Modal, Input, Form, DatePicker, Button, Row, notification, Col, Icon, Select, InputNumber } from 'antd'

import PicturesWall from './PicturesWall'

import { apiPost } from '../../../../api'

import '../../style/InventoryManage.less'
const FormItem = Form.Item
const Option = Select.Option

class AddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        warehouseDate: '',
        warehouseId: '',
        voucherNo: '',
        purchase: '',
        acceptor: '',
        whType: '',
        WarehouseDetailList: [],
        material: []
    }

    isFirst = true
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/warehouse/materialManagement',
                {rows: 100000000}
            )
            this.props.form.resetFields()
            this.setState({
                visible: nextProps.visible,
                material: resulData.data.rows,
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
        let WarehouseDetailList = this.state.WarehouseDetailList
        let list1 = []
        WarehouseDetailList.map(WarehouseDetail => {
            WarehouseDetail['warehouseDate'] = this.props.form.getFieldValue('warehouseDate')
            WarehouseDetail['purchase'] = this.props.form.getFieldValue('purchase')
            WarehouseDetail['voucherNo'] = this.props.form.getFieldValue('voucherNo')
            WarehouseDetail['acceptor'] = this.props.form.getFieldValue('acceptor')
            WarehouseDetail['whType'] = this.props.form.getFieldValue('whType')
            WarehouseDetail['remark'] = this.props.form.getFieldValue('remark')
            WarehouseDetail['fileUrl'] = this.imgUrl
            list1.push(WarehouseDetail)
            return {}                                                   // 箭头函数必须有返回值
        })
        let list = JSON.stringify(list1)
        let result = await apiPost(
            'warehouse/insertWarehouse',
<<<<<<< HEAD:src/modules/WAREHOUSE/components/InventoryManage/WarehouseAddUp.jsx
            { list: list }
=======
            {list: list}
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a:src/views/Warehouse/pages/common/WarehouseAddUp.jsx
        )
        notification.open({
            message: result.data,
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        })
        this.props.close()
        this.props.refreshTable()
        this.setState({
            visible: false,
            isFirst: true
        })
    }
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({
            visible: false,
            isFirst: true
        })
    }
    imgUrl = null
    Callback = (url) => {
        this.imgUrl = url
    }
    materialId = null
    getMaterial = (value) => {
        this.state.material.map(material => {
            if (material.id.toString() === value) {
                this.materialId = material.id
                this.props.form.setFieldsValue({
                    unitPrice: material.unitPrice,
                    name: material.name,
                    warehouseId: material.id
                })
            }
            return ''
        })
    }
    add = () => {
        this.state.material.map(material => {
            if (material.id.toString() === this.materialId.toString()) {
                let json = {}
                if (material.whType === 0) {
                    json['whTypeName'] = '工程库'
                }
                if (material.whType === 1) {
                    json['whTypeName'] = '保洁用品库'
                }
                if (material.whType === 2) {
                    json['whTypeName'] = '行政库'
                }
                let uuid = new Date().getTime()
                json['uuid'] = uuid
                json['warehouseId'] = material.id
                json['storagePlace'] = material.storagePlace
                json['name'] = material.name
                json['standard'] = material.standard
                json['unit'] = material.unit
                json['whType'] = material.whType
                json['unitPrice'] = material.unitPrice
                json['number'] = this.props.form.getFieldValue('number')
                json['amount'] = this.props.form.getFieldValue('amount')
                json['remark'] = this.props.form.getFieldValue('remark')
                let WarehouseDetailList = this.state.WarehouseDetailList
                debugger
                WarehouseDetailList.push(json)
                this.setState({
                    WarehouseDetailList: WarehouseDetailList
                })
            }
            return ''
        })
    }
    sumMoney = (e) => {
        let sum = e.target.value
        let unitPrice = this.props.form.getFieldValue('unitPrice')
        if (typeof (sum) === 'undefined') {
            sum = 0
        }
        if (typeof (unitPrice) === 'undefined') {
            unitPrice = 0
        }
        this.props.form.setFieldsValue({
            amount: (parseFloat(unitPrice) * parseFloat(sum)).toFixed(0)
        })
    }
    delect = (uuid) => {
        let WarehouseDetailList = this.state.WarehouseDetailList
        let i = 0
        WarehouseDetailList.map(WarehouseDetail => {
            if (WarehouseDetail.uuid.toString() === uuid.toString()) {
                WarehouseDetailList.splice(i, 1)
            }
            this.setState({
                WarehouseDetailList: WarehouseDetailList
            })
            i++
            return ''
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal maskClosable={false}
                title="入库登记"
<<<<<<< HEAD:src/modules/WAREHOUSE/components/InventoryManage/WarehouseAddUp.jsx
                style={{ top: 20 }}
=======
                style={{top: 20}}
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a:src/views/Warehouse/pages/common/WarehouseAddUp.jsx
                width="800"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <Row>
                        <Col span={12}>
                            <FormItem label="入库日期" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('warehouseDate')(<DatePicker onChange={this.getRepairDate} />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="采购人" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('purchase')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="凭证号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('voucherNo')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="验收人" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('acceptor')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="上传图片" labelCol={{ span: 3 }}
                        wrapperCol={{ span: 15 }}
                    >
                        <PicturesWall fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                    </FormItem>
<<<<<<< HEAD:src/modules/WAREHOUSE/components/InventoryManage/WarehouseAddUp.jsx
                    <div
                        style={{
                            width: 750,
                            marginBottom: 20
                        }}
                    >
=======
                    <div style={{width: 750,
                        marginBottom: 20}}>
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a:src/views/Warehouse/pages/common/WarehouseAddUp.jsx
                        <table className="tb">
                            <tr className="hd">
                                <td>仓库类型</td>
                                <td>存放位置</td>
                                <td>材料名称</td>
                                <td>规格</td>
                                <td>单位</td>
                                <td>单价</td>
                                <td>数量</td>
                                <td>金额</td>
                                <td>备注</td>
                                <td>操作</td>
                            </tr>
                            {this.state.WarehouseDetailList.map(WarehouseDetail => <tr>
                                <td>{WarehouseDetail.whTypeName}</td>
                                <td>{WarehouseDetail.storagePlace}</td>
                                <td>{WarehouseDetail.name}</td>
                                <td>{WarehouseDetail.standard}</td>
                                <td>{WarehouseDetail.unit}</td>
                                <td>{WarehouseDetail.unitPrice}</td>
                                <td>{WarehouseDetail.number}</td>
                                <td>{WarehouseDetail.amount}</td>
                                <td>{WarehouseDetail.remark}</td>
                                <td><Button onClick={() => this.delect(WarehouseDetail.uuid)}>删除</Button></td></tr>)}
                        </table>
                    </div>
                    <Row>
                        <Col span={12}>
                            <FormItem label="材料名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
<<<<<<< HEAD:src/modules/WAREHOUSE/components/InventoryManage/WarehouseAddUp.jsx
                                {
                                    getFieldDecorator('name')(
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="请选择材料"
                                            optionFilterProp="children"
                                            onChange={this.getMaterial}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {this.state.material.map(d => {
                                                let key = d.id
                                                return <Option key={key}>{d.name}</Option>
                                            })}
                                        </Select>
                                    )
                                }
=======
                                {getFieldDecorator('name')(<Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择材料"
                                    optionFilterProp="children"
                                    onChange={this.getMaterial}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.state.material.map(d => {
                                        let key = d.id
                                        return <Option key={key}>{d.name}</Option>
                                    })}
                                </Select>)}
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a:src/views/Warehouse/pages/common/WarehouseAddUp.jsx
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="数量" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('number')(<InputNumber min="0" onBlur={this.sumMoney} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="单价" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('unitPrice')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="金额" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('amount')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="备注" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('remark')(<textarea />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Button type="primary" onClick={this.add}>添加一条记录</Button>
                </Form>
            </Modal>
        )
    }
}

let WarehouseAddUp = Form.create()(AddUp)

export default WarehouseAddUp
