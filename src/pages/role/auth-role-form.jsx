import React, { Component } from 'react'
import { Form,Input,Tree } from "antd";
import PropTypes from "prop-types";

import menuList from "../../menu-config/menu-config";
const {Item} = Form
const { TreeNode } = Tree;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
export default class AuthRoleForm extends Component {
  static propTypes = {
    role: PropTypes.object
  }
  constructor (props) {
    super(props)
    let role = this.props.role || {}
    this.state = {
      checkedKeys: role.menus || []
    }
  }
  getTreeNodes = (menuList) => {
    return menuList.map(item=> {
      return (
        !item.isPublic?(
          <TreeNode title={item.title} key={item.key}>
            {
              item.children ? this.getTreeNodes(item.children) : null
            }
          </TreeNode>
        ):null
      )
    })
  }
  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }
  getCheckedKeys = () => this.state.checkedKeys
  
  componentWillReceiveProps(nextProps){
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }
  render() {
    const roleName = this.props.role
    const {checkedKeys} = this.state
    return (
      <>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={roleName.name} disabled/>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="0-0">
            {
              this.getTreeNodes(menuList)
            }
          </TreeNode>
        </Tree>
      </>
    )
  }
}
