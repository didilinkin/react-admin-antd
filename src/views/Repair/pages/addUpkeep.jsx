import {Modal, Input, Form} from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
const FormItem = Form.Item

const addUpkeep = ({ visible }) => {
    debugger
    return (
        <Modal
            title="增加收费项"
            style={{ top: 20,
                width: 350}}
            visible={visible}
        >
            <Form>
                <FormItem label="物品名称" labelCol={{ span: 8 }}
                          wrapperCol={{ span: 8 }}
                >
                    <Input ref="myTextInput" placeholder="Username" />
                </FormItem>
                <FormItem label="单位" labelCol={{ span: 8 }}
                          wrapperCol={{ span: 8 }}
                >
                    <input type="text" ref="myTextInput2" />
                </FormItem>
                <FormItem label="进货价格" labelCol={{ span: 8 }}
                          wrapperCol={{ span: 8 }}
                >
                    <Input placeholder="Username" />
                </FormItem>
                <FormItem label="服务费" labelCol={{ span: 8 }}
                          wrapperCol={{ span: 8 }}
                >
                    <Input placeholder="Username" />
                </FormItem>
                <FormItem label="收费金额" labelCol={{ span: 8 }}
                          wrapperCol={{ span: 8 }}
                >
                    <Input placeholder="Username" />
                </FormItem>
            </Form>
        </Modal>
    )
}

addUpkeep.propTypes = {
    visible: PropTypes.bool.isRequired
}
export default addUpkeep
