import React, { useState } from 'react';
import { Input, Modal, message, Table, Button } from 'antd';
import { addTypes } from '@/services/newsList';
import CateDetils from './cateDetils';
const { TextArea } = Input;
class cateList extends React.Component {
  state = {
    editCate: {},
    cateVisible: false,
  };
  TableColumns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      key: 'remark',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              this.setState(
                {
                  editCate: text,
                },
                () => {
                  this.setState({
                    cateVisible: true,
                  });
                },
              );
            }}
            size="small"
          >
            编辑
          </Button>
        </div>
      ),
    },
  ];
  componentWillReceiveProps() {}
  handleOk() {}
  handleCancel() {}
  render() {
    const { modalVisible, onCancel, onSubmit, typeList } = this.props;
    const { editCate, cateVisible } = this.state;
    return (
      <Modal width={700} title="分类列表" visible={modalVisible} onCancel={onCancel} footer={null}>
        <Table rowKey="id" pagination={false} columns={this.TableColumns} dataSource={typeList} />
        <CateDetils
          editCate={editCate}
          onSubmit={() => {
            this.setState(
              {
                cateVisible: false,
              },
              () => {
                onSubmit();
              },
            );
          }}
          onCancel={() => {
            this.setState({
              cateVisible: false,
            });
          }}
          modalVisible={cateVisible}
        ></CateDetils>
      </Modal>
    );
  }
}

export default cateList;
