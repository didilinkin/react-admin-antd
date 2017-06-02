import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Tabs } from 'antd'
import SiderMenu from './SiderMenu'
import Network from '../Network/Network'
import NetworkEdit from '../Network/NetworkEdit'
import Distribution from '../Distribution/Distribution'
import DistributionEdit from '../Distribution/DistributionEdit'
import Umbrella from '../Umbrella/Umbrella'
import UmbrellaEdit from '../Umbrella/UmbrellaEdit'
import User from '../User/User'
import { getBreadInfo } from '../../utils'
import styles from './Main.less'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane

@inject('appStore') @withRouter @observer
class Main extends Component {

  componentDidMount() {
    this.props.history.listen((location, type) => {
      const prePath = this.props.location.pathname
      const nextPath = location.pathname
      const { tabBarList, addTab, activeTabChanged } = this.props.appStore
      if (tabBarList.find((item, index) => item.pathname === nextPath) === undefined && (type === 'PUSH' || type === 'POP')) {
        if (prePath === '/' && nextPath === '/users') return
        addTab({ pathname: nextPath, active: true, title: getBreadInfo(nextPath).reverse()[0] })
      }
      if (tabBarList.find((item, index) => item.pathname === nextPath) !== undefined) {
        activeTabChanged(nextPath)
      }
    })
  }

  onTabChange(activeKey) {
    if (this.props.location.pathname === activeKey) return
    this.props.history.push(activeKey)
  }

  onTabEdit(removeKey) {
    const { removeTab, tabBarList } = this.props.appStore
    const activeTab = tabBarList.find((item, index) => item.active === true)
    if (tabBarList.length === 1) return
    removeTab(removeKey)
    if (removeKey === activeTab.pathname) {
      this.props.history.push(tabBarList[tabBarList.length - 1].pathname)
    }
  }

  render() {

    const { administratorInfo, logout, tabBarList } = this.props.appStore
    const activeTab = tabBarList.find((item, index) => item.active === true)

    return (
      <Layout className={styles.layoutHasSider}>
        <SiderMenu />
        <Layout>
          <Header className={styles.header}>
            <Menu mode="horizontal" onClick={logout}>
              <SubMenu
                key="1"
                title={administratorInfo.name}
              >
                <Menu.Item key="2">注销</Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Tabs hideAdd type="editable-card" activeKey={activeTab.pathname} onChange={this.onTabChange.bind(this)} onEdit={this.onTabEdit.bind(this)}>
            {
              tabBarList.map((item, index) => {
                return (
                  <TabPane tab={item.title} key={item.pathname} >
                    {activeTab.pathname===item.pathname?(<Content style={{ margin: '0 16px' }} className={styles.contentWrapper}>
                      <Breadcrumb style={{ margin: '12px 0' }}>
                        {getBreadInfo(this.props.location.pathname).map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                      </Breadcrumb>
                      <div className={styles.content}>
                        <Switch>
                          <Route exact path="/" component={User} />
                          <Route path="/users" component={User} />
                          <Route path="/umbrellas" component={Umbrella} />
                          <Route path="/umbrellasEdit" component={UmbrellaEdit} />
                          <Route path="/networks" component={Network} />
                          <Route path="/networksEdit" component={NetworkEdit} />
                          <Route path="/distribution" component={Distribution} />
                          <Route path="/distributionEdit" component={DistributionEdit} />
                          <Route render={() => <h1 className={styles.noMatch}>找不到此页面</h1>} />
                        </Switch>
                      </div>
                    </Content>):''}
                  </TabPane>
                )
              })
            }
          </Tabs>
        </Layout>
      </Layout>
    )
  }
}

export default Main
