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
    title: '网点编号',
    dataIndex: 'number'
  },
  {
    title: '所属分行',
    dataIndex: 'bank',
  },
  {
    title: '行政区',
    dataIndex: 'district',
  },
  {
    title: '雨伞数量',
    dataIndex: 'total',
  },
  {
    title: '上架数量',
    dataIndex: 'shelves',
  },
  {
    title: '是否禁用',
    dataIndex: 'disabled',
    render: (text, record) => (
      <Tag color={`${record.disabled ? '#f50' : '#87d068'}`}>{record.disabled ? '已禁用' : '未禁用'}</Tag>
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
    number: 20002,
    bank: 20002,
    district: '福田区',
    total: 534,
    shelves: 423,
    disabled: false,
    created_time: '2017-03-17'
  })
}


@inject('appStore') @observer
class Network extends Component {
  render() {
    return (
      <Layout>
        <OperationBar>
          <label>网点名称：</label>
          <Input placeholder="请输入名称" style={{ width: 200 }} />
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

export default Network