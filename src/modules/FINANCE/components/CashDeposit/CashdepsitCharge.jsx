import {Modal, Radio, Form, notification, Icon, Col, Row, Input} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import Thumbnail from '../../components/Thumbnail'
const FormItem = Form.Item
const RadioGroup = Radio.Group


class propertyPaidConfirm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            auditStatus: 1,
            fileList: [],
            isFirst: true,
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/cashDeposit/getCashDepositDetailById',
                { 'id': nextProps.id }
            )
            let CashDepositDetail = resulData.data
            /* let i = 0
            CashDepositDetail['fileUrl'] = CashDepositDetail.fileUrl.split('#').map(img => {
                if (img !== '') {
                    i++
                    return <img key={i} width={100} height={100} src={baseURL + 'storage/files/' + img} alt="" />
                }
                return ''
            })*/
            this.props.form.setFieldsValue({
                buildName: resulData.data.buildName,
                roomNum: resulData.data.roomNum,
                sublietName: resulData.data.sublietName,
                operateMoney: resulData.data.operateMoney,
                reason: resulData.data.reason,
                auditStatus: 1
            })
            this.setState({
                isFirst: false,
                data: CashDepositDetail,
                visible: nextProps.visible
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
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
            json['id'] = this.state.data.id
            json['cashDepositId'] = this.state.data.cashDepositId
            if (json.auditStatus === 1) {
                json['currentBalance'] = this.state.data.currentBalance - this.state.data.operateMoney
            } else if (json.auditStatus === 2) {
                json['currentBalance'] = this.state.data.currentBalance
            }
            await apiPost(
                '/cashDeposit/updateCashDepositByConfirm',
                json
            )
            notification.open({
                message: '操作成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.close()
            this.props.refreshTable()
            this.setState({
                visible: false,
                isFirst: true
            })
        }
    }
    handleCancel = (e) => {
        this.props.close()
        this.setState({ visible: false,
            isFirst: true})
    }
    onChange = (e) => {
        this.setState({
            auditStatus: e.target.value
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title={this.props.title}
                    style={{top: 20}}
                    width={500}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={24}>
                                <FormItem label="楼宇" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('buildName')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="房间编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('roomNum')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="客户名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('sublietName')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="扣款金额" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('operateMoney')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="事由" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('reason')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="附件" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Thumbnail url={this.state.data.fileUrl} />
                                </FormItem>
                                <FormItem label="审批意见" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('auditStatus', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入审批意见'
                                        }]
                                    })(
                                        <RadioGroup onChange={this.onChange}>
                                            <Radio value={1}>审核通过</Radio>
                                            <Radio value={2}>审核不通过</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <FormItem label="审核说明" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('remark')(
                                        <textarea />
                                    )}
                                </FormItem>
                                <FormItem label="凭证号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('voucherNo')(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let PropertyPaidConfirm = Form.create()(propertyPaidConfirm)

export default PropertyPaidConfirm
