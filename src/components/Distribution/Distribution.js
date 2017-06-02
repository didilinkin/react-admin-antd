import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Button, Table, Input, Tag, Select } from 'antd'
import DropOption from '../../components/Layout/DropOption.js'
import OperationBar from '../../components/Layout/OperationBar.js'

const { Content } = Layout
const Option = Select.Option

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '网点名称',
    dataIndex: 'name',
  },
  {
    title: '数量',
    dataIndex: 'total',
  },
  {
    title: '分配人',
    dataIndex: 'people',
  },
  {
    title: '入库状态',
    dataIndex: 'state',
    render: (text, record) => (
      <Tag color={`${record.disabled ? '#f50' : '#87d068'}`}>{record.disabled ? '已入库' : '未入库'}</Tag>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  },
  {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      return (
        <DropOption
          onMenuClick={e => { console.log(text, record) }}
          menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]}
        />
      )
    }
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i,
    name: '科兴微银行',
    total: 534,
    people: '老王',
    state: false,
    created_time: '2017-03-17'
  })
}


@inject('appStore') @observer
class Distribution extends Component {
  render() {
    return (
      <Layout>
        <OperationBar>
          <Button type="primary" icon="check">确认入库</Button>
          <label>网点：</label>
          <Select defaultValue="0" style={{ width: 200 }}>
            <Option value="0">请选择网点</Option>
            <Option value="1">罗湖建设银行大厦</Option>
            <Option value="2">荣超商务中心</Option>
          </Select>
          <label>状态：</label>
          <Select defaultValue="0" style={{ width: 120 }}>
            <Option value="0">请选择状态</Option>
            <Option value="1">已禁用</Option>
            <Option value="2">未禁用</Option>
          </Select>
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="plus">添加</Button>
          <Button type="primary" icon="reload">刷新</Button>
        </OperationBar>
        <Content>
          <Table
            columns={columns}
            dataSource={data}
            bordered
          />
        </Content>
      </Layout>
    )
  }
}

export default Distribution