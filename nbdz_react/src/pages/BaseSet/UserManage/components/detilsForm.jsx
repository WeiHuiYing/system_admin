import React, { useState } from 'react';
import { Input, Modal, message, Form, TreeSelect, Select, Button } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { UserAdd, UserEdit } from '@/services/baseSet';
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
    const { editForm, isAdd } = this.props;
    if (isAdd == false) {
      this.setState({
        userName: editForm.userName,
        salt: editForm.salt,
        phone: editForm.phone,
        resDepartment: editForm.resDepartment,
        resUserRoles: editForm.resUserRoles,
        email: editForm.email,
        remark: editForm.remark,
      });
    } else {
      this.setState({
        userName: '',
        salt: '',
        phone: '',
        resDepartment: '',
        resUserRoles: [],
        email: '',
        remark: '',
      });
    }
  }
  submitAdd = async values => {
    const _this = this;
    try {
      const success = await UserAdd(values);

      console.log(success);
    } catch (error) {}
  };
  submitEdit = async values => {
    const _this = this;
    try {
      const success = await UserEdit(values);
      console.log(success);
    } catch (error) {}
  };
  render() {
    const { modalVisible, onCancel, onSubmit, isAdd, deptDataTree, roleList } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        destroyOnClose={true}
        width="800px"
        title="用户详情"
        footer={null}
        onCancel={onCancel}
        visible={modalVisible}
      >
        <Form
          {...formItemLayout}
          ref="form"
          initialValues={{
            userName: this.state.userName ? this.state.userName : '',
            salt: this.state.salt ? this.state.salt : '',
            phone: this.state.phone ? this.state.phone : '',
            resDepartment: this.state.resDepartment ? this.state.resDepartment : '',
            resUserRoles: this.state.resUserRoles ? this.state.resUserRoles : '',
            email: this.state.email ? this.state.email : '',
            remark: this.state.remark ? this.state.remark : '',
          }}
          onFinish={values => {
            if (isAdd == true) {
              this.submitAdd(values);
            } else {
              this.submitEdit(values);
            }
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
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={deptDataTree}
              placeholder="请选择部门"
            />
          </Form.Item>
          <Form.Item label="角色" name="resUserRoles">
            <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择角色">
              {roleList.map(item => (
                <Option key={item.id}>{item.roleName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="邮箱地址" name="email">
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input placeholder="请输入备注" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={onCancel}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default userDetils;
