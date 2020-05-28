import React, { Component, memo } from 'react'
import {Card,Table,Button,message,Modal,Form,Input,Tree} from 'antd'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api'
import menuList from '../../config/menuConfig'
import {connect} from 'react-redux'
import storageUtils from '../../utils/storageUtils'
import {logout} from '../../redux/actions'
import {formateDate} from '../../utils/dateUtils'
const Item = Form.Item
const { TreeNode } = Tree;
class Role extends Component {
  formRef = React.createRef();
  constructor(props){
    super(props)
    this.state={
    
        roles:[],
        role:[],
        isShowAdd: false,
        isShowAuth: false,
        checkedKeys: [],
    }
  }
  initColumns=()=>{
    this.columns=[
      { 
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title:'创建时间',
        dataIndex: 'create_time',
        render: (create_time)=>formateDate(create_time)
      },
      {
        title:'授权时间',
        dateIndex: 'auth_time',
        render: (auth_time)=>formateDate(auth_time)

      },
      {
        title:'授权人',
        dataIndex:'auth_name',


      }
    ]
  }
  onRow=(role)=>{
    return {
      onClick: event=>{
        this.setState({
          role,
          checkedKeys: role.menus,
        })
      }
    }
  }
  getRoles=async()=>{
    const result = await reqRoles()
    if(result.status===0){
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  updateRole=async()=>{

    this.setState({ 
      isShowAuth: false
    })
    const {role} = this.state
    role.menus = this.state.checkedKeys
    role.auth_name = this.props.user.username
    role.auth_time = Date.now()
    const result =  await reqUpdateRole(role)
    if(result.status===0){
      
      if(role._id===this.props.user.role._id){
        this.props.logout()
        message.error("buneng修改自己角色信息")
      }else{
        message.success("更新角色权限成功")
        this.getRoles()
      }
      
    }else{
      message.error("更新角色权限失败")
    }

  }
  handleCancel=()=>{
  
    this.formRef.current.resetFields()
    this.setState({
      isShowAdd: false
    })

  }
  handleAuthCancel=()=>{
    this.setState({
      isShowAuth:false,
      checkedKeys: this.state.role.menus
    })
   
  }
  addRole=async()=>{
    this.setState({
      isShowAdd: false
    })
    const {roleName} = this.formRef.current.getFieldsValue("roleName")
    console.log(roleName)
    this.formRef.current.resetFields()
    const result = await reqAddRole(roleName)
    console.log("result",result)
  
    if(result.status===0){
      message.success("添加成功")
      const role = result.data
      this.setState(state=>({
        roles: [...state.roles,role]
      }))
    }else{
      message.error("添加失败")
    }

  }
  onCheck=(checkedKeys)=>{
    this.setState({
      checkedKeys
    })
  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {roles,role,isShowAdd,isShowAuth,checkedKeys} = this.state
    const title = (
      <span>
        <Button type="primary" onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>&nbsp;
        <Button type="primary" disabled={!role._id} onClick={()=>this.setState({isShowAuth:true})}>设置角色权限</Button>

      </span>

    )
    return (
      <Card title = {title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize:3}}
          rowSelection={{type:'radio',selectedRowKeys:[role._id],onSelect:(role)=>{this.setState({role})}} }
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        
        >
           <Form ref={this.formRef} >
          <Item label="角色名称"
                name="roleName"
                rules={[
                  { required: true, message: '必须输入角色名称' }
                  ]}
            >
            <Input placeholder="请输入商品名称"/>
          </Item>
        </Form>
        </Modal>



        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={this.handleAuthCancel}
        
        >
           <Form ref={this.formRef} >
          <Item label="角色名称">
            <Input disabled value={role.name}/>

          </Item>
          <Tree
          
          checkable
          defaultExpandAll={true}
            treeData={menuList}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
    />
        </Form>
        </Modal>
      </Card>
    )
  }
}


export default connect(
  state=>({user: state.user}),
  {logout}
)(Role)