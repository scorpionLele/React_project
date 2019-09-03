import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

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
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item=>{
      if (item.key === path) {
        title = item.title
      }else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key===path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  upDate = () => {
    setInterval(() => {
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
  render() {
    const title = this.getTitle()
    const { currentDate, dayPictureUrl, weather} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>Hello,admin</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-btm">
          <div className="header-btm-left">{title}</div>
          <div className="header-btm-right">
            <span>{currentDate}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)