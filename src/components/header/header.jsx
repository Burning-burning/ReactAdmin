import React, { Component, memo } from 'react'
import './header.less'
import logo from '../../assets/images/logo.png'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import storageUtils from '../../utils/storageUtils'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button'
import {formateDate} from '../../utils/dateUtils'
import {logout} from '../../redux/actions'
import {reqWhether} from '../../api/index'

const { confirm } = Modal;

class Header extends Component {
  state={
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather:'',
  }
  getTitle=()=>{
    //得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item=>{
      if(item.key===path){

        title= item.title
      }else if(item.children){
        const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title

  }
  logout=()=>{
    confirm({

      icon: <ExclamationCircleOutlined />,
      content: '确认退出吗',
      onOk: ()=> {
        this.props.logout()
        

      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  getTime=()=>{
    this.intervalId = setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({
        currentTime
      })
    },1000)
  }
  getWeather=async()=>{

    const {dayPictureUrl,weather} = await reqWhether('北京')
 
    console.log("day",dayPictureUrl,weather)
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  componentDidMount(){
    this.getTime()
    this.getWeather()
  }
  //在当前组件卸载之前调用
  //清楚定时器
  componentWillUnmount(){

    clearInterval(this.intervalId)
  }
  render() {
    const {currentTime,dayPictureUrl,weather} = this.state
    return (
      <div className="header">
        <div className="header-top">
       <span>欢迎，{this.props.user.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          {/* <div className="header-bottom-left">{this.getTitle()}</div> */}
          <div className="header-bottom-left">{this.props.headTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="whether"></img>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(
  state=>({headTitle: state.headTitle,user: state.user}),
  {logout}
)(withRouter(Header))