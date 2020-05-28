import React, { Component } from 'react'
import {Card, Table,Button,Modal,message,Form,Input,Select} from 'antd'
import LinkButton from '../../components/link-button'
import {formateDate} from '../../utils/dateUtils'
import {reqUsers,reqDeleteUser,reqAddUser} from '../../api'
const {Item} = Form
const {Option} = Select
export default class User extends Component {
  formRef=React.createRef()
  state = {
    users: [],
    roles:[],
    isShow: false,
  }
  getColumns=()=>{
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',

      },
      {
        title: '邮箱',
        dataIndex: 'email',

      },
      {
        title: '电话',
        dataIndex: 'phone',

      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (create_time)=>formateDate(create_time)
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: (role_id)=>this.state.roles.find(role=>role._id===role_id).name
        render: (role_id)=>this.roleNames[role_id]
      },
      {
        title: '操作',
      
        render: (user)=>{
          return (
            <span>
              <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
              <LinkButton onClick = {()=>this.handleDelete(user)}>删除</LinkButton>
            </span>
          )
        }
      },
    ];

  }

  showUpdate=(user)=>{
    
   
    const {username,phone,role_id,email} = user
    this.user = user
    this.formRef.current.setFieldsValue({
      username: username,
      phone:phone,
      email:email,
      role_id:role_id
    });
    this.setState({
      isShow:true
    })

  }
  handleDelete=(user)=>{
    Modal.confirm({
      title: `确认删除${user.username}吗？`,

      onOk:async () =>{
        const result = await reqDeleteUser(user._id)
        if(result.status===0){
          message.success("删除用户成功")
          this.getUsers()
        }else{
          message.error("删除用户失败")
        }
      },
    });
  }
  handleCancel=()=>{
    this.formRef.current.resetFields()
    this.setState({
      isShow: false
    })
    
  }
  initRoleNames=(roles)=>{
    const roleNames = roles.reduce((pre,role)=>{
      pre[role._id]=role.name
      return pre
    },{})
    this.roleNames=roleNames

  }
  getUsers=async()=>{
    const result = await reqUsers()
    if(result.status===0){
      const {users,roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles,
      })
    }else{
      message.error("请求用户失败")
    }

  }
  addOrUpdateUser=async()=>{
    this.setState({
      isShow:false
    })
    
    const user = this.formRef.current.getFieldsValue()
    this.formRef.current.resetFields()
    if(this.user){
      user._id=this.user._id
    }
   
    const result = await reqAddUser(user)
    if(result.status===0){
      
    message.success("gengxin成功")
    this.getUsers()
     
    }

  }
  isShowInterface=()=>{
    
    this.user=null
    console.log("user",this.user)
    this.setState({
      isShow:true
    })
  }
  componentWillMount(){
    this.getColumns()
  }

  componentDidMount(){
    this.getUsers()
  }
  
  render() {
    const {users,roles, isShow} = this.state
    const user = this.user
    const title = (
      <Button type="primary" onClick={this.isShowInterface}>创建用户</Button>
    )
    console.log("user1",user)
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
  
    
    
    return (
      <Card title={title}>
        <Table 
        bordered
        rowKey="_id"
        dataSource={users} 
        columns={this.columns}
        pagination={{defaultPageSize:2,showQuickJumper:true}}
        />
        <Modal
        forceRender={true}
        title={user?'修改用户':'添加用户'}
        visible={isShow}
        onOk={this.addOrUpdateUser}
        onCancel={this.handleCancel}
        >
           <Form ref={this.formRef} {...layout} >
           <Item label="用户名"
                name="username"
                rules={[
                  { required: true, message: '必须输入用户名称' }
                  ]}>
            <Input placeholder="请输入用户名"/>
          </Item>

        {user? null:   <Item label="密码"
                name="password"
                
                rules={[
                  { required: true, message: '必须输入商品名称' }
                  ]}>
            <Input type="password" placeholder="请输入密码"/>
          </Item>}
          <Item label="手机号"
                name="phone"
                
                rules={[
                  { required: true, message: '必须输入商品名称' }
                  ]}>
            <Input placeholder="请输入手机号"/>
          </Item>
          <Item label="邮箱"
                name="email"
                rules={[
                  { required: true, message: '必须输入商品名称' }
                  ]}>
            <Input placeholder="请输入邮箱"/>
          </Item>
          <Item label="角色"
                name="role_id"
                
                rules={[
                  { required: true, message: '必须输入商品名称' }
                  ]}>
            <Select>
              {roles.map(role=>{
                return <Option key={role._id} value={role._id}>{role.name}</Option>
              })}
            </Select>
          </Item>
            </Form>


        </Modal>
      </Card>
    )
  }
}
