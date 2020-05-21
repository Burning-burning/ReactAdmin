import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api/index'
import PropTypes from 'prop-types'
import React from 'react'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }

  constructor(props){
    super(props)
    let fileList = []
    const {imgs} = this.props
    if(imgs&&imgs.length>0){
      fileList = imgs.map((img,index)=>({
        uid: -index,
        name: img,
        status: 'done',
        url:'http://localhost:5000/upload/'+img
      }))
    }
    this.state={
      previewVisible: false,   
      previewImage: '',
      previewTitle: '',
      fileList,
    }
  }

  getImgs=()=>{
    return this.state.fileList.map(file=>file.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async({ file,fileList }) => {

    if(file.status==='done'){
      console.log(file)
      const result = file.response
      if(result.status===0){
        message.success("图片上传成功")
        const {name,url}=result.data
        file=fileList[fileList.length-1]
        file.name=name
        file.url=url
      }else{
        message.error("图片上传失败")

      }
    }
    else if(file.status==="removed"){
      const result = await reqDeleteImg(file.name)
      if(result.status===0){
        message.success("删除图片成功")
      }else{
        message.error("删除图片失败")
      }

    }

    this.setState({ fileList })
  }


  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          accept="image/*"   //只接受图片格式
          listType="picture-card"
          name = 'image'   //请求参数名
          fileList={fileList}   //已上传文件的列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}



// 子组件调用父组件的方法，将父组件的方法以函数属性的形式传递给子组件
// 父组件调用子组件的方法，通过在父组件中ref得到子组件标签对象，调用其方法