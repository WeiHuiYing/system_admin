import React, { useState } from 'react';
import { Drawer, Button, Input, Upload, Select, notification, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { addNews, editNew, picUpload } from '@/services/newsList';
const { TextArea } = Input;
const { Option } = Select;
const mdParser = new MarkdownIt();
import request from '@/utils/request';

class Detils extends React.Component {
  state = {
    loading: false,
    title: '',
    subTitle: '',
    image: '',
    dingClassify: {},
    originalContent: '',
    htmlContent: '',
    id: '',
    editer: '',
  };
  componentWillReceiveProps() {
    // 编辑  初始化数据
    if (this.props.isAdd == false) {
      this.setState({
        title: this.props.editForm.title,
        subTitle: this.props.editForm.subTitle,
        image: this.props.editForm.image,
        dingClassify: this.props.editForm.dingClassify,
        originalContent: this.props.editForm.originalContent,
        htmlContent: this.props.editForm.htmlContent,
        id: this.props.editForm.id,
        editer: this.props.editForm.editer,
        status: this.props.editForm.status,
      });
    } else {
      this.setState({
        title: '',
        subTitle: '',
        image: '',
        dingClassify: {},
        originalContent: '',
        htmlContent: '',
        id: '',
        editer: '',
        status: '',
      });
    }
  } // markdown内容修改
  handleChange = content => {
    this.setState({
      originalContent: content.text,
      htmlContent: content.html,
    });
  };
  // 图片大小限制
  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  saveCommit = status => {
    console.log(this.props.isAdd);
    if (this.props.isAdd) {
      this.handleAddData(status);
    } else {
      this.handleUpdateData(status);
    }
  };
  // 更新新闻
  handleUpdateData = async status => {
    const { onSubmit } = this.props;
    try {
      if (this.state.dingClassify && this.state.dingClassify.id) {
        let editData = {
          cateId: this.state.dingClassify.id,
          data: {
            title: this.state.title,
            subTitle: this.state.subTitle,
            image: this.state.image,
            htmlContent: this.state.htmlContent,
            originalContent: this.state.originalContent,
            id: this.state.id,
            status: status,
            editer: this.state.editer,
          },
        };
        const success = await editNew(editData);
        if (success.code == 200) {
          message.success('操作成功');
          onSubmit();
        } else {
          notification.error({
            message: `请求错误`,
            description: success.msg,
          });
        }
      } else {
        notification.error({
          message: `请求错误`,
          description: '请选择文章分类',
        });
        return;
      }
    } catch (error) {}
  };
  handleAddData = async status => {
    try {
      if (this.state.dingClassify && this.state.dingClassify.id) {
        let editData = {
          cateId: this.state.dingClassify.id,
          data: {
            title: this.state.title,
            subTitle: this.state.subTitle,
            image: this.state.image,
            htmlContent: this.state.htmlContent,
            originalContent: this.state.originalContent,
            editer: this.state.editer,
            status: status,
          },
        };
        const success = await addNews(editData);
        if (success.code == 200) {
          message.success('操作成功');
          if (status == 1) {
            this.setState(
              {
                id: success.data.id,
              },
              () => {
                this.handleUpdateData(status);
              },
            );
          } else {
            onSubmit();
          }
        } else {
          notification.error({
            message: `请求错误`,
            description: success.msg,
          });
        }
      } else {
        notification.error({
          message: `请求错误`,
          description: '请选择文章分类',
        });
        return;
      }
    } catch (error) {}
  };
  // 图片上传
  handleImageUpload = async file => {
    const formData = new FormData();
    formData.append('picName', file);
    let _this = this;
    try {
      if (_this.beforeUpload(file)) {
        const success = await picUpload(formData);
        return 'http://8000.bitcoding.top:8888' + success.data.url;
      }
    } catch (error) {}
  };

  render() {
    const { modalVisible, onCancel } = this.props;
    return (
      <Drawer
        title="新闻详情"
        placement="right"
        closable={false}
        visible={modalVisible}
        width={1300}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              onClick={() => {
                onCancel();
              }}
              style={{ marginRight: 8 }}
            >
              关闭
            </Button>
            {this.state.status && this.state.status == 1 ? (
              ''
            ) : (
              <Button
                onClick={() => {
                  this.saveCommit(0);
                }}
                style={{ marginRight: 8 }}
                type="primary"
              >
                保存
              </Button>
            )}
            <Button
              onClick={() => {
                this.saveCommit(1);
              }}
              type="primary"
            >
              发布
            </Button>
          </div>
        }
      >
        <div className="form-item-warp">
          <Input
            placeholder="请输入文章标题"
            value={this.state.title ? this.state.title : ''}
            allowClear
            onChange={e => {
              const { value } = e.target;
              this.setState({
                title: value,
              });
            }}
          />
        </div>
        <div className="form-item-warp">
          <Input
            placeholder="请输入发布人"
            value={this.state.editer ? this.state.editer : ''}
            allowClear
            onChange={e => {
              const { value } = e.target;
              this.setState({
                editer: value,
              });
            }}
          />
        </div>
        <div className="form-item-warp">
          <TextArea
            placeholder="请输入文章子标题"
            value={this.state.subTitle ? this.state.subTitle : ''}
            rows={2}
            allowClear
            onChange={e => {
              const { value } = e.target;
              this.setState({
                subTitle: value,
              });
            }}
          />
        </div>
        <div className="form-item-warp">
          <Select
            placeholder="请选择分类"
            value={
              this.state.dingClassify && this.state.dingClassify.id
                ? this.state.dingClassify.name
                : ''
            }
            style={{ width: 200 }}
            onChange={(value, text) => {
              let obj = {
                id: value,
                name: text.children,
              };
              this.setState({
                dingClassify: obj,
              });
            }}
          >
            {this.props.typeList.map(item => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </div>
        <div className="form-item-warp">
          <Upload
            listType="picture-card"
            className="pic-uploader"
            showUploadList={false}
            name="picName"
            action="http://8000.bitcoding.top:8888/api/DingTalkNews/picUpload"
            beforeUpload={this.beforeUpload}
            onChange={info => {
              if (info.file.status === 'done') {
                this.setState({
                  image: 'http://8000.bitcoding.top:8888' + info.file.response.data.url,
                });
              }
            }}
          >
            {this.state.image ? (
              <img src={this.state.image} style={{ width: '100%' }} />
            ) : (
              '上传封面图'
            )}
          </Upload>
        </div>

        <MdEditor
          value={this.state.originalContent}
          style={{ height: '500px' }}
          renderHTML={text => mdParser.render(text)}
          onChange={this.handleChange}
          onImageUpload={this.handleImageUpload}
          handleDrop={this.handleImageUpload}
          handlePaste={this.handleImageUpload}
        />
      </Drawer>
    );
  }
}

export default Detils;
