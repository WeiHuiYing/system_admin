import React, { useState } from 'react';
import { Input, Modal, message, Form } from 'antd';
const { TextArea } = Input;
class userDetils extends React.Component {
  state = {
    userName: '',
    salt: '',
    phone: '',
    resDepartment: '',
    resUserRoles: '',
    email: '',
    remark: '',
  };
  componentWillReceiveProps() {
    const { editForm } = this.props;
    this.setState({
      userName: editForm.userName,
      salt: editForm.salt,
      phone: editForm.phone,
      resDepartment: editForm.resDepartment,
      resUserRoles: editForm.resUserRoles,
      email: editForm.email,
      remark: editForm.remark,
    });
  }
  render() {
    const { modalVisible, onCancel, onSubmit, editForm } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        destroyOnClose={true}
        width="800px"
        title="用户详情"
        onCancel={onCancel}
        visible={modalVisible}
      >
        <Form
          {...formItemLayout}
          initialValues={{
            userName: this.state.userName ? this.state.userName : '',
            salt: this.state.salt ? this.state.salt : '',
            phone: this.state.phone ? this.state.phone : '',
            resDepartment: this.state.resDepartment ? this.state.resDepartment : '',
            resUserRoles: this.state.resUserRoles ? this.state.resUserRoles : '',
            email: this.state.email ? this.state.email : '',
            remark: this.state.remark ? this.state.remark : '',
          }}
        >
          <Form.Item label="用户名" name="userName">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码" name="salt">
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input placeholder="请输入电话号码" />
          </Form.Item>
          <Form.Item label="部门" name="resDepartment">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item label="角色" name="resUserRoles">
            <Input placeholder="请输入角色" />
          </Form.Item>
          <Form.Item label="邮箱地址" name="email">
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default userDetils;
