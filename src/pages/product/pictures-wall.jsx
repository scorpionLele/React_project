import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import PropTypes from "prop-types";

import { BASE_IMG_PATH } from "../../Utils/constants";
import { reqDeleteImg } from "../../api";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class PicturesWall extends Component {
  static propTypes = {
    imgs: PropTypes.array
  }
  constructor (props) {
    super(props)
    let fileList = []
    const {imgs} = this.props
    if(imgs && imgs.length > 0){
      fileList = imgs.map((img,index)=>({
        uid : index,
        name : img,
        status : 'done',
        url: BASE_IMG_PATH + img
      }))
    }

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList
    };
  }

  getImgs = () => this.state.fileList.map(file => file.name)

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {      
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file,fileList }) => {
    if(file.status === 'done'){
      const {name,url} = file.response.data
      file = fileList[fileList.length - 1]
      file.name = name
      file.url = url
    }else if(file.status === 'removed'){
      const name = file.name
      const result = await reqDeleteImg(name)
      if(result.status === 0){
        message.success('删除图片成功')
      }
    }
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          name='image'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

