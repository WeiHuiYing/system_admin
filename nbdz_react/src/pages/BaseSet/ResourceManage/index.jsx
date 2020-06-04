import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';

@connect(({ BaseSet, loading }) => ({
  BaseSet,
  loading: loading.models.BaseSet,
}))
class ResourceList extends React.Component {
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
      title: '类型名称',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '中文名',
      key: 'cnName',
      dataIndex: 'cnName',
    },
    {
      title: '英文名',
      key: 'enName',
      dataIndex: 'enName',
    },
    {
      title: '编码',
      dataIndex: 'resourceCode',
      key: 'resourceCode',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters } = this.state;
    dispatch({
      type: 'BaseSet/ResourceList',
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
      BaseSet: { resourceListData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.TableColumns}
          dataSource={resourceListData}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ResourceList;
