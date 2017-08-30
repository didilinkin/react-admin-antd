// 客户列表
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, DatePicker, Modal, Form, Row, Col} from 'antd'
import { apiPost } from '../../../api'
import AddComplaint from '../components/Complaint/ComplaintAdd'
import ComplaintContent from './details/complaint/ComplaintDetail'
import HandleVisit from './details/complaint/ReturnAdd'
import VisitDetail from './details/complaint/ReturnDetail'
const { RangePicker } = DatePicker
const FormItem = Form.Item
// 引入组件
// React component
class complaint extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            openVisit: false,
            openVisitDetail: false,
            columns: [],
            dataSource: [],
            title: '',
            visible: false,
            id: null,
            RowKeys: [],
            total: 0,
            page: 1,
            rows: 30,
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            openVisit: false,
            openVisitDetail: false,
            title: '修改报单',
            id: id
        })
    }
    complaintDetail = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: true,
            openUpdate: false,
            openVisitDetail: false,
            openVisit: false,
            title: '报单明细',
            id: id
        })
    }
    handleVisit = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            openVisitDetail: false,
            openVisit: true,
            title: '回访登记',
            id: id
        })
    }
    visitDetail = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            openVisitDetail: true,
            openVisit: false,
            title: '回访明细',
            id: id
        })
    }
    handleAcception = (id) => {
        this.setState({
            visible: true,
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/complaint/complaintList',
            {id: id,
                delFlag: 1}
        )
        notification.open({
            message: '删除成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh()
    }
    add = () => {
        this.setState({
            openAdd: true,
            openTableAddUp: false,
            openUpdate: false,
            title: '添加报单',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/complaint/complaintList',
            {page: this.state.page}
        )
        const handleUpdate = this.handleUpdate
        const handleAcception = this.handleAcception
        const handleVisit = this.handleVisit
        const complaintDetail = this.complaintDetail
        const visitDetail = this.visitDetail
        this.setState({loading: false,
            total: result.data.total,
            columns: [{
                title: '序号',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '报单日期',
                width: 250,
                dataIndex: 'createDate'
            }, {
                title: '公司名称',
                width: 250,
                dataIndex: 'customerName'
            }, {
                title: '投诉内容',
                width: 250,
                dataIndex: 'complaintContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    return (
                        <a onClick={() => complaintDetail(record.id)}>{text}</a>
                    )
                }

            }, {
                title: '状态',
                width: 150,
                dataIndex: 'status',
                render: function (text, record, index) {
                    let status = ''
                    if (record.status === 0) {
                        status = '受理中'
                    } else if (record.status === 1) {
                        status = '受理完毕'
                    }
                    return (
                        <span>{status}</span>
                    )
                }
            }, {
                title: '回访情况',
                width: 250,
                dataIndex: 'visitContent',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    return (
                        <a onClick={() => visitDetail(record.id)}>{text}</a>
                    )
                }
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.status === 0) {
                        return (
                            <div>
                                <a onClick={() => handleUpdate(record.id)} > 修改 &nbsp;&nbsp;</a>
                                <a onClick={() => handleAcception(record.id)} > 受理 &nbsp;&nbsp;</a>
                            </div>
                        )
                    } else if (record.status === 1 && record.visitStatus !== 1) {
                        return (
                            <div>
                                <a onClick={() => handleVisit(record.id)} > 回访登记 &nbsp;&nbsp;</a>
                            </div>
                        )
                    } else if (record.visitStatus === 1) {
                        return ''
                    }
                }
            }],
            dataSource: result.data.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        filters['customerName'] = this.clientName
        filters['startDate'] = this.startDate
        filters['endDate'] = this.endDate
        if (pagination !== null && typeof (pagination) !== 'undefined') {
            filters['rows'] = pagination.pageSize
            filters['page'] = pagination.current
            this.setState({
                page: pagination.current
            })
        } else {
            this.setState({
                page: 1
            })
        }
        // 刷新表格
        let result = await apiPost(
            '/complaint/complaintList',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            openVisit: false,
            openVisitDetail: false,
            dataSource: result.data.rows,
            total: result.data.total,
            id: 0
        })
    }
    clientName = null
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    startDate = null
    endDate = null
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        if (dateString[1] > 0) {
            this.endDate = dateString[1] + ' 23:59:59'
        } else {
            this.endDate = dateString[1]
        }
    }
    close = async () => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            openVisit: false,
            openVisitDetail: false
        })
    }
    query = () => {
        this.refresh()
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    handleCancel = (e) => {
        this.setState({ visible: false})
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        json['id'] = this.state.id
        json['status'] = 1
        await apiPost(
            '/complaint/updateComplaint',
            json
        )
        notification.open({
            message: '操作成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.setState({visible: false,
            isFirst: true })
        this.refresh()
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Modal maskClosable={false}
                    title="受理投诉"
                    style={{top: 100}}
                    width={400}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal">
                        <Row>
                            <Col span={20}>
                                <FormItem label="受理结果" labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('handleContent')(
                                        <Input type="textarea" placeholder="请输入受理结果" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <AddComplaint
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                    close={this.close}
                    title={this.state.title}
                />
                <ComplaintContent
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openTableAddUp}
                    close={this.close}
                    title={this.state.title}
                />
                <HandleVisit
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openVisit}
                    close={this.close}
                    title={this.state.title}
                />
                <VisitDetail
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openVisitDetail}
                    close={this.close}
                    title={this.state.title}
                />
                <span style={{paddingBottom: '10px',
                    paddingTop: '10px',
                    display: 'block'}}
                >
                    <span>报修日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;公司名称&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" style={{margin: '0 10px'}} onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加报单</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        onChange={this.refresh}
                        rowSelection={{
                            onChange: this.onSelectChange
                        }}
                        pagination={{total: this.state.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['15', '30', '45'],
                            current: this.state.page,
                            defaultPageSize: this.state.rows}}
                        scroll={{ x: 1500 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
let Complaint = Form.create()(complaint)
export default Complaint


