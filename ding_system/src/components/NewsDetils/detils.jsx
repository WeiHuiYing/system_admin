import React, { useState } from 'react';
import { Drawer, Button, Input, Upload, Select, notification, message } from 'antd';
import { LoadingOutlined, PictureOutlined } from '@ant-design/icons';
import { addNews, editNew, picUpload } from '@/services/newsList';
const { TextArea } = Input;
const { Option } = Select;
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/color-picker.css'
import ColorPicker from 'braft-extensions/dist/color-picker'

BraftEditor.use(ColorPicker({
  includeEditors: ['editor-with-color-picker'],
  theme: 'light' // 支持dark和light两种主题，默认为dark
}))
class Detils extends React.Component {
  state = {
    loading: false,
    title: '',
    subTitle: '',
    image: '',
    dingClassify: {},
    editorState: BraftEditor.createEditorState(null),
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
        editorState: BraftEditor.createEditorState(this.props.editForm.htmlContent),
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
        editorState: BraftEditor.createEditorState(null),
        htmlContent: '',
        id: '',
        editer: '',
        status: '',
      });
    }
  } // markdown内容修改
  handleContentChange = (editorState) => {
    this.setState({
      editorState,
      htmlContent:editorState.toHTML()
    })
  }
  // 图片类型判断与压缩
  canvasCompress = file => {
    let _this = this;
    return new Promise((resolve, reject) => {
      const reader = new FileReader(),
        img = new Image();
      reader.readAsDataURL(file);
      // 文件base64格式化
      reader.onload = function() {
        img.src = this.result;
      };
      // canvas对象 缩放图片需要用到
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      img.onload = function() {
        // 原始尺寸
        const originWidth = this.width,
          originHeight = this.height;
        // 限定的最大尺寸
        const maxWidth = 400,
          maxHeight = 400;
        // 目标尺寸
        let targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // 设置最终尺寸
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        const imgurl = canvas.toDataURL('image/png');
        resolve(_this.canvastoFile(imgurl, file.name));
      };
    });
  };
  canvastoFile(url, fileName) {
    var arr = url.split(','),
      fileType = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: fileType });
  }
  saveCommit = status => {
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
            originalContent: this.state.htmlContent,
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
            originalContent: this.state.htmlContent,
            editer: this.state.editer,
            status: status,
          },
        };
        const success = await addNews(editData);
        if (success.code == 200) {
          message.success('操作成功');
          this.setState(
            {
              id: success.data.id,
            },
            () => {
              if (status == 1) {
                this.handleUpdateData(status);
              } else {
                onSubmit();
              }
            },
          );
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
  handleImageUpload = async file => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const formData = new FormData();
      const fileData = await this.canvasCompress(file);
      formData.append('picName', fileData, 'image.png');
      try {
        const success = await picUpload(formData);
        this.setState({
          editorState:ContentUtils.insertMedias(this.state.editorState, [{
            type: 'IMAGE',
            url: 'http://antreport.bitcoding.top:8888' + success.data.url
          }])
        })
      } catch (error) {}
    } else {
      message.error('请上传img/png图片文件');
    }
        return false
  };
  beforeUpload = file => {
    const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
    const imgSize = file.size < 1024 * 1024 * 2;
    if (!isImg) {
      message.error('请上传img/png图片文件');
    }
    if (!imgSize) {
      message.error('图片文件大于2M');
    }
    return isImg && imgSize;
  };
  render() {
    const { modalVisible, onCancel } = this.props;
    const controls = [
      'undo', 'redo', 'separator',
      'font-size', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
      'separator',
      'clear'
    ]
    
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            showUploadList={false}
            beforeUpload={this.handleImageUpload}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <Button type="button" className="control-item button upload-button" data-title="插入图片">
              <PictureOutlined />
            </Button>
          </Upload>
        )
      }
    ]
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
            {this.state.status && this.state.status === 1 ? (
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
            {this.state.status === 0 ? (
              <Button
                onClick={() => {
                  this.saveCommit(1);
                }}
                type="primary"
              >
                发布
              </Button>
            ) : (
              ''
            )}
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
            disabled={ this.props.isAdd ? false : true }
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
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </div>
        <div className="form-item-warp">
          <Upload
            listType="picture-card"
            className="pic-uploader"
            showUploadList={false}
            name="picName"
            action="http://antreport.bitcoding.top:8888/api/DingTalkNews/picUpload"
            beforeUpload={this.beforeUpload}
            headers={{ Authorization: localStorage.getItem('token') }}
            onChange={info => {
              if (info.file.status === 'done') {
                this.setState({
                  image: 'http://antreport.bitcoding.top:8888' + info.file.response.data.url,
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
        <BraftEditor
          id="editor-with-color-picker"
          style={{height: 700}}
          controls={controls}
          extendControls={extendControls}
          contentStyle={{ height: 500, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
          value={this.state.editorState}
          onChange={this.handleContentChange}
        />
      </Drawer>
    );
  }
}

export default Detils;
