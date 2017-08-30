// 材料添加
import {Modal, Form, Timeline, Rate} from 'antd'
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
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        return (
            <Modal maskClosable={false}
                title={this.state.title}
                style={{top: 20}}
                width={400}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
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
                            <Timeline.Item color="green">
                                <h2 style={{display: 'inline-block',
                                    position: 'absolute',
                                    left: '-90px'}}
                                >客户回访</h2><p className="time">{this.state.data.visitDate}</p>
                                <p >回访人：{this.state.data.visitName}</p>
                                {this.state.data.visitContent}
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </div>
            </Modal>
        )
    }
}

let ReturnAddComponent = Form.create()(ReturnAdd)

export default ReturnAddComponent
