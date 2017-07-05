// 空调异常
import React from 'react'
import { Row, Col} from 'antd'
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
            '/deviceMaintain/electricalErrorDevice',
            {'parentId': this.props.match.params.id.toString().split(',')[0],
                'parentType': this.props.match.params.id.toString().split(',')[1]
            }
        )
        let Repair = resulData.data
        Repair['scenePictures'] = Repair.scenePictures.split('#').map(img => {
            if (img !== '') {
                return <img src={baseURL + 'storage/files/' + img} alt="" />
            } else {
                return '无'
            }
        })
        if (Repair.equipmentId > 0) {
            Repair['info'] =
                <Row>
                    <Col span={12}><b>设备名称：</b>{Repair.equipmentName}</Col>
                    <Col span={12}><b>设备编号：</b>{Repair.equipmentNumber}</Col>
                </Row>
        } else {
            Repair['info'] = ''
        }
        this.setState({
            data: Repair
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div>
                <div className="box6">
                    <h3>异常记录</h3>
                    {this.state.data.info}
                    <Row>
                        <Col span={12}><b>提交日期：</b>{this.state.data.submissionDate}</Col>
                        <Col span={12}><b>记录人：</b>{this.state.data.recordName}</Col>
                    </Row>
                    <ul>
                        <li>
                            <b>故障描述：</b>
                            <div className="pl80">
                                <p>{this.state.data.exceptionDescription}</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>处理结果：</b>
                            <div className="pl80">
                                <p>{this.state.data.treatmentResult}</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <b>现场图片：</b>
                            {this.state.data.scenePictures}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default App
