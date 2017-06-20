// 维修详情
import React from 'react'
import { Row, Col } from 'antd'
import '../../../../style/test.less'
import { apiPost, baseURL  } from '../../../../api'

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
        if (Repair.repairStatus === '1') {
            Repair['repairStatus'] = '已完成'
        } else {
            Repair['repairStatus'] = '未完成'
        }
        Repair['repairedPic'] = Repair.repairedPic.split('#').map(img => {
            if (img !== '') {
                return <img src={baseURL + 'storage/files/' + img} alt="" />
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
                <h2>维修信息</h2>
                <Row>
                    <Col span={12}><b>维修日期：</b> {this.state.data.repairedDate}</Col>
                    <Col span={12}><b>维修状态：</b>{this.state.data.repairStatus}</Col>
                </Row>
                <Row>
                    <Col span={12}><b>维修人：</b>{this.state.data.repairedMan}</Col>
                    <Col span={12}><b>协作人：</b>{this.state.data.withMan}</Col>
                </Row>
                <Row>
                    <Col span={24}><b>维修情况：</b>
                        {this.state.data.repairedContent}
                    </Col>
                </Row>
                <ul>
                    <li>
                        <b>现场图片：</b>
                        {this.state.data.repairedPic}
                    </li>
                </ul>
            </div>
        )
    }
}

export default App

