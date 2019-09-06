import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal,message } from 'antd'

import CategoryForm from "./category-form";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddCategory, requpdateCategory } from "../../api";

export default class Category extends Component {
  state = {
    showStatus:0,
    catgorys:[],
    loading:false
  }
  getCatgorys = async () => {
    this.setState({
      loading:true
    })
    const result = await reqCategorys()
    if (result.status === 0){
      const catgorys = result.data
      this.setState({
        catgorys,
        loading: false
      })
    }
  }
  showAdd = () => {
    this.setState({
      showStatus:1
    })
  }
  showUpdate = (catgory) => {
    this.catgory = catgory
    this.setState({
      showStatus: 2
    })
  }
  addCategory = () => {
    this.form.validateFields(async (error,values)=>{
      if(!error){
        this.form.resetFields()
        const result = await reqAddCategory(values.categoryName)
        if (result.status === 0){
          this.setState({
            showStatus: 0
          })
          message.success("添加分类成功")
          this.getCatgorys()
        }else{
          message.error(result.msg ||"添加分类失败")
        }
      }
    })
  }
  updateCategory = () => {
    this.form.validateFields(async (error,values)=>{
      if(!error){
        this.form.resetFields()
        //this.catgory._id在点击修改的时候showUpdate存起来的
        values.categoryId = this.catgory._id
        const result = await requpdateCategory(values)
        if (result.status === 0){
          this.setState({
            showStatus: 0
          })
          message.success("修改分类成功")
          this.getCatgorys()
        } else {
          message.error("修改分类失败")
        }
      }
    })
  }
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }
  componentDidMount(){
    this.getCatgorys()
  }
  componentWillMount(){
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        width:250,
        title: '操作',
        render: (catgory) => <LinkButton onClick={() => this.showUpdate(catgory)}>修改分类</LinkButton>
      }
    ]
  }
  render() {
    const catgory = this.catgory || {}
    const { showStatus, loading, catgorys} = this.state
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table
          columns={this.columns}
          dataSource={catgorys}
          rowKey={'_id'}
          loading={loading}
          bordered={true}
          pagination={{ pageSize: 2, showQuickJumper:true }}
        > 
        </Table>
        <Modal
          title="添加分类" 
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={(form) => this.form = form}></CategoryForm>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm catgoryName={catgory.name} setForm={(form)=>this.form = form}></CategoryForm>
        </Modal>
      </Card>
    )
  }
}
