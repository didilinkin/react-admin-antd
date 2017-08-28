// 转租添加修改
import {Modal, Input, Form, DatePicker, notification, Icon, Checkbox, Row, Col } from 'antd'
import React from 'react'
import { apiPost } from '../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item


class SubletAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        leaseRooms: []
    }
    async initialRemarks (nextProps) {
        if (this.state.isFirst && nextProps.visible) {
            if (nextProps.id > 0) {
                let SubletInfo = await apiPost(
                    '/contract/getSubletInfo',
                    {id: nextProps.id}
                )
                SubletInfo = SubletInfo.data
                this.props.form.setFieldsValue({
                    tenant: SubletInfo.tenant,
                    contactPerson: SubletInfo.contactPerson,
                    phoneAdmin: SubletInfo.phoneAdmin,
                    phoneFinance: SubletInfo.phoneFinance,
                    phoneManager: SubletInfo.phoneManager,
                    email: SubletInfo.email,
                    subletStartDate: moment(SubletInfo.subletStartDate),
                    subletEndDate: moment(SubletInfo.subletEndDate),
                    roomNum: SubletInfo.leaseRooms.split(','),
                    energy: SubletInfo.energy
                })
                console.log(SubletInfo)
            }
            let data = nextProps.data
            let subArr = []
            data.ListSublet.map(sub => {
                sub.roomNum.split(',')
                subArr.push.apply(subArr, sub.roomNum.split(','))
                return ''
            })
            let leaseRooms = data.contract.leaseRooms.split(',')
            // leaseRooms.map((roomNum, i) => {
            //     subArr.map(rommNum2 => {
            //         if (roomNum === rommNum2) {
            //             leaseRooms.splice(i, roomNum.length)
            //         }
            //     })
            // })
            this.setState({
                visible: nextProps.visible,
                isFirst: false,
                leaseRooms: leaseRooms
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
            json['subletStartDate'] = json.subletStartDate.format('YYYY-MM-DD')
            json['subletEndDate'] = json.subletEndDate.format('YYYY-MM-DD')
            json['roomNum'] = json.roomNum.toString()
            json['buildId'] = this.props.data.contract.buildId
            json['clientId'] = this.props.data.contract.clientId
            json['pmId'] = this.props.data.contract.id
            json['pmContractCode'] = this.props.data.contract.contractCode
            if (this.props.id > 0) {
                json['id'] = this.props.id
                let message = await apiPost(
                    '/contract/updateSubletInfo',
                    json
                )
                notification.open({
                    message: message.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refresh()
            } else {
                let message = await apiPost(
                    '/contract/insertSubletInfo',
                    json
                )
                notification.open({
                    message: message.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.props.refresh()
            }
            this.setState({
                visible: false,
                isFirst: true
            })
        }
    }
    handleCancel = (e) => {
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
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="租户名称" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('tenant', {
                                rules: [ {
                                    required: true,
                                    message: '请输入!'
                                }]
                            })(
                                <Input type="text" style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="联系人" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('contactPerson', {
                                rules: [ {
                                    required: true,
                                    message: '请输入!'
                                }]
                            })(
                                <Input type="text" style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="行政电话" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('phoneAdmin', {
                                rules: [ {
                                    required: true,
                                    message: '请输入!'
                                }]
                            })(
                                <Input type="text" style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="财务电话" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('phoneFinance')(
                                <Input type="text"style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="经理电话" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('phoneManager')(
                                <Input type="text" style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="E-mail" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('email')(
                                <Input type="text" style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="起租日期" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('subletStartDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择!'
                                }]
                            })(
                                <DatePicker style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="结束日期" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('subletEndDate', {
                                rules: [ {
                                    required: true,
                                    message: '请选择!'
                                }]
                            })(
                                <DatePicker style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <FormItem label="租赁房间" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('roomNum')(
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        {this.state.leaseRooms.map((room, i) => {
                                            return <Col key={i} offset="1" span={4}><Checkbox value={room}>{room}</Checkbox></Col>
                                        })}
                                    </Row>
                                </Checkbox.Group>
                            )}
                        </FormItem>
                        {!this.props.id > 0 &&
                        <FormItem label="能源管理押金" labelCol={{span: 6}}
                            wrapperCol={{span: 15}}
                        >
                            {getFieldDecorator('energy')(
                                <Input style={{width: 200}} />
                            )}
                        </FormItem>
                        }
                    </Form>
                </Modal>
            </div>
        )
    }
}

let SubletAddUpCom = Form.create()(SubletAddUp)

export default SubletAddUpCom
