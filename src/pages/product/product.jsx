import React, { Component } from 'react'
import { Switch,Route,Redirect } from "react-router-dom";

import productHome from "./product-home";
import productDetail from "./product-detail";
import ProductAddUpdate from "./product-add-update";
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={productHome} exact></Route>
        <Route path='/product/detail/:id' component={productDetail}></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Redirect to='/product'></Redirect>
      </Switch>
    )
  }
}
