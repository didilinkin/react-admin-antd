import {Modal, Input, Form, DatePicker, Select, Row, Col, notification, Icon  } from 'antd'
import React from 'react'
import PicturesWall from './PicturesWall'
import { apiGet, apiPost, baseURL } from '../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option


class RectificationAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: 'select',
        fileList: [],
        clientList: [],
        userList: []
    }

    isFirst = true
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.isFirst && nextProps.visible) {
                let result = await apiGet(
                    'upkeep/getClient'
                )
                let resulData = await apiPost(
                    'rectification/getRectification',
                    {'id': nextProps.id}
                )
                let resulData1 = await apiGet('upkeep/getUser')
                this.imgUrl = resulData.data.imgUrls + '#'
                let imgArr = resulData.data.imgUrls.split('#')
                let Arr = []
                let i = 0
                imgArr.map(img => {
                    if (img !== '') {
                        i++
                        let json = {
                            uid: i,
                            status: 'done',
                            name: img,
                            url: baseURL + 'storage/files/' + img
                        }
                        Arr.push(json)
                    }
                    return ''
                })
                this.isFirst = false
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: 'update',
                    fileList: Arr,
                    userList: resulData1.data,
                    clientList: result.data
                })
                let inspectIdsOne = []
                if (resulData.data.inspectName.length > 0) {
                    inspectIdsOne = resulData.data.inspectName.toString().split(',')
                }
                this.props.form.setFieldsValue({
                    inspectDate: moment(resulData.data.inspectDate),
                    buildName: resulData.data.buildName,
                    buildId: resulData.data.buildId,
                    clientName: resulData.data.clientName,
                    clientNameOne: resulData.data.clientName + '(' + resulData.data.roomNums + ')',
                    clientType: resulData.data.clientType,
                    clientId: resulData.data.clientId,
                    roomNums: resulData.data.roomNums,
                    inspectName: resulData.data.inspectName,
                    inspectIds: resulData.data.inspectIds,
                    inspectIdsOne: inspectIdsOne,
                    rectificationContent: resulData.data.rectificationContent
                })
            }
        } else {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                let result = await apiGet(
                    'upkeep/getClient'
                )
                let resulData = await apiGet('upkeep/getUser')
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: 'insert',
                    fileList: [],
                    userList: resulData.data,
                    clientList: result.data
                })
            }
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
            this.imgUrl = this.imgUrl.substring(0, this.imgUrl.length - 1)
            json['imgUrls'] = this.imgUrl
            let inspectDate = json.inspectDate.format('YYYY-MM-DD')
            json['inspectDate'] = inspectDate
            if (this.props.id > 0) {
                json['id'] = this.props.id
                let result = await apiPost(
                    'rectification/updateRectification',
                    json
                )
                notification.open({
                    message: result.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                let result = await apiPost(
                    'rectification/insertRectification',
                    json
                )
                notification.open({
                    message: result.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            }

            this.isFirst = true
            this.setState({
                visible: false,
                isFirst: true,
                clientList: []
            })
            this.props.refreshTable()
        }
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    getRepairDate = (date, dateString) => {
        alert(dateString)
    }
    imgUrl = ''
    Callback = (url) => {
        this.imgUrl = url
    }
    updateView = () => {
        this.setState({
            view: 'select'
        })
    }
    getClient = (value) => {
        this.state.clientList.map(client => {
            let key = client.clientId + ':' + client.roomNum.toString() + ':' + client.clientType.toString()
            if (key === value) {
                this.props.form.setFieldsValue({
                    buildName: client.buildName,
                    buildId: client.buildId,
                    roomNums: client.roomNum,
                    clientType: client.clientType,
                    clientName: client.clientName,
                    clientId: client.clientId
                })
            }
            return ''
        })
    }
    getUser = (value) => {
        let inspectIds = []
        this.state.userList.map(user => {
            value.toString().split(',').map(value1 => {
                if (user.loginName.toString() === value1.toString()) {
                    inspectIds.push(user.id)
                }
                return ''
            })
            return ''
        })
        this.props.form.setFieldsValue({
            inspectName: value.toString(),
            inspectIds: inspectIds.toString()
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal
                    title={this.props.title}
                    style={{top: 20}}
                    width={700}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={12}>
                                <FormItem label="检查日期" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                    {getFieldDecorator('inspectDate', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your inspectDate!'
                                        }]
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('buildName', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your buildName!'
                                        }]
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="公司名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('clientNameOne', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            onChange={this.getClient}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {this.state.clientList.map(d => {
                                                let key = d.clientId + ':' + d.roomNum + ':' + d.clientType
                                                return <Option key={key}>{d.clientName + '(' + d.roomNum + ')'}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="所属房间" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('roomNums', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your clientId!'
                                        }]
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="整改项目" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 20 }}
                        >
                            {getFieldDecorator('rectificationContent', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input your clientId!'
                                }]
                            })(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                        <FormItem label="现场图片" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <PicturesWall updateView={this.updateView} fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                        </FormItem>
                        <FormItem label="检查人" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 20 }}
                        >
                            {getFieldDecorator('inspectIdsOne', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
                                    onChange={this.getUser}
                                >
                                    {this.state.userList.map(d => {
                                        return <Option key={d.loginName}>{d.loginName}</Option>
                                    })}
                                </Select>
                            )}
                        </FormItem>
                        {getFieldDecorator('buildId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('clientName')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('clientId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('clientType')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('inspectIds')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('inspectName')(
                            <Input type="hidden" />
                        )}
                    </Form>
                </Modal>
            </div>
        )
    }
}

let RectificationAddUpComponent = Form.create()(RectificationAddUp)

export default RectificationAddUpComponent
