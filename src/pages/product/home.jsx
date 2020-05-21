import React, { Component } from 'react'
import {Card, Table,Select,Input,Button,message} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api/index'
import{PAGE_SIZE} from '../../utils/constants'

const Option = Select.Option
export default class ProductHome extends Component {
  state={
    total: 0,//商品的总数量
    products: [], //商品的数组
    loading: false, 
    searchName: '',
    searchType: 'productName'
  }
  updateStatus=async(productId, status)=>{
    const result = await reqUpdateStatus(productId,status)
    if(result.status===0){
      message.success("更新成功")
      this.getProducts(this.pageNum)
    }else{
      message.error("更新失败")
    }

  }
  initColumns=()=>{
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>'¥'+price    //当前制定了dateIndex，所以传入的是price
      },
      {
        title: '状态',
        width: '100px',
  
        render:(product)=>{
          const {status,_id} = product
          return (
            <span>
              <Button type="primary" onClick={()=>this.updateStatus(_id, status===1?2:1)}>{status===1?'下架':'上架'}</Button>
              <span>{status===1?'在售':'已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width:'100px',
        render:(product)=>{
          return (
            <span>
              {/*把product对象作为state传给目标路由组件 */}
              <LinkButton onClick={()=>this.props.history.push('/product/detail',product)}>详情</LinkButton>
              <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
    
  }
  getProducts=async(pageNum)=>{
    this.pageNum=pageNum
    this.setState({
      loading:true
    })
    const {searchType,searchName} = this.state
    let result
    const pageSize = PAGE_SIZE
    if(searchName){
      console.log({pageNum,pageSize:PAGE_SIZE,searchName,searchType})

      result = await reqSearchProducts(pageNum,pageSize,searchName,searchType)
      console.log(result)

    }else{
      result = await reqProducts(pageNum,PAGE_SIZE)
    }
    
    this.setState({
      loading: false
    })
    if(result.status===0){
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }

  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const {products,total,loading,searchName,searchType} = this.state
    const title = (
      <span>
        <Select value={searchType} style={{width:'150px'}} onChange={(value)=>{this.setState({searchType:value})}}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{width:"150px",margin:"0px 15px"}} value={searchName} onChange={(e)=>{this.setState({searchName: e.target.value})}}></Input>
        <Button type="primary" onClick={()=>{this.getProducts(1)}}>搜索</Button>

      </span>
    )
    const extra=(
      <Button icon={<PlusOutlined /> } type = "primary" onClick={()=>this.props.history.push('/product/addupdate')}>
        添加商品
      </Button>
    )

   
    

    return (
      <Card  title={title} extra={extra} >
        <Table
          loading={loading}
          rowKey='_id'
          bordered
          dataSource={products} 
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper:true,
            total,
            onChange: (pageNum)=>this.getProducts(pageNum)
          }}
        >

        </Table>
      </Card>
    )
  }
}


// 1. 纯前台分页   请求获取数据：一次性获取所有数据，翻页时不需要再发请求    请求接口：不需要指定页码（pageNum）和每页数量（pageSize） 响应数据： 所有数据的数组
// 2. 基于后台的分页   请求获取数据：每次只获取当前的数据，翻页时要发请求   请求接口  需要指定：pageNum，pageSize   响应数据：当前页数据的数组+总记录数（total）
// 如何选择？   根据数据多少来选择
