import React, { Component } from 'react'
import { Card, Button, Select, Table, Input, Icon,message } from "antd";

import memoryUtils from "../../Utils/memoryUtils";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import LinkButton from "../../components/link-button";
const { Option } = Select
export default class productHome extends Component {
  state = {
    products: [],
    total:0,
    searchType:'productName',
    searchName:''
  }
  getProducts = async (pageNum) => {
    this.current = pageNum
    let result;
    const { searchType, searchName } = this.state
    if (this.search && searchName){
      result = await reqSearchProducts({ pageNum, pageSize: 2, searchType, searchName })
    }else{
      result = await reqProducts(pageNum, 2)
    }
    if (result.status === 0){
      const { list, total } = result.data
      this.setState({
        total,
        products: list
      })
    }
  }
  updateStatus = async (productId, status) =>{
    const result = await reqUpdateStatus(productId, status)
    if(result.status === 0){
      message.success('商品状态更新成功')
      this.getProducts(this.current)
    }else{
      message.error('商品状态更新失败')
    }
  }
  
  componentDidMount(){
    this.getProducts(1)
  }
  componentWillMount(){
    this.columns = [
      {
        title:'商品分类',
        dataIndex:'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title:'价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        width:100,
        render: ({_id,status}) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2){
            btnText = '上架'
            text = '已下架'
          }
          return (
            <>
              <Button type='primary' onClick={() => this.updateStatus(_id, status === 1?2:1)}>{btnText}</Button>
              <br/>
              <LinkButton>{text}</LinkButton> 
            </>
          )
        }
      },
      {
        title: '操作',
        render: (product) => {
          return (
            <>
              <LinkButton 
                onClick={()=>{
                  memoryUtils.product = product
                  this.props.history.push(`/product/detail/${product._id}`)
                }}
              >
                详情
              </LinkButton>
              <br />
              <LinkButton 
                onClick={() => { 
                  this.props.history.push('/product/addupdate', product)
                }}
              >
                修改
              </LinkButton>
            </>
          )
        }
      },
    ]
  }
  render() {
    const { products,total } = this.state
    const title = (
      <>
        <Select 
          value='productName' 
          style={{width:200}}
          onChange={
            (value) => {
              this.setState({ 
                searchType: value 
              })
            }
          }
        >
          <Option key='1' value='productName'>按名称搜索</Option>
          <Option key='2' value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='请输入关键字'
          style={{ width: 300 , margin:'0 15px'}}
          onChange={(event)=>{this.setState({searchName:event.target.value})}}
        />
        <Button 
          type='primary' 
          onClick={
            ()=>{
              this.search = true
              this.getProducts(1)
            }
          }
        >
          搜索
        </Button>
      </>
    )
    const extra = (
      <Button type='primary' onClick={() => { this.props.history.push('/product/addupdate')}}>
        <Icon type='plus'></Icon>
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={products}
          columns={this.columns}
          rowKey='_id'
          bordered={true}
          pagination={
            { pageSize: 2, 
              total,
              showQuickJumper:true,
              current: this.current,
              onChange: this.getProducts
            }
          }
        >
        </Table>
      </Card>
    )
  }
}
