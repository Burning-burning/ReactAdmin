import React, { Component } from 'react'
import {Card,Form,Input,Cascader,Upload,Button,message} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {reqCategorys,reqAddOrUpdateProduct} from '../../api'
import LinkButton from '../../components/link-button'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

const Item = Form.Item
const {TextArea} = Input

export default class ProductAddUpdate extends Component {
  state={
    options:[],
  }
  constructor(props){
    super(props)
    this.pw=React.createRef()
    this.edit = React.createRef()
  }
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //根据选中的分类请求获取二级分类列表
    const subCategorys= await this.getCategorys(targetOption.value)
    if(subCategorys&&subCategorys.length>0){
     const childOptions =  subCategorys.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf:true,
      }))
      targetOption.children = childOptions
    }else{
      targetOption.isLeaf=true

    }

    // load options lazily  
    setTimeout(() => {
      targetOption.loading = false;
     
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  };

  onFinish=async(values)=>{

    const {name,price,desc,categoryIds} = values
   
    let pCategoryId,categoryId
    if(categoryIds.length===1){
      pCategoryId='0'
      categoryId=categoryIds[0]
    }else{
      pCategoryId=categoryIds[0]
      categoryId=categoryIds[1]
    }
   
    const imgs = this.pw.current.getImgs()
    const detail = this.edit.current.getDetail()
    console.log("imgs",imgs,detail)
    const product ={name,desc,price,imgs,detail,pCategoryId,categoryId}
    if(this.isUpdate){
      product._id = this.product._id
    }
    console.log("product",product)
    const result = await reqAddOrUpdateProduct(product)

    if(result.status===0){
      message.success(`${this.isUpdate?'更新':'添加'}商品成功`)
   
      this.props.history.goBack()
    }else{
      message.success(`${this.isUpdate?'更新':'添加'}商品失败`)
      console.log(result)
    }

  }
  // 验证价格的自定义验证函数
  validatePrice=(rule,value, callback)=>{
    if(value*1>0){
      callback()  //验证通过
    }
    else{
      callback("价格必须大于0")
    }
  }

  getCategorys= async(parentId)=>{
    const result = await reqCategorys(parentId)
    if(result.status===0){

      const categorys = result.data
     if(parentId==='0'){
      const options =  categorys.map(c=>({
      
        value:c._id ,
        label:c.name,
        isLeaf: false,
      }))
      const {isUpdate,product} = this
      const {pCategoryId,categoryId} = product
      if(isUpdate&&pCategoryId!=='0'){
        const subCategorys = await this.getCategorys(pCategoryId)

        const childOptions = subCategorys.map(c=>({
          value: c._id,
          label: c.name,
          isLeaf:true,
        }))
        const targetOption = options.find(option=>option.value===pCategoryId)
        targetOption.children = childOptions
      }
      this.setState({
        options
      })
     }else{
        return categorys
     }

    }

  }
  componentDidMount(){
    this.getCategorys('0')

  }

  componentWillMount(){
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product=product||{}
  }
  render() {
    const {isUpdate,product} = this
    const categoryIds = []
    const {pCategoryId,categoryId,imgs,detail} = product
    if(isUpdate){
      if(pCategoryId==='0'){
        categoryIds.push(categoryId)
      }
      else{
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
    const title = (
      <span>
        <LinkButton  onClick={()=>this.props.history.goBack()}>
          <ArrowLeftOutlined style = {{fontSize: '20px'}} />
        </LinkButton>
    <span>{isUpdate?'修改商品':'添加商品'}</span>
        
      </span>
    )
    
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    return (
      <Card title={title}>
        <Form {...layout} onFinish={this.onFinish}>
          <Item label="商品名称"
                name="name"
                initialValue={product.name}
                rules={[
                  { required: true, message: '必须输入商品名称' }
                  ]}>
            <Input placeholder="请输入商品名称"/>
          </Item>
          <Item label="商品描述"
          initialValue={product.desc}
                name="desc"
                rules={[
                  { required: true, message: '请输入商品描述' }
                  ]}>
            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
          </Item>
          <Item label="商品价格"
                name="price"
                initialValue={product.price}
                rules={[
                  { required: true, message: '请输入商品价格' },
                  {validator: this.validatePrice}
                  ]}>
            <Input type ="number" placeholder="请输入商品价格" addonAfter="元"/>

          </Item>
          <Item label="商品分类"
                name="categoryIds"
                initialValue={categoryIds}
                rules={[{ required: true, message: '请输入商品分类' }]}>
          <Cascader
          placeholder="请输入商品分类"
        options={this.state.options}
        loadData={this.loadData}
       
      />

          </Item>
          <Item label="商品图片"
                name="imgs"
               >
          <PicturesWall ref={this.pw} imgs={imgs}/>

          </Item>
          <Item label="商品详情"
                labelCol={{span:2}}
                wrapperCol={{span:20}}
                name="detail"
               >
          <RichTextEditor ref={this.edit} detail={detail}/>

          </Item>
          <Item>
            <Button type="primary" htmlType = "submit" >提交</Button>
          </Item>

        </Form>
      </Card>
    )
  }
}
