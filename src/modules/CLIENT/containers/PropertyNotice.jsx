// 物业公告
import React, {Component} from 'react'
import {Table, Button, Spin, Input, Icon, notification, Popconfirm} from 'antd'
import { apiPost } from '../../../api'
import AddNotice from '../components/Complaint/NoticeAdd'
import ComplaintContent from './details/complaint/ComplaintDetail'
import HandleVisit from './details/complaint/ReturnAdd'
import VisitDetail from './details/complaint/ReturnDetail'

// const FormItem = Form.Item
// 引入组件
// React component
class PropertyNotice extends Component {
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
            rows: 15,
            sort: 'a.id',
            order: 'desc',
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
    handleAcception = (id) => {
        this.setState({
            visible: true,
            id: id
        })
    }
    handleDelete = async (id) => {
        await apiPost(
            '/complaint/deleteNotice',
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
            title: '添加公告',
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/complaint/noticeList',
            {page: this.state.page,
                order: this.state.order,
                sort: this.state.sort}
        )
        const handleUpdate = this.handleUpdate
        const handleDelete = this.handleDelete
        const handleAcception = this.handleAcception
        const handleVisit = this.handleVisit
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
                title: '标题',
                width: 250,
                dataIndex: 'title'
            }, {
                title: '状态',
                width: 150,
                dataIndex: 'status',
                render: function (text, record, index) {
                    let status = ''
                    if (record.status === 0) {
                        status = '未发布'
                    } else if (record.status === 1) {
                        status = '已发布'
                    }
                    return (
                        <span>{status}</span>
                    )
                }
            }, {
                title: '发布时间',
                width: 250,
                dataIndex: 'createDate'
            }, {
                title: '发布人',
                width: 250,
                dataIndex: 'createName'
            }, {
                title: '操作',
                width: 200,
                dataIndex: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.status === 1) {
                        return (
                            <div>
                                <a onClick={() => handleUpdate(record.id)} > 详情 &nbsp;&nbsp;</a>
                                <a onClick={() => handleAcception(record.id)} > 删除 &nbsp;&nbsp;</a>
                            </div>
                        )
                    } else if (record.status === 0) {
                        return (
                            <div>
                                <a onClick={() => handleUpdate(record.id)} > 详情 &nbsp;&nbsp;</a>
                                <a onClick={() => handleVisit(record.id)} > 编辑 &nbsp;&nbsp;</a>
                                <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
                                    <a> 删除 </a>
                                </Popconfirm>
                            </div>
                        )
                    }
                }
            }],
            dataSource: result.data.rows
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    json = {}
    refresh = async (pagination, filters, sorter) => {
        if (typeof (filters) === 'undefined') {
            filters = []
        }
        if (pagination === null) {
            this.json = filters
        }
        for (let p in this.json) {
            filters[p] = this.json[p]
        }
        filters['title'] = this.title
        filters['sort'] = this.state.sort
        filters['order'] = this.state.order
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
            '/complaint/noticeList',
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
    title = ''
    entryNameOnChange = (e) => {
        this.title = e.target.value
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
        // const { getFieldDecorator } = this.props.form
        return (
            <div>
                {/* <Modal maskClosable={false}
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
                </Modal>*/}
                <AddNotice
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
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;标题&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <Button type="primary" style={{margin: '0 10px'}} onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.add}>添加公告</Button>
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
                        scroll={{ x: 1200 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyNotice


