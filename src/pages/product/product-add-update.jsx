import React, { Component } from 'react'
import { Card, Form, Icon, Input, Select, Button, message } from "antd";

import RichTextEditor from "./rich-text-editor";
import PicturesWall from "./pictures-wall";
import { reqCategorys, reqAddOrUpdateProduct } from "../../api";
import LinkButton from "../../components/link-button";

const {Item} = Form
const { Option } = Select
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 }
};
class ProductAddUpdate extends Component {
    state = {
      categorys: []
    }
    pwRef = React.createRef()
    edictRef = React.createRef()

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (error,values)=>{
      if(!error){
        const {name,desc,price,categoryId } = values
        const imgs = this.pwRef.current.getImgs()
        const detail = this.edictRef.current.getDetail()
        const product = {
          name,
          desc,
          price,
          categoryId,
          detail,
          imgs
        }
        if (this.props.location.state._id){
          product._id = this.props.location.state._id
        }
        const result = await reqAddOrUpdateProduct(product)
        if (result.status === 0){
          message.success('操作商品成功')
          this.props.history.replace('/product')
        }else{
          message.error('操作商品失败')
        }
      }else{
        message.error('提交失败')
      }
    })
  }
  getCategorys = async () => {
    const result = await reqCategorys()
    if (result.status === 0) {
      const categorys = result.data
      this.setState({
        categorys
      })
    }
  }
  validatPrice = (rule,value,callback) => {
    if (value < 0){
      callback('商品价格不能少于0')
    }else{
      callback()
    }
  }
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const { categorys} = this.state
    const product = this.props.location.state || {}
    const { getFieldDecorator } = this.props.form
    const title = (
      <>
        <LinkButton
          onClick={() => { this.props.history.goBack() }}
        >
          <Icon type='arrow-left' />
        </LinkButton>
        <span>{product._id?'修改':'添加'}商品</span>
      </>
    )
    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label='商品名称'>
            {
              getFieldDecorator('name',{
                initialValue: product.name,
                rules:[
                  {required: true,whitespace:true,message: '必须输入商品名称'}
                ]
              })(
                <Input placeholder='请输入商品名称'/>
              )
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, whitespace: true,message: '必须输入商品描述' }
                ]
              })(
                <Input placeholder='请输入商品描述' />
              )
            }
          </Item>
          <Item label='商品价格'>
            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules:[
                  { required: true, whitespace: true, message: '必须输入商品价格' },
                  { validator: this.validatPrice}
                ]
                
              })(
                <Input type='number' placeholder='请输入商品价格' addonAfter="元"/>
              )
            }
          </Item>
          <Item label='商品分类'>
            {
              getFieldDecorator('categoryId', {
                initialValue: product.categoryId||'',
                rules: [
                  { required: true, whitespace: true,message: '必须输入商品分类' }
                ]
              })(
                <Select>
                  <Option value=''>未选择</Option>
                  {
                    categorys.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>
          <Item label='商品图片' wrapperCol={{ span: 20 }}>
            <PicturesWall imgs={product.imgs} ref={this.pwRef}></PicturesWall>
          </Item>
          <Item label='商品详情' wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.edictRef} detail={product.detail}/>
          </Item>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(ProductAddUpdate)