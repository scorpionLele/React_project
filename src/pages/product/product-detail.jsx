import React, { Component } from 'react'
import { Card,List,Icon } from "antd";

import { BASE_IMG_PATH } from "../../Utils/constants";
import { reqProductDetail, reqCategoryById } from "../../api";
import "./product.less";
import LinkButton from "../../components/link-button";
import memoryUtils from "../../Utils/memoryUtils";

const { Item } = List

export default class productDetail extends Component {
  state = {
    product: memoryUtils.product,
    categoryName:''
  }

  getCategory = async (categoryId) => {
    const result = await reqCategoryById(categoryId)
    if(result.status === 0){
      const categoryName = result.data.name
      this.setState({
        categoryName
      })
    }
  }
  async componentDidMount(){
    if(!this.state.product._id){
      const productId = this.props.match.params.id
      const result = await reqProductDetail(productId)
      if (result.status === 0) {
        const product = result.data
        this.setState({
          product
        })
        this.getCategory(product.categoryId)
      }
    }else{
      this.getCategory(this.state.product.categoryId)
    }
  }
  render() {
    const { product, categoryName } = this.state
    const title = (
      <>
        <LinkButton
          onClick={()=>{this.props.history.goBack()}}
        >
          <Icon type='arrow-left'/>
        </LinkButton>
        <span>商品详情</span>
      </>
    )
    return (
      <Card title={title} className='detail'>
        <List>
          <Item>
            <span className='detail-left'>商品名称：</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品描述：</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品价格：</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className='detail-left'>商品分类：</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品图片：</span>
            <span>
              {
                product.imgs && product.imgs.map(item => (
                  <img key={item} className='productImg' src={BASE_IMG_PATH + item} alt="img" />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className='detail-left'>商品详情：</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
          </Item>
        </List>
      </Card>
    )
  }
}
