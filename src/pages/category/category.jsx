import React, { Component } from 'react'
import './category.less'
import {Card,Button,Form,Input, Table,message,Modal} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api/index'
import { ArrowRightOutlined} from '@ant-design/icons';
import AddForm from './add-form'
/*
商品分类路由
*/
export default class Category extends Component {
  formRef = React.createRef();
  state={
    categorys: [], //一级分类列表
    subCategorys:[], //二级分类列表
    loading: false,//是否正在获取数据中
    parentId: '0', //当前需要现实的分类列表的parentId
    parentName: '', 
    showStatus:0,
  }
  initColumns=()=>{
     this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (   //返回需要现实的界面标签
          <span>
            <LinkButton onClick={()=>{this.update(category)}}>修改分类</LinkButton>
            {
              this.state.parentId==='0'?<LinkButton onClick={()=>this.getSubCategorys(category)}>查看子分类</LinkButton>:null
            }
            
          </span>
        )
      },
    ];
  }
  getSubCategorys=(category)=>{
    this.setState({
      parentId: category._id,
      parentName: category.name
    },()=>{
      this.getCategorys()
    })

  }
  getCategorys= async()=>{

    //在发请求前，显示loading
    this.setState({
      loading: true
    })
    const {parentId} = this.state

    const result =  await reqCategorys(parentId)

    // 在请求完成后，隐藏loading
    this.setState({
      loading: false
    })
    if(result.status===0){
      const categorys = result.data
      if(parentId==='0'){
        this.setState({
          categorys
        })
      }else{
        this.setState({
          subCategorys: categorys
        })
      }
    }else{
      message.error("获取分类列表失败")
    }

  }

  showCategorys=()=>{
    this.setState({
      
      parentId:'0',
      parentName:'',
      subCategorys:[],
    }
    )

  }
  handleCancel=()=>{
    this.setState({
      showStatus: 0
    })
    this.formRef.current.resetFields();

  }
  addCategory = ()=>{
    console.log("addCategory()")
  }
  updateCategory = async()=>{

    console.log("updateCategory",this.formRef.current.getFieldsValue("xixi"))
    this.setState({
      showStatus: 0
    })
    const categoryId = this.category._id
    const categoryName = this.formRef.current.getFieldsValue("xixi")
    console.log("categoryid",categoryId)
    console.log("categoryName",categoryName)
    const result = await reqUpdateCategory(categoryId,categoryName)
    console.log(result)
    console.log(result)
    if(result.status===0){
      this.getCategorys()
    }else{
      message.error(result.msg)
    }
  }
  add=()=>{
    this.setState({
      showStatus: 1
    })
  }
  update=(category)=>{
    this.category = category
    this.setState({
      showStatus: 2
    })
  }





  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {categorys, parentId,subCategorys, loading, parentName, showStatus} = this.state
    const category = this.category || {}
    console.log("categoryName",category)
    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={()=>{this.showCategorys()}}>一级分类列表</LinkButton>
        <ArrowRightOutlined />
        <span style={{marginLeft:'5px'}}>{parentName}</span>
      </span>
    )
    const extra = (
      <Button onClick={this.add} icon={<PlusOutlined /> } type="primary">
        添加
      </Button>
    )
   

    return (
      <Card title={title} extra={extra} >
        <Table dataSource={parentId==='0'?categorys:subCategorys} loading={loading} columns={this.columns} bordered rowKey='_id' pagination={{defaultPageSize:5,showQuickJumper:true}}/>
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm />
     
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <Form initialValues={{xixi:category.name}} ref={this.formRef}>
            <Form.Item
              name="xixi"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="请输入分类名称"></Input>
        </Form.Item>
      </Form>
         
  
        </Modal>
      </Card>
    )
  }
}
