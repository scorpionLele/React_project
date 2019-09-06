import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from 'antd';

import memoryUtils from "../../Utils/memoryUtils";
import menuList from "../../menu-config/menu-config";
import "./leftnav.less";
import logo from "../../assets/images/logo.png";
const { SubMenu,Item } = Menu;


class Leftnav extends Component {
  hasAuth = (item) => {
    const user = memoryUtils.user
    const menus = user.role.menus
    if (user.username === 'admin' || item.isPublic || menus.indexOf(item.key) !== -1){
      return true
    }else if(item.children){
     return item.children.some(cItem => menus.indexOf(cItem.key) !== -1)
    }
    return false
  }

  getMenuNode = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (this.hasAuth(item)){
        if (item.children) {
          if (item.children.some(item => path.indexOf(item.key) === 0)) {
            this.openKeys = item.key
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.type} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNode(item.children)}
            </SubMenu>
          )
        } else {
          return (
            <Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.type} />
                <span>{item.title}</span>
              </Link>
            </Item>
          )
        }
      }
    })
  }

  componentWillMount(){
    this.menuNode = this.getMenuNode(menuList)
  }
  render() {
    const menuNode = this.menuNode
    let selectedKeys = this.props.location.pathname
    if (selectedKeys.indexOf('/product/') === 0){
      selectedKeys = '/product'
    }
    const openKeys = this.openKeys
    return (
      <div className='left-nav'>
        <Link className='left-nav-header' to='/home'>
          <img src={logo} alt="logo"/>
          <h1>后台系统</h1>
        </Link>
        <Menu
          selectedKeys={[selectedKeys]}
          defaultOpenKeys={[openKeys]}
          mode="inline"
          theme="dark"
        >
          {menuNode}
        </Menu>
      </div>
    )
  }
}

export default withRouter(Leftnav)