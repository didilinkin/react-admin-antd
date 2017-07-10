import {Modal, Input, Form, Select, Row, Col, notification, Icon, DatePicker } from 'antd'
import React from 'react'
import { apiGet, apiPost, baseURL } from '../../../../api/index'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option


class EquipmentAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        userList: [],
        systList: [],
        categoryList: []
    }

    isFirst = true
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.isFirst && nextProps.visible) {
                let userList = await apiGet('upkeep/getUser')
                let systList = await apiPost('equipment/systList')
                let categoryList = await apiPost('equipment/categoryList')
                let equipment = await apiPost('equipment/getEquipment',
                    {
                        id: nextProps.id
                    })
                this.isFirst = false
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    imgUrl: baseURL + 'storage/files/' + equipment.data.twoCode,
                    userList: userList.data,
                    systList: systList.data,
                    categoryList: categoryList.data
                })
                equipment = equipment.data
                if (equipment.useDepartment.toString() === '0') {
                    equipment['useDepartmentOne'] = '工程与维修部'
                } else if (equipment.useDepartment.toString() === '1') {
                    equipment['useDepartmentOne'] = '设备与运行部'
                } else if (equipment.useDepartment.toString() === '2') {
                    equipment['useDepartmentOne'] = '消防与监控部'
                } else if (equipment.useDepartment.toString() === '3') {
                    equipment['useDepartmentOne'] = '交通与安全部'
                } else if (equipment.useDepartment.toString() === '4') {
                    equipment['useDepartmentOne'] = '卫生与环保部'
                } else {
                    equipment['useDepartmentOne'] = '综合管理部'
                }
                this.props.form.setFieldsValue({
                    systemId: equipment.systemId,
                    systemName: equipment.systemName,
                    systemIdOne: equipment.systemName,
                    manufacturingUnit: equipment.manufacturingUnit,
                    categoryId: equipment.categoryId,
                    categoryName: equipment.categoryName,
                    categoryIdOne: equipment.categoryName,
                    manufacturingDate: moment(equipment.manufacturingDate),
                    equipmentName: equipment.equipmentName,
                    purchaseDate: moment(equipment.purchaseDate),
                    equipmentNumber: equipment.equipmentNumber,
                    serviceLife: equipment.serviceLife,
                    equipmentModel: equipment.equipmentModel,
                    useDepartmentOne: equipment.useDepartmentOne,
                    useDepartment: equipment.useDepartment,
                    equipmentBrand: equipment.equipmentBrand,
                    maintenanceIdOne: equipment.maintenanceName,
                    maintenanceId: equipment.maintenanceId,
                    maintenanceName: equipment.maintenanceName,
                    installationLocation: equipment.installationLocation,
                    patrolIdOne: equipment.patrolName,
                    patrolName: equipment.patrolName,
                    patrolId: equipment.patrolId,
                    remarks: equipment.remarks
                })
            }
        } else {
            if (this.state.isFirst && nextProps.visible) {
                let userList = await apiGet('upkeep/getUser')
                let systList = await apiPost('/equipment/systList')
                let categoryList = await apiPost('/equipment/categoryList')
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    userList: userList.data,
                    systList: systList.data,
                    categoryList: categoryList.data
                })
                this.props.form.resetFields()
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
            json['manufacturingDate'] = json.manufacturingDate.format('YYYY-MM-DD')
            json['purchaseDate'] = json.purchaseDate.format('YYYY-MM-DD')
            if (this.props.id > 0) {
                json['id'] = this.props.id
                let result = await apiPost(
                    'equipment/updateEquipment',
                    json
                )
                notification.open({
                    message: result.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.isFirst = true
                this.setState({
                    visible: false,
                    isFirst: true
                })
                this.props.refreshTable()
            } else {
                let result = await apiPost(
                    'equipment/insertEquipment',
                    json
                )
                let url = await apiPost('ProduceTwoCode',
                    {code: result.data})
                await apiPost(
                    'equipment/updateEquipment',
                    {twoCode: url.data,
                        id: result.data.slice(1, result.data.length)
                    }
                )
                notification.open({
                    message: '添加成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.isFirst = true
                this.setState({
                    visible: false,
                    isFirst: true
                })
                this.props.refreshTable(baseURL + 'storage/files/' + url.data, json.equipmentNumber)
            }
        }
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    getSys = async (value) => {
        let categoryList = await apiPost('/equipment/categoryList',
            {systemId: value})
        this.setState({
            categoryList: categoryList.data
        })
        this.state.systList.map(sys => {
            if (sys.id.toString() === value.toString()) {
                this.props.form.setFieldsValue({
                    systemName: sys.systemName,
                    systemId: value
                })
            }
            return ''
        })
    }
    getCategoryId = (value) => {
        this.state.categoryList.map(category => {
            if (category.id.toString() === value.toString()) {
                this.props.form.setFieldsValue({
                    categoryName: category.categoryName,
                    categoryId: value
                })
            }
            return ''
        })
    }
    maintenanceName = (value) => {
        this.state.userList.map(user => {
            if (user.id.toString() === value.toString()) {
                this.props.form.setFieldsValue({
                    maintenanceName: user.loginName,
                    maintenanceId: value
                })
            }
            return ''
        })
    }
    patrolName = (value) => {
        this.state.userList.map(user => {
            if (user.id.toString() === value.toString()) {
                this.props.form.setFieldsValue({
                    patrolName: user.loginName,
                    patrolId: value
                })
            }
            return ''
        })
    }
    equipmentStatus = (value) => {
        this.props.form.setFieldsValue({
            useDepartment: value
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
                                <FormItem label="所属系统" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('systemIdOne', {
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
                                            onChange={this.getSys}
                                        >
                                            {this.state.systList.map(sys => {
                                                return <Option key={sys.id}>{sys.systemName}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="制造单位" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('manufacturingUnit', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="所属类别" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('categoryIdOne', {
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
                                            onChange={this.getCategoryId}
                                        >
                                            {this.state.categoryList.map(category => {
                                                return <Option key={category.id}>{category.categoryName}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="制造日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('manufacturingDate', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="设备名称" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('equipmentName', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="购置日期" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('purchaseDate', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="设备编号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('equipmentNumber', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="使用年限" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('serviceLife', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="规格型号" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('equipmentModel', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="使用部门" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('useDepartmentOne', {
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
                                            onChange={this.equipmentStatus}
                                        >
                                            <Option key="0">工程与维修部</Option>
                                            <Option key="1">设备与运行部</Option>
                                            <Option key="2">消防与监控部</Option>
                                            <Option key="3">交通与安全部</Option>
                                            <Option key="4">卫生与环保部</Option>
                                            <Option key="5">综合管理部</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="设备品牌" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('equipmentBrand', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="维保责任人" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('maintenanceIdOne', {
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
                                            onChange={this.maintenanceName}
                                        >
                                            {this.state.userList.map(user => {
                                                return <Option key={user.id}>{user.loginName}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="安装位置" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('installationLocation', {
                                        rules: [ {
                                            required: true,
                                            message: 'Please input!'
                                        }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="巡检责任人" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('patrolIdOne', {
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
                                            onChange={this.patrolName}
                                        >
                                            {this.state.userList.map(user => {
                                                return <Option key={user.id}>{user.loginName}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="备注" labelCol={{ span: 3 }}
                            wrapperCol={{ span: 20 }}
                        >
                            {getFieldDecorator('remarks', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input type="textarea" rows={4} />
                            )}
                        </FormItem>
                        {getFieldDecorator('systemName')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('systemId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('categoryName')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('categoryId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('maintenanceName')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('maintenanceId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('patrolName')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('patrolId')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('useDepartment')(
                            <Input type="hidden" />
                        )}
                    </Form>
                </Modal>
            </div>
        )
    }
}

let EquipmentAddUpComponent = Form.create()(EquipmentAddUp)

export default EquipmentAddUpComponent
