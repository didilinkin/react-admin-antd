import {Modal, Input, Form, DatePicker, Select, Row, Col  } from 'antd'
import React from 'react'
import PicturesWall from './Details/PicturesWall'
import { apiGet } from '../../../api'
const FormItem = Form.Item
const Option = Select.Option


class TableAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        clientList: []
    }

    async initialRemarks (nextProps) {
        let result = await apiGet(
            'http://192.168.1.108:18082/upkeep/getClient'
        )
        this.setState({
            visible: nextProps.visible,
            isFirst: false,
            clientList: result.data
        })
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        json['picture'] = this.imgUrl
        debugger
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true})
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    getRepairDate = (date, dateString) => {
        console.log(date, dateString)
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
    render () {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <Modal
                    title="添加报单"
                    style={{top: 20}}
                    width="700"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={12}>
                        <FormItem label="报修日期" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <DatePicker onChange={this.getRepairDate} {...getFieldProps('repairDate')}/>
                        </FormItem>
                            </Col>
                            <Col span={12}>
                        <FormItem label="报修人" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input {...getFieldProps('repairMan')}/>
                        </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                        <FormItem label="公司名称" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Select
                                {...getFieldProps('clientName')}
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
                            <Input type="hidden" {...getFieldProps('clientType')}/>
                            <Input type="hidden" {...getFieldProps('clientId')}/>
                        </FormItem>
                            </Col>
                            <Col span={12}>
                        <FormItem label="联系方式" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input {...getFieldProps('phone')}/>
                        </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                        <FormItem label="所属楼宇" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input {...getFieldProps('buildName')}/>
                            <Input type="hidden" {...getFieldProps('buildId')}/>
                        </FormItem>
                            </Col>
                            <Col span={12}>
                        <FormItem label="报修单号" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input {...getFieldProps('repairNum')}/>
                        </FormItem>
                            </Col>
                        </Row>

                        <FormItem label="所在房间" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input {...getFieldProps('roomNum')}/>
                        </FormItem>


                        <FormItem label="报修内容" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <Input type="textarea" rows={4} {...getFieldProps('repairContent')}/>
                        </FormItem>


                        <FormItem label="上传图片" labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 15 }}
                        >
                            <PicturesWall callback={this.Callback}/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let TableAddUpComponent = Form.create()(TableAddUp)

export default TableAddUpComponent
