import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from 'antd';

import menuList from "../../menu-config/menu-config";
import "./leftnav.less";
import logo from "../../assets/images/logo.png";
const { SubMenu,Item } = Menu;


class Leftnav extends Component {
  getMenuNode = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (item.children) {
        if (item.children.some(item => item.key === path)) {
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
    })
  }

  render() {
    const menuNode = this.getMenuNode(menuList)
    const selectedKeys = this.props.location.pathname
    const openKeys = this.openKeys
    return (
      <div className='left-nav'>
        <Link className='left-nav-header'>
          <img src={logo} alt="logo"/>
          <h1>后台系统</h1>
        </Link>
        <Menu
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
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