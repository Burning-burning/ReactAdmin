import React, { Component } from 'react'
import './header.less'
import logo from '../../assets/images/logo.png'
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <a href = "javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>2019-2-12-2</span>
            <img src={logo} alt="whether"></img>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
