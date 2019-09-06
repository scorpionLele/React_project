import React, { Component } from 'react'
import { Card, Table, Button,Modal, message } from "antd"

import memoryUtils from "../../Utils/memoryUtils";
import { formatDate } from "../../Utils/dateUtils";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import LinkButton from "../../components/link-button";
import AddRoleForm from "./add-role-form";
import AuthRoleForm from "./auth-role-form";


export default class Role extends Component {
  state = {
    visible:0,
    roles:[]
  }
  authRef = React.createRef()
  getRoles = async () => {
    const result = await reqRoles()
    if(result.status === 0){
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  showAddModal = () => {
    this.setState({
      visible: 1,
    });
  };
  showAuthModal = (role) => {
    this.role = role
    this.setState({
      visible: 2,
    });
  }
  addRole = () => {
    this.form.validateFields(async (error,values)=>{
      if(!error){
        const { roleName } = values
        const result = await reqAddRole(roleName)
        if (result.status === 0){
          this.form.resetFields()
          message.success('创建角色成功')
          const role = result.data
          const {roles} = this.state
          this.setState({
            roles:[...roles,role]
          })
        }else{
          message.error('创建角色失败')
        }
      }else{
        message.error('表单验证失败')
      }
    })
    this.setState({
      visible: 0,
    });
  };
  updateRole = async() => {
    let role = this.role
    role.menus = this.authRef.current.getCheckedKeys()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    console.log(memoryUtils.user)
    const result = await reqUpdateRole(role)
    if(result.status === 0){
      message.success('角色权限设置成功')
      this.getRoles()
    }
    this.setState({
      visible: 0,
    });
  }
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      visible: 0,
    });
  };
  componentDidMount(){
    this.getRoles()
  }
  componentWillMount(){
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formatDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '授权操作',
        render: (role) => <LinkButton onClick={() => { this.showAuthModal(role)}}>设置权限</LinkButton>
      },
    ];
  }
  render() {
    const {visible,roles} = this.state
    const role = this.role || {}
    const title = (
      <Button type='primary' onClick={this.showAddModal}>创建角色</Button>
    )
    return (
      <Card title={title}>
        <Table
          columns={this.columns}
          dataSource={roles}
          bordered={true}
          rowKey={'_id'}
          pagination={{ pageSize: 2, showQuickJumper: true }}
        >

        </Table>
        <Modal
          title="创建角色"
          visible={visible === 1}
          onOk={this.addRole}
          onCancel={() => {
            this.form.resetFields()
            this.setState({
              visible: 0,
            });
          }}
        >
          <AddRoleForm setForm={(form)=>this.form = form}></AddRoleForm>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={visible === 2}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              visible: 0,
            });
          }}
        >
          <AuthRoleForm ref={this.authRef} role={role}></AuthRoleForm>
        </Modal>
      </Card>
    )
  }
}
