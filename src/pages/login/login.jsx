import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button,message } from 'antd';

import { saveUser } from "../../Untils/storageUntils";
import memoryUntils from "../../Untils/memoryUntils";
import {reqLogin} from "../../api";
import "./login.less";
import logo from "./images/logo.png";
class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const form = this.props.form
    form.validateFields(async (err,{username,password})=>{
      if(!err){
        const result = await reqLogin(username, password)
        if(result.status === 0){
          const user = result.data
          saveUser(user)
          memoryUntils.user = user
          this.props.history.replace('/')
        }else{
          message.error(result.msg)
        }
      }else{
        console.log('前台表单校验失败')
      }
    })
  };
  validatePwd = (rule,value,callback) => {
    value = value.trim();
    if(!value){
      callback('请输入密码')
    }else if(value.length < 4){
      callback('密码不能小于4位')
    } else if (value.length > 12){
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9]+$/.test(value)){
      callback('密码只能包含英文、数字或下划线')
    }else{
      callback()
    }
  }
  render() {
    const user = memoryUntils.user
    if (user._id) {
      return <Redirect to='/'></Redirect>
    }
    const { getFieldDecorator} = this.props.form
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username',{
                  rules:[
                    { required: true, message: '请输入用户名'},
                    {min: 4,message:'用户名不能小于4位'},
                    {max: 12,message:'用户名不能大于12位'},
                    {pattern: /^[a-zA-Z0-9]+$/,message:'用户名必须是英文,数字或_'}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)'}} />}
                    placeholder="用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  initailValue : '',
                  rules:[
                    {validator:this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedLogin = Form.create()(Login)
export default WrappedLogin