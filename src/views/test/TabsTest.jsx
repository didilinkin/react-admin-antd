import React from 'react'
import { Tabs, Radio, Card } from 'antd'

const TabPane = Tabs.TabPane

class TabsTest extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            mode: '1'
        }
    }

    handleModeChange = (e) => {
        const mode = e.target.value
        console.log(mode)
        this.setState({ mode })
    }

    render () {
        const { mode } = this.state
        return (
            <div>
                <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                    <Radio.Button value="1">物业合同</Radio.Button>
                    <Radio.Button value="2">租赁合同</Radio.Button>
                    <Radio.Button value="3">首期费用</Radio.Button>
                </Radio.Group>
                <Tabs
                    defaultActiveKey="1"
                    activeKey={mode}
                >
                    <TabPane key="1">
                        <Card title="物业合同" style={{ width: 300 }}>
                            <p>物业合同内容</p>
                        </Card>
                    </TabPane>

                    <TabPane key="2">
                        <Card title="租赁合同" style={{ width: 300 }}>
                            <p>租赁合同内容</p>
                        </Card>
                    </TabPane>

                    <TabPane key="3">
                        <Card title="首期费用" style={{ width: 300 }}>
                            <p>首期费用内容</p>
                        </Card>
                    </TabPane>
                </Tabs>
                <style>{`
                    .ant-tabs-nav-container {
                        display: none;
                    }
                    .ant-tabs-bar {
                        border: none;
                    }
                `}</style>
            </div>
        )
    }
}

export default TabsTest
