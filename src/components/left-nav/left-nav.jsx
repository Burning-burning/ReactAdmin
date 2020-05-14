import React, { Component } from 'react'
import './left-nav.less'
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
import { Menu } from 'antd';
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
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" ></img>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="home" icon={<PieChartOutlined />}>
            <Link to='/home' style={{color:'white'}}>
            首页
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="category" icon={<PieChartOutlined />}><Link to='/category' style ={{color:'white'}}>品类管理</Link></Menu.Item>
            <Menu.Item key="product" icon={<PieChartOutlined />}><Link to='/product' style={{color:'white'}}>商品管理</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="user" icon={<PieChartOutlined />}>
            <Link to='/user' style={{color:'white'}}>
            用户管理
            </Link>
          </Menu.Item>
          <Menu.Item key="role" icon={<PieChartOutlined />}>
            <Link to='/role' style={{color:'white'}}>
            角色管理
            </Link>
          </Menu.Item>

        </Menu>
      </div>
    )
  }
}
