import {Modal, Form, notification, Icon, Input, Button} from 'antd'
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
        clientList: [],
        flag: 1,
        data: ''
    }

    isFirst = true
    async initialRemarks (nextProps) {
        let resulData = await apiPost(
            '/complaint/getContent'
        )
        this.setState({
            data: resulData
        })
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
    handleSave = async (editContent) => {
        let json = []
        this.setState({
            view: false,
            flag: 2
        })
        json['content'] = editContent
        json['title'] = this.title
        if (this.props.id > 0) {
            let result = await apiPost(
                'complaint/updateNotice',
                json
            )
            this.props.close()
            notification.open({
                message: result.data,
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
        } else {
            await apiPost(
                'complaint/insertNotice',
                json
            )
            this.props.close()
            notification.open({
                message: '添加成功',
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
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    title = ''
    titleChange = (e) => {
        this.title = e.target.value
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
                    <p><span>标题：<Input onChange={this.titleChange} /></span></p>
                    <PropertyFeeHeadComponent
                        getContent ={this.getContent}
                        flag= {this.state.flag}
                        handleSave= {this.handleSave}
                        handleRelease= {this.handleRelease}
                    />
                    <Button type="primary" onClick={this.handleSave} >保存&nbsp;&nbsp;</Button>&nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleRelease} >保存并发布&nbsp;&nbsp;</Button>&nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleCancel} >取消</Button>
                </div>
            </Modal>
        )
    }
}

let NoticeAddComponent = Form.create()(NoticeAdd)

export default NoticeAddComponent
