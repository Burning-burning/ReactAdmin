import React, { Component } from 'react'
import './left-nav.less'
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Menu,Icon } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
/*
左侧导航的组件
*/
export default class LeftNav extends Component {
  //根据menu的数据数组生成对应的标签数组
  //使用map➕递归调用
  getMenuNodes_map=(menuList)=>{

    return menuList.map(item=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
            <Link to={item.key} style={{color:'white'}}>
            {item.title}
            </Link>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  //根据menu的数据数组生成对应的标签数组
  //使用reduce➕递归调用
  getMenuNodes=(menuList)=>{
    return menuList.reduce((pre, item) => {
      if(!item.children){
        pre.push((
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
          <Link to={item.key} style={{color:'white'}}>
          {item.title}
          </Link>
        </Menu.Item>
        ))
      }else{
        pre.push((
          <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
          {this.getMenuNodes(item.children)}
        </SubMenu>
        ))

      }
      return pre
    },[])
  }
  render() {
    //得到当前请求的路由路径
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" ></img>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['/home']}
        >
          {/* <Menu.Item key="home" icon={<PieChartOutlined />}>
            <Link to='/home' style={{color:'white'}}>
            首页
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="category" icon={<PieChartOutlined />}><Link to='/category' style ={{color:'white'}}>品类管理</Link></Menu.Item>
            <Menu.Item key="product" icon={<PieChartOutlined />}><Link to='/product' style={{color:'white'}}>商品管理</Link></Menu.Item>
          </SubMenu> */}
          {this.getMenuNodes(menuList)}
      
        </Menu>
      </div>
    )
  }
}
