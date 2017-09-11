import {Modal, Col, Row} from 'antd'
import React from 'react'
import { apiPost } from '../../../../../api/index'
import Thumbnail from '../../../components/Thumbnail'


class ComplaintDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            view: true,
            fileList: [],
            isFirst: true,
            data: {}
        }
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/complaint/getComplaintById',
                { 'id': nextProps.id }
            )
            let Complaint = resulData.data
            if (Complaint.fromType === 1) {
                Complaint['fromType'] = '微信录入'
            } else {
                Complaint['fromType'] = '客服录入'
            }
            /* let i = 0
            Complaint['picture'] = Complaint.pic.split('#').map(img => {
                if (img !== '') {
                    i++
                    return <img key={i} width={200} height={200} src={baseURL + 'storage/files/' + img} alt="" />
                } else {
                    return '无'
                }
            })*/
            this.setState({
                data: Complaint
            })
            this.setState({
                isFirst: false,
                data: resulData.data,
                visible: nextProps.visible
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    handleCancel = (e) => {
        this.props.close()
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width={800}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <div>
                    <Row>
                        <Col span={8}><b>报单人：</b>{this.state.data.complaintMan}</Col>
                        <Col span={8}><b>联系方式：</b>{this.state.data.phone}</Col>
                        <Col span={8}><b>报单日期：</b>{this.state.data.createDate}</Col>
                    </Row>
                    <Row>
                        <Col span={8}><b>报单房间：</b>{this.state.data.buildName}&nbsp;&nbsp;{this.state.data.roomNum}</Col>
                        <Col span={8}><b>公司名称：</b>{this.state.data.customerName}</Col>
                        <Col span={8}><b>报单来源：</b>{this.state.data.fromType}</Col>
                    </Row>
                    <Row>
                        <Col span={8}><b>报单号：</b>{this.state.data.number}</Col>
                        <Col span={8} />
                        <Col span={8} />
                    </Row>
                    <p className="line" />
                    <ul>
                        <li className="clearfix"><b>报单内容：</b> <div>{this.state.data.complaintContent}</div></li>
                        <li className="clearfix"><b>报单图片：</b><Thumbnail url={this.state.data.pic} /></li>
                    </ul>
                </div>
            </Modal>
        )
    }
}

export default ComplaintDetail
