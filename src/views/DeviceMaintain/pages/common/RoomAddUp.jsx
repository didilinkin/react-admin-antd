import {Modal, Input, Form, Select, notification, Icon, Checkbox  } from 'antd'
import React from 'react'
import { apiGet, apiPost, baseURL } from '../../../../api/index'
const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group


class RoomAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        systList: [],
        equipmentNames: [],
        categoryList: []
    }

    isFirst = true
    async initialRemarks (nextProps) {
        if (nextProps.id > 0) {
            if (this.isFirst && nextProps.visible) {
                let systList = await apiPost('equipment/systList')
                let categoryList = await apiPost('equipment/categoryList')
                let MachineRoom = await apiPost('equipment/gitMachineRoom',
                    {
                        id: nextProps.id
                    })
                let equipmentList = await apiPost('/equipment/equipmentList',
                    {categoryId: MachineRoom.data.categoryId})
                let equipmentNames = []
                equipmentList.data.map(equipment => {
                    let json = {label: equipment.equipmentName,
                        value: equipment.id.toString()
                    }
                    equipmentNames.push(json)
                    return ''
                })
                this.isFirst = false
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    equipmentNames: equipmentNames,
                    systList: systList.data,
                    categoryList: categoryList.data
                })
                MachineRoom = MachineRoom.data
                this.props.form.setFieldsValue({
                    systemId: MachineRoom.systemId,
                    systemName: MachineRoom.systemName,
                    systemIdOne: MachineRoom.systemName,
                    categoryId: MachineRoom.categoryId,
                    categoryName: MachineRoom.categoryName,
                    categoryIdOne: MachineRoom.categoryName,
                    machineRoomNumber: MachineRoom.machineRoomNumber,
                    machineRoomName: MachineRoom.machineRoomName,
                    floor: MachineRoom.floor,
                    equipmentIds: MachineRoom.equipmentIds,
                    equipmentNames: MachineRoom.equipmentNames,
                    Checkbox: MachineRoom.equipmentIds.split(',')
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
            if (this.props.id > 0) {
                json['id'] = this.props.id
                await apiPost(
                    '/equipment/updateMachineRoom',
                    json
                )
                notification.open({
                    message: '修改成功',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
                this.isFirst = true
                this.setState({
                    equipmentNames: [],
                    visible: false,
                    isFirst: true
                })
                this.props.refreshTable()
            } else {
                let result = await apiPost(
                    'equipment/insertMachineRoom',
                    json
                )
                let url = await apiPost('ProduceTwoCode',
                    {code: result.data})
                await apiPost(
                    'equipment/updateMachineRoom',
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
                    equipmentNames: [],
                    visible: false,
                    isFirst: true
                })
                this.props.refreshTable(baseURL + 'storage/files/' + url.data, json.machineRoomNumber)
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
    getCategoryId = async (value) => {
        let equipmentList = await apiPost('/equipment/equipmentList',
            {categoryId: value})
        let equipmentNames = []
        equipmentList.data.map(equipment => {
            let json = {label: equipment.equipmentName,
                value: equipment.id.toString()
            }
            equipmentNames.push(json)
            return ''
        })
        this.setState({
            equipmentNames: equipmentNames
        })
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
    onChange = (checkedValues) => {
        let equipmentNames = []
        for (let i = 0; i < checkedValues.length; i++) {
            for (let j = 0; j < this.state.equipmentNames.length; j++) {
                if (checkedValues[i] === this.state.equipmentNames[j].value) {
                    equipmentNames.push(this.state.equipmentNames[j].label)
                    break
                }
            }
        }
        this.props.form.setFieldsValue({
            equipmentIds: checkedValues.toString(),
            equipmentNames: equipmentNames.toString()
        })
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
                        <FormItem label="机房编号" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('machineRoomNumber', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="机房名称" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('machineRoomName', {
                                rules: [ {
                                    required: true,
                                    message: 'Please input!'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="所属楼层" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('floor', {
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
                                >
                                    <Option key="1">1</Option>
                                    <Option key="2">2</Option>
                                    <Option key="3">3</Option>
                                    <Option key="4">4</Option>
                                    <Option key="5">5</Option>
                                    <Option key="6">6</Option>
                                    <Option key="7">7</Option>
                                    <Option key="8">8</Option>
                                    <Option key="9">9</Option>
                                    <Option key="10">10</Option>
                                    <Option key="11">11</Option>
                                    <Option key="12">12</Option>
                                    <Option key="13">13</Option>
                                    <Option key="14">14</Option>
                                    <Option key="15">15</Option>
                                    <Option key="16">16</Option>
                                    <Option key="17">17</Option>
                                    <Option key="18">18</Option>
                                    <Option key="19">19</Option>
                                    <Option key="20">20</Option>
                                    <Option key="21">21</Option>
                                    <Option key="22">22</Option>
                                    <Option key="23">23</Option>
                                    <Option key="24">24</Option>
                                    <Option key="25">25</Option>
                                    <Option key="26">26</Option>
                                    <Option key="27">27</Option>
                                    <Option key="28">28</Option>
                                    <Option key="29">29</Option>
                                    <Option key="30">30</Option>
                                    <Option key="31">31</Option>
                                    <Option key="负一">负一</Option>
                                    <Option key="裙楼一">裙楼一</Option>
                                    <Option key="裙楼二">裙楼二</Option>
                                    <Option key="裙楼三">裙楼三</Option>
                                    <Option key="裙楼四">裙楼四</Option>
                                    <Option key="裙楼五">裙楼五</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="所属设备" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('Checkbox')(
                                <CheckboxGroup options={this.state.equipmentNames} onChange={this.onChange} />
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
                        {getFieldDecorator('equipmentIds')(
                            <Input type="hidden" />
                        )}
                        {getFieldDecorator('equipmentNames')(
                            <Input type="hidden" />
                        )}
                    </Form>
                </Modal>
            </div>
        )
    }
}

let RoomAddUpAddUpComponent = Form.create()(RoomAddUp)

export default RoomAddUpAddUpComponent
