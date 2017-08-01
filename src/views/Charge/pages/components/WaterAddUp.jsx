// 水费
import {Modal, Input, Form, DatePicker, Button, Row, Col } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import '../../../../style/test.less'
const { RangePicker } = DatePicker
const FormItem = Form.Item
class WaterAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        PmContract: [],
        WaterRecordlList: []
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            this.props.form.resetFields()
            this.setState({
                visible: nextProps.visible,
                isFirst: false
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    async initialRemarks2 () {
        let PmContract = await apiPost(
            '/propertyFee/getPmContractList',
        )
        this.setState({
            PmContract: PmContract.data
        })
    }
    componentDidMount () {
        this.initialRemarks2()
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    add = () => {
    }
    delect = (uuid) => {
        let WaterRecordlList = this.state.WaterRecordlList
        WaterRecordlList.map((WaterRecordl, i) => {
            if (WaterRecordl.uuid.toString() === uuid.toString()) {
                WaterRecordlList.splice(i, 1)
            }
            this.setState({
                WaterRecordlList: WaterRecordlList
            })
            return ''
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
                                {getFieldDecorator('readId', {
                                    rules: [ {
                                        required: true,
                                        message: '请填写抄表人员!'
                                    }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="客户名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('voucherNo')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="转租客户" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('acceptor')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('rrr')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <span style={{textAlign: 'center',
                        display: 'block'}}>
                        {getFieldDecorator('eee')(<Input style={{width: '300px'}} />)}
                        <span>用水统计表</span>
                    </span>
                    <br/>
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
                                    <td>损耗 10%</td>
                                    <td>总用水量m³</td>
                                    <td>单价</td>
                                    <td>金额</td>
                                    <td>备注</td>
                                    <td>操作</td>
                                </tr>
                                {this.state.WaterRecordlList.map((WaterRecordl, i) => <tr key={i}>
                                    <td>{WaterRecordl.whTypeName}</td>
                                    <td>{WaterRecordl.storagePlace}</td>
                                    <td>{WaterRecordl.name}</td>
                                    <td>{WaterRecordl.standard}</td>
                                    <td>{WaterRecordl.unit}</td>
                                    <td>{WaterRecordl.unitPrice}</td>
                                    <td>{WaterRecordl.number}</td>
                                    <td>{WaterRecordl.amount}</td>
                                    <td>{WaterRecordl.remark}</td>
                                    <td><Button onClick={() => this.delect(WaterRecordl.uuid)}>删除</Button></td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <Row>
                        <Col span={8}>
                            <FormItem label="水费名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('name')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('number')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="表计类型" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('number')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="上次抄表数" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('unitPrice')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="本次抄表数" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('amount')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="本次用水量" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('lll')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="水费单价" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('ff')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="备注" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('remark')(<textarea style={{width: '500px'}}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Button type="primary" onClick={this.add}>添加一条记录</Button>
                </Form>
            </Modal>
        )
    }
}

let WaterAddUpComponent = Form.create()(WaterAddUp)

export default WaterAddUpComponent
