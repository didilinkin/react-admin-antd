// 仓库添加(? 未确认名称)
import {Modal, Input, Form, DatePicker, Button, Row, Col, Select, InputNumber } from 'antd'
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
        voucherNo: '',
        purchase: '',
        acceptor: '',
        storeroomType: '',
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
                    'http://192.168.1.108:18082/warehouse/materialManagement',
                )
            this.props.form.resetFields()
            this.setState({
                visible: nextProps.visible,
                material: resulData.data,
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
        let list = []
        WarehouseDetailList.map(WarehouseDetail => {
            WarehouseDetail['warehouseDate'] = this.props.form.getFieldValue('warehouseDate')
            WarehouseDetail['purchase'] = this.props.form.getFieldValue('purchase')
            WarehouseDetail['voucherNo'] = this.props.form.getFieldValue('voucherNo')
            WarehouseDetail['acceptor'] = this.props.form.getFieldValue('acceptor')
            WarehouseDetail['storeroomType'] = this.props.form.getFieldValue('storeroomType')
            WarehouseDetail['fileUrl'] = this.imgUrl
            list.push(WarehouseDetail)
            return {}                                                   // 箭头函数必须有返回值
        })
        console.log(JSON.stringify(list))
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
    materialId = ''
    getMaterial = (value) => {
        this.state.material.map(material => {
            if (material.id.toString() === value) {
                this.materialId = material.id
                this.props.form.setFieldsValue({
                    unitPrice: material.unitPrice,
                    name: material.name
                })
            }
            return ''
        })
    }
    add = () => {
        this.state.material.map(material => {
            if (material.id.toString() === this.materialId.toString()) {
                let json = {}
                let uuid = new Date().getTime()
                json['uuid'] = uuid
                json['id'] = material.id
                json['storagePlace'] = material.storagePlace
                json['name'] = material.name
                json['standard'] = material.standard
                json['unit'] = material.unit
                json['unitPrice'] = material.unitPrice
                json['number'] = this.props.form.getFieldValue('number')
                json['amount'] = this.props.form.getFieldValue('amount')
                json['remark'] = this.props.form.getFieldValue('remark')
                let WarehouseDetailList = this.state.WarehouseDetailList
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
        const { getFieldProps } = this.props.form
        return (
                <Modal
                    title="入库登记"
                    style={{top: 20}}
                    width="700"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={12}>
                        <FormItem label="入库日期" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <DatePicker onChange={this.getRepairDate} {...getFieldProps('warehouseDate')} />
                        </FormItem>
                            </Col>
                            <Col span={12}>
                        <FormItem label="采购人" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input {...getFieldProps('purchase')} />
                        </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="凭证号" labelCol={{ span: 5 }}
                                          wrapperCol={{ span: 15 }}
                                >
                                    <Input {...getFieldProps('voucherNo')} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="验收人" labelCol={{ span: 5 }}
                                          wrapperCol={{ span: 15 }}
                                >
                                    <Input {...getFieldProps('acceptor')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                        <FormItem label="仓库类型" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Select
                                {...getFieldProps('storeroomType')}
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option key="0">工程部</Option>
                                <Option key="1">保洁用品</Option>
                                <Option key="2">行政库</Option>
                            </Select>
                        </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="现场图片" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <PicturesWall fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                        </FormItem>
                    <div className="box2" style={{width: 650}}>
                        <table className="tb">
                            <tr className="hd">
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
                            <FormItem label="材料名称" labelCol={{ span: 5 }}
                                      wrapperCol={{ span: 15 }}
                            >
                                <Select
                                    {...getFieldProps('name')}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={this.getMaterial}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {this.state.material.map(d => {
                                        let key = d.id
                                        return <Option key={key}>{d.name}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="数量" labelCol={{ span: 5 }}
                                      wrapperCol={{ span: 15 }}
                            >
                                <InputNumber onBlur={this.sumMoney} {...getFieldProps('number')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="单价" labelCol={{ span: 5 }}
                                      wrapperCol={{ span: 15 }}
                            >
                                <Input {...getFieldProps('unitPrice')} />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="金额" labelCol={{ span: 5 }}
                                      wrapperCol={{ span: 15 }}
                            >
                                <Input {...getFieldProps('amount')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="备注" labelCol={{ span: 5 }}
                                      wrapperCol={{ span: 15 }}
                            >
                                <Input {...getFieldProps('remark')} />
                            </FormItem>
                        </Col>
                    </Row>
                        <Button onClick={this.add}>添加一条记录</Button>
                    </Form>
                </Modal>
        )
    }
}

let WarehouseAddUpComponent = Form.create()(WarehouseAddUp)

export default WarehouseAddUpComponent
