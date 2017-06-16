// 回访详情
import React from 'react'
import '../../../../style/test.less'

class App extends React.Component {

    render () {
        return (
            <div className="box3">
                <h2>维修项目</h2>
                <p>
                    <b>发起人：</b>此处是发起人姓名
                </p>
                <p>
                    <b>发起日期：</b>2017-12-17  10：58
                </p>
                <table className="tb">
                    <tr className="hd">
                        <td>序号</td>
                        <td>房屋性质</td>
                        <td>材料名称</td>
                        <td>数量</td>
                        <td>收费小计</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </table>
                <p>
                    <b>应收金额：</b> 100.00 元
                </p>
            </div>
        )
    }
}

export default App

