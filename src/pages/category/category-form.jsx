import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from "prop-types";
const Item = Form.Item
class CategoryForm extends Component {
  static propTypes = {
    catgoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    const {catgoryName} = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {getFieldDecorator('categoryName', {
            initialValue: catgoryName,
            rules: [{ required: true, whitespace: true,message: '必须输入分类名称' }]
          })(
            <Input
              placeholder="请输入分类名称"
            />
          )}
        </Item>
      </Form>
    )
  }
}
export default Form.create()(CategoryForm)
