import { Layout, Menu, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { breadConfig } from '../../utils'
import styles from './SiderMenu.less'


const SubMenu = Menu.SubMenu
const { Sider } = Layout


@inject('appStore') @withRouter @observer
class SiderMenu extends Component {


  onSiderClick(e) {
    const { location, history } = this.props
    if (location.pathname === e.key) return
    history.push(e.key)
  }

  render() {

    const { appStore, location } = this.props

    let defaultSelectedKeys = ''
    switch (true) {
      case['/', '/users'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/users'
        break
      case['/umbrellas', '/umbrellasEdit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/umbrellas'
        break
      case['/networks', '/networksEdit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/networks'
        break
      case['/distribution', '/distributionEdit'].indexOf(location.pathname) !== -1:
        defaultSelectedKeys = '/distribution'
        break
    }

    return (
      <Sider
        collapsible
        collapsed={appStore.collapsed}
        onCollapse={appStore.onCollapse}
      >
        <div className={styles.logo} style={{ visibility: appStore.collapsed ? 'hidden' : 'visible' }}>雨伞分享管理</div>
        <Menu
          theme="dark"
          mode={appStore.siderMode}
          defaultSelectedKeys={[defaultSelectedKeys]}
          selectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={['数据管理']}
          onClick={this.onSiderClick.bind(this)}
        >
          <SubMenu
            key="数据管理"
            title={<span><Icon type="user" /><span className="nav-text">数据管理</span></span>}
          >
            <Menu.Item key="/users">用户管理</Menu.Item>
            <Menu.Item key="/umbrellas">雨伞管理</Menu.Item>
            <Menu.Item key="/networks">网点管理</Menu.Item>
            <Menu.Item key="/distribution">分配管理</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default SiderMenu