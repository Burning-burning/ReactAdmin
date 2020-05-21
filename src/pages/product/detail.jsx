import React, { Component } from 'react'
import {Card, List} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {reqCategory} from '../../api/index'
import LinkButton from '../../components/link-button'
const Item = List.Item
export default class ProductDetail extends Component {
  state={
    cName1:'', //一级分类名称
        cName2:'',
  }
   createMarkup=(detail)=> {
     console.log("detail",detail)
    return {__html: detail};
  }
  async componentDidMount(){
    const {pCategoryId,categoryId} = this.props.location.state
    if(pCategoryId==='0'){
      const result1 = await reqCategory(categoryId)
      const cName1 = result1.data.name
      this.setState({
        cName1
      })
    }else{

      const result1 = await reqCategory(pCategoryId)
      const result2 = await reqCategory(categoryId)
      this.setState({
        cName1: result1.data.name,
        cName2: result2.data.name,
      })

    }

    

  }
  render() {
    const BASE_IMG_URL='http://localhost:5000/upload/'
    // 读取携带过来的状态数据
   const {name,price,desc,detail,imgs} = this.props.location.state

    console.log("name",this.props.location.state)
   const {cName2, cName1} = this.state
    const title = (
      <span>
        <LinkButton >
          <ArrowLeftOutlined style={{fontSize:"20px"}} onClick={()=>this.props.history.goBack()}/>
        </LinkButton>
        <span style={{marginLeft: '5px'}}>商品详情</span>
      </span>
    )
    return (
      <Card title = {title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称：</span>
              <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格：</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类：</span>
           <span>{cName1}{cName2?' --> '+cName2:''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {imgs.map(img=>{
                return <img src={BASE_IMG_URL+img} alt="logo"></img>
              })}
            </span>
         
          </Item>
          <Item>
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={this.createMarkup(detail)} />
          </Item>
        </List>

      </Card>
    )
  }
}
