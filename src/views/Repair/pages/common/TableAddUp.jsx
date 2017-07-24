import {Modal, Input, Form, DatePicker, Select, Row, Col, notification, Icon  } from 'antd'
import React from 'react'
import PicturesWall from './PicturesWall'
import { apiGet, apiPost, baseURL } from '../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option


class TableAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: 'select',
        repairDate: '',
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
                    'upkeep/getRepair',
                    {'id': nextProps.id}
                )
                this.imgUrl = resulData.data.picture + '#'
                let imgArr = resulData.data.picture.split('#')
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
                    repairDate: resulData.data.repairDate,
                    fileList: Arr,
                    clientList: result.data
                })
                this.props.form.setFieldsValue({
                    repairDate: moment(resulData.data.repairDate),
                    repairMan: resulData.data.repairMan,
                    clientName: resulData.data.clientName,
                    clientNameOne: resulData.data.clientName + '(' + resulData.data.roomNum + ')',
                    clientType: resulData.data.clientType,
                    clientId: resulData.data.clientId,
                    phone: resulData.data.phone,
                    buildName: resulData.data.buildName,
                    buildId: resulData.data.buildId,
                    repairNum: resulData.data.repairNum,
                    roomNum: resulData.data.roomNum,
                    repairContent: resulData.data.repairContent
                })
            }
        } else {
            if (this.state.isFirst && nextProps.visible) {
                let result = await apiGet(
                    'upkeep/getClient'
                )
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: 'insert',
                    fileList: [],
                    clientList: result.data
                })
                this.props.form.resetFields()
                this.props.form.setFieldsValue({
                    repairNum: new Date().getTime()
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
            this.setState({
                view: false
            })
            let json = this.props.form.getFieldsValue()
            this.imgUrl = this.imgUrl.substring(0, this.imgUrl.length - 1)
            json['picture'] = this.imgUrl
            let repairDate = json.repairDate.format('YYYY-MM-DD')
            json['repairDate'] = repairDate
            if (this.props.id > 0) {
                json['id'] = this.props.id
                let result = await apiPost(
                    'upkeep/updateRepair',
                    json
                )
                notification.open({
                    message: result.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                let result = await apiPost(
                    'upkeep/insertRepair',
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
                view: false,
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
                    roomNum: client.roomNum,
                    clientType: client.clientType,
                    clientName: client.clientName,
                    clientId: client.clientId
                })
            }
            return ''
        })
    }
    updateView = () => {
        this.setState({
            view: 'select'
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
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
                                <FormItem label="报修日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('repairDate', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="报修人" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('repairMan', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem label="公司名称" labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 20 }}
                                >
                                    {getFieldDecorator('clientNameOne', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Select
                                            showSearch
                                            dropdownStyle={{ width: 300 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={this.getClient}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {this.state.clientList.map(d => {
                                                let key = d.clientId + ':' + d.roomNum + ':' + d.clientType
                                                return <Option style={{ width: 300 }} key={key}>{d.clientName + '(' + d.roomNum + ')'}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('buildName', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="报修单号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('repairNum', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="所在房间" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('roomNum', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="联系方式" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('phone', {
                                        rules: [ {
                                            required: true,
                                            message: '请输入'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <FormItem label="报修内容" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 20 }}
                        >
                            {getFieldDecorator('repairContent', {
                                rules: [ {
                                    required: true,
                                    message: '请输入'
                                }]
                            })(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                        <FormItem label="上传图片" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <PicturesWall updateView={this.updateView} fileList={this.state.fileList} view={this.state.view} callback={this.Callback} />
                        </FormItem>
                        {getFieldDecorator('clientName')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('clientType')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('clientId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('buildId')(
                            <Input type="hidden" />
                        )}
                    </Form>
                </Modal>
            </div>
        )
    }
}

let TableAddUpComponent = Form.create()(TableAddUp)

export default TableAddUpComponent
