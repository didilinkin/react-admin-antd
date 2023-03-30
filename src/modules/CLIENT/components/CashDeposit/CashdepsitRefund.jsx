import {Modal, Input, Form, notification, Icon, Col, Row} from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import PicturesWall from '../../components/PicturesWall'
const FormItem = Form.Item


class propertyPaidConfirm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
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
                '/cashDeposit/getCashDepositById',
                { 'id': nextProps.id }
            )
            this.props.form.setFieldsValue({
                buildName: resulData.data.buildName,
                roomNum: resulData.data.roomNum,
                sublietName: resulData.data.sublietName,
                currentBalance: resulData.data.currentBalance
            })
            this.setState({
                isFirst: false,
                data: resulData.data,
                visible: nextProps.visible
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    fileUrl = ''
    Callback = (url) => {
        this.fileUrl = url
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
            json['auditStatus'] = 0
            json['id'] = this.state.data.id
            json['revenueType'] = 2
            json['chargeItem'] = this.state.data.chargeItem
            json['fileUrl'] = this.fileUrl.substring(0, this.fileUrl.length - 1)
            json['operateMoney'] = this.state.data.currentBalance
            json['buildId'] = this.state.data.buildId
            await apiPost(
                '/cashDeposit/updateCashDeposit',
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
                                <FormItem label="当前结余" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 9 }}
                                >
                                    {getFieldDecorator('currentBalance')(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="退款说明" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('reason')(
                                        <textarea />
                                    )}
                                </FormItem>
                                <FormItem label="上传附件" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    <PicturesWall fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                                </FormItem>
                                {getFieldDecorator('id')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('buildName')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('roomNum')(
                                    <Input type="hidden" />
                                )}
                                {getFieldDecorator('sublietName')(
                                    <Input type="hidden" />
                                )}
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
