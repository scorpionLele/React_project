import React, { Component } from 'react'
import { Form,Input } from "antd";
import PropTypes from "prop-types";

const {Item} = Form
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
class AddRoleForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName',{
              rules:[
                {required: true,whitespace:true, message: '必须输入角色名称'}
              ]
            })(
              <Input placeholder='请输入角色名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default Form.create()(AddRoleForm)