// 材料添加
import {Modal, Input, Form, Icon, notification, Timeline, DatePicker, Rate} from 'antd'
import React from 'react'
import { apiPost } from '../../../../../api/index'
import '../../../style/test.less'
class ReturnAdd extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        whType: null,
        title: '',
        data: {}
    }

    async initialRemarks (nextProps) {
        let resulData = await apiPost(
            'complaint/getComplaintById',
            {'id': nextProps.id}
        )
        let Complaint = resulData.data
        if (Complaint !== null) {
            if (Complaint.ratedStatus === 0) {
                Complaint['ratedContent'] = <p>未评价</p>
            } else {
                Complaint['ratedContent'] = <div><Rate disabled defaultValue={Complaint.star} /><p>{Complaint.ratedContent}</p></div>
            }
        }
        if (this.state.isFirst && nextProps.visible) {
            this.setState({
                visible: nextProps.visible,
                isFirst: false,
                view: true,
                data: resulData.data,
                fileList: []
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        await apiPost(
            '/complaint/updateComplaintByVisit',
            {'id': this.state.data.id,
                'visitStatus': 1,
                'visitDate': this.visitDate,
                'visitContent': this.visitContent}
        )
        notification.open({
            message: '操作成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.props.close()
        this.props.refreshTable()
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    onSelect = (e) => {
        this.setState({
            whType: e
        })
    }
    visitDate = null
    getDate = (e) => {
        this.visitDate = e.format('YYYY-MM-DD')
    }
    visitContent = ''
    getVisit = (e) => {
        this.visitContent = e.target.value
    }
    render () {
        return (
            <Modal maskClosable={false}
                title={this.state.title}
                style={{top: 20}}
                width={400}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <div>
                    <div style={{paddingLeft: '100px'}}>
                        <Timeline>
                            <Timeline.Item color="green">
                                <h2 style={{display: 'inline-block',
                                    position: 'absolute',
                                    left: '-90px'}}
                                >提交投诉单
                                </h2>
                                <p className="time">{this.state.data.createDate}</p>受理人： {this.state.data.createName}</Timeline.Item>
                            <Timeline.Item color="green">
                                <h2 style={{display: 'inline-block',
                                    position: 'absolute',
                                    left: '-90px'}}
                                >受理结果
                                </h2><p className="time">{this.state.data.handleDate}</p>{this.state.data.handleContent}</Timeline.Item>
                            <Timeline.Item color="green">
                                <h2 style={{display: 'inline-block',
                                    position: 'absolute',
                                    left: '-90px'}}
                                >客户评价</h2><p className="time">{this.state.data.ratedDate}</p>
                                {this.state.data.ratedContent}
                            </Timeline.Item>
                        </Timeline>
                    </div>
                    <h2>回访日期</h2>
                    <div className="txtbox"><DatePicker onChange={this.getDate} type="textarea" rows={4} /></div>
                    <h2>回访情况</h2>
                    <div className="txtbox"><Input onChange={this.getVisit} type="textarea" rows={4} /></div>
                    <p className="linevisit" />
                </div>
            </Modal>
        )
    }
}

let ReturnAddComponent = Form.create()(ReturnAdd)

export default ReturnAddComponent
