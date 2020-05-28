import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import {connect} from 'react-redux'
import Role from '../role/role'
import Pie from '../charts/pie'
import Bar from '../charts/bar'
import Line from '../charts/line'
import NotFound from '../not-found/not-found'
const {  Footer, Sider, Content } = Layout;
/*
后台管理的路由组件
*/
class Admin extends Component {

  render() {
    const user = this.props.user
    //如果内存中没有存储user==》当前没有登陆
    if(!user ||!user._id){

      // 自动跳转到登陆（在render中）
      return <Redirect to ='/login' />

    }
    return (
      <Layout style={{minHeight: '100%'}}>
              <Sider>
                <LeftNav />
              </Sider>
              <Layout>
                <Header></Header>
                <Content style ={{backgroundColor:'white', margin: '20px'}}>
                  <Switch>
                    <Route exact={true} from ="/" to="/home"></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/category' component={Category}></Route>
                    <Route path='/product' component={Product}></Route>
                    <Route path='/role' component={Role}></Route>
                    <Route path='/user' component={User}></Route>
                    <Route path='/charts/bar' component={Bar}></Route>
                    <Route path='/charts/pie' component={Pie}></Route>
                    <Route path='/charts/line' component={Line}></Route>
                    <Route component={NotFound}></Route>
                  </Switch>
                </Content>
                <Footer style = {{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
              </Layout>
            </Layout>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {}
)(Admin)
