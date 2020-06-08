import React, { useState } from 'react';
import { Input, Modal, message } from 'antd';
import { addTypes, updateTypes } from '@/services/newsList';
const { TextArea } = Input;
class cateDetils extends React.Component {
  state = {
    name: '',
    remark: '',
    id: '',
  };
  componentWillReceiveProps() {
    const { editCate } = this.props;
    if (editCate.id) {
      this.setState({
        name: editCate.name,
        remark: editCate.remark,
        id: editCate.id,
      });
    } else {
      this.setState({
        name: '',
        remark: '',
        id: '',
      });
    }
  }
  render() {
    const { modalVisible, onCancel, onSubmit, classfiyId } = this.props;
    return (
      <Modal
        title="分类详情"
        visible={modalVisible}
        onOk={async () => {
          try {
            let formData = {
              name: this.state.name,
              remark: this.state.remark,
            };
            if (formData.name == '') {
              message.error('分类名称不能为空');
              return false;
            }
            let success = {};
            if (this.state.id && this.state.id != '') {
              formData.id = this.state.id;
              let data = {
                data: formData,
                id: classfiyId,
              };
              success = await updateTypes(data);
            } else {
              let data = {
                data: formData,
                id: classfiyId,
              };
              success = await addTypes(data);
            }
            if (success.code == 200) {
              message.success('操作成功');
              onSubmit();
            } else {
              message.error(success.msg);
            }
          } catch (error) {}
        }}
        onCancel={onCancel}
      >
        <div className="form-item-warp">
          <Input
            placeholder="请输入分类标题"
            value={this.state.name ? this.state.name : ''}
            allowClear
            onChange={e => {
              const { value } = e.target;
              this.setState({
                name: value,
              });
            }}
          />
        </div>
        <div className="form-item-warp">
          <TextArea
            placeholder="请输入分类描述"
            value={this.state.remark ? this.state.remark : ''}
            rows={2}
            allowClear
            onChange={e => {
              const { value } = e.target;
              this.setState({
                remark: value,
              });
            }}
          />
        </div>
      </Modal>
    );
  }
}

export default cateDetils;
