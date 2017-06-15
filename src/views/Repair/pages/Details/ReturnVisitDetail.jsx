import React from 'react'
import { Timeline, Rate } from 'antd'
import '../../../../style/test.less'

class App extends React.Component {

    render() {
        return (
            <div className="box2">
                <Timeline>
                    <Timeline.Item color="green"><h2>提交报修单</h2>受理人： 录单人名称</Timeline.Item>
                    <Timeline.Item color="green"><h2>已派单</h2>维修人： 维修人名称1   维修人名称2</Timeline.Item>
                    <Timeline.Item color="red">
                        <h2>完工登记</h2>
                        <p>此处是完成情况说明内容此处是完成情况说明内容此处是完成情况说明内容此处是完成情况说明内容</p>
                        <table className="tb">
                            <tr className="hd">
                                <td>序号</td>
                                <td>材料名称</td>
                                <td>数量</td>
                                <td>收费小计</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <p>维修费： <span className="red">30</span> 元</p>
                        <p>维修人： 维修人名称1 协作人1，协作人2</p>
                        <ul>
                            <li><img src="" alt=""/><img src="" alt=""/><img src="" alt=""/></li>
                        </ul>
                    </Timeline.Item>
                    <Timeline.Item>
                        <h2>客户评价</h2>
                        <Rate disabled defaultValue={2} />
                        <p>此处是用户评价内容此处是用户评价内容此处是用户评价内容此处是用户评价内容此处是用户评价内容</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <h2>客服回访</h2>
                        <p>回访日期：2017-08-21</p>
                        <p>回访人： 巴拉巴拉</p>
                        <p>此处是回访情况此处是回访情况此处是回访情况此处是回访情况此处是回访情况此处是回访情况此处是回访情况此处是回访情况此处是回访情况此处是回访情况</p>
                    </Timeline.Item>
                </Timeline>

            </div>
        );
    }
}

export default App

