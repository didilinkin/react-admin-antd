import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Layout, Button, Table, Input } from 'antd'
import DropOption from '../../components/Layout/DropOption.js'
import OperationBar from '../../components/Layout/OperationBar.js'

const { Content } = Layout


const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i,
    category: '小雨伞',
    cover: '',
    total: 25362,
    stock: 241,
    created_time: '2017-03-17'
  })
}


@inject('appStore') @withRouter @observer
class Umbrella extends Component {

  onMenuClick(id) {
    this.props.history.push('/umbrellasEdit')
  }

  render() {

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '分类',
        dataIndex: 'category',
      },
      {
        title: '封面',
        dataIndex: 'cover',
        render: () => <img src="https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3533500605,3869125115&fm=85&s=CF82EC000FB546920E11255D030080E2" alt="" />
      },
      {
        title: '总数',
        dataIndex: 'total',
      },
      {
        title: '库存',
        dataIndex: 'stock',
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
              onMenuClick={e => { this.onMenuClick(record.id) }}
              menuOptions={[{ key: '1', name: '编辑' }]}
            />
          )
        }
      }
    ]

    return (
      <Layout>
        <OperationBar>
          <label>名称：</label>
          <Input placeholder="请输入名称" style={{ width: 200 }} />
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="plus">添加</Button>
          <Button type="primary" icon="reload">刷新</Button>
          <Button type="primary" icon="arrow-down">导入</Button>
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

export default Umbrella