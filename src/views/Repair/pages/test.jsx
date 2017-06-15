import React from 'react'
import {DatePicker, message, Radio, Steps, Tabs} from 'antd'
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Step = Steps.Step
const TabPane = Tabs.TabPane

class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            date: '',
            value: 1,
            date1: 'block',
            date2: 'none',
            date3: 'none',
            date4: 'none'
        }
    }
    tab = (e) => {
        console.log(e)
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value)
        if (e.target.value === 1) {
            this.setState({
                date: '',
                value: 1,
                date1: 'block',
                date2: 'none',
                date3: 'none',
                date4: 'none'
            })
        } else if (e.target.value === 2) {
            this.setState({
                date: '',
                value: 2,
                date1: 'none',
                date2: 'block',
                date3: 'none',
                date4: 'none'
            })
        } else if (e.target.value === 3) {
            this.setState({
                date: '',
                value: 3,
                date1: 'none',
                date2: 'none',
                date3: 'block',
                date4: 'none'
            })
        } else if (e.target.value === 4) {
            this.setState({
                date: '',
                value: 4,
                date1: 'none',
                date2: 'none',
                date3: 'none',
                date4: 'block'
            })
        }
    }
    handleChange (date) {
        message.info('您选择的日期是: ' + date.toString())
        this.setState({ date })
    }
    render () {
        return (
            <div>
            <div style={{ width: 400}}>
                <DatePicker onChange={value => this.handleChange(value)} />
                <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>

            </div>
            <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1} checked="checked">A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
            </RadioGroup>

                <div style={{ display: this.state.date1}}>1</div>
                <div style={{ display: this.state.date2}}>2</div>
                <div style={{ display: this.state.date3}}>3</div>
                <div style={{ display: this.state.date4}}>4</div>

                <div>
                    <RadioGroup defaultValue="a" size="large">
                        <RadioButton value="a">Hangzhou</RadioButton>
                        <RadioButton value="b">Shanghai</RadioButton>
                        <RadioButton value="c">Beijing</RadioButton>
                        <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                </div>

                <Steps direction="vertical" current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps>

                <Tabs defaultActiveKey="1" onChange={this.tab}>
                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default App
