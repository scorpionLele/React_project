import React, { Component } from 'react'
import { Card,Table,Button,Modal,message } from "antd";

import UserForm from "./user-form";
import { formatDate } from "../../Utils/dateUtils";
import { reqUsers, reqAddOrUpdateUser, reqDeleteUsers } from "../../api";
import LinkButton from "../../components/link-button";
export default class User extends Component {
  state = {
    isShowModal:false,
    users: [],
    roles:[]
  }
  initRoleNames = (roles) => {
    this.roleNames = roles.reduce((pre,role)=>{
      pre[role._id] = role
      return pre
    },{})
  }
  getUsers = async() => {
    const result = await reqUsers()
    if(result.status === 0){
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }
  AddOrUpdateUser = async () => {
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    if (this.user) {
      user._id = this.user._id
    }
    this.setState({
      isShowModal: false
    })

    const result = await reqAddOrUpdateUser(user)
    if (result.status === 0) {
      message.success('添加更新用户成功')
      this.getUsers()
    }

  }
  
  deleteUser = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUsers(user._id)
        if (result.status === 0){
          message.success('删除用户成功')
          this.getUsers()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  showModal = (user) => {
    this.user = user
    this.setState({
      isShowModal: true
    })
  }
  componentDidMount(){
    this.getUsers()
  }
  componentWillMount(){
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: role_id => this.roleNames[role_id].name
      },
      {
        title: '操作',
        render: (user) =>(
          <>
            <LinkButton onClick={() => this.showModal(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </>
        ) 
      }
    ]
  }
  render() {
    const { users,roles, isShowModal} = this.state
    const title = (
      <Button type='primary' onClick={this.showModal}>创建角色</Button>
    )
    return (
      <Card title={title}>
        <Table
          columns={this.columns}
          dataSource={users}
          bordered={true}
          rowKey={'_id'}
          pagination={{ pageSize: 2, showQuickJumper: true }}
        >
        </Table>
        <Modal
          title="创建用户"
          visible={isShowModal}
          onOk={this.AddOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({
              isShowModal: false,
            });
          }}
        >
          <UserForm setForm={(form) => this.form = form} user={this.user} roles={roles}></UserForm>
        </Modal>
      </Card>
    )
  }
}
