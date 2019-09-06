import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';

import LinkButton from "../link-button";
import { removeUser } from "../../Utils/storageUtils";
import memoryUtils from "../../Utils/memoryUtils";
import { reqWeather } from "../../api";
import { formatDate } from "../../Utils/dateUtils";
import menuList from "../../menu-config/menu-config";
import "./header.less";
class Header extends Component {
  state = {
    currentDate:formatDate(Date.now()),
    dayPictureUrl:'', 
    weather:''
  }
  logout = () => {
    Modal.confirm({
      title: '确定退出吗?',
      onOk: () => {
        removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item=>{
      if (item.key === path) {
        title = item.title
      }else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  upDate = () => {
    this.timer = setInterval(() => {
      this.setState({
        currentDate: formatDate(Date.now())
      })
    }, 1000);
  }
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('上海')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  componentDidMount(){
    this.upDate()
    this.getWeather()
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render() {
    const title = this.getTitle()
    const { currentDate, dayPictureUrl, weather} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>Hello,admin</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-btm">
          <div className="header-btm-left">{title}</div>
          <div className="header-btm-right">
            <span>{currentDate}</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)