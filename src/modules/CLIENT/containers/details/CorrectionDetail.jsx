// 整改信息明细
import React from 'react'
import { Row, Col, Button } from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../api'
import Thumbnail from '../../components/Thumbnail'
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
        // let i = 0
        // Repair.imgUrls.split('#').map(img => {
        //     if (img !== '') {
        //         i++
        //         return <Thumbnail key={i} url={baseURL + 'storage/files/' + img} />
        //     } else {
        //         return '无'
        //     }
        // })
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
        // let html = window.document.body.innerHTML
        // window.document.body.innerHTML = document.getElementById('box2').innerHTML
        const win = window.open()
        win.loaded = () => function () {
            alert(1)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        let text = document.createTextNode('window.onload = function(){alert(11)};function dy(){document.getElementById("dy").style.display="none";window.print();window.close();}')
        script.appendChild(text)
        // win.document.head.innerHTML = '<script type="text/javascript">function dy(){print()};onload = dy</script>'
        win.document.body.innerHTML = document.getElementById('box2').innerHTML + '<button id="dy" onClick="dy()">打印</button>'
        let link = document.createElement('link')
        link.type = 'text/css'
        link.href = 'http://localhost:3006/test.less'
        link.rel = 'stylesheet'
        win.document.head.appendChild(link)
        win.document.head.appendChild(script)
        win.document.onload = win.dy()
        // win.document.head.innerHTML = '<script type="text/javascript">window.onload = Window.print()</script>'
        // win.onload = win.print()
        // win.close()


        // this.props.history.push('/home/client/NoticeDetail/CorrectionDetail/' + this.props.match.params.id)
    }
    render () {
        return (
            <div>
                <div id="box2">
                    <div id="box1" className="box1" style={{marginBottom: '10px'}}>
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
                                <Thumbnail url={this.state.data.imgUrls} />
                            </li>
                        </ul>
                        <Row>
                            <Col span={24}><b>检查人：</b> {this.state.data.inspectName}</Col>
                        </Row>
                    </div>
                </div>
                <Button type="primary" onClick={() => this.preview()}>打印</Button>
            </div>
        )
    }
}
export default App
