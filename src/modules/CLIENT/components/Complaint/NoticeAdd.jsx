import {Modal, Form, notification, Icon, Input} from 'antd'
import React from 'react'
import { apiGet, apiPost, baseURL } from '../../../../api/index'
import moment from 'moment'
import PropertyFeeHeadComponent from '../../../../common/components/Wysiwyg'


class NoticeAdd extends React.Component {
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
                    'complaint/getComplaintById',
                    {'id': nextProps.id}
                )
                this.imgUrl = resulData.data.pic + '#'
                let imgArr = resulData.data.pic.split('#')
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
                    createDate: moment(resulData.data.createDate),
                    complaintMan: resulData.data.complaintMan,
                    customerName: resulData.data.customerName,
                    customerNameOne: resulData.data.customerName + '(' + resulData.data.roomNum + ')',
                    clientType: resulData.data.clientType,
                    clientId: resulData.data.clientId,
                    phone: resulData.data.phone,
                    buildName: resulData.data.buildName,
                    buildId: resulData.data.buildId,
                    number: resulData.data.number,
                    roomNum: resulData.data.roomNum,
                    complaintContent: resulData.data.complaintContent
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
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let minute = date.getMinutes()
                let second = date.getSeconds()
                this.props.form.setFieldsValue({
                    number: year.toString() + month.toString() + day.toString() + hour.toString() + minute.toString() + second.toString()
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
            json['pic'] = this.imgUrl
            let createDate = json.createDate.format('YYYY-MM-DD')
            json['createDate'] = createDate
            if (this.props.id > 0) {
                json['id'] = this.props.id
                let result = await apiPost(
                    'complaint/updateComplaintByEdit',
                    json
                )
                this.props.close()
                notification.open({
                    message: result.data,
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
                })
            } else {
                let result = await apiPost(
                    'complaint/insertComplaint',
                    json
                )
                this.props.close()
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
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width={700}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <div>
                    <div>
                        <p><span>标题：<Input type={{width: 200}} /></span></p>
                    </div>
                    <PropertyFeeHeadComponent />
                </div>
            </Modal>
        )
    }
}

let NoticeAddComponent = Form.create()(NoticeAdd)

export default NoticeAddComponent
