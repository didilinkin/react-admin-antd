// 整改信息明细
import React from 'react'
import { Row, Col, Button } from 'antd'
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
            '/rectification/getRectification',
            {'id': this.props.match.params.id}
        )
        let Repair = resulData.data
        let i = 0
        Repair['imgUrls'] = Repair.imgUrls.split('#').map(img => {
            if (img !== '') {
                i++
                return <img key={i} src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        let j = 0
        Repair['rectificationContent'] = Repair.rectificationContent.split('\n').map(span => {
            j++
            return <p key={j}>{span}</p>
        })
        this.setState({
            data: Repair
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    preview = () => {
        window.document.body.innerHTML = document.getElementById('box2').innerHTML
        window.print()
        window.location.reload()
    }
    render () {
        return (
            <div>
                <div id="box2">
                    <div id="box1" className="box1">
                        <h2>整改通知</h2>
                        <Row>
                            <Col span={12}><b>检查日期：</b> {this.state.data.inspectDate}</Col>
                            <Col span={12}><b>所属楼宇：</b>{this.state.data.buildName}</Col>
                        </Row>
                        <Row>
                            <Col span={12}><b>公司名称：</b>{this.state.data.clientName}</Col>
                            <Col span={12}><b>所属房间：</b>{this.state.data.roomNums}</Col>
                        </Row>
                        <Row>
                            <Col span={24}><b>整改项目：</b>
                                <div style={{float: 'left'}}>
                                    {this.state.data.rectificationContent}
                                </div>
                            </Col>
                        </Row>
                        <ul>
                            <li>
                                <b>现场图片：</b>
                                {this.state.data.imgUrls}
                            </li>
                        </ul>
                        <Row>
                            <Col span={24}><b>检查人：</b> {this.state.data.inspectName}</Col>
                        </Row>
                    </div>
                </div>
                <Button onClick={() => this.preview()}>打印</Button>
            </div>
        )
    }
}
export default App
