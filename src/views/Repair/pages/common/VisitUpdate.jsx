import {Modal, Form, DatePicker} from 'antd'
import React from 'react'
import moment from 'moment'
const FormItem = Form.Item


class VisitUpdate extends React.Component {
    state = {
        visible: false,
        isFirst: true
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        this.setState({visible: false,
            isFirst: true })
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <Modal
                    title={this.props.title}
                    style={{top: 20}}
                    width="400"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="物品名称" labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            <DatePicker defaultValue={moment('2012-12-12')} onChange={this.getRepairDate} {...getFieldProps('repairDate')} />

                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

let VisitUpdateComponent = Form.create()(VisitUpdate)

export default VisitUpdateComponent
