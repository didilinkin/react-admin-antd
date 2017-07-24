// 报修明细
import React from 'react'
import { Row, Col } from 'antd'
import '../../../../style/test.less'
import { apiPost, baseURL } from '../../../../api'


class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    async initialRemarks () {
        let resulData = await apiPost(
            'upkeep/getRepair',
            {'id': this.props.match.params.id}
        )
        let Repair = resulData.data
        let j = 0
        Repair['repairContent'] = Repair.repairContent.split('\n').map(span => {
            j++
            return <p key={j}>{span}</p>
        })
        if (Repair.fromType === 1) {
            Repair['fromType'] = '微信录入'
        } else {
            Repair['fromType'] = '客服录入'
        }
        if (Repair.pieStatus === 1) {
            Repair['pieStatus'] = '已派单'
        } else {
            Repair['pieStatus'] = '未派单'
        }
        let i = 0
        Repair['picture'] = Repair.picture.split('#').map(img => {
            if (img !== '') {
                i++
                return <img key={i} src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        this.setState({
            data: Repair
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div className="box1">
                <h2>报修人信息</h2>
                <Row>
                    <Col span={8}><b>报修人：</b>{this.state.data.repairMan}</Col>
                    <Col span={8}><b>联系方式：</b>{this.state.data.phone}</Col>
                    <Col span={8}><b>报修日期：</b>{this.state.data.repairDate}</Col>
                </Row>
                <Row>
                    <Col span={8}><b>报修房间：</b>{this.state.data.roomNum}</Col>
                    <Col span={8}><b>公司名称：</b>{this.state.data.clientName}</Col>
                    <Col span={8}><b>报修来源：</b>{this.state.data.fromType}</Col>
                </Row>
                <Row>
                    <Col span={8}><b>报修单号：</b>{this.state.data.repairNum}</Col>
                    <Col span={8} />
                    <Col span={8} />
                </Row>
                <p className="line" />
                <h2>报修信息</h2>
                <ul>
                    <li className="clearfix"><b>报修内容：</b> <div>{this.state.data.repairContent}</div></li>
                    <li className="clearfix"><b>报修图片：</b>{this.state.data.picture}</li>
                </ul>
                <p className="line" />
                <h2>派单信息</h2>
                <Row>
                    <Col span={8}><b>派单状态：</b>{this.state.data.pieStatus}</Col>
                    <Col span={8}><b>派单人：</b>{this.state.data.pieMan} {this.state.data.pieDate}</Col>
                    <Col span={8}><b>维修人：</b>{this.state.data.repairedMan}</Col>
                </Row>
            </div>
        )
    }
}

export default App

