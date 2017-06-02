import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Icon, Button, Table, DatePicker, Input } from 'antd'
import OperationBar from '../../components/Layout/OperationBar.js'

const { Content } = Layout

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'openId',
    dataIndex: 'openId',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '积分',
    dataIndex: 'integral',
  },
  {
    title: '创建时间',
    dataIndex: 'created_time'
  }
]

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i,
    openId: 'xxxx' + i,
    nickname: `老王${i}`,
    integral: i + 10,
    created_time: '2017-03-17'
  })
}

@inject('appStore') @observer
class User extends Component {
  render() {
    return (
      <Layout>
        <OperationBar>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
          />
          <label>~</label>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            onChange={(e, dataString) => { console.log(dataString) }}
          />
          <label>昵称：</label>
          <Input placeholder="请输入昵称" style={{ width: 200 }} />
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="rollback">重置</Button>
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

export default User