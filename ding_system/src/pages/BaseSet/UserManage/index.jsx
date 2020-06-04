import React from 'react';
import { Table, Button, Space } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';

@connect(({ BaseSet, loading }) => ({
  BaseSet,
  loading: loading.models.BaseSet,
}))
class TaskList extends React.Component {
  state = {
    pageCurrent: 1,
    pageSize: 10,
    filters: {
      datetimePoint: '',
      singleSku: '',
      warehouseId: '',
    },
  };
  TableColumns = [
    {
      title: '编码',
      dataIndex: 'userCode',
      key: 'userCode',
    },
    {
      title: '用户名',
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
            <Button size="small">编辑</Button>
            <Button type="primary" size="small" danger>
              删除
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters } = this.state;
    dispatch({
      type: 'BaseSet/UserList',
      payload: {
        pageNum: pageCurrent,
        pageSize: pageSize,
        order: {},
        query: [],
        navPropertyPaths: [],
      },
    });
  }
  handleSearch() {}

  render() {
    const {
      BaseSet: { userListData, userPage },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.TableColumns}
          dataSource={userListData}
          pagination={userPage}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TaskList;
