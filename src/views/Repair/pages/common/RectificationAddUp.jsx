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
        view: true,
        fileList: [],
        clientList: []
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
                    view: true,
                    fileList: Arr,
                    clientList: result.data
                })
                this.props.form.setFieldsValue({
                    inspectDate: moment(resulData.data.inspectDate),
                    buildName: resulData.data.buildName,
                    buildId: resulData.data.buildId,
                    clientName: resulData.data.clientName,
                    clientNameOne: resulData.data.clientName,
                    clientType: resulData.data.clientType,
                    clientId: resulData.data.clientId,
                    roomNums: resulData.data.roomNums,
                    rectificationContent: resulData.data.rectificationContent
                })
            }
        } else {
            this.setState({
                view: false
            })
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                let result = await apiGet(
                    'upkeep/getClient'
                )
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: [],
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
        this.setState({visible: false,
            isFirst: true,
            clientList: []})
        this.props.refreshTable()
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
                                <FormItem label="检查日期" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
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
                                <FormItem label="所属楼宇" labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('buildName', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your buildName!'
                                        }]
                                    })(
                                        <Input disabled />
                                    )}
                                    {getFieldDecorator('buildId', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your buildId!'
                                        }]
                                    })(
                                        <Input type="hidden" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="公司名称" labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    {getFieldDecorator('clientNameOne')(
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
                                                return <Option key={key}>{d.clientName}</Option>
                                            })}
                                        </Select>
                                    )}
                                    {getFieldDecorator('clientName')(
                                        <Input type="hidden" />
                                    )}
                                    {getFieldDecorator('clientType', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your clientType!'
                                        }]
                                    })(
                                        <Input type="hidden" />
                                    )}
                                    {getFieldDecorator('clientId', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input your clientId!'
                                        }]
                                    })(
                                        <Input type="hidden" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="所属房间" labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 15 }}
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
                        <FormItem label="整改项目" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
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


                        <FormItem label="现场图片" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <PicturesWall fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let RectificationAddUpComponent = Form.create()(RectificationAddUp)

export default RectificationAddUpComponent
