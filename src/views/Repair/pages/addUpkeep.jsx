import {Modal, Input, Button, Form} from 'antd'
import React from 'react'
const FormItem = Form.Item


class addUpkeep extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    // 单击确定按钮提交表单
    handleSubmit = () => {
        console.log(this.props.form.getFieldsValue())
        this.setState({ visible: false })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({ visible: true })
    }
    handleCancel = (e) => {
        this.setState({ visible: false })
    }
    render () {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <Modal
                    title="增加收费项"
                    style={{ top: 20,
                        width: 350}}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <FormItem label="物品名称" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('a')} />
                        </FormItem>
                        <FormItem label="单位" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('b')} />
                        </FormItem>
                        <FormItem label="进货价格" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('c')} />
                        </FormItem>
                        <FormItem label="服务费" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('d')} />
                        </FormItem>
                        <FormItem label="收费金额" labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            <Input type="text" {...getFieldProps('e')} />
                        </FormItem>
                    </Form>
                </Modal>
                <Button type="primary" onClick={this.showModal}>增加收费项</Button>
            </div>
        )
    }
}

let Addupkeep = Form.create()(addUpkeep)

export default Addupkeep
