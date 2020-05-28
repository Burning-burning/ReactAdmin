import React from 'react'
import {Component} from 'react'
import './login.less'
import {connect} from 'react-redux'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {reqLogin} from '../../api'
import {login} from '../../redux/actions'
import {message} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'
/*
登陆的路由组件
*/
class Login extends Component{

  onFinish = (async (values) => {
    const {username, password} = values
    this.props.login(username, password)
    // reqLogin(username, password).then(response=>{
    //   console.log(response)
    //   console.log('成功', response.data)
    // }).catch(error=>{
    //   console.log('失败',error)
    // })

    // const result = await reqLogin(username, password)
    // // console.log("请求成功",response.data)
    // if(result.status===0){

    //   // 登陆成功
    //   message.success("登陆成功")
    //   // 保存user
    //   const user = result.data
    //   console.log("user",user)
    //   memoryUtils.user = user  //保存在内存中

    //   storageUtils.saveUser(user)  //保存在local中

    //   //跳转到后台管理界面(用replace是因为不希望回退，希望回退用push)
    //   this.props.history.replace("/home")
    // }else{
    //   // 登陆失败
    //   message.error(result.msg)
    // }



  })
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
    // 如果用户已经登陆，自动跳转到管理界面
    //const user = memoryUtils.user
    // const user = this.props.user
    const user = storageUtils.getUser()
    if(user && user._id){
      return <Redirect to='/home'></Redirect>
    }

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

export default connect(
  state=>({user: state.user}),
  {login}
)(Login)


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


 /*
async 和 await
1. 作用
简化promise对象的使用：不用在使用then()来指定成功/失败的回掉函数
以同步编码（没有回掉函数了）方式实现异步流程
2. 哪里写await
在返回promise的表达式的左侧写await：不想要promise，想要promise异步执行的成功的value数据
3. 哪里写async
await所在函数（最近的）定义的左侧写async
 */