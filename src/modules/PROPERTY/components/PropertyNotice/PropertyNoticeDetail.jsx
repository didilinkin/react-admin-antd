// 物业费明细
import React from 'react'
import {Row, Col, Modal} from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../api'


class PropertyDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auditStatus: 2,
            payPeriod: '',
            invoicePropertyStatus: '',
            invoiceLateStatus: '',
            id: 0,
            remark: '',
            openUpdate: false,
            visible: false,
            view: true,
            isFirst: true,
            data2: [],
            data3: [],
            data: {}
        }
    }
    handleUpdate = () => {
        this.setState({
            openUpdate: true,
            id: this.state.id
        })
    }
    handleCancel = (e) => {
        this.props.close()
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    async initialRemarks (nextProps) {
        this.setState({
            view: false
        })
        if (this.state.isFirst && nextProps.visible) {
            let resulData = await apiPost(
                '/complaint/getNoticeById',
                {id: nextProps.id}
            )
            this.setState({
                data: resulData.data,
                visible: nextProps.visible,
                isFirst: false,
                view: true
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    render () {
        return (
            <Modal maskClosable={false}
                title= "物业公告明细"
                style={{top: 20}}
                width={900}
                visible={this.state.visible}
                footer={null}
                onCancel={this.handleCancel}
            >
                <div className="contract">
                    <Row style={{marginTop: 0}}>
                        <Col>
                            <div style={{textAlign: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                lineHeight: '40px'}}
                            >
                                <span>{this.state.data.title}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{margin: '10px 0'}}>
                        <Col span={8}>{this.state.data.createDate} </Col>
                    </Row><Row style={{margin: '10px 0'}}>
                        <Col span={8}>{this.state.data.content} </Col>
                    </Row>
                </div>
            </Modal>
        )
    }
}

export default PropertyDetail

