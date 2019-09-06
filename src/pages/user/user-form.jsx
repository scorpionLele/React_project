import React, { Component } from 'react'
import { Form,Select,Input } from "antd";
import PropTypes from "prop-types";

const {Item} = Form
const { Option } = Select
class UserForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    roles: PropTypes.array,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    const user = this.props.user || {}
    const roles = this.props.roles || []
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    } 
    return (
      <Form {...formItemLayout}>
        <Item label='用户名'>
          {
            getFieldDecorator('username', {
              initialValue: user.username
            })(
              <Input type="text" placeholder="请输入用户名" />
            )
          }
        </Item>
        {
          !user._id?(
            <Item label='密码'>
              {
                getFieldDecorator('password', {
                  initialValue: ''
                })(
                  <Input type="password" placeholder="请输入密码" />
                )
              }
            </Item>
          ):null
        }
        <Item label='手机号'>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone
            })(
              <Input type="phone" placeholder="请输入手机号" />
            )
          }
        </Item>
        <Item label='邮箱'>
          {
            getFieldDecorator('email', {
              initialValue: user.email
            })(
              <Input type="email" placeholder="请输入邮箱" />
            )
          }
        </Item>
        <Item label='角色'>
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id
            })(
              <Select>
                {
                  roles.map(role=>(
                    <Option key={role._id} value={role._id}>{role.name}</Option>
                  ))
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default Form.create()(UserForm)