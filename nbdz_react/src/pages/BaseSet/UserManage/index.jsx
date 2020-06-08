import React from 'react';
import { Table, Button, Space, Row, Col, Form, Input, Pagination } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import UserDetils from './components/detilsForm';

import { DeptGetList, RoleGetPage } from '@/services/baseSet';

@connect(({ userManage, loading }) => ({
  userManage,
  loading: loading.models.userManage,
}))
class UserList extends React.Component {
  state = {
    pageCurrent: 1,
    pageSize: 100,
    filters: {},
    userVisible: false,
    editForm: {},
    isAdd: false,
    deptList: [],
    deptTreeData: [],
    roleList: [],
  };
  TableColumns = [
    {
      title: '编码',
      dataIndex: 'userCode',
      key: 'userCode',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '电话',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '部门',
      key: 'deptId',
      dataIndex: 'deptId',
    },
    {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <Space>
            <Button type="primary" size="small">
              授权
            </Button>
            <Button
              onClick={() => {
                this.setState(
                  {
                    editForm: text,
                    isAdd: true,
                  },
                  () => {
                    this.setState({
                      userVisible: true,
                    });
                  },
                );
              }}
              size="small"
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                console.log(text);
              }}
              type="primary"
              size="small"
              danger
            >
              删除
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  componentDidMount() {
    this.loadData();
    this.deptLoad();
    this.roleLoad();
  }
  loadData() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters } = this.state;
    let filtersQuery = [];
    if (filters.userName && filters.userName != '') {
      filtersQuery.push({
        key: 'userName',
        binaryop: 'eq',
        value: filters.userName,
        andorop: 'and',
      });
    }
    dispatch({
      type: 'userManage/UserList',
      payload: {
        pageNum: pageCurrent,
        pageSize: pageSize,
        query: filtersQuery,
      },
    });
  }
  // 加载部门结构
  deptLoad = async () => {
    try {
      const success = await DeptGetList({
        navPropertyPaths: ['childrenDept'],
      });
      if (success.code == '200') {
        let deptList = success.data.filter(item => {
          if (!item.parentDept) return item;
        });
        this.setState(
          {
            deptList: deptList,
          },
          () => {
            this.deptDataTree();
          },
        );
      }
    } catch (error) {}
  };
  // 部门列表操作为树结构
  deptDataTree = () => {
    let deptTree = [];
    let deptItem = {};
    this.state.deptList.forEach(item => {
      deptItem = {
        title: item.deptName,
        value: item.id,
        children: this.deptChlid(item.childrenDept),
      };
      deptTree.push(deptItem);
    });
    this.setState({
      deptTreeData: deptTree,
    });
  };
  // 加载部门下的子部门
  deptChlid = data => {
    let deptItem = {};
    let deptTree = [];
    if (data.length > 0) {
      data.forEach(item => {
        deptItem = {
          title: item.deptName,
          value: item.id,
          children: this.deptChlid(item.childrenDept),
        };
        deptTree.push(deptItem);
      });
    }
    return deptTree;
  };
  roleLoad = async () => {
    const _this = this;
    try {
      const success = await RoleGetPage({
        pageSize: 1000,
      });
      if (success.code == 200) {
        this.setState({
          roleList: success.data,
        });
      }
    } catch (error) {}
  };
  // 搜索
  handleSearch = values => {
    let filterData = {};
    if (values.userName) {
      filterData.userName = values.userName;
    }
    this.setState(
      {
        filters: filterData,
      },
      () => {
        this.loadData();
      },
    );
  };
  sizeChange() {}
  changePage() {}
  // 搜索的dom
  renderSearchForm() {
    return (
      <div className="layout-header-form">
        <Row className="layout-header-row">
          <Col span={20}>
            <Form layout="inline" onFinish={this.handleSearch}>
              <Form.Item name="userName">
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4}>
            <Button
              type="primary"
              onClick={() => {
                this.setState(
                  {
                    editForm: {},
                    isAdd: true,
                  },
                  () => {
                    this.setState({
                      userVisible: true,
                    });
                  },
                );
              }}
            >
              创建
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  render() {
    const {
      userManage: { userListData, userPage },
      loading,
    } = this.props;
    let {
      pageCurrent,
      pageSize,
      userVisible,
      editForm,
      isAdd,
      deptTreeData,
      roleList,
    } = this.state;
    return (
      <PageHeaderWrapper>
        {this.renderSearchForm()}
        <Table
          rowKey="id"
          loading={loading}
          columns={this.TableColumns}
          dataSource={userListData}
          pagination={{
            total: userPage,
            defaultCurrent: pageCurrent,
            defaultPageSize: pageSize,
            onShowSizeChange: this.sizeChange,
            onChange: this.changePage,
          }}
        />
        <UserDetils
          onCancel={() => {
            this.setState({
              userVisible: false,
            });
          }}
          onSubmit={() => {
            this.setState(
              {
                userVisible: false,
              },
              () => {
                this.loadData();
              },
            );
          }}
          isAdd={isAdd}
          editForm={editForm}
          modalVisible={userVisible}
          deptDataTree={deptTreeData}
          roleList={roleList}
        ></UserDetils>
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
