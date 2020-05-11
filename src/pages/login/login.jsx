import React from 'react'
import {Component} from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
/*
登陆的路由组件
*/
class Login extends Component{

  onFinish = (values)=>{
    console.log('Received values of form: ', values);
  }
  /*
  对密码进行自定义验证
  */
  validatePwd =(rule, value, callback)=>{
    console.log(rule, value)
    if(!value){
      callback('密码必须输入')
    }else if(value.length<4){
      callback('密码长度不能小于4')
    }else if(value.length>12){
      callback('密码的长度不能大于12')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须是英文、数字或下划线组成')
    }else{
      callback()
    }
    callback()
    // callback()  验证通过
    // callback（'xxx')  验证失败，并指定提示的文本
  }
  render (){
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"></img>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              //声明式验证：直接使用别人定义好的验证规则进行验证
              rules={[
                { required: true, message: '用户名必须输入' },
                { min: 4, message:'用户名至少四位'},
                { max: 12, message: '用户名最多12位'},
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
            ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { validator: this.validatePwd}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }

}

export default Login


/*
1. 高阶函数
 1）一类特别的函数
   接收函数类型的参数，返回值是函数
 2）常见
   定时器：setTimeout()/setInterval()
   Promise:Promise(()=>{}) then(value=>{},reason=>{})
   数组遍历相关的方法：forEach()/fileter()/map()/reduce()/find()/findIndex()
   fn.bind()
 3) 高阶函数更新动态，更加具有扩展性  
2. 高阶组件   
  1）本质就是一个函数
  2）接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
  3）扩展组件的功能
 */