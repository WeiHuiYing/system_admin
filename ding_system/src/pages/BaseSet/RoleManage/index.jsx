import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';

@connect(({ BaseSet, loading }) => ({
  BaseSet,
  loading: loading.models.BaseSet,
}))
class RoleList extends React.Component {
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
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters } = this.state;
    dispatch({
      type: 'BaseSet/RoleList',
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
      BaseSet: { roleListData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.TableColumns}
          dataSource={roleListData}
        />
      </PageHeaderWrapper>
    );
  }
}

export default RoleList;
